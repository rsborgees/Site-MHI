import entrada from '../assets/entrada.png'
import recepcao from '../assets/entrada2.jpeg'
import espera from '../assets/image.png'
import sala1 from '../assets/sala.png'
import sala2 from '../assets/sala2.png'
import './Structure.css'

const PHOTOS = [
  { id: 'entrada', src: entrada, caption: 'Área de espera' },
  { id: 'recepcao', src: recepcao, caption: 'Recepção' },
  { id: 'sala1', src: sala1, caption: 'Sala de atendimento' },
  { id: 'sala2', src: sala2, caption: 'Sala de atendimento' },
  { id: 'espera', src: espera, caption: 'Área comum' },
]

function Structure() {
  return (
    <section id="estrutura" className="section structure">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Nossa estrutura</span>
          <h2>Conheça nosso espaço</h2>
          <p>
            Ambientes climatizados, equipamentos modernos e salas preparadas para o seu
            conforto durante todo o tratamento.
          </p>
        </div>
        <div className="structure__grid">
          {PHOTOS.map((photo) => (
            <div key={photo.id} className="structure__item">
              <img src={photo.src} alt={photo.caption} />
              <span className="structure__caption">{photo.caption}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Structure
