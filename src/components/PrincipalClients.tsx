import { Award, Globe2, Sparkles } from 'lucide-react';


const INTERNACIONALES = [
  'AEA-IICA (Perú, Ecuador, Colombia y Bolivia)',
  'Lorentz — Alemania',
  'Solahart — Australia',
  'Solar Net — Alemania',
  'SIES Roma — Italia',
  'PNUD',
  'Cuerpo de Paz — USA',
  'Energías sin Fronteras — España',
  'Shell Solar — UK',
  'Comando Sur — USA (VRAEM)',
  'Xstrata — USA',
];

const AFILIACIONES = [
  'Miembro de INDECOPI - INACAL',
  'Investigador CONCYTEC',
  'Conferencista de Energías Renovables y Medio Ambiente para la Asociación Peruana de Energía Solar y Medio Ambiente (APES) en más de 15 universidades del Perú',
  'Presidente de la Asociación Peruana de Energía Solar y Medio Ambiente (2015, 2017, 2019)',
];

export function PrincipalClients() {
  return (
    <section className="principal-clients-section" id="trayectoria">
      <div className="section-heading">
        <div className="hero-eyebrow">
          <Sparkles size={15} />
          <span>Confianza y Trayectoria</span>
        </div>
        <h2 className="section-title">Consultorías internacionales y Afiliaciones</h2>
        <p className="section-subtitle">
          Más de una década brindando consultoría y soluciones energéticas a organizaciones
          nacionales e internacionales.
        </p>
      </div>


      <div className="clients-detail-group">
        <div className="clients-detail-group-title">
          <Globe2 size={18} />
          <span>Internacionales</span>
        </div>
        <div className="clients-detail-chips">
          {INTERNACIONALES.map((name) => (
            <span className="client-chip" key={name}>
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="affiliations-card">
        <div className="clients-detail-group-title">
          <Award size={18} />
          <span>Afiliaciones</span>
        </div>
        <ul className="affiliations-list">
          {AFILIACIONES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
