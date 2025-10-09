import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import '../App.css'

function Home() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [signature, setSignature] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [submissionCount, setSubmissionCount] = useState(0)

  useEffect(() => {
    fetchSubmissionCount()
  }, [])

  const fetchSubmissionCount = async () => {
    try {
      const { count, error } = await supabase
        .from('submissions')
        .select('*', { count: 'exact', head: true })

      if (!error && count !== null) {
        setSubmissionCount(count)
      }
    } catch (error) {
      console.error('Error fetching count:', error)
    }
  }

  const getClientIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json')
      const data = await response.json()
      return data.ip
    } catch (error) {
      console.error('Error fetching IP:', error)
      return null
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!message.trim() || !signature.trim()) {
      setSubmitStatus({ type: 'error', text: 'Merci de remplir tous les champs' })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const { error } = await supabase
        .from('submissions')
        .insert([
          {
            message: message.trim(),
            signature: signature.trim(),
            user_agent: navigator.userAgent,
            referrer: document.referrer || null,
            ip_address: null
          }
        ])

      if (error) throw error

      getClientIP().then(clientIP => {
        if (clientIP) {
          supabase
            .from('submissions')
            .update({ ip_address: clientIP })
            .eq('message', message.trim())
            .eq('signature', signature.trim())
            .order('created_at', { ascending: false })
            .limit(1)
            .then(() => { })
        }
      })

      navigate('/merci')
    } catch (error) {
      console.error('Error submitting:', error)
      setSubmitStatus({ type: 'error', text: 'Une erreur est survenue. Réessaye plus tard.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container">
      <header className="header">
        <img src="/logotype.png" alt="Logo" className="logo" />
        <h1 className="title">Fanny Charby - Lisa Launey</h1>
      </header>

      <main className="main-content">
        <div className="description-container">
          <p className="description">
            Soutiens un projet BD féministe et engagé en laissant un petit mot avec ton nom et prénom
          </p>
          <img src="/logo.png" alt="Logo" className="shoes-logo" width={100} height={100} />
        </div>

        {submissionCount >= 20 && (
          <div className="social-proof">
            <span className="social-proof-count">{submissionCount}</span> personnes ont déjà laissé leur soutien ! 💜
          </div>
        )}

        <a className="pdf-button" href="https://pdygxdmtdmzxcaaacfmf.supabase.co/storage/v1/object/public/pdf/que-de-la-drague-vraiment-dossier-de-presse.pdf" target="_blank" rel="noopener noreferrer">
          Voir le projet
        </a>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="message">Ton message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Laisse ton petit mot ici..."
              rows="5"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="signature">Prénom et nom</label>
            <input
              id="signature"
              type="text"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="Ex: Marie Dupont"
              disabled={isSubmitting}
            />
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer mon soutien'}
          </button>

          {submitStatus && (
            <div className={`status-message ${submitStatus.type}`}>
              {submitStatus.text}
            </div>
          )}
        </form>
      </main>

      <footer className="footer">
        <a href="mailto:bd.quedeladrague@gmail.com" className="footer-link footer-link-email">
          bd.quedeladrague@gmail.com
        </a>
        <div className="footer-socials">
          <a
            href="https://instagram.com/lisaladessine"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            @lisaladessine
          </a>
          <span className="footer-separator">-</span>
          <a
            href="https://instagram.com/fannycharbycroquis"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            @fannycharbycroquis
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Home

