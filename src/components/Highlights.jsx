import { Database, Mail, PhoneCall, ServerCog, Smartphone, Users } from 'lucide-react';
import { highlights } from '../data/content.js';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

const icons = { users: Users, database: Database, mail: Mail, phone: PhoneCall, server: ServerCog, smartphone: Smartphone };

export default function Highlights() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <SectionHeading
        eyebrow="Selected work"
        title="Things I’ve built."
        intro="Internal platforms and integrations — the kind of software that quietly saves people hours every week."
      />

      <ul className="grid gap-5 md:auto-rows-fr md:grid-cols-3">
        {highlights.map((item, i) => {
          const Icon = icons[item.icon];
          return (
            <Reveal
              as="li"
              key={item.title}
              delay={(i % 3) * 0.08}
              className={`glass glass-hover group flex flex-col rounded-[2rem] p-7 hover:-translate-y-1 ${item.size === 'lg' ? 'md:col-span-2' : ''}`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-cyan-400 text-white shadow-lg shadow-indigo-500/25 transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110">
                  <Icon size={22} />
                </span>
                <span className="text-right font-mono text-xs text-subtle">{item.org}</span>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                {item.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-[var(--glass-border)] bg-[var(--glass)] px-3 py-1 text-xs text-muted">
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
