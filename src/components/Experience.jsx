import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { experience } from '../data/profile.js';
import SectionHeading from './SectionHeading.jsx';

export default function Experience() {
  const [openIdx, setOpenIdx] = useState(0);
  const listRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Fill the timeline rail as the section scrolls through the viewport.
  useEffect(() => {
    const onScroll = () => {
      const el = listRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * 0.6 - r.top) / r.height;
      setProgress(Math.max(0, Math.min(1, p)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading index="04" kicker="Experience" id="experience-title" title={<>A steady <em>trajectory.</em></>}>
          From building enterprise applications to leading a team — and now exploring how AI fits into real systems.
        </SectionHeading>

        <ol className="timeline" ref={listRef} style={{ '--progress': progress }}>
          <li className="timeline__item timeline__item--now" data-reveal>
            <span className="timeline__dot" aria-hidden="true" />
            <div className="timeline__now">
              <span className="mono">Now</span>
              <p>Exploring AI engineering, AI-powered applications and AI solution architecture.</p>
            </div>
          </li>
          {experience.map((job, i) => {
            const open = openIdx === i;
            const id = `job-${i}`;
            return (
              <li key={i} className={`timeline__item ${open ? 'is-open' : ''}`} data-reveal>
                <span className="timeline__dot" aria-hidden="true" />
                <button
                  type="button"
                  className="timeline__head"
                  aria-expanded={open}
                  aria-controls={id}
                  onClick={() => setOpenIdx(open ? -1 : i)}
                >
                  <span className="timeline__period mono">{job.period}</span>
                  <span className="timeline__role">{job.role}</span>
                  <span className="timeline__company">{job.company}</span>
                  <ChevronDown size={18} className="timeline__chev" aria-hidden="true" />
                </button>
                <div id={id} className="timeline__body" inert={open ? undefined : ''}>
                  <div className="timeline__body-inner">
                    <ul className="tags">
                      {job.focus.map((f) => (
                        <li key={f} className="tag">{f}</li>
                      ))}
                    </ul>
                    <ul className="timeline__points">
                      {job.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
