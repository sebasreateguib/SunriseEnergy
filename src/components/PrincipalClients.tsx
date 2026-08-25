import { Award, BookOpen, FlaskConical, Globe2, Presentation, ShieldCheck, Stamp } from 'lucide-react';
import type { ComponentType } from 'react';
import { Announcement, AnnouncementTag, AnnouncementTitle } from '@/components/ui/announcement';
import cuerpoImg from '../assets/cuerpo.webp';
import cuerpo2Img from '../assets/cuerpo2.webp';


// El origen sale del propio nombre y se pinta como banderín: da lectura
// geográfica inmediata a una lista que antes era solo texto corrido.
const INTERNACIONALES = [
  { name: 'AEA-IICA', origin: 'Perú · Ecuador · Colombia · Bolivia', flag: '🌎' },
  { name: 'Lorentz', origin: 'Alemania', flag: '🇩🇪' },
  { name: 'Solahart', origin: 'Australia', flag: '🇦🇺' },
  { name: 'Solar Net', origin: 'Alemania', flag: '🇩🇪' },
  { name: 'SIES Roma', origin: 'Italia', flag: '🇮🇹' },
  { name: 'PNUD', origin: 'Naciones Unidas', flag: '🇺🇳' },
  { name: 'Cuerpo de Paz', origin: 'USA', flag: '🇺🇸' },
  { name: 'Energías sin Fronteras', origin: 'España', flag: '🇪🇸' },
  { name: 'Shell Solar', origin: 'Reino Unido', flag: '🇬🇧' },
  { name: 'Comando Sur', origin: 'USA · VRAEM', flag: '🇺🇸' },
  { name: 'Xstrata', origin: 'USA', flag: '🇺🇸' },
];

interface Afiliacion {
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  detail: string;
}

const AFILIACIONES: Afiliacion[] = [
  {
    icon: Stamp,
    title: 'INDECOPI · INACAL',
    detail: 'Miembro de los comités técnicos de normalización.',
  },
  {
    icon: FlaskConical,
    title: 'CONCYTEC',
    detail: 'Investigador registrado en el sistema nacional de ciencia y tecnología.',
  },
  {
    icon: Presentation,
    title: 'Conferencista APES',
    detail: 'Energías renovables y medio ambiente en más de 15 universidades del Perú.',
  },
  {
    icon: BookOpen,
    title: 'Presidencia APES',
    detail: 'Asociación Peruana de Energía Solar y Medio Ambiente · 2015, 2017 y 2019.',
  },
];

export function PrincipalClients() {
  return (
    <section className="principal-clients-section" id="trayectoria">
      <div className="section-heading">
        <div className="w-fit leading-[0]">
          <Announcement
            movingBorder
            movingBorderClassName="bg-[radial-gradient(#a3e635_40%,transparent_60%)]"
          >
            <AnnouncementTag className="bg-[#d9f99d] px-2.5 py-0.5 text-[11px] font-bold text-[#0a0f1d]">
              36 años
            </AnnouncementTag>
            <AnnouncementTitle>
              Confianza y Trayectoria
              <ShieldCheck className="shrink-0 text-muted-foreground" size={16} />
            </AnnouncementTitle>
          </Announcement>
        </div>
        <h2 className="section-title">Consultorías internacionales y Afiliaciones</h2>
        <p className="section-subtitle">
          Más de una década brindando consultoría y soluciones energéticas a organizaciones
          nacionales e internacionales.
        </p>
      </div>


      <div className="trayectoria-gallery">
        <figure className="trayectoria-photo">
          <img
            src={cuerpoImg}
            alt="Curso de capacitación al Cuerpo de Paz: práctica de instalación de sistemas fotovoltaicos"
            width={1200}
            height={675}
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            <strong>Cuerpo de Paz — USA</strong>
            Curso de capacitación · práctica de instalación
          </figcaption>
        </figure>
        <figure className="trayectoria-photo">
          <img
            src={cuerpo2Img}
            alt="Curso de capacitación al Cuerpo de Paz: sesión teórica en aula"
            width={1200}
            height={675}
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            <strong>Cuerpo de Paz — USA</strong>
            Curso de capacitación · sesión en aula
          </figcaption>
        </figure>
      </div>

      <div className="clients-detail-group">
        {/* Meridianos punteados detrás de los chips: sugieren alcance
            internacional sin recurrir a un mapa literal. */}
        <div className="clients-detail-mesh" aria-hidden="true" />

        <div className="clients-detail-group-title">
          <Globe2 size={18} />
          <span>Internacionales</span>
          <span className="clients-detail-count">{INTERNACIONALES.length}</span>
        </div>

        <div className="clients-detail-chips">
          {INTERNACIONALES.map(({ name, origin, flag }) => (
            <span className="client-chip" key={name}>
              <span className="client-chip-flag" aria-hidden="true">
                {flag}
              </span>
              <span className="client-chip-text">
                <strong>{name}</strong>
                <em>{origin}</em>
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="affiliations-card">
        <div className="clients-detail-group-title">
          <Award size={18} />
          <span>Afiliaciones</span>
        </div>
        <ul className="affiliations-list">
          {AFILIACIONES.map(({ icon: Icon, title, detail }) => (
            <li className="affiliation-item" key={title}>
              <span className="affiliation-icon">
                <Icon size={18} strokeWidth={1.7} />
              </span>
              <div className="affiliation-body">
                <h4>{title}</h4>
                <p>{detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
