import { ArrowUpRight } from 'lucide-react';
import ctaImg from '../assets/panelnegro2.png';

interface FinalCTAProps {
  onOpenConsult: () => void;
}

export function FinalCTA({ onOpenConsult }: FinalCTAProps) {
  return (
    <section className="final-cta">
      <img src={ctaImg} alt="" className="final-cta-bg" aria-hidden="true" />
      <div className="final-cta-overlay" />

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
      </div>
    </section>
  );
}
