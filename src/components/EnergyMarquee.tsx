const ENERGY_TERMS = [
  'Energía Solar Fotovoltaica',
  'Autoconsumo Industrial',
  'Sistemas On-Grid y Off-Grid',
  'Eficiencia Energética',
  'Almacenamiento en Baterías',
  'Energía Eólica',
  'Biomasa',
  'Hidroenergía',
  'Geotermia',
  'Solar Térmica',
  'Cero Emisiones',
];

/** Un grupo completo; se clona para que el bucle empalme sin salto. */
function TermGroup({ clone = false }: { clone?: boolean }) {
  return (
    <div className="energy-marquee-group" aria-hidden={clone || undefined}>
      {ENERGY_TERMS.map((term) => (
        <span className="energy-marquee-item" key={term}>
          <span className="energy-marquee-dot" aria-hidden="true" />
          {term}
        </span>
      ))}
    </div>
  );
}

export function EnergyMarquee() {
  return (
    <div className="energy-marquee">
      <div className="energy-marquee-track">
        <TermGroup />
        <TermGroup clone />
      </div>
    </div>
  );
}

export default EnergyMarquee;
