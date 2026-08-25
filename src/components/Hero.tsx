import { ArrowUpRight, Check, Leaf, ShieldCheck, TrendingUp } from 'lucide-react';
import { Announcement, AnnouncementTag, AnnouncementTitle } from '@/components/ui/announcement';
import heroImg from '../assets/casapanel.webp';

interface HeroProps {
  onOpenConsult: () => void;
}

const heroChecks = [
  'Ingeniería y diseño propio',
  'Instalación llave en mano',
  'Monitoreo y mantenimiento',
];

export function Hero({ onOpenConsult }: HeroProps) {
  return (
    <section className="hero-layout">
      {/* Columna Izquierda: Imagen con tarjeta flotante */}
      <div className="hero-image-col">
        <img
          src={heroImg}
          alt="Vivienda unifamiliar con planta fotovoltaica instalada en el techo - Sunrise Energy"
          className="hero-img"
          width={896}
          height={1200}
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero-image-overlay" />

        <div className="hero-spec-card">
          <div className="hero-spec-card-label">Proyecto tipo</div>
          <div className="hero-spec-card-rows">
            <div className="hero-spec-card-row">
              <span>Potencia instalada</span>
              <span className="hero-spec-card-value">50 kWp</span>
            </div>
            <div className="hero-spec-card-row">
              <span>Ahorro mensual</span>
              <span className="hero-spec-card-value">S/ 3,150</span>
            </div>
            <div className="hero-spec-card-row">
              <span>Retorno de inversión</span>
              <span className="hero-spec-card-value">3.2 años</span>
            </div>
          </div>
          <div className="hero-spec-card-total">
            <span>Ahorro anual</span>
            <span className="hero-spec-card-total-value">S/ 37,800</span>
          </div>

          <ul className="hero-spec-card-checks">
            {heroChecks.map((item) => (
              <li key={item}>
                <span className="hero-spec-card-check-icon">
                  <Check size={11} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
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
                <TrendingUp className="shrink-0 text-muted-foreground" size={16} />
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

          {/* Espejo de la lista de la ficha sobre la foto: en ≤640px la foto
              queda muy baja para contenerla, así que ahí se muestra esta y se
              oculta la de la tarjeta (solo una es visible a la vez). */}
          <ul className="hero-content-checks">
            {heroChecks.map((item) => (
              <li key={item}>
                <span className="hero-spec-card-check-icon">
                  <Check size={11} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

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
              <span>On-Grid, Off-Grid e Híbridos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
