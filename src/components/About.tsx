import { Compass, Sparkles, Target } from 'lucide-react';
import aboutImg from '../assets/foto.png';

export function About() {
  return (
    <section className="about-section" id="nosotros">
      <div className="about-grid">
        <div className="about-copy">
          <div className="hero-eyebrow">
            <Sparkles size={15} />
            <span>Quiénes Somos</span>
          </div>

          <h2 className="section-title">
            El socio estratégico de tu <span className="hero-title-accent">transición energética</span>
          </h2>

          <p className="about-paragraph">
            Impulsamos la competitividad de empresas e instituciones integrando tecnologías renovables y soluciones sostenibles de extremo a extremo. Transformamos la sostenibilidad en una inversión de alta rentabilidad mediante ingeniería avanzada en energía limpia y consultoría técnica.
          </p>

          <div className="about-cards">
            <div className="about-card">
              <span className="about-card-icon">
                <Target size={20} />
              </span>
              <h3>Misión</h3>
              <p>
                Proveer infraestructura de vanguardia y consultoría que aseguren la viabilidad y rentabilidad de tus proyectos renovables, maximizando el impacto positivo social y ambiental.
              </p>
            </div>

            <div className="about-card">
              <span className="about-card-icon">
                <Compass size={20} />
              </span>
              <h3>Visión</h3>
              <p>
                Ser el aliado estratégico líder en la integración de tecnologías limpias, impulsando la transición ecológica corporativa hacia un futuro más sostenible.
              </p>
            </div>
          </div>
        </div>

        <div className="about-image-col">
          <img src={aboutImg} alt="Infraestructura solar e inversor industrial" className="about-image" />
        </div>
      </div>
    </section>
  );
}
