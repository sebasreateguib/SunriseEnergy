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
}[] = [
        {
            threshold: 0,
            icon: Zap,
            tag: "Generación",
            headline: "Solar PV / Baterías, Aerogeneradores",
            description: "Solución energética con energías renovables ecoeficientes y rentables.",
            accent: "#a3e635",
        },
        {
            threshold: 1 / 6,
            icon: Leaf,
            tag: "Bioenergía",
            headline: "Biogás / Biomasa",
            description: "Solución que aprovecha los residuos orgánicos e inorgánicos para producir biogás y bioabono.",
            accent: "#facc15",
        },
        {
            threshold: 2 / 6,
            icon: ShieldCheck,
            tag: "Calidad",
            headline: "Consultoría, Certificación y Auditoría Energética",
            description: "Aseguramiento de la calidad de componentes e instalación, cumpliendo la normatividad técnica.",
            accent: "#22d3ee",
        },
        {
            threshold: 3 / 6,
            icon: Settings,
            tag: "O&M",
            headline: "O&M Sistemas Renovables",
            description: "Gestión y administración para la operación y mantenimiento de los sistemas de energías renovables.",
            accent: "#c084fc",
        },
        {
            threshold: 4 / 6,
            icon: Droplets,
            tag: "Bombeo",
            headline: "Bombeo de Agua Solar",
            description: "Instalaciones de bombeo de agua solar para mejorar la rentabilidad y sostenibilidad.",
            accent: "#60a5fa",
        },
        {
            threshold: 5 / 6,
            icon: Plug,
            tag: "Híbrido",
            headline: "Sistemas Híbridos / Generación Distribuida",
            description: "Generación y uso rentable de energías renovables en sistemas conectados a la red y autoconsumo.",
            accent: "#fb7185",
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

    // Active stage index + data
    const activeIndex = COPY_STAGES.reduce(
        (acc, stage, i) => (scrollPct >= stage.threshold ? i : acc),
        0,
    );
    const activeCopy = COPY_STAGES[activeIndex];
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
        // True cover fit: image fills the canvas edge-to-edge, no letterbox margins
        const ratio = Math.max(cw / iw, ch / ih);

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
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 8px;
          text-align: center;
        }

        .seq-canvas { display: block; }

        /* Vignette for legibility + cinematic depth */
        .seq-vignette {
          position: absolute;
          inset: 0;
          z-index: 8;
          pointer-events: none;
          background:
            linear-gradient(0deg, rgba(5, 8, 16, 0.88) 0%, rgba(5, 8, 16, 0.15) 30%, rgba(5, 8, 16, 0) 55%),
            radial-gradient(120% 90% at 50% 0%, rgba(5, 8, 16, 0) 55%, rgba(5, 8, 16, 0.55) 100%);
        }

        /* Top progress line */
        .seq-top-progress {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          z-index: 25;
          background: rgba(10, 15, 29, 0.12);
        }
        .seq-top-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--color-brand-lime-hover), #a3e635);
          box-shadow: 0 0 12px rgba(163, 230, 53, 0.7);
          transition: width 0.1s linear;
        }

        /* Vertical stage tracker (desktop) */
        .seq-tracker {
          display: none;
          position: absolute;
          top: 50%;
          right: 2.5rem;
          transform: translateY(-50%);
          z-index: 20;
          flex-direction: column;
          align-items: center;
          gap: 0.9rem;
        }

        @media (min-width: 900px) {
          .seq-tracker { display: flex; }
        }

        .seq-tracker-tick {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .seq-tracker-tick.is-done {
          background: rgba(255, 255, 255, 0.65);
        }

        .seq-tracker-tick.is-active {
          width: 10px;
          height: 28px;
          border-radius: 5px;
        }

        /* Lower-third caption */
        .seq-lower-third {
          position: absolute;
          left: 1.25rem;
          right: 1.25rem;
          bottom: 4.5rem;
          z-index: 18;
          display: flex;
          align-items: flex-start;
          gap: 1.1rem;
          max-width: 720px;
        }

        @media (min-width: 640px) {
          .seq-lower-third {
            left: 3rem;
            bottom: 4rem;
            gap: 1.5rem;
          }
        }

        @keyframes seqNumberIn {
          from { opacity: 0; transform: translateY(14px) scale(0.92); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes seqTextIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .seq-lower-number {
          flex-shrink: 0;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 3rem;
          line-height: 1;
          letter-spacing: -0.03em;
          animation: seqNumberIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @media (min-width: 640px) {
          .seq-lower-number { font-size: 4.25rem; }
        }

        .seq-lower-divider {
          flex-shrink: 0;
          width: 1px;
          height: 3.25rem;
          margin-top: 0.4rem;
          background: rgba(255, 255, 255, 0.2);
        }

        @media (min-width: 640px) {
          .seq-lower-divider { height: 4.5rem; }
        }

        .seq-lower-body {
          animation: seqTextIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both;
        }

        .seq-lower-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        .seq-lower-headline {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.15rem;
          line-height: 1.28;
          letter-spacing: -0.01em;
          color: #ffffff;
          margin-bottom: 0.4rem;
        }

        @media (min-width: 640px) {
          .seq-lower-headline { font-size: 1.55rem; }
        }

        .seq-lower-description {
          color: rgba(255, 255, 255, 0.65);
          font-size: 0.85rem;
          line-height: 1.55;
          max-width: 34ch;
        }

        @media (min-width: 640px) {
          .seq-lower-description { font-size: 0.92rem; }
        }

        /* Scroll hint */
        .seq-scroll-hint {
          position: absolute;
          left: 1.25rem;
          bottom: 1.5rem;
          z-index: 18;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.45);
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        @media (min-width: 640px) {
          .seq-scroll-hint { left: 3rem; }
        }

        .seq-scroll-hint-chevron {
          animation: seqChevronBounce 1.6s ease-in-out infinite;
        }

        @keyframes seqChevronBounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(4px); opacity: 1; }
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
                                <div style={{ height: 3, borderRadius: 3, background: "rgba(10,15,29,0.12)", overflow: "hidden" }}>
                                    <div
                                        style={{
                                            height: "100%",
                                            width: `${progress}%`,
                                            background: "linear-gradient(90deg, var(--color-brand-lime-hover), #a3e635)",
                                            transition: "width 0.1s linear",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Canvas */}
                    <canvas ref={canvasRef} className="seq-canvas" />

                    {loaded && (
                        <>
                            <div className="seq-vignette" />

                            <div className="seq-top-progress">
                                <div className="seq-top-progress-fill" style={{ width: `${pct}%` }} />
                            </div>

                            {/* Vertical stage tracker */}
                            <div className="seq-tracker">
                                {COPY_STAGES.map((stage, i) => (
                                    <span
                                        key={stage.tag}
                                        className={`seq-tracker-tick${i === activeIndex ? ' is-active' : i < activeIndex ? ' is-done' : ''}`}
                                        style={i === activeIndex ? { background: activeCopy.accent } : undefined}
                                    />
                                ))}
                            </div>

                            {/* Lower-third caption */}
                            <div className="seq-lower-third" key={activeCopy.headline}>
                                <span className="seq-lower-number" style={{ color: activeCopy.accent }}>
                                    {String(activeIndex + 1).padStart(2, "0")}
                                </span>
                                <span className="seq-lower-divider" />
                                <div className="seq-lower-body">
                                    <div className="seq-lower-tag" style={{ color: activeCopy.accent }}>
                                        <ActiveIcon size={14} />
                                        {activeCopy.tag}
                                    </div>
                                    <div className="seq-lower-headline">{activeCopy.headline}</div>
                                    <div className="seq-lower-description">{activeCopy.description}</div>
                                </div>
                            </div>

                            {/* Scroll hint */}
                            <div className="seq-scroll-hint">
                                Desplázate
                                <span className="seq-scroll-hint-chevron">↓</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
