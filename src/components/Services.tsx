import { DraftingCompass, FileCheck2, FileText, GraduationCap, ShieldCheck, Truck } from 'lucide-react';
import type { ComponentType } from 'react';
import { PlantDiagram } from '@/components/ui/plant-diagram';

interface Service {
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  description: string;
}

const SERVICES: Service[] = [
  {
    icon: DraftingCompass,
    title: 'Diseño, Evaluación, Supervisión y Consultoría Integral durante todo el procesos.',
    description: 'Consultoría, supervisión y auditoría energética fotovoltaica de principio a fin. Sistemas fotovoltaicos On Grid, Off Grid y Sistemas Híbridos (Solar, Bess, Gas, Red Eléctrica y Motogenerador) con diferentes tipos de combustibles.',
  },
  {
    icon: FileText,
    title: 'Expedientes Técnicos',
    description: 'Formulación y evaluación de expedientes técnicos energéticos. Ingenieria basica y de detalle. Estudios económicos, viabilidad y rentabilidad.',
  },
  {
    icon: Truck,
    title: 'Suministro y Logística',
    description: 'Abastecimiento y logística de equipos y componentes de generación energética.',
  },
  {
    icon: GraduationCap,
    title: 'Capacitación en O&M',
    description: 'Formación y supervisión especializada en Operación y Mantenimiento de plantas solares.',
  },
  {
    icon: ShieldCheck,
    title: 'Cumplimiento Normativo',
    description: 'Alineación con el Código Nacional de Electricidad del Perú y normas técnicas nacionales (NTP-IEC) e internacionales (IEC).',
  },
  {
    icon: FileCheck2,
    title: 'Permisología',
    description: 'Brindamos servicios de tramitación de autorizaciones y permisos para plantas solares.',
  },
];

export function Services() {
  return (
    <section className="services-section" id="servicios">
      <div className="section-heading services-heading">
        <h2 className="section-title">Cobertura integral de tu proyecto energético</h2>
        <p className="section-subtitle">
          Del diseño y la ingeniería al suministro, la permisología y la operación: acompañamos
          cada etapa del proyecto con un solo interlocutor técnico.
        </p>
      </div>

      <div className="services-image-col">
        <PlantDiagram />
      </div>

      <div className="services-copy-col">
        {/* Rail numerado: los seis servicios son etapas consecutivas del
            proyecto, así que se leen mejor como recorrido que como lista. */}
        <ol className="services-steps">
          {SERVICES.map(({ icon: Icon, title, description }, index) => (
            <li className="services-step" key={title}>
              <span className="services-step-node">{String(index + 1).padStart(2, '0')}</span>
              <article className="services-step-card">
                <h3>
                  <span className="services-step-icon">
                    <Icon size={17} strokeWidth={1.8} />
                  </span>
                  {title}
                </h3>
                <p>{description}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
