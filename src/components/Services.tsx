import serviciosImage from '../assets/servicios.webp';

const SERVICES = [
  {
    title: 'Diseño, Evaluación, Supervisión y Consultoría Integral durante todo el procesos.',
    description: 'Consultoría, supervisión y auditoría energética fotovoltaica de principio a fin. Sistemas fotovoltaicos On Grid, Off Grid y Sistemas Híbridos (Solar, Bess, Gas, Red Eléctrica y Motogenerador) con diferentes tipos de combustibles.',
  },
  {
    title: 'Expedientes Técnicos',
    description: 'Formulación y evaluación de expedientes técnicos energéticos. Ingenieria basica y de detalle. Estudios económicos, viabilidad y rentabilidad.',
  },
  {
    title: 'Suministro y Logística',
    description: 'Abastecimiento y logística de equipos y componentes de generación energética.',
  },
  {
    title: 'Capacitación en O&M',
    description: 'Formación y supervisión especializada en Operación y Mantenimiento de plantas solares.',
  },
  {
    title: 'Cumplimiento Normativo',
    description: 'Alineación con el Código Nacional de Electricidad del Perú y normas técnicas nacionales (NTP-IEC) e internacionales (IEC).',
  },
  {
    title: 'Permisología',
    description: 'Brindamos servicios de tramitación de autorizaciones y permisos para plantas solares.',
  },
];

export function Services() {
  return (
    <section className="services-section" id="servicios">
      <div className="services-image-col">
        <img
          src={serviciosImage}
          alt="Servicios integrales de ingeniería solar de Sunrise Energy"
          className="services-image"
          width={1600}
          height={872}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="services-copy-col">
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
