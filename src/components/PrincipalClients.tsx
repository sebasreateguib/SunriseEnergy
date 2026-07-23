import { Award, Building2, Globe2, Sparkles } from 'lucide-react';

const CONSULTORIAS = [
  'Pluspetrol Perú Corp.',
  'Petrobras',
  'Repsol',
  'Universidad Nacional de Ingeniería',
  'Contraloría General de la República',
  'Poder Judicial de Huánuco',
  'Engie Energy',
  'Congregación Dominicos',
  'Congregación Salesiana',
  'Comunidad Franciscana Cenáculo',
  'Caral Soluciones Energéticas',
];

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
        <h2 className="section-title">Principales Clientes y Afiliaciones</h2>
        <p className="section-subtitle">
          Más de una década brindando consultoría y soluciones energéticas a organizaciones
          nacionales e internacionales.
        </p>
      </div>

      <div className="clients-detail-grid">
        <div className="clients-detail-group">
          <div className="clients-detail-group-title">
            <Building2 size={18} />
            <span>Consultorías</span>
          </div>
          <ul className="clients-detail-list">
            {CONSULTORIAS.map((name) => (
              <li key={name}>
                <span className="clients-detail-dot" />
                {name}
              </li>
            ))}
          </ul>
        </div>

        <div className="clients-detail-group">
          <div className="clients-detail-group-title">
            <Globe2 size={18} />
            <span>Internacionales</span>
          </div>
          <ul className="clients-detail-list">
            {INTERNACIONALES.map((name) => (
              <li key={name}>
                <span className="clients-detail-dot" />
                {name}
              </li>
            ))}
          </ul>
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
