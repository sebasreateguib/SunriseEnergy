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
            Impulsamos el desarrollo integral y la competitividad de empresas, industrias e
            instituciones de cualquier sector mediante la integración de tecnologías renovables y
            soluciones de infraestructura sostenible de extremo a extremo. A través de ingeniería
            avanzada en plantas solares On-Grid y Off-Grid, sistemas bioclimáticos, gestión del
            agua, conectividad y consultoría técnica ambiental, transformamos la sostenibilidad en
            una inversión de alta rentabilidad.
          </p>

          <div className="about-cards">
            <div className="about-card">
              <span className="about-card-icon">
                <Target size={20} />
              </span>
              <h3>Misión</h3>
              <p>
                Proveer infraestructura técnica de vanguardia, consultoría especializada y modelos
                de gestión avanzados que aseguran la viabilidad operativa y financiera de
                iniciativas basadas en energías renovables, maximizando el retorno de inversión
                social y ambiental.
              </p>
            </div>

            <div className="about-card">
              <span className="about-card-icon">
                <Compass size={20} />
              </span>
              <h3>Visión</h3>
              <p>
                Consolidarnos como el aliado estratégico y referente regional en la integración de
                tecnologías limpias, liderando la transición ecológica del sector corporativo,
                institucional y social hacia un desarrollo inclusivo.
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
