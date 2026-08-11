import type { LucideIcon } from 'lucide-react';
import {
  Sun,
  Factory,
  Cable,
  Gauge,
  BatteryCharging,
  Wind,
  Leaf,
  Droplets,
  Flame,
  ThermometerSun,
  TreePine,
} from 'lucide-react';

const ENERGY_ITEMS: { label: string; icon: LucideIcon }[] = [
  { label: 'Energía Solar Fotovoltaica', icon: Sun },
  { label: 'Autoconsumo Industrial', icon: Factory },
  { label: 'Sistemas On-Grid y Off-Grid', icon: Cable },
  { label: 'Eficiencia Energética', icon: Gauge },
  { label: 'Almacenamiento en Baterías', icon: BatteryCharging },
  { label: 'Energía Eólica', icon: Wind },
  { label: 'Biomasa', icon: Leaf },
  { label: 'Hidroenergía', icon: Droplets },
  { label: 'Geotermia', icon: Flame },
  { label: 'Solar Térmica', icon: ThermometerSun },
  { label: 'Cero Emisiones', icon: TreePine },
];

/** Un grupo completo; se clona para que el bucle empalme sin salto. */
function TermGroup({ clone = false }: { clone?: boolean }) {
  return (
    <div className="energy-marquee-group" aria-hidden={clone || undefined}>
      {ENERGY_ITEMS.map(({ label, icon: Icon }) => (
        <span className="energy-marquee-item" key={label}>
          <Icon className="energy-marquee-icon" size={14} aria-hidden="true" />
          {label}
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
