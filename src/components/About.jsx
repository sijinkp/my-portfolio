import { about } from '../data/content.js';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <SectionHeading eyebrow="About" title="Requirements in, reliable software out." />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="glass glass-hover rounded-[2rem] p-7 sm:p-10">
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="glass glass-hover rounded-[2rem] p-7 sm:p-10">
          <dl className="divide-y divide-[var(--glass-border)]">
            {about.facts.map((f) => (
              <div key={f.label} className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0">
                <dt className="font-mono text-xs tracking-[0.15em] text-subtle uppercase">{f.label}</dt>
                <dd className="font-display text-lg font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
