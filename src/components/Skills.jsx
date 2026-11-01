import { Building2, Code2, Database, Layers, Sparkles, Users, Wrench } from 'lucide-react';
import { logoFor, skillGroups } from '../data/content.js';
import Logo from './Logo.jsx';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

const icons = { sparkles: Sparkles, code: Code2, layers: Layers, database: Database, wrench: Wrench, building: Building2, users: Users };

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <SectionHeading eyebrow="Skills" title="The toolkit." intro="Deep in the Microsoft .NET stack and enterprise systems — with the leadership to deliver them, and AI-assisted throughout." />

      <div className="grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group, i) => {
          const Icon = icons[group.icon];
          return (
            <Reveal key={group.label} delay={(i % 2) * 0.08} className={`glass glass-hover rounded-[2rem] p-7 ${group.wide ? 'sm:col-span-2' : ''}`}>
              <h3 className="flex items-center gap-3 font-display text-lg font-semibold">
                <Icon size={20} className="text-accent" />
                {group.label}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2 rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] px-3.5 py-2 text-sm font-medium transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-accent"
                  >
                    <Logo name={logoFor[skill]} className="size-[18px]" />
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
