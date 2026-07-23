import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Droplets, Leaf, Plug, Settings, ShieldCheck, Zap } from "lucide-react";
import type { ComponentType } from "react";

const FRAME_COUNT = 240;

const getImagePath = (i: number) =>
    `/panel2/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;

const COPY_STAGES: {
    threshold: number;
    icon: ComponentType<{ size?: number }>;
    tag: string;
    headline: string;
    description: string;
    accent: string;
    position: string;
    anim: string;
}[] = [
        {
            threshold: 0,
            icon: Zap,
            tag: "Generación",
            headline: "Solar PV / Baterías, Aerogeneradores",
            description: "Solución energética con energías renovables ecoeficientes y rentables.",
            accent: "#16a34a",
            position: "seq-copy--p1",
            anim: "seq-anim-left",
        },
        {
            threshold: 1 / 6,
            icon: Leaf,
            tag: "Bioenergía",
            headline: "Biogás / Biomasa",
            description: "Solución que aprovecha los residuos orgánicos e inorgánicos para producir biogás y bioabono.",
            accent: "#d97706",
            position: "seq-copy--p2",
            anim: "seq-anim-right",
        },
        {
            threshold: 2 / 6,
            icon: ShieldCheck,
            tag: "Calidad",
            headline: "Consultoría, Certificación y Auditoría Energética",
            description: "Aseguramiento de la calidad de componentes e instalación, cumpliendo la normatividad técnica.",
            accent: "#0891b2",
            position: "seq-copy--p3",
            anim: "seq-anim-left",
        },
        {
            threshold: 3 / 6,
            icon: Settings,
            tag: "O&M",
            headline: "O&M Sistemas Renovables",
            description: "Gestión y administración para la operación y mantenimiento de los sistemas de energías renovables.",
            accent: "#9333ea",
            position: "seq-copy--p4",
            anim: "seq-anim-right",
        },
        {
            threshold: 4 / 6,
            icon: Droplets,
            tag: "Bombeo",
            headline: "Bombeo de Agua Solar",
            description: "Instalaciones de bombeo de agua solar para mejorar la rentabilidad y sostenibilidad.",
            accent: "#2563eb",
            position: "seq-copy--p1",
            anim: "seq-anim-left",
        },
        {
            threshold: 5 / 6,
            icon: Plug,
            tag: "Híbrido",
            headline: "Sistemas Híbridos / Generación Distribuida",
            description: "Generación y uso rentable de energías renovables en sistemas conectados a la red y autoconsumo.",
            accent: "#e11d48",
            position: "seq-copy--p2",
            anim: "seq-anim-right",
        },
    ];

export default function ScrollImageSequence() {
    const [scrollScreens, setScrollScreens] = useState(6);

    useEffect(() => {
        const handleResize = () => {
            setScrollScreens(window.innerWidth < 768 ? 5 : 6);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const containerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const images = useRef<HTMLImageElement[]>([]);
    const frameIdx = useRef(0);

    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(0);
    const [scrollPct, setScrollPct] = useState(0);

    // Active copy stage
    const activeCopy = [...COPY_STAGES].reverse().find(s => scrollPct >= s.threshold) ?? COPY_STAGES[0];
    const ActiveIcon = activeCopy.icon;

    // ─── Draw a frame (0-based index) ────────────────────────────────────────
    const drawFrame = useCallback((idx: number) => {
        const canvas = canvasRef.current;
        if (!canvas || canvas.width === 0) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = images.current[Math.max(0, Math.min(idx, FRAME_COUNT - 1))];
        if (!img || img.naturalWidth === 0) return;

        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        const cw = canvas.width;
        const ch = canvas.height;
        // Fix mobile detection: use window.innerWidth instead of cw, as cw is scaled by devicePixelRatio
        const isMobile = window.innerWidth < 768;
        const zoomMultiplier = isMobile ? 0.52 : 0.85;
        const ratio = Math.max(cw / iw, ch / ih) * zoomMultiplier;
        const dx = (cw - iw * ratio) / 2;
        const dy = (ch - ih * ratio) / 2;

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, 0, 0, iw, ih, dx, dy, iw * ratio, ih * ratio);
    }, []);

    // ─── Sync canvas size to viewport ───────────────────────────────────────
    const syncSize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dpr = window.devicePixelRatio || 1;
        const w = window.innerWidth;
        const h = window.innerHeight;
        if (w === 0 || h === 0) return;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        drawFrame(frameIdx.current);
    }, [drawFrame]);

    // ─── Phase 1: preload ────────────────────────────────────────────────────
    useEffect(() => {
        let done = 0;
        setLoaded(false);
        setProgress(0);
        images.current = Array.from({ length: FRAME_COUNT }, (_, i) => {
            const img = new Image();
            const tick = () => {
                done++;
                setProgress(Math.round((done / FRAME_COUNT) * 100));
                if (done === FRAME_COUNT) {
                    setLoaded(true);
                }
            };
            img.onload = tick;
            img.onerror = tick;
            img.src = getImagePath(i);
            return img;
        });
    }, []);

    // ─── Phase 2: canvas + ScrollTrigger ────────────────────────────────────
    useEffect(() => {
        if (!loaded) return;
        gsap.registerPlugin(ScrollTrigger);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let st: any = null;

        const timer = setTimeout(() => {
            syncSize();
            drawFrame(0);

            st = ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.1,
                onUpdate(self) {
                    const f = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(self.progress * (FRAME_COUNT - 1))));
                    frameIdx.current = f;
                    drawFrame(f);
                    setScrollPct(self.progress);
                },
            });

            ScrollTrigger.refresh();
        }, 50);

        const handleResize = () => {
            syncSize();
            ScrollTrigger.refresh();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", handleResize);
            if (st) st.kill();
        };
    }, [loaded, drawFrame, syncSize, scrollScreens]);

    const pct = Math.round(scrollPct * 100);

    return (
        <>
            <style>{`
        .seq-outer {
          height: ${scrollScreens * 100}vh;
          background: var(--color-bg-page);
        }

        .seq-sticky {
          position: sticky;
          top: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: var(--color-bg-page);
        }

        .seq-loading-overlay {
          position: absolute;
          inset: 0;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--color-bg-page);
          gap: 16px;
        }

        .seq-loading-label {
          color: var(--color-text-muted);
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 8px;
          text-align: center;
        }

        .seq-canvas { display: block; }

        /* Progress bar track */
        .seq-prog-track {
          background: rgba(10, 15, 29, 0.1);
          height: 4px;
          border-radius: 4px;
          overflow: hidden;
        }
        .seq-prog-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--color-brand-lime-hover) 0%, #65a30d 100%);
          transition: width 0.1s linear;
          border-radius: 4px;
        }

        /* Copy card */
        .seq-copy {
          position: absolute;
          z-index: 15;
          width: auto;
        }

        .seq-copy--p1 { bottom: 6rem; left: 1rem; right: 1rem; }
        .seq-copy--p2 { top: 6rem; left: 1rem; right: 1rem; }
        .seq-copy--p3 { bottom: 8rem; left: 1rem; right: 1rem; }
        .seq-copy--p4 { top: 8rem; left: 1rem; right: 1rem; }

        @media (min-width: 768px) {
          .seq-copy { width: 400px; }
          .seq-copy--p1 { bottom: 5rem; left: 3rem; right: auto; top: auto; }
          .seq-copy--p2 { top: 7rem; right: 3rem; left: auto; bottom: auto; }
          .seq-copy--p3 { bottom: 7rem; left: 6rem; right: auto; top: auto; }
          .seq-copy--p4 { top: 9rem; right: 6rem; left: auto; bottom: auto; }
        }

        @keyframes seqSlideInLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes seqSlideInRight {
          from { opacity: 0; transform: translateX(24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .seq-anim-left { animation: seqSlideInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .seq-anim-right { animation: seqSlideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }

        .seq-copy-card {
          padding: 1.25rem;
          border-radius: 1.25rem;
          border: 1px solid rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(14px) saturate(160%);
          -webkit-backdrop-filter: blur(14px) saturate(160%);
          box-shadow: 0 20px 45px -20px rgba(15, 23, 42, 0.35);
          font-family: var(--font-sans);
        }

        .seq-copy-header {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 0.85rem;
        }

        .seq-copy-icon {
          flex-shrink: 0;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: #ffffff;
        }

        .seq-copy-tag {
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }

        .seq-copy-headline {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          line-height: 1.3;
          color: var(--color-text-main);
          margin-bottom: 0.5rem;
        }

        @media (min-width: 768px) {
          .seq-copy-headline { font-size: 1.2rem; }
        }

        .seq-copy-description {
          color: var(--color-text-subtle);
          font-size: 0.85rem;
          line-height: 1.6;
        }

        /* Bottom scroll progress bar */
        .seq-bottom-bar {
          position: absolute;
          bottom: 1.5rem;
          left: 1rem;
          right: 1rem;
          z-index: 15;
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        @media (min-width: 768px) {
          .seq-bottom-bar { bottom: 2rem; left: 3rem; right: 3rem; }
        }

        .seq-scroll-label {
          color: var(--color-text-muted);
          font-size: 0.75rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .seq-scroll-label--full { display: none; }
        .seq-scroll-label--short { display: block; }

        @media (min-width: 768px) {
          .seq-scroll-label--full { display: block; }
          .seq-scroll-label--short { display: none; }
        }
      `}</style>

            {/* ── Outer scroll container ─────────────────────────────────────── */}
            <div ref={containerRef} className="seq-outer">
                {/* ── Sticky viewport ─────────────────────────────────────────── */}
                <div ref={stickyRef} className="seq-sticky">
                    {/* Loading overlay */}
                    {!loaded && (
                        <div className="seq-loading-overlay">
                            <div style={{ width: "220px" }}>
                                <div className="seq-loading-label">
                                    Cargando secuencia — {progress}%
                                </div>
                                <div className="seq-prog-track">
                                    <div className="seq-prog-fill" style={{ width: `${progress}%` }} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Canvas */}
                    <canvas ref={canvasRef} className="seq-canvas" />

                    {/* Overlays */}
                    {loaded && (
                        <div
                            key={activeCopy.headline}
                            className={`seq-copy ${activeCopy.position} ${activeCopy.anim}`}
                        >
                            <div className="seq-copy-card">
                                <div className="seq-copy-header">
                                    <span className="seq-copy-icon" style={{ background: activeCopy.accent }}>
                                        <ActiveIcon size={20} />
                                    </span>
                                    <span className="seq-copy-tag">{activeCopy.tag}</span>
                                </div>

                                <div className="seq-copy-headline">
                                    {activeCopy.headline}
                                </div>
                                <div className="seq-copy-description">
                                    {activeCopy.description}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Bottom progress bar */}
                    {loaded && (
                        <div className="seq-bottom-bar">
                            <div className="seq-scroll-label seq-scroll-label--full">
                                Desplázate para continuar
                            </div>
                            <div className="seq-scroll-label seq-scroll-label--short">
                                Desplázate
                            </div>
                            <div className="seq-prog-track" style={{ flex: 1 }}>
                                <div className="seq-prog-fill" style={{ width: `${pct}%` }} />
                            </div>
                            <div className="seq-scroll-label">
                                {pct}%
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
