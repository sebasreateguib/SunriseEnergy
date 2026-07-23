import { ArrowUpRight, Leaf, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import heroImg from '../assets/casapanel.png';

interface HeroProps {
  onOpenConsult: () => void;
}

export function Hero({ onOpenConsult }: HeroProps) {
  return (
    <section className="hero-layout">
      {/* Columna Izquierda: Imagen con tarjeta flotante */}
      <div className="hero-image-col">
        <img
          src={heroImg}
          alt="Casa con Paneles Solares - Sunrise Energy"
          className="hero-img"
        />
        <div className="hero-image-overlay" />

        <div className="hero-floating-card">
          <span className="hero-floating-card-icon">
            <Zap size={20} />
          </span>
          <div>
            <div className="hero-floating-card-title">Ahorro Energético</div>
            <div className="hero-floating-card-subtitle">Hasta -40% en tu factura eléctrica</div>
          </div>
        </div>
      </div>

      {/* Columna Derecha: Contenido del Hero */}
      <div className="hero-content-col">
        <div className="hero-decor-blob" />
        <div className="hero-content-inner">
          <div className="hero-eyebrow">
            <Sparkles size={15} />
            <span>Energía Renovable de Nueva Generación</span>
          </div>

          <h1 className="hero-title">
            Soluciones <span className="hero-title-accent">Sostenibles</span> para un Futuro Mejor
          </h1>

          <p className="hero-description">
            Somos el socio estratégico que impulsa el desarrollo integral de empresas, industrias
            e instituciones mediante la integración de tecnologías renovables y soluciones de
            infraestructura sostenible de extremo a extremo.
          </p>

          <div className="cta-group">
            <button className="btn-primary-pill" onClick={onOpenConsult}>
              Solicitar Consulta
              <ArrowUpRight size={20} />
            </button>
            <a className="btn-secondary-ghost" href="#servicios">
              Ver Servicios
            </a>
          </div>

          <div className="hero-trust-row">
            <div className="hero-trust-item">
              <ShieldCheck size={18} />
              <span>Ingeniería certificada</span>
            </div>
            <div className="hero-trust-item">
              <Leaf size={18} />
              <span>On-Grid &amp; Off-Grid</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
