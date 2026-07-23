import petrobrasLogo from '../assets/petrobras.svg';
import pluspetrolLogo from '../assets/pluspetrol.png';
import repsolLogo from '../assets/repsol.svg';
import uniLogo from '../assets/uni.svg';

const CLIENTS = [
  { src: petrobrasLogo, alt: 'Petrobras' },
  { src: repsolLogo, alt: 'Repsol', large: true },
  { src: pluspetrolLogo, alt: 'Pluspetrol' },
  { src: uniLogo, alt: 'Universidad Nacional de Ingeniería', spaced: true },
];

export function ClientsStrip() {
  return (
    <section className="clients-strip" id="clientes">
      <span className="clients-strip-label">Empresas e instituciones que confían en nosotros</span>
      <div className="clients-strip-row">
        {CLIENTS.map((client) => (
          <div
            className={`partner-logo-item${client.large ? ' partner-logo-item--large' : ''}${client.spaced ? ' partner-logo-item--spaced' : ''}`}
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
    </section>
  );
}
