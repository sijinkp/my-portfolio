import { Database, Mail, PhoneCall, ServerCog, Smartphone, Sparkles, Users } from 'lucide-react';
import { highlights, logoFor } from '../data/content.js';
import Illustration from './Illustration.jsx';
import Logo from './Logo.jsx';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

const icons = { sparkles: Sparkles, users: Users, database: Database, mail: Mail, phone: PhoneCall, server: ServerCog, smartphone: Smartphone };
const spans = { lg: 'md:col-span-2', full: 'md:col-span-3' };

export default function Highlights() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <SectionHeading
        eyebrow="Selected work"
        title="Things I’ve built."
        intro="Enterprise platforms and integrations that quietly save people hours every week — and, lately, projects built AI-first."
      />

      <ul className="grid gap-5 md:grid-cols-3">
        {highlights.map((item, i) => {
          const Icon = icons[item.icon];
          const full = item.size === 'full';
          return (
            <Reveal
              as="li"
              key={item.title}
              delay={(i % 3) * 0.08}
              className={`glass glass-hover group flex flex-col gap-6 rounded-[2rem] p-6 hover:-translate-y-1 sm:p-7 ${spans[item.size] ?? ''} ${
                full ? 'glow-border md:flex-row-reverse md:items-stretch' : ''
              }`}
            >
              <div className={full ? 'md:w-[45%] md:self-center' : ''}>
                <Illustration name={item.icon} />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-cyan-400 text-white shadow-lg shadow-indigo-500/25 transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110">
                    <Icon size={22} />
                  </span>
                  <span className="text-right font-mono text-xs text-subtle">{item.org}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="flex items-center gap-1.5 rounded-full border border-[var(--glass-border)] bg-[var(--glass)] px-3 py-1 text-xs text-muted"
                    >
                      <Logo name={logoFor[tag]} className="size-3.5" />
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
