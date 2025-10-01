import { useState } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [signature, setSignature] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

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
            referrer: document.referrer || null
          }
        ])

      if (error) throw error

      setSubmitStatus({ type: 'success', text: 'Merci pour ton soutien ! 💜' })
      setMessage('')
      setSignature('')
    } catch (error) {
      console.error('Error submitting:', error)
      setSubmitStatus({ type: 'error', text: 'Une erreur est survenue. Réessaye plus tard.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePDFClick = () => {
    window.open('https://example.com/placeholder.pdf', '_blank')
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
            Soutiens un projet féministe et engagé en laissant un petit mot avec ton nom et prénom !
            <br />
            <br />
            <span className="description-footer">(Tu pourras le retrouver à la fin de la BD)</span>
          </p>
          <img src="/logo.png" alt="Logo" className="shoes-logo" width={100} height={100} />
        </div>

        <button className="pdf-button" onClick={handlePDFClick}>
          Voir le projet
        </button>

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

export default App