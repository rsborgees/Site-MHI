import Icon from './Icon'
import { WHATSAPP_URL } from '../constants/contact'
import './WhatsAppButton.css'

function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Fale conosco no WhatsApp"
    >
      <Icon name="chat" size={28} />
    </a>
  )
}

export default WhatsAppButton
