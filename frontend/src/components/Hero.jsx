import Icon from './Icon'
import { WHATSAPP_URL } from '../constants/contact'
import photoKnee from '../assets/img.jpg'
import photoStretch from '../assets/img2.jpeg'
import photoWheelchair from '../assets/img3.jpeg'
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
          <div className="hero__dots" aria-hidden="true"></div>
          <div className="hero__gallery">
            <div className="hero__photo hero__photo--main">
              <img
                src={photoStretch}
                alt="Fisioterapeuta auxiliando paciente em exercício de alongamento"
              />
            </div>
            <div className="hero__photo hero__photo--small">
              <img
                src={photoKnee}
                alt="Avaliação de joelho durante sessão de fisioterapia"
              />
            </div>
            <div className="hero__photo hero__photo--small">
              <img
                src={photoWheelchair}
                alt="Fisioterapeuta acompanhando paciente em cadeira de rodas"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
