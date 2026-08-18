import Icon from './Icon'
import { DIFFERENTIALS } from '../constants/differentials'
import './Differentials.css'

function Differentials() {
  return (
    <section id="diferenciais" className="section differentials">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Por que escolher a MHI Saúde</span>
          <h2>Nossos diferenciais</h2>
        </div>
        <div className="differentials__grid">
          {DIFFERENTIALS.map((item) => (
            <div key={item.id} className="differential-card">
              <Icon name={item.icon} size={30} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Differentials
