import { ArrowUpRight, Leaf, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { Announcement, AnnouncementTag, AnnouncementTitle } from '@/components/ui/announcement';
import heroImg from '../assets/panel.webp';

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
          width={896}
          height={1200}
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero-image-overlay" />

        <div className="hero-floating-card">
          <span className="hero-floating-card-icon">
            <Zap size={16} />
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
          {/* w-fit: .hero-content-inner es flex column con align-items: stretch,
              así que sin esto el Announcement se estira a los 560px de la columna
              y el brillo del borde recorre una caja más ancha que la píldora.
              leading-[0]: evita que la caja de línea sume el descendente de la
              fuente por debajo del badge. */}
          <div className="w-fit leading-[0]">
            <Announcement
              movingBorder
              movingBorderClassName="bg-[radial-gradient(#a3e635_40%,transparent_60%)]"
            >
              {/* Mismo tratamiento que el badge de capacidad de Proyectos:
                  relleno lima de marca y texto oscuro sólido. */}
              <AnnouncementTag className="bg-[#d9f99d] px-2.5 py-0.5 text-[11px] font-bold text-[#0a0f1d]">
                Solar Fotovoltaica
              </AnnouncementTag>
              <AnnouncementTitle>
                Energía de Nueva Generación
                <Sparkles className="shrink-0 text-muted-foreground" size={16} />
              </AnnouncementTitle>
            </Announcement>
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
