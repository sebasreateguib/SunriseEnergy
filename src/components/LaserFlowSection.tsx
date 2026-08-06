import { useEffect, useRef, useState } from 'react';
import LaserFlow from './LaserFlow';

const PANEL_MAX_WIDTH = 900;

export function LaserFlowSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setWidth(el.clientWidth);
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // El abanico se mide en fracciones del ancho del viewport, pero el panel se topa
  // en 900px: sin esto el laser se desborda por los lados en pantalla completa.
  // El haz va centrado (offset 0), igual que el panel.
  const panelHalf = Math.min(width * 0.45, PANEL_MAX_WIDTH / 2);
  const fanHalf = panelHalf * 0.6;
  const horizontalSizing = width > 0 ? (2 * fanHalf) / width : 0.5;

  return (
    <div
      ref={containerRef}
      className="relative h-[420px] overflow-hidden bg-[#0a0f1d] sm:h-[560px] md:h-[700px]"
    >
      <LaserFlow
        horizontalBeamOffset={0}
        verticalBeamOffset={0}
        color="#d9f99d"
        verticalSizing={2}
        horizontalSizing={horizontalSizing}
      />

      <div className="absolute left-4 top-6 z-[6] max-w-[52%] text-left sm:left-6 sm:top-16 sm:max-w-xs md:left-16 md:top-20 md:max-w-sm">
        <span
          className="block text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[#d9f99d] sm:text-sm sm:tracking-[0.3em]"
          style={{ textShadow: '0 0 18px rgba(217, 249, 157, 0.65)' }}>
          Sunrise Energy
        </span>
        <h2 className="mt-2 text-2xl font-extrabold leading-[1.15] text-white sm:mt-3 sm:text-5xl md:text-6xl">
          Energía que
          <br />
          nace del sol.
        </h2>
      </div>

      <div
        className="absolute left-1/2 top-1/2 z-[6] w-[90%] max-w-[900px] -translate-x-1/2 overflow-hidden rounded-[1.5rem] border border-[#d9f99d]/40 bg-[#0b1220]"
        style={{
          height: '65%',
          backgroundImage: [
            'linear-gradient(115deg, transparent 35%, rgba(217, 249, 157, 0.06) 48%, transparent 62%)',
            'repeating-linear-gradient(90deg, rgba(217, 249, 157, 0.16) 0px, rgba(217, 249, 157, 0.16) 1px, transparent 1px, transparent 44px)',
            'repeating-linear-gradient(0deg, rgba(217, 249, 157, 0.16) 0px, rgba(217, 249, 157, 0.16) 1px, transparent 1px, transparent 44px)'
          ].join(', ')
        }}
      >
        <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
          <div className="flex flex-col items-center gap-8 sm:gap-12 md:gap-16 -translate-y-12 sm:-translate-y-16 md:-translate-y-20">
            <div className="flex items-center gap-6 sm:gap-10 md:gap-14">
              {[
                { value: '35 MWp', label: 'Mayor Proyecto' },
                { value: '200+', label: 'Comunidades' },
                { value: '15+', label: 'Universidades' }
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <span className="text-base font-extrabold text-[#d9f99d] sm:text-xl md:text-2xl">
                    {stat.value}
                  </span>
                  <span className="text-[0.6rem] uppercase tracking-wide text-slate-500 sm:text-xs">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-2">
              <h2 className="text-lg font-extrabold text-white sm:text-2xl md:text-3xl">
                <span className="text-[#d9f99d]">36 Años</span> de Experiencia
              </h2>
              <p className="max-w-md text-xs text-slate-400 sm:text-sm md:text-base">
                Ingeniería solar probada en más de 200 comunidades e industrias del Perú.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LaserFlowSection;
