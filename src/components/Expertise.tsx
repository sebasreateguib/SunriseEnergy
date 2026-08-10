import { Flame, Leaf, Sun, Thermometer, Waves, Wind } from 'lucide-react';
import type { ComponentType } from 'react';

interface ExpertiseItem {
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  description: string;
}

const EXPERTISE_ITEMS: ExpertiseItem[] = [
  {
    icon: Sun,
    title: 'Solar Fotovoltaica',
    description: 'Diseño e implementación de plantas On-Grid y Off-Grid a medida de cada operación.',
  },
  {
    icon: Waves,
    title: 'Hidropower',
    description: 'Aprovechamiento de recursos hídricos para generación limpia y continua.',
  },
  {
    icon: Leaf,
    title: 'Biomasa',
    description: 'Valorización energética de residuos orgánicos con tecnología de alta eficiencia.',
  },
  {
    icon: Wind,
    title: 'Energía Eólica',
    description: 'Soluciones eólicas integradas a la matriz energética de tu organización.',
  },
  {
    icon: Flame,
    title: 'Geotermia',
    description: 'Sistemas geotérmicos para climatización y generación de base constante.',
  },
  {
    icon: Thermometer,
    title: 'Solar Térmica',
    description: 'Aprovechamiento térmico solar para procesos industriales y agua caliente.',
  },
];

export function Expertise() {
  return (
    <section className="expertise-section" id="expertise">
      {/* Halo lima de fondo; decorativo, va fuera del flujo. */}
      <div className="expertise-glow" aria-hidden="true" />

      <div className="expertise-container">
        <div className="section-heading expertise-heading">
          <span className="expertise-eyebrow">Capacidades técnicas</span>
          <h2 className="section-title">Tecnología para cada tipo de proyecto</h2>
          <p className="section-subtitle">
            Cubrimos todo el espectro de energías renovables para integrar la tecnología adecuada en
            cada proyecto de desarrollo sostenible.
          </p>
        </div>

        <div className="expertise-grid">
          {EXPERTISE_ITEMS.map(({ icon: Icon, title, description }, index) => (
            <article className="expertise-card" key={title}>
              <span className="expertise-card-index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="expertise-card-icon">
                <Icon size={22} strokeWidth={1.6} />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
