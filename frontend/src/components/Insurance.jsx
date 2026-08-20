import amil from '../assets/card-amil.png'
import bradesco from '../assets/card-bradesco.jpg'
import sulamerica from '../assets/card-sulamerica.png'
import itau from '../assets/card-itau.jpg'
import './Insurance.css'

const PLANS = [
  { id: 'amil', name: 'Amil', logo: amil },
  { id: 'bradesco', name: 'Bradesco Saúde', logo: bradesco },
  { id: 'sulamerica', name: 'SulAmérica', logo: sulamerica },
  { id: 'itau', name: 'Fundação Saúde Itaú', logo: itau },
]

function Insurance() {
  return (
    <section id="convenios" className="section insurance">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Planos de saúde</span>
          <h2>Convênios aceitos</h2>
          <p>Atendemos os principais planos de saúde para facilitar o seu tratamento.</p>
        </div>
        <div className="insurance__grid">
          {PLANS.map((plan) => (
            <div key={plan.id} className="insurance-card">
              <img src={plan.logo} alt={plan.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Insurance
