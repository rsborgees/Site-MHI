import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { SERVICES } from '../constants/services'
import './Services.css'

function Services() {
  const scrollRef = useRef(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const updateScrollState = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollPrev(el.scrollLeft > 4)
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    updateScrollState()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollState)
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  const scrollByPage = (direction) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: 'smooth' })
  }

  return (
    <section id="servicos" className="section section-alt services">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">O que fazemos</span>
          <h2>Nossos serviços</h2>
          <p>Tratamentos completos para cada fase da sua recuperação.</p>
        </div>
      </div>

      <div className="services__row">
        <button
          type="button"
          className="services__nav-btn services__nav-btn--prev"
          onClick={() => scrollByPage(-1)}
          disabled={!canScrollPrev}
          aria-label="Ver serviços anteriores"
        >
          <Icon name="chevron" size={20} className="services__nav-icon--prev" />
        </button>

        <div className="services__scroll" ref={scrollRef}>
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

        <button
          type="button"
          className="services__nav-btn services__nav-btn--next"
          onClick={() => scrollByPage(1)}
          disabled={!canScrollNext}
          aria-label="Ver mais serviços"
        >
          <Icon name="chevron" size={20} />
        </button>
      </div>
    </section>
  )
}

export default Services
