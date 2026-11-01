import { MotionConfig } from 'motion/react';
import About from './components/About.jsx';
import AiWorkflow from './components/AiWorkflow.jsx';
import Background from './components/Background.jsx';
import Contact from './components/Contact.jsx';
import Credentials from './components/Credentials.jsx';
import Experience from './components/Experience.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Highlights from './components/Highlights.jsx';
import Nav from './components/Nav.jsx';
import Skills from './components/Skills.jsx';
import TechStrip from './components/TechStrip.jsx';
import { useSpotlight } from './hooks/useSpotlight.js';
import { useTheme } from './hooks/useTheme.js';

export default function App() {
  const { theme, toggle } = useTheme();
  useSpotlight();

  return (
    <MotionConfig reducedMotion="user">
      <Background />
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-fg px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <Nav theme={theme} onToggleTheme={toggle} />
      <main id="main" className="overflow-x-clip">
        <Hero />
        <TechStrip />
        <About />
        <Experience />
        <AiWorkflow />
        <Highlights />
        <Skills />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
