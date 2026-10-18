import { AssistantProvider } from './lib/AssistantContext.jsx';
import { useReveal } from './hooks/useReveal.js';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Experience from './components/Experience.jsx';
import Playground from './components/Playground.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import ChatWidget from './components/ChatWidget.jsx';

export default function App() {
  useReveal();
  return (
    <AssistantProvider>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Playground />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </AssistantProvider>
  );
}
