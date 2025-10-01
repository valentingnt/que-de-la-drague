import { useNavigate } from 'react-router-dom'
import '../App.css'

function ThankYou() {
  const navigate = useNavigate()

  return (
    <div className="container">
      <div className="thank-you-container">
        <h1 className="thank-you-title">Merci pour ton soutien ! 💜</h1>

        <p className="thank-you-message">
          Ton message a bien été enregistré et apparaîtra peut-être à la fin de la BD !
        </p>

        <div className="thank-you-actions">
          <button className="pdf-button" onClick={() => navigate('/')}>
            Retour
          </button>
        </div>

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
    </div>
  )
}

export default ThankYou

