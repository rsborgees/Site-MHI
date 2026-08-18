import './About.css'

const HIGHLIGHTS = [
  'Avaliação individual e criteriosa',
  'Tratamentos baseados em evidências',
  'Atendimento humanizado do início ao fim',
]

function About() {
  return (
    <section id="sobre" className="section about">
      <div className="container about__inner">
        <div className="about__text">
          <span className="eyebrow">Sobre nós</span>
          <h2>Quem cuida do seu movimento é a MHI Saúde</h2>
          <p>
            A MHI Saúde é um centro de fisioterapia dedicado a cuidar da sua saúde e qualidade
            de vida. Unimos avaliação criteriosa, tratamentos baseados em evidências e
            atendimento humanizado para ajudar cada paciente a recuperar o movimento e retomar
            sua rotina com confiança.
          </p>
        </div>
        <ul className="about__highlights">
          {HIGHLIGHTS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default About
