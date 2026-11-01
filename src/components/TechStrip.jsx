import { techStrip } from '../data/content.js';
import Logo from './Logo.jsx';
import Reveal from './Reveal.jsx';

export default function TechStrip() {
  return (
    <section aria-label="Technologies and tools I work with" className="py-6">
      <Reveal>
        <p className="mb-6 text-center font-mono text-xs tracking-[0.2em] text-subtle uppercase">Technologies & tools I work with</p>
        <div className="marquee space-y-4 overflow-hidden">
          {techStrip.map((row, r) => (
            // The list is rendered twice so the -50% slide loops seamlessly; the copy is hidden from screen readers.
            <div key={r} className="marquee-track gap-4" data-reverse={r % 2 ? '' : undefined}>
              {[...row, ...row].map((item, i) => (
                <span
                  key={i}
                  aria-hidden={i >= row.length || undefined}
                  className="glass flex items-center gap-3 rounded-2xl px-5 py-3 whitespace-nowrap transition-transform duration-300 hover:-translate-y-1"
                >
                  <Logo name={item.logo} className="size-7" />
                  <span className="font-medium">{item.label}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
