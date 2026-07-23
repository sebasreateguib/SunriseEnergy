import { Sparkles } from 'lucide-react';
import panelImg from '../assets/panel.png';
import panelnegroImg from '../assets/panelnegro.png';

const PROJECTS = [
  {
    image: panelnegroImg,
    tag: 'Residencial · Solar PV',
    title: 'Proyecto Solar Residencial',
  },
  {
    image: panelImg,
    tag: 'Industrial · On-Grid',
    title: 'Planta Solar Industrial',
  },
  {
    image: '/wind_turbines.png',
    tag: 'Eólica · Generación Distribuida',
    title: 'Parque Eólico',
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
          Una muestra de los proyectos de energía renovable en los que estamos trabajando.
        </p>
      </div>

      <div className="projects-grid">
        {PROJECTS.map((project) => (
          <div className="project-card" key={project.title}>
            <div className="project-card-image-wrap">
              <img src={project.image} alt={project.title} className="project-card-image" />
              <span className="project-card-badge">Próximamente</span>
            </div>
            <div className="project-card-body">
              <span className="project-card-tag">{project.tag}</span>
              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-description">Contenido del proyecto en preparación.</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
