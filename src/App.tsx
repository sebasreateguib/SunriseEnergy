import { useState } from 'react';
import ScrollImageSequence from './components/scroll-image-sequence';
import { About } from './components/About';
import { CEO } from './components/CEO';
import { ClientsStrip } from './components/ClientsStrip';
import { ConsultModal } from './components/ConsultModal';
import { Expertise } from './components/Expertise';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PrincipalClients } from './components/PrincipalClients';
import { Projects } from './components/Projects';
import { Services } from './components/Services';

export function App() {
  const [showModal, setShowModal] = useState(false);

  const openConsult = () => setShowModal(true);
  const closeConsult = () => setShowModal(false);

  return (
    <div className="page">
      <Header onOpenConsult={openConsult} />
      <Hero onOpenConsult={openConsult} />
      <ClientsStrip />
      <ScrollImageSequence />
      <About />
      <Expertise />
      <Services />
      <Projects />
      <PrincipalClients />
      <CEO />
      <FinalCTA onOpenConsult={openConsult} />
      <Footer />

      <ConsultModal open={showModal} onClose={closeConsult} />
    </div>
  );
}

export default App;
