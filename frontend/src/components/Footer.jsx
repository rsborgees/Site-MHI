import logo from '../assets/logo.png'
import Icon from './Icon'
import { CONTACT, WHATSAPP_URL } from '../constants/contact'
import './Footer.css'

const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#contato', label: 'Contato' },
]

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src={logo} alt="MHI Saúde - Centro de Fisioterapia" />
          <p>Cuidando do seu movimento, cuidando de você.</p>
        </div>

        <nav className="footer__nav" aria-label="Links rápidos">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__social">
          <a
            href={CONTACT.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da MHI Saúde"
          >
            <Icon name="instagram" size={22} />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp da MHI Saúde"
          >
            <Icon name="chat" size={22} />
          </a>
        </div>
      </div>

      <p className="footer__copy">
        © {year} MHI Saúde - Centro de Fisioterapia. Todos os direitos reservados.
      </p>
    </footer>
  )
}

export default Footer
