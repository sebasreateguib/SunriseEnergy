import { useEffect, useRef, useState } from 'react';
import petrobrasLogo from '../assets/petrobras.svg';
import pluspetrolLogo from '../assets/pluspetrol.png';
import repsolLogo from '../assets/repsol.svg';
import uniLogo from '../assets/uni.svg';
import engieLogo from '../assets/engie.svg';
import caralLogo from '../assets/caral.webp';
import enelxLogo from '../assets/enelx.png';
import juan23Logo from '../assets/juan23.png';
import poderJudicialLogo from '../assets/pjp.jpg';
import agrovisionLogo from '../assets/agrovision.png';
import iicaLogo from '../assets/IICA.png';
import salesianosLogo from '../assets/salesianos.png';
import sanFranciscoLogo from '../assets/sanfrancisco.jpeg';
import StatsCount from './ui/stats-count';

// `scale` corrige el tamaño óptico: los logos verticales (uni) necesitan más alto
// para no verse diminutos junto a los horizontales. `width` sube el tope de ancho
// de los muy alargados (enel x, juan xxiii), que si no quedan bajitos y con la
// separación del marquee dominando alrededor.
const CLIENTS = [
  { src: petrobrasLogo, alt: 'Petrobras', scale: 1, width: 210 },
  { src: repsolLogo, alt: 'Repsol', scale: 1.35 },
  { src: pluspetrolLogo, alt: 'Pluspetrol', scale: 1.15 },
  { src: engieLogo, alt: 'Engie', scale: 1 },
  { src: caralLogo, alt: 'Caral Energía', scale: 1.15 },
  { src: uniLogo, alt: 'Universidad Nacional de Ingeniería', scale: 1.8 },
  { src: enelxLogo, alt: 'Enel X', scale: 1.1, width: 190 },
  { src: agrovisionLogo, alt: 'Agrovision', scale: 1.3 },
  { src: poderJudicialLogo, alt: 'Poder Judicial del Perú', scale: 1.35, multiply: true },
  { src: iicaLogo, alt: 'IICA', scale: 1.15 },
  { src: salesianosLogo, alt: 'Salesianos — Congregación Salesiana del Perú', scale: 1.45 },
  { src: juan23Logo, alt: 'Colegio Peruano Chino Juan XXIII', scale: 1.15, width: 185 },
  { src: sanFranciscoLogo, alt: 'Colegio San Francisco de Asís — Huaycán', scale: 1.7, multiply: true },
];

const COMPANY_STATS = [
  { value: 36, suffix: '+', label: 'Años de experiencia' },
  { value: 1000, suffix: '+', label: 'Proyectos completados' },
  { value: 100, suffix: '%', label: 'Compromiso y calidad' },
];

function LogoGroup({ clone = false }: { clone?: boolean }) {
  return (
    <div className="clients-marquee-group" aria-hidden={clone || undefined}>
      {CLIENTS.map((client) => (
        <div className="partner-logo-item" key={client.alt}>
          <img
            src={client.src}
            alt={clone ? '' : client.alt}
            loading="lazy"
            decoding="async"
            className={`partner-logo-img${client.multiply ? ' partner-logo-img--multiply' : ''}`}
            style={{
              maxHeight: `calc(var(--logo-h) * ${client.scale})`,
              ...(client.width ? { maxWidth: `calc(var(--logo-w) * ${client.width / 165})` } : {})
            }}
          />
        </div>
      ))}
    </div>
  );
}

export function ClientsStrip() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // La animación arranca pausada y solo corre mientras la tira está en pantalla,
  // para no tener al compositor moviendo 26 logos cuando nadie los ve.
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '150px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="clients-and-stats-section" id="clientes">

      <div className="stats-block">
        <StatsCount
          stats={COMPANY_STATS}
          title="NUESTRA TRAYECTORIA E IMPACTO"
        />
      </div>

      <div className="clients-block">
        <h3 className="clients-strip-label">EMPRESAS E INSTITUCIONES QUE CONFÍAN EN NOSOTROS</h3>
        <div
          ref={marqueeRef}
          className={`clients-marquee${inView ? ' clients-marquee--running' : ''}`}
        >
          <div className="clients-marquee-track">
            <LogoGroup />
            <LogoGroup clone />
          </div>
        </div>
      </div>

    </section>
  );
}
