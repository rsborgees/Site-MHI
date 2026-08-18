import Icon from './Icon'
import { CONTACT, WHATSAPP_URL, MAPS_EMBED_URL } from '../constants/contact'
import './Contact.css'

function Contact() {
  return (
    <section id="contato" className="section section-alt contact">
      <div className="container contact__inner">
        <div className="contact__info">
          <span className="eyebrow">Contato</span>
          <h2>Vamos cuidar da sua saúde</h2>
          <p className="contact__lead">Fale com a gente e agende sua avaliação.</p>

          <ul className="contact__list">
            <li>
              <Icon name="pin" size={22} />
              <span>{CONTACT.address}</span>
            </li>
            <li>
              <Icon name="phone" size={22} />
              <a href={CONTACT.phoneHref}>{CONTACT.whatsappDisplay}</a>
            </li>
            <li>
              <Icon name="instagram" size={22} />
              <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer">
                {CONTACT.instagramHandle}
              </a>
            </li>
          </ul>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <Icon name="chat" size={20} />
            Falar no WhatsApp
          </a>
        </div>

        <div className="contact__map">
          <iframe
            title="Localização da MHI Saúde no mapa"
            src={MAPS_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  )
}

export default Contact
