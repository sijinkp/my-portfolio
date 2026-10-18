import { useEffect, useState } from 'react';
import { ArrowRight, Download, ArrowDown } from 'lucide-react';
import { profile } from '../data/profile.js';
import { useAssistant } from '../lib/AssistantContext.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

const introLines = [
  `Hi, I'm ${profile.firstName}'s digital representative.`,
  `Ask me about ${profile.experienceYears} years of building enterprise software.`,
  'Or what I’m exploring in AI. Click me to chat.',
];

function useTypewriter(lines, reduced) {
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(reduced ? lines[0].length : 0);

  useEffect(() => {
    if (reduced) {
      const t = setInterval(() => setLine((l) => (l + 1) % lines.length), 4500);
      return () => clearInterval(t);
    }
    const full = lines[line];
    if (chars < full.length) {
      const t = setTimeout(() => setChars((c) => c + 1), 28);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLine((l) => (l + 1) % lines.length);
      setChars(0);
    }, 2600);
    return () => clearTimeout(t);
  }, [chars, line, lines, reduced]);

  return reduced ? lines[line] : lines[line].slice(0, chars);
}

export default function Hero() {
  const { open, setOpen, thinking } = useAssistant();
  const [hover, setHover] = useState(false);
  const reduced = useReducedMotion();
  const typed = useTypewriter(introLines, reduced);
  const mood = thinking ? 'thinking' : open ? 'listening' : hover ? 'hover' : 'idle';

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          {profile.status.show && (
            <p className="status" data-reveal>
              <span className="status__dot" aria-hidden="true" />
              {profile.status.label}
            </p>
          )}

          <p className="hero__eyebrow" data-reveal>
            <span>{profile.name}</span>
            <span className="sep" aria-hidden="true">/</span>
            <span>{profile.title}</span>
            <span className="sep" aria-hidden="true">/</span>
            <span>{profile.specialty}</span>
          </p>

          <h1 id="hero-title" className="hero__title" data-reveal>
            <span className="line">{profile.headline[0]}</span>
            <span className="line line--accent">{profile.headline[1]}</span>
          </h1>

          <p className="hero__intro" data-reveal>{profile.intro}</p>

          <div className="hero__actions" data-reveal>
            <a href="#work" className="btn btn--primary">
              Explore My Work <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href="#contact" className="btn">Let's Connect</a>
            <a href={profile.cvUrl} className="btn btn--ghost" download>
              <Download size={16} aria-hidden="true" /> Download CV
            </a>
          </div>
        </div>

        <div className="hero__visual" data-reveal>
          <button
            type="button"
            className="portrait"
            data-mood={mood}
            onClick={() => setOpen(true)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onFocus={() => setHover(true)}
            onBlur={() => setHover(false)}
            aria-label={`Open chat with ${profile.firstName}'s digital representative`}
            aria-controls="chat-window"
            aria-expanded={open}
          >
            <span className="portrait__glow" aria-hidden="true" />
            <picture>
              <source srcSet={profile.portrait.webp} type="image/webp" />
              <img
                className="portrait__img"
                src={profile.portrait.png}
                width={profile.portrait.width}
                height={profile.portrait.height}
                alt={`Portrait of ${profile.name}`}
                fetchpriority="high"
                decoding="async"
              />
            </picture>
          </button>
          <div className="speech" aria-hidden="true">
            <span className="speech__label">{profile.firstName}.ai</span>
            <p>
              {typed}
              <span className="caret" />
            </p>
          </div>
          <div className="hero__coords" aria-hidden="true">
            <span>C# · .NET · SQL Server</span>
            <span>REST · React · AI</span>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to About section">
        <span>Scroll</span>
        <ArrowDown size={14} aria-hidden="true" />
      </a>
    </section>
  );
}
