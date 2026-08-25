import { ArrowUpRight, Clock4, ShieldCheck } from 'lucide-react';

interface FinalCTAProps {
  onOpenConsult: () => void;
}

const ASSURANCES = [
  { icon: Clock4, label: 'Respuesta en menos de 48 h' },
  { icon: ShieldCheck, label: 'Ingeniería bajo norma CNE e IEC' },
];

export function FinalCTA({ onOpenConsult }: FinalCTAProps) {
  return (
    <section className="final-cta">
      {/* Sol naciente: arcos concéntricos + rayos, el gesto que da nombre a la
          marca. Decorativo y por detrás del contenido. */}
      <div className="final-cta-sun" aria-hidden="true">
        <span className="final-cta-rays" />
        <span className="final-cta-ring final-cta-ring--1" />
        <span className="final-cta-ring final-cta-ring--2" />
        <span className="final-cta-ring final-cta-ring--3" />
        <span className="final-cta-core" />
      </div>

      <div className="final-cta-content">
        <h2 className="final-cta-title">Hablemos de tu próximo proyecto energético</h2>
        <p className="final-cta-subtitle">
          En Sunrise Energy evaluamos la viabilidad de tu proyecto sin costo inicial y diseñamos una
          solución a medida para tu empresa.
        </p>
        <button className="btn-primary-pill final-cta-btn" onClick={onOpenConsult}>
          Solicitar Consulta
          <ArrowUpRight size={20} />
        </button>

        <ul className="final-cta-assurances">
          {ASSURANCES.map(({ icon: Icon, label }) => (
            <li key={label}>
              <Icon size={16} strokeWidth={1.8} />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
