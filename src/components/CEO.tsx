import { Crown, Quote } from 'lucide-react';
import ceoPhoto from '../assets/ceo-foto.webp';

export function CEO() {
  return (
    <section className="ceo-section" id="equipo">
      <div className="ceo-grid">
        <div className="ceo-avatar-col">
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
          </div>
        </div>

        <div className="ceo-copy">
          <div className="ceo-kicker">
            <Crown size={14} />
            <span>Liderazgo</span>
          </div>

          <h2 className="section-title ceo-title">Miguel Reategui Junchaya</h2>
          <p className="ceo-role">Ingeniero Mecánico Electricista · Fundador &amp; CEO - Sunrise Energy</p>

          <div className="ceo-quote">
            <Quote size={28} className="ceo-quote-icon" />
            <p>
              Cada proyecto es una oportunidad de acercar energía limpia a quienes más la
              necesitan, incluso en los rincones más remotos del país.
            </p>
          </div>

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
        </div>
      </div>
    </section>
  );
}
