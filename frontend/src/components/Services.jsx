import Icon from './Icon'
import { SERVICES } from '../constants/services'
import './Services.css'

function Services() {
  return (
    <section id="servicos" className="section section-alt services">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">O que fazemos</span>
          <h2>Nossos serviços</h2>
          <p>Tratamentos completos para cada fase da sua recuperação.</p>
        </div>
        <div className="services__grid">
          {SERVICES.map((service) => (
            <article key={service.id} className="service-card">
              <div className="service-card__icon">
                <Icon name={service.icon} size={28} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
