import { GraduationCap, Trophy } from 'lucide-react';
import { awards, education } from '../data/content.js';
import Reveal from './Reveal.jsx';

export default function Credentials() {
  return (
    <section aria-label="Education and awards" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid gap-5 md:grid-cols-2">
        <Card icon={GraduationCap} title="Education" items={education.map((e) => ({ key: e.degree, main: e.degree, sub: `${e.school} · ${e.note}`, side: e.year }))} />
        <Card icon={Trophy} title="Awards" delay={0.08} items={awards.map((a) => ({ key: a.event, main: a.title, sub: `${a.event} · ${a.note}` }))} />
      </div>
    </section>
  );
}

function Card({ icon: Icon, title, items, delay = 0 }) {
  return (
    <Reveal delay={delay} className="glass glass-hover rounded-[2rem] p-7 sm:p-8">
      <h2 className="flex items-center gap-3 font-display text-xl font-semibold">
        <Icon size={22} className="text-accent" />
        {title}
      </h2>
      <ul className="mt-6 space-y-5">
        {items.map((item) => (
          <li key={item.key} className="flex items-start justify-between gap-4">
            <div>
              <p className="font-medium">{item.main}</p>
              <p className="mt-0.5 text-sm text-muted">{item.sub}</p>
            </div>
            {item.side && <span className="font-mono text-sm text-subtle">{item.side}</span>}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
