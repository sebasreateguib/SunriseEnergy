import { lazy, Suspense, useState } from 'react';
import ctaImg from './assets/panelnegro2.webp';
import ScrollImageSequence from './components/scroll-image-sequence';
import { About } from './components/About';
import { CEO } from './components/CEO';
import { ClientsStrip } from './components/ClientsStrip';
import { ConsultModal } from './components/ConsultModal';
import { Expertise } from './components/Expertise';
import { FinalCTA } from './components/FinalCTA';
import FooterWithFadedBrand from './components/ui/footer';
import { Header } from './components/ui/navbar';
import { Hero } from './components/Hero';
import { PrincipalClients } from './components/PrincipalClients';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { SavingsSection } from './components/SavingsSection';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { Reveal } from './components/ui/reveal';

// El shader de LaserFlow arrastra three.js (~150 KB gzip): se carga en su
// propio chunk, después del hero. El placeholder reserva la misma altura para
// que no haya salto de layout.
const LaserFlowSection = lazy(() =>
  import('./components/LaserFlowSection').then((m) => ({ default: m.LaserFlowSection }))
);

const laserFlowPlaceholder = (
  <div className="h-[420px] bg-[#0a0f1d] sm:h-[560px] md:h-[700px]" aria-hidden="true" />
);

export function App() {
  const [showModal, setShowModal] = useState(false);

  const openConsult = () => setShowModal(true);
  const closeConsult = () => setShowModal(false);

  return (
    <div className="page">
      <Header onOpenConsult={openConsult} />
      <Hero onOpenConsult={openConsult} />
      <Suspense fallback={laserFlowPlaceholder}>
        <LaserFlowSection />
      </Suspense>
      <Reveal direction="left">
        <ClientsStrip />
      </Reveal>
      <ScrollImageSequence />
      <Reveal direction="right">
        <About />
      </Reveal>
      <Reveal direction="left">
        <Expertise />
      </Reveal>
      <Reveal direction="right">
        <Services />
      </Reveal>
      <Reveal direction="left">
        <SavingsSection />
      </Reveal>
      <Reveal direction="right">
        <Projects />
      </Reveal>
      <Reveal direction="left">
        <PrincipalClients />
      </Reveal>
      <Reveal direction="right">
        <CEO />
      </Reveal>
      <Reveal direction="left">
        <div className="unified-footer-wrapper">
          <img
            src={ctaImg}
            alt=""
            className="final-cta-bg"
            aria-hidden="true"
            width={896}
            height={1200}
            loading="lazy"
            decoding="async"
          />
          <div className="final-cta-overlay" />
          <FinalCTA onOpenConsult={openConsult} />
        </div>
      </Reveal>
      <FooterWithFadedBrand />

      <ConsultModal open={showModal} onClose={closeConsult} />
      <WhatsAppFloat />
    </div>
  );
}

export default App;
