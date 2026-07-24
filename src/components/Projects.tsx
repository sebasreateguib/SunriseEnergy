import { Sparkles } from 'lucide-react';
import { ProjectShowcase } from './ui/clipped-video-tab';
import casapanelImg from '../assets/casapanel.png';
import minicasaImg from '../assets/minicasa.png';
import panelImg from '../assets/panel.png';
import panelesImg from '../assets/paneles.png';
import panelnegroImg from '../assets/panelnegro.png';
import panelnegro2Img from '../assets/panelnegro2.png';

const PROJECTS = [
  {
    image: panelImg,
    tag: 'Utility Scale · On-Grid',
    title: '7 Plantas Solares — SEAL Arequipa',
    badge: '35 MWp',
    description:
      'Consultoría técnica para ENEL X (LARI SAC) en el diseño de 7 plantas fotovoltaicas ON GRID, desde la ingeniería conceptual hasta la evaluación de viabilidad técnica y económica.',
  },
  {
    image: '/wind_turbines.png',
    tag: 'Híbrido · Solar-Eólico-BESS',
    title: 'Planta Híbrida CELEPSA',
    badge: '50 kWp',
    description:
      'Diseño y configuración de una planta híbrida solar + eólica con sistema de almacenamiento BESS, incluyendo arquitectura del sistema y monitoreo de rendimiento.',
  },
  {
    image: panelesImg,
    tag: 'Multi-sede · On-Grid',
    title: '4 Plantas Solares — Congregación Franciscana',
    badge: '110 kWp',
    description:
      'Diseño, instalación y puesta en marcha de plantas fotovoltaicas en Lima, Cenáculo (Supe), Huaycán y Manchay, con gestión de materiales y capacitación al cliente final.',
  },
  {
    image: casapanelImg,
    tag: 'Sector Público · On-Grid',
    title: 'Plantas Solares — Poder Judicial del Perú',
    badge: '20 kWp',
    description:
      'Suministro, instalación y puesta en marcha de dos plantas solares ON GRID en Huánuco y Arequipa, con documentación técnica y validación bajo estándares de calidad.',
  },
  {
    image: panelnegro2Img,
    tag: 'Comercial · On-Grid',
    title: 'Planta Solar PROMART — Engie',
    badge: '26 kWp',
    description:
      'Liderazgo en el diseño e implementación de sistema fotovoltaico conectado a red para infraestructura comercial, en coordinación técnica con Engie como integrador.',
  },
  {
    image: minicasaImg,
    tag: 'Off-Grid · Sector Público',
    title: 'Sistema Solar Autónomo — Ministerio de Justicia',
    badge: '5.56 kWp',
    description:
      'Suministro e instalación de sistema fotovoltaico autónomo para dependencias del Estado sin acceso a la red eléctrica, en Arequipa.',
  },
  {
    image: panelnegroImg,
    tag: 'Híbrido · Diesel-Solar',
    title: 'Sistema Híbrido Diesel-Solar — Loreto',
    badge: '5 kWp',
    description:
      'Diseño e implementación de sistema híbrido solar-diesel para abastecer talleres de capacitación técnica en comunidades nativas de la Amazonía.',
  },
  {
    image: panelImg,
    tag: 'Electrificación Rural · Amazonía',
    title: 'Pluspetrol — Lotes 88, 56 y 1AB',
    badge: '20 MWp',
    description:
      'Soluciones energéticas sostenibles para más de 200 comunidades nativas: electrificación rural, bombeo de agua, refrigeración de vacunas y telecomunicaciones satelitales.',
  },
  {
    image: panelesImg,
    tag: 'Salud · On-Grid',
    title: 'Sistema Solar — Centros de Salud CEDOSAC',
    badge: '20 kWp',
    description:
      'Desarrollo de sistemas fotovoltaicos para centros de salud rurales en Pucallpa, garantizando energía continua para servicios críticos.',
  },
  {
    image: casapanelImg,
    tag: 'Conectividad Rural · Solar',
    title: 'Sistemas Fotovoltaicos — Misiones Dominicanas',
    badge: '100 kWp',
    description:
      'Implementación de sistemas solares para asegurar comunicación satelital e internet en misiones rurales aisladas del Perú.',
  },
  {
    image: minicasaImg,
    tag: 'Comunidades Nativas · Río Urubamba',
    title: 'Electrificación Solar — Camisea (Shell)',
    badge: '150 kWp',
    description:
      'Diseño e instalación de soluciones solares para comunidades nativas: iluminación escolar, radiocomunicación en 35 comunidades y bombeo solar de agua potable.',
  },
];

export function Projects() {
  return (
    <section className="projects-section" id="proyectos">
      <div className="section-heading">
        <div className="hero-eyebrow">
          <Sparkles size={15} />
          <span>Nuestro Trabajo</span>
        </div>
        <h2 className="section-title">Proyectos Destacados</h2>
        <p className="section-subtitle">
          Una muestra de los proyectos de energía renovable que hemos desarrollado a lo largo de
          nuestra trayectoria.
        </p>
      </div>

      <ProjectShowcase projects={PROJECTS} />
    </section>
  );
}
