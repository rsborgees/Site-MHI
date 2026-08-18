import { useState } from 'react'
import logo from '../assets/logo.png'
import Icon from './Icon'
import { WHATSAPP_URL } from '../constants/contact'
import './Header.css'

const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#contato', label: 'Contato' },
]

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#top" className="header__brand">
          <img src={logo} alt="MHI Saúde - Centro de Fisioterapia" />
        </a>

        <nav className={`header__nav ${open ? 'is-open' : ''}`}>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary header__cta"
          >
            Agendar
          </a>
        </nav>

        <button
          type="button"
          className="header__toggle"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          <Icon name={open ? 'close' : 'menu'} size={26} />
        </button>
      </div>
    </header>
  )
}

export default Header
