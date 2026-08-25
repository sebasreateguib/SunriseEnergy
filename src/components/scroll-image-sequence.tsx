import { useEffect, useRef, useState, useCallback } from "react";
import { Droplets, Leaf, Plug, Settings, ShieldCheck, Zap } from "lucide-react";
import type { ComponentType } from "react";

/**
 * Secuencia de armado del panel: los 240 frames 1920x1080 de
 * `public/solar-panel/`, copiados sin recomprimir. El manifest de
 * `/seq/solar` guarda el conteo; si se regenera, actualizar aquí.
 */
// Mobile usa los mismos frames sin recomprimir que desktop: menos frames o
// menor resolución generaban un scrub visiblemente entrecortado.
const VARIANTS = {
    desktop: { dir: "/seq/solar", frames: 240, ext: "jpg" },
} as const;

type Variant = (typeof VARIANTS)[keyof typeof VARIANTS];

/** Altura del panel en mobile, como fracción del viewport. */
const MOBILE_PANEL_HEIGHT = 0.96;

/**
 * Cuánto se aleja el encuadre en mobile respecto a `cover`. Un viewport 9:19.5
 * contra un frame 16:9 recorta a ~1/3 del ancho; a 0.74 se ve el ~41%. Las
 * franjas que deja el zoom no se rellenan con el fondo de la página — el borde
 * del frame es gris (~#afb0b2) y el corte cantaría — sino estirando las propias
 * filas de borde, que son casi planas, así que la pared y el suelo siguen.
 */
const MOBILE_ZOOM = 0.74;
/** Filas de origen que se estiran para rellenar cada franja. */
const EDGE_ROWS = 2;

/** Frames que deben estar listos antes de mostrar la secuencia. */
const GATE_FRAMES = 8;
/** Frames que se descargan en paralelo por lote. */
const BATCH_SIZE = 8;

const getImagePath = (variant: Variant, i: number) =>
    `${variant.dir}/f-${String(i).padStart(3, "0")}.${variant.ext}`;

const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
            accent: "#4d7c0f",
        },
        {
            threshold: 1 / 6,
            icon: Leaf,
            tag: "Bioenergía",
            headline: "Biogás / Biomasa",
            description: "Solución que aprovecha los residuos orgánicos e inorgánicos para producir biogás y bioabono.",
            accent: "#b45309",
        },
        {
            threshold: 2 / 6,
            icon: ShieldCheck,
            tag: "Calidad",
            headline: "Consultoría, Certificación y Auditoría Energética",
            description: "Aseguramiento de la calidad de componentes e instalación, cumpliendo la normatividad técnica.",
            accent: "#0e7490",
        },
        {
            threshold: 3 / 6,
            icon: Settings,
            tag: "O&M",
            headline: "O&M Sistemas Renovables",
            description: "Gestión y administración para la operación y mantenimiento de los sistemas de energías renovables.",
            accent: "#7e22ce",
        },
        {
            threshold: 4 / 6,
            icon: Droplets,
            tag: "Bombeo",
            headline: "Bombeo de Agua Solar",
            description: "Instalaciones de bombeo de agua solar para mejorar la rentabilidad y sostenibilidad.",
            accent: "#1d4ed8",
        },
        {
            threshold: 5 / 6,
            icon: Plug,
            tag: "Híbrido",
            headline: "Sistemas Híbridos / Generación Distribuida",
            description: "Generación y uso rentable de energías renovables en sistemas conectados a la red y autoconsumo.",
            accent: "#be123c",
        },
    ];

export default function ScrollImageSequence() {
    const [scrollScreens, setScrollScreens] = useState(6);
    const [reduceMotion, setReduceMotion] = useState(prefersReducedMotion);
    const variant = VARIANTS.desktop;
    const frameCount = reduceMotion ? 1 : variant.frames;

    useEffect(() => {
        const handleResize = () => {
            setScrollScreens(window.innerWidth < 768 ? 5 : 6);
        };
        handleResize();
        window.addEventListener('resize', handleResize, { passive: true });
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onChange = () => setReduceMotion(query.matches);
        query.addEventListener("change", onChange);
        return () => query.removeEventListener("change", onChange);
    }, []);

    const containerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const progressFillRef = useRef<HTMLDivElement>(null);
    const images = useRef<HTMLImageElement[]>([]);
    const frameIdx = useRef(0);
    // Lo fija syncSize() a partir del ancho, para no leer window en cada frame
    // del scrub.
    const isMobile = useRef(false);

    const [shouldLoad, setShouldLoad] = useState(false);
    const [ready, setReady] = useState(false);
    const [progress, setProgress] = useState(0);

    // Active stage index: sólo se llama setState al cruzar un umbral (6 veces
    // máximo), no en cada frame de scroll. El progress bar se actualiza directo
    // en el DOM vía progressFillRef para evitar cualquier re-render por scroll.
    const [activeIndex, setActiveIndex] = useState(0);
    const activeIndexRef = useRef(0);
    const activeCopy = COPY_STAGES[activeIndex];
    const ActiveIcon = activeCopy.icon;

    // ─── Draw a frame (0-based index) ────────────────────────────────────────
    const drawFrame = useCallback((idx: number) => {
        const canvas = canvasRef.current;
        if (!canvas || canvas.width === 0) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Si el frame pedido aún no terminó de descargar, se deja el último
        // dibujado en pantalla en lugar de limpiar el canvas.
        const img = images.current[Math.max(0, Math.min(idx, frameCount - 1))];
        if (!img || img.naturalWidth === 0) return;

        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        const cw = canvas.width;
        const ch = canvas.height;

        const cover = Math.max(cw / iw, ch / ih);
        // El zoom de mobile nunca baja de llenar el ancho: así las únicas
        // franjas posibles son horizontales, que son las que sabemos rellenar.
        const ratio = isMobile.current
            ? Math.max(cover * MOBILE_ZOOM, cw / iw)
            : cover;

        const dw = iw * ratio;
        const dh = ih * ratio;
        const dx = (cw - dw) / 2;
        const dy = (ch - dh) / 2;

        ctx.clearRect(0, 0, cw, ch);

        // Franjas: se estira la fila de borde del propio frame en lugar de
        // dejar el fondo de la página, que se vería como un recorte. Se solapa
        // 1px con la imagen para que el redondeo no deje una línea.
        if (dy > 0.5) {
            ctx.drawImage(img, 0, 0, iw, EDGE_ROWS, dx, 0, dw, dy + 1);
            ctx.drawImage(img, 0, ih - EDGE_ROWS, iw, EDGE_ROWS, dx, dy + dh - 1, dw, ch - dy - dh + 1);
        }

        ctx.drawImage(img, 0, 0, iw, ih, dx, dy, dw, dh);
    }, [frameCount]);

    // ─── Sync canvas size to viewport ───────────────────────────────────────
    const syncSize = useCallback(() => {
        const canvas = canvasRef.current;
        const sticky = stickyRef.current;
        if (!canvas) return;
        // Se limita a 2x: por encima de eso el backing store sólo gasta memoria
        // y relleno de píxeles, porque el detalle ya lo limita la fuente
        // (1920px en desktop, 900px en mobile).
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = window.innerWidth;
        // El panel ocupa casi todo el viewport para que el scrub se lea como
        // "scrolleando la página" y no como un widget encajonado.
        const h = w < 768 ? Math.round(window.innerHeight * MOBILE_PANEL_HEIGHT) : window.innerHeight;
        if (w === 0 || h === 0) return;
        isMobile.current = w < 768;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        if (sticky) {
            sticky.style.height = `${h}px`;
            sticky.style.top = w < 768 ? `${Math.round((window.innerHeight - h) / 2)}px` : "0px";
        }
        drawFrame(frameIdx.current);
    }, [drawFrame]);

    // ─── Canvas siempre dimensionado al viewport ────────────────────────────
    useEffect(() => {
        syncSize();
        window.addEventListener("resize", syncSize, { passive: true });
        return () => window.removeEventListener("resize", syncSize);
    }, [syncSize]);

    // ─── Phase 1: la descarga arranca sólo al acercarse la sección ──────────
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            // Un viewport de margen: da tiempo a tener los primeros frames
            // listos sin competir con la carga del hero.
            { rootMargin: "100% 0px" }
        );
        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    // ─── Phase 2: precarga por lotes, no bloqueante ─────────────────────────
    useEffect(() => {
        if (!shouldLoad) return;
        let cancelled = false;

        // Se decodifica cada frame por adelantado (fuera del hilo principal)
        // para que drawImage() durante el scroll nunca dispare una decodificación
        // síncrona a mitad de scrub — esa era la causa del "tirón"/10fps en mobile.
        const loadFrame = (i: number) =>
            new Promise<void>((resolve) => {
                const img = new Image();
                img.onload = () => {
                    if (typeof img.decode === "function") {
                        img.decode().catch(() => { }).finally(resolve);
                    } else {
                        resolve();
                    }
                };
                img.onerror = () => resolve();
                img.src = getImagePath(variant, i);
                images.current[i] = img;
            });

        (async () => {
            images.current = [];
            setProgress(0);
            setReady(false);

            for (let start = 0; start < frameCount; start += BATCH_SIZE) {
                if (cancelled) return;
                const size = Math.min(BATCH_SIZE, frameCount - start);
                await Promise.all(Array.from({ length: size }, (_, k) => loadFrame(start + k)));
                if (cancelled) return;

                // La barra de carga mide sólo los frames que hacen falta para
                // empezar: el resto sigue descargándose de fondo.
                const gate = Math.min(GATE_FRAMES, frameCount);
                setProgress(Math.min(100, Math.round(((start + size) / gate) * 100)));
                if (start + size >= gate) {
                    setReady(true);
                    drawFrame(frameIdx.current);
                }
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [shouldLoad, variant, frameCount, drawFrame]);

    // ─── Phase 3: scroll scrubbing (gsap se carga aparte del bundle) ────────
    useEffect(() => {
        if (!ready || reduceMotion) return;

        let cancelled = false;
        let trigger: { kill: () => void } | null = null;
        let removeResize = () => { };

        (async () => {
            const [gsapModule, scrollTriggerModule] = await Promise.all([
                import("gsap"),
                import("gsap/ScrollTrigger"),
            ]);
            if (cancelled) return;

            const gsap = gsapModule.gsap ?? gsapModule.default;
            const ScrollTrigger = scrollTriggerModule.ScrollTrigger ?? scrollTriggerModule.default;
            gsap.registerPlugin(ScrollTrigger);

            syncSize();
            drawFrame(frameIdx.current);

            trigger = ScrollTrigger.create({
                trigger: containerRef.current,
                pin: stickyRef.current,
                pinSpacing: false,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                onUpdate(self) {
                    const f = Math.min(frameCount - 1, Math.max(0, Math.round(self.progress * (frameCount - 1))));
                    frameIdx.current = f;
                    drawFrame(f);

                    // Actualizar barra de progreso directamente en el DOM
                    if (progressFillRef.current) {
                        progressFillRef.current.style.width = `${Math.round(self.progress * 100)}%`;
                    }

                    // React state sólo al cruzar un umbral de etapa
                    const newIdx = COPY_STAGES.reduce(
                        (acc, stage, i) => (self.progress >= stage.threshold ? i : acc),
                        0,
                    );
                    if (newIdx !== activeIndexRef.current) {
                        activeIndexRef.current = newIdx;
                        setActiveIndex(newIdx);
                    }
                },
            });

            ScrollTrigger.refresh();

            const handleResize = () => ScrollTrigger.refresh();
            window.addEventListener("resize", handleResize, { passive: true });
            removeResize = () => window.removeEventListener("resize", handleResize);
        })();

        return () => {
            cancelled = true;
            removeResize();
            trigger?.kill();
        };
    }, [ready, reduceMotion, frameCount, drawFrame, syncSize, scrollScreens]);

    return (
        <>
            <style>{`
        .seq-outer {
          height: ${reduceMotion ? 100 : scrollScreens * 100}vh;
          background: var(--color-bg-page);
        }

        .seq-sticky {
          position: relative;
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

        /* Dos capas, ambas del color de la página: un wash acotado a la
           esquina donde vive el caption, y un fundido de 16% al borde inferior
           para que el canvas no corte en seco. Un scrim a todo lo ancho daba
           contraste pero tapaba el panel. */
        .seq-vignette {
          position: absolute;
          inset: 0;
          z-index: 8;
          pointer-events: none;
          background:
            radial-gradient(52% 46% at 0% 100%, rgba(248, 250, 252, 0.92) 0%, rgba(248, 250, 252, 0.62) 42%, rgba(248, 250, 252, 0) 75%),
            linear-gradient(0deg, rgba(248, 250, 252, 0.9) 0%, rgba(248, 250, 252, 0.3) 7%, rgba(248, 250, 252, 0) 16%);
        }

        /* En pantallas angostas el caption ocupa casi todo el ancho, así que
           el wash tiene que acompañarlo. */
        @media (max-width: 767px) {
          .seq-vignette {
            background:
              radial-gradient(120% 42% at 20% 100%, rgba(248, 250, 252, 0.94) 0%, rgba(248, 250, 252, 0.68) 45%, rgba(248, 250, 252, 0) 80%),
              linear-gradient(0deg, rgba(248, 250, 252, 0.9) 0%, rgba(248, 250, 252, 0.3) 7%, rgba(248, 250, 252, 0) 16%);
          }
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
          background: rgba(10, 15, 29, 0.28);
          box-shadow: 0 0 0 1px rgba(248, 250, 252, 0.7);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .seq-tracker-tick.is-done {
          background: rgba(10, 15, 29, 0.55);
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

        /* Halo del color de la página detrás de cada glifo: mantiene el
           contraste en los frames donde el panel cruza por detrás del texto,
           sin necesidad de una caja opaca. */
        .seq-lower-number,
        .seq-lower-tag,
        .seq-lower-headline,
        .seq-lower-description,
        .seq-scroll-hint {
          text-shadow:
            0 1px 2px rgba(248, 250, 252, 0.95),
            0 0 14px rgba(248, 250, 252, 0.85);
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
          background: rgba(10, 15, 29, 0.18);
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
          color: #0a0f1d;
          margin-bottom: 0.4rem;
        }

        @media (min-width: 640px) {
          .seq-lower-headline { font-size: 1.55rem; }
        }

        .seq-lower-description {
          color: #334155;
          font-weight: 500;
          font-size: 0.9rem;
          line-height: 1.55;
          max-width: 34ch;
        }

        @media (min-width: 640px) {
          .seq-lower-description { font-size: 0.97rem; }
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
          color: rgba(10, 15, 29, 0.6);
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

        /* ── Versión sin movimiento ──────────────────────────────────────────
           Con prefers-reduced-motion no se descarga la secuencia ni se hace
           scrub: se muestra un frame fijo y las 6 etapas como lista. */
        .seq-static {
          position: absolute;
          inset: 0;
          z-index: 18;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 1.5rem;
          padding: 2rem 1.5rem;
          overflow-y: auto;
        }

        @media (min-width: 640px) {
          .seq-static { padding: 3rem; }
        }

        .seq-static-grid {
          display: grid;
          gap: 1.1rem 2rem;
          grid-template-columns: 1fr;
        }

        @media (min-width: 640px) {
          .seq-static-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (min-width: 1024px) {
          .seq-static-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }

        .seq-static-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .seq-static-item-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.98rem;
          line-height: 1.3;
          color: #0a0f1d;
        }

        .seq-static-item-description {
          margin-top: 0.25rem;
          font-size: 0.82rem;
          line-height: 1.5;
          color: #334155;
        }

        @media (prefers-reduced-motion: reduce) {
          .seq-lower-number,
          .seq-lower-body,
          .seq-scroll-hint-chevron {
            animation: none;
          }
        }
      `}</style>

            {/* ── Outer scroll container ─────────────────────────────────────── */}
            <div ref={containerRef} className="seq-outer">
                {/* ── Sticky viewport ─────────────────────────────────────────── */}
                <div ref={stickyRef} className="seq-sticky">
                    {/* Loading overlay */}
                    {!ready && (
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

                    {ready && reduceMotion && (
                        <>
                            <div className="seq-vignette" />
                            <div className="seq-static">
                                <div className="seq-static-grid">
                                    {COPY_STAGES.map((stage, i) => {
                                        const StageIcon = stage.icon;
                                        return (
                                            <div className="seq-static-item" key={stage.tag}>
                                                <span className="seq-lower-number" style={{ color: stage.accent, fontSize: "1.6rem" }}>
                                                    {String(i + 1).padStart(2, "0")}
                                                </span>
                                                <div>
                                                    <div className="seq-lower-tag" style={{ color: stage.accent, marginBottom: "0.25rem" }}>
                                                        <StageIcon size={14} />
                                                        {stage.tag}
                                                    </div>
                                                    <div className="seq-static-item-title">{stage.headline}</div>
                                                    <div className="seq-static-item-description">{stage.description}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )}

                    {ready && !reduceMotion && (
                        <>
                            <div className="seq-vignette" />

                            <div className="seq-top-progress">
                                <div ref={progressFillRef} className="seq-top-progress-fill" style={{ width: "0%" }} />
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
