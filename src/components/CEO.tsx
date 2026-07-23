import { Quote, Sparkles, User } from 'lucide-react';

export function CEO() {
  return (
    <section className="ceo-section" id="equipo">
      <div className="ceo-grid">
        <div className="ceo-avatar-col">
          <div className="ceo-avatar">
            <User size={48} strokeWidth={1.5} />
          </div>
          <span className="ceo-avatar-label">Foto próximamente</span>
        </div>

        <div className="ceo-copy">
          <div className="hero-eyebrow">
            <Sparkles size={15} />
            <span>Liderazgo</span>
          </div>

          <h2 className="section-title ceo-title">Nombre del CEO</h2>
          <p className="ceo-role">Fundador &amp; CEO — Sunrise Energy</p>

          <div className="ceo-quote">
            <Quote size={22} className="ceo-quote-icon" />
            <p>Espacio reservado para una cita inspiradora del fundador.</p>
          </div>

          <p className="ceo-bio">
            Espacio reservado para la biografía, trayectoria y visión del fundador de Sunrise Energy.
          </p>
        </div>
      </div>
    </section>
  );
}
