import logo from '../assets/logo.png'
import Icon from './Icon'
import { WHATSAPP_URL } from '../constants/contact'
import './Hero.css'

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="eyebrow">Centro de Fisioterapia</span>
          <h1>Cuidando do seu movimento, cuidando de você</h1>
          <p className="hero__lead">
            Na MHI Saúde você encontra atendimento humanizado, avaliação individualizada e
            tratamentos baseados em evidências para recuperar sua mobilidade e qualidade de
            vida.
          </p>
          <div className="hero__actions">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <Icon name="chat" size={20} />
              Agende sua avaliação
            </a>
            <a href="#servicos" className="btn btn-outline">
              Conheça os serviços
            </a>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__blob" aria-hidden="true"></div>
          <img src={logo} alt="MHI Saúde" className="hero__logo" />
        </div>
      </div>
    </section>
  )
}

export default Hero
