import { useEffect, useRef, useState } from 'react'
import type { ShowcaseProject } from './clipped-video-tab'

interface ProjectDeckProps {
    projects: ShowcaseProject[]
}

/**
 * Vista mobile de proyectos (< 1024px).
 *
 * La vista de escritorio pone la ficha de datos ENCIMA de la foto, y en un
 * ancho de teléfono eso dejaba la fotografía reducida a una franja: el marco
 * era vertical (342x520) contra tomas mayormente 4:3, así que `cover` recortaba
 * la mitad del ancho, y la ficha tapaba dos tercios de lo que quedaba.
 *
 * Acá manda la foto: marco 4:3 propio —el ratio de 5 de las 9 tomas, así que
 * casi no hay recorte— sin nada encima salvo la capacidad, y el texto debajo.
 */
export function ProjectDeck({ projects }: ProjectDeckProps) {
    const trackRef = useRef<HTMLUListElement>(null)
    const [active, setActive] = useState(0)
    const [expanded, setExpanded] = useState<number | null>(null)

    // El contador y la barra siguen a la tarjeta MÁS visible, no a la primera
    // que entra: con scroll-snap hay un instante en que se ven dos a la vez.
    useEffect(() => {
        const track = trackRef.current
        if (!track) return

        const ratios = new Map<number, number>()
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    const index = Number((entry.target as HTMLElement).dataset.index)
                    ratios.set(index, entry.intersectionRatio)
                }
                let best = 0
                let bestRatio = 0
                for (const [index, ratio] of ratios) {
                    if (ratio > bestRatio) {
                        bestRatio = ratio
                        best = index
                    }
                }
                setActive(best)
            },
            { root: track, threshold: [0.2, 0.4, 0.6, 0.8, 1] }
        )

        const cards = track.querySelectorAll<HTMLElement>('[data-index]')
        cards.forEach((card) => observer.observe(card))
        return () => observer.disconnect()
    }, [projects])

    const pad = (n: number) => String(n).padStart(2, '0')

    return (
        <div className="project-deck">
            <div className="project-deck-meta">
                <span className="project-deck-count">
                    <strong>{pad(active + 1)}</strong> / {pad(projects.length)}
                </span>
                <div className="project-deck-rail" aria-hidden="true">
                    <span style={{ transform: `scaleX(${(active + 1) / projects.length})` }} />
                </div>
            </div>

            <ul className="project-deck-track" ref={trackRef}>
                {projects.map((project, index) => {
                    const isExpanded = expanded === index
                    const bodyId = `project-deck-desc-${index}`

                    return (
                        <li className="project-deck-card" key={project.title} data-index={index}>
                            <div className="project-deck-frame">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                ) : project.gradient ? (
                                    <div className={`project-deck-fill ${project.gradient}`} />
                                ) : null}
                                <p className="project-deck-capacity">
                                    <span className="sr-only">Capacidad instalada: </span>
                                    {project.badge}
                                </p>
                            </div>

                            <div className="project-deck-body">
                                <span className="project-deck-tag">{project.tag}</span>
                                <h3 className="project-deck-title">{project.title}</h3>
                                <p
                                    className="project-deck-description"
                                    id={bodyId}
                                    data-expanded={isExpanded}>
                                    {project.description}
                                </p>
                                <button
                                    type="button"
                                    className="project-deck-more"
                                    aria-expanded={isExpanded}
                                    aria-controls={bodyId}
                                    onClick={() => setExpanded(isExpanded ? null : index)}>
                                    {isExpanded ? 'Ver menos' : 'Ver más'}
                                </button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
