import petrobrasLogo from '../assets/petrobras.svg';
import pluspetrolLogo from '../assets/pluspetrol.png';
import repsolLogo from '../assets/repsol.svg';
import uniLogo from '../assets/uni.svg';
import engieLogo from '../assets/engie.svg';
import caralLogo from '../assets/caral.png';
import StatsCount from './ui/stats-count';

const CLIENTS = [
  { src: petrobrasLogo, alt: 'Petrobras' },
  { src: repsolLogo, alt: 'Repsol', large: true },
  { src: pluspetrolLogo, alt: 'Pluspetrol' },
  { src: engieLogo, alt: 'Engie', small: true },
  { src: caralLogo, alt: 'Caral Energía' },
  { src: uniLogo, alt: 'Universidad Nacional de Ingeniería', spaced: true },
];

const COMPANY_STATS = [
  { value: 10, suffix: '+', label: 'Años de experiencia' },
  { value: 50, suffix: '+', label: 'Proyectos completados' },
  { value: 100, suffix: '%', label: 'Compromiso y calidad' },
];

export function ClientsStrip() {
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
        <div className="clients-strip-row">
          {CLIENTS.map((client) => (
            <div
              className={`partner-logo-item${client.large ? ' partner-logo-item--large' : ''}${client.small ? ' partner-logo-item--small' : ''}${client.spaced ? ' partner-logo-item--spaced' : ''}`}
              key={client.alt}
            >
              <img
                src={client.src}
                alt={client.alt}
                className={`partner-logo-img${client.large ? ' partner-logo-img--tight' : ''}`}
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
