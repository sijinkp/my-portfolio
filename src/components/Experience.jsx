import { Briefcase, MapPin } from 'lucide-react';
import { experience } from '../data/content.js';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <SectionHeading
        eyebrow="Experience"
        title="A decade of shipping, then leading."
        intro="From developer to team lead — building and evolving the systems a business depends on every day."
      />

      <ol className="space-y-6">
        {experience.map((job, i) => (
          <Reveal as="li" key={job.company} delay={i * 0.05} className="glass glass-hover rounded-[2rem] p-6 sm:p-10">
            <div className="flex flex-col gap-4 border-b border-[var(--glass-border)] pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500/25 to-fuchsia-500/25 text-accent ring-1 ring-[var(--glass-border)]">
                  <Briefcase size={22} />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold sm:text-2xl">{job.company}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                    <MapPin size={14} />
                    {job.location}
                  </p>
                </div>
              </div>
              <p className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--glass-border)] bg-[var(--glass)] px-3.5 py-1.5 font-mono text-xs text-muted">
                {job.current && <span className="size-1.5 rounded-full bg-emerald-400" />}
                {job.period}
              </p>
            </div>

            <ol className="relative mt-6 space-y-8 pl-7 before:absolute before:top-2 before:bottom-2 before:left-[5px] before:w-px before:bg-gradient-to-b before:from-accent before:via-[var(--accent-3)] before:to-transparent">
              {job.roles.map((role) => (
                <li key={role.title} className="relative">
                  <span className="absolute top-1.5 -left-7 size-[11px] rounded-full border-2 border-accent bg-bg" />
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h4 className="font-display text-lg font-medium">{role.title}</h4>
                    <p className="shrink-0 font-mono text-xs text-subtle">{role.period}</p>
                  </div>
                  <ul className="mt-3 space-y-2.5">
                    {role.points.map((point) => (
                      <li key={point} className="flex gap-3 leading-relaxed text-muted">
                        <span className="mt-2.5 size-1 shrink-0 rounded-full bg-accent-2" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
