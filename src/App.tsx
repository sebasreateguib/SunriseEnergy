import { useState } from 'react';
import ctaImg from './assets/panelnegro2.png';
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
import { LaserFlowSection } from './components/LaserFlowSection';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { Reveal } from './components/ui/reveal';

export function App() {
  const [showModal, setShowModal] = useState(false);

  const openConsult = () => setShowModal(true);
  const closeConsult = () => setShowModal(false);

  return (
    <div className="page">
      <Header onOpenConsult={openConsult} />
      <Hero onOpenConsult={openConsult} />
      <LaserFlowSection />
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
          <img src={ctaImg} alt="" className="final-cta-bg" aria-hidden="true" />
          <div className="final-cta-overlay" />
          <FinalCTA onOpenConsult={openConsult} />
          <FooterWithFadedBrand />
        </div>
      </Reveal>

      <ConsultModal open={showModal} onClose={closeConsult} />
      <WhatsAppFloat />
    </div>
  );
}

export default App;
