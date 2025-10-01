import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import '../admin.css'

function AdminDashboard() {
  const navigate = useNavigate()
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    totalMessageChars: 0,
    avgSignatureLength: 0,
    todayCount: 0
  })
  const [heatmapData, setHeatmapData] = useState([])

  useEffect(() => {
    checkAuth()
    fetchSubmissions()
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      navigate('/admin/login')
    }
  }

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setSubmissions(data || [])
      calculateStats(data || [])
      calculateHeatmap(data || [])
    } catch (error) {
      console.error('Error fetching submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (data) => {
    const total = data.length
    const totalMessageChars = data.reduce((sum, s) => sum + s.message.length, 0)
    const avgSignatureLength = total > 0
      ? Math.round(data.reduce((sum, s) => sum + s.signature.length, 0) / total)
      : 0

    const today = new Date().toDateString()
    const todayCount = data.filter(s =>
      new Date(s.created_at).toDateString() === today
    ).length

    setStats({ total, totalMessageChars, avgSignatureLength, todayCount })
  }

  const calculateHeatmap = (data) => {
    const heatmap = Array(24).fill(0).map(() => Array(60).fill(0))

    data.forEach(submission => {
      const date = new Date(submission.created_at)
      const hour = date.getHours()
      const minute = date.getMinutes()
      heatmap[hour][minute]++
    })

    const hourlyData = heatmap.map((minutes, hour) => ({
      hour,
      count: minutes.reduce((sum, count) => sum + count, 0)
    }))

    setHeatmapData(hourlyData)
  }

  const exportToCSV = () => {
    const headers = ['Date', 'Heure', 'Message', 'Signature', 'User Agent']
    const rows = submissions.map(s => [
      new Date(s.created_at).toLocaleDateString('fr-FR'),
      new Date(s.created_at).toLocaleTimeString('fr-FR'),
      `"${s.message.replace(/"/g, '""')}"`,
      `"${s.signature.replace(/"/g, '""')}"`,
      `"${s.user_agent || ''}"`
    ])

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `submissions_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  const maxHeatmapValue = Math.max(...heatmapData.map(h => h.count), 1)

  if (loading) {
    return <div className="admin-container"><div className="loading">Chargement...</div></div>
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1 className="admin-title">Dashboard Admin</h1>
        <div className="admin-actions">
          <button className="admin-button" onClick={exportToCSV}>
            📥 Exporter CSV
          </button>
          <button className="admin-button admin-button-secondary" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total messages</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.todayCount}</div>
          <div className="stat-label">Aujourd'hui</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalMessageChars.toLocaleString('fr-FR')}</div>
          <div className="stat-label">Total caractères</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.avgSignatureLength}</div>
          <div className="stat-label">Caractères / signature</div>
        </div>
      </div>

      <div className="heatmap-section">
        <h2 className="section-title">Heatmap par heure</h2>
        <div className="heatmap">
          {heatmapData.map((data, index) => (
            <div key={index} className="heatmap-bar-container">
              <div className="heatmap-hour">{index}h</div>
              <div className="heatmap-bar-wrapper">
                <div
                  className="heatmap-bar"
                  style={{
                    width: `${(data.count / maxHeatmapValue) * 100}%`,
                    minWidth: data.count > 0 ? '2px' : '0'
                  }}
                  title={`${data.count} soumissions`}
                />
              </div>
              <div className="heatmap-count">{data.count}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="submissions-section">
        <h2 className="section-title">Messages ({submissions.length})</h2>
        <div className="table-container">
          <table className="submissions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Heure</th>
                <th>Message</th>
                <th>Signature</th>
                <th>Caractères</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  <td>{new Date(submission.created_at).toLocaleDateString('fr-FR')}</td>
                  <td>{new Date(submission.created_at).toLocaleTimeString('fr-FR')}</td>
                  <td className="message-cell">{submission.message}</td>
                  <td>{submission.signature}</td>
                  <td>{submission.message.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

