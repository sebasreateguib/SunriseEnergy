import LaserFlow from './LaserFlow';

export function LaserFlowSection() {
  return (
    <div className="relative h-[420px] overflow-hidden bg-[#0a0f1d] sm:h-[560px] md:h-[700px]">
      <LaserFlow horizontalBeamOffset={0} verticalBeamOffset={0} color="#d9f99d" verticalSizing={2} horizontalSizing={0.5} />

      <div
        className="absolute left-1/2 top-1/2 z-[6] w-[90%] max-w-[900px] -translate-x-1/2 overflow-hidden rounded-[1.5rem] border border-[#d9f99d]/40 bg-[#0b1220]"
        style={{
          height: '45%',
          backgroundImage: 'radial-gradient(rgba(217, 249, 157, 0.18) 1px, transparent 1px)',
          backgroundSize: '18px 18px'
        }}
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            Energía del <span className="text-[#d9f99d]">Futuro</span>
          </h2>
          <p className="max-w-md text-sm text-slate-400 sm:text-base">
            Tecnología de flujo continuo y monitoreo en tiempo real.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LaserFlowSection;
