import { Sparkles } from 'lucide-react';
import servicesImg from '../assets/paneles.png';

const SERVICES = [
  {
    title: 'Diseño, Evaluación y Consultoría',
    description: 'Consultoría, supervisión y auditoría energética fotovoltaica de principio a fin.',
  },
  {
    title: 'Expedientes Técnicos',
    description: 'Formulación y evaluación de expedientes técnicos energéticos.',
  },
  {
    title: 'Suministro y Logística',
    description: 'Abastecimiento y logística de equipos y componentes de generación.',
  },
  {
    title: 'Capacitación en O&M',
    description: 'Formación especializada en Operación y Mantenimiento de plantas solares.',
  },
  {
    title: 'Cumplimiento Normativo',
    description: 'Alineación con el Código Nacional de Electricidad del Perú y normas técnicas internacionales.',
  },
];

export function Services() {
  return (
    <section className="services-section" id="servicios">
      <div className="services-image-col">
        <img src={servicesImg} alt="Planta solar industrial vista aérea" className="services-image" />
      </div>

      <div className="services-copy-col">
        <div className="hero-eyebrow">
          <Sparkles size={15} />
          <span>Qué Hacemos</span>
        </div>
        <h2 className="section-title">Cobertura integral de tu proyecto energético</h2>

        <ol className="services-list">
          {SERVICES.map((service, index) => (
            <li className="services-list-item" key={service.title}>
              <span className="services-list-index">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
