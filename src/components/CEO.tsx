import { Crown, Quote } from 'lucide-react';
import ceoPhoto from '../assets/ceo-foto.webp';

// Credenciales que estaban enterradas dentro del párrafo de biografía: como
// cifras se leen de un vistazo y le dan peso visual a un bloque que era
// solo texto.
const CREDENTIALS = [
  { value: '36', unit: 'años', label: 'De trayectoria' },
  { value: '200', unit: '+', label: 'Comunidades nativas' },
  { value: '15', unit: '+', label: 'Universidades' },
  { value: '3', unit: '×', label: 'Presidente APES' },
];

const TRACK_RECORD = ['ENEL X', 'CELEPSA', 'Pluspetrol', 'Shell', 'MINSA'];

export function CEO() {
  return (
    <section className="ceo-section" id="equipo">
      {/* Retícula técnica + halo: dan atmósfera al fondo, que antes era plano. */}
      <div className="ceo-backdrop" aria-hidden="true" />

      <div className="ceo-grid">
        <div className="ceo-avatar-col">
          <div className="ceo-avatar-frame">
            {/* Marcas de encuadre: guiño al lenguaje de plano técnico. */}
            <span className="ceo-frame-tick ceo-frame-tick--tl" aria-hidden="true" />
            <span className="ceo-frame-tick ceo-frame-tick--br" aria-hidden="true" />

            <div className="ceo-avatar">
              <img
                src={ceoPhoto}
                alt="Miguel Reategui Junchaya, fundador y CEO de Sunrise Energy"
                className="ceo-avatar-img"
                width={800}
                height={940}
                loading="lazy"
                decoding="async"
              />
              <div className="ceo-avatar-veil" aria-hidden="true" />
            </div>

            <div className="ceo-avatar-badge">
              <span className="ceo-avatar-badge-value">36</span>
              <span className="ceo-avatar-badge-label">
                años en
                <br />
                energía
              </span>
            </div>
          </div>
        </div>

        <div className="ceo-copy">
          <div className="ceo-kicker">
            <Crown size={14} />
            <span>Liderazgo</span>
          </div>

          <h2 className="section-title ceo-title">Miguel Reategui Junchaya</h2>
          <p className="ceo-role">Ingeniero Mecánico Electricista · Fundador &amp; CEO - Sunrise Energy</p>

          <blockquote className="ceo-quote">
            <Quote size={30} className="ceo-quote-icon" aria-hidden="true" />
            <p>
              Cada proyecto es una oportunidad de acercar energía limpia a quienes más la
              necesitan, incluso en los rincones más remotos del país.
            </p>
          </blockquote>

          {/* Rail de credenciales: hairlines verticales en vez de tarjetas para
              no competir con las cifras. */}
          <dl className="ceo-credentials">
            {CREDENTIALS.map(({ value, unit, label }) => (
              <div className="ceo-credential" key={label}>
                <dt className="ceo-credential-value">
                  {value}
                  <span className="ceo-credential-unit">{unit}</span>
                </dt>
                <dd className="ceo-credential-label">{label}</dd>
              </div>
            ))}
          </dl>

          <p className="ceo-bio">
            Ingeniero Mecánico Electricista con 36 años de trayectoria liderando la
            transformación energética del Perú a través de la energía solar fotovoltaica,
            eólica, biomasa, hidráulica y gas. Ha diseñado y ejecutado proyectos para clientes
            como ENEL X, CELEPSA, Pluspetrol, Shell y el Ministerio de Salud, además de más de
            200 comunidades nativas de la Amazonía peruana. Presidente de la Asociación Peruana
            de Energía Solar y Medio Ambiente (APES) en tres periodos y conferencista en más de
            15 universidades del país, hoy impulsa en Sunrise Energy la adopción de soluciones
            de almacenamiento BESS, hidrógeno verde y movilidad eléctrica para acelerar la
            descarbonización del sector.
          </p>

          <div className="ceo-track">
            <span className="ceo-track-label">Proyectos para</span>
            <div className="ceo-track-marks">
              {TRACK_RECORD.map((name) => (
                <span className="ceo-track-mark" key={name}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
