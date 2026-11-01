import { CheckCircle2, Code2, ListChecks, Palette, Sparkles } from 'lucide-react';
import { aiWorkflow, logoFor } from '../data/content.js';
import Logo from './Logo.jsx';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

const icons = { design: Palette, plan: ListChecks, build: Code2, verify: CheckCircle2 };

export default function AiWorkflow() {
  return (
    <section id="ai" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <SectionHeading
        eyebrow="How I work"
        title={
          <>
            Engineering experience, <span className="text-gradient">amplified by AI.</span>
          </>
        }
        intro="AI is part of every stage of my projects — from the first sketch to the final deploy. The tools move fast; the judgement about what’s right for the business stays mine."
      />

      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {aiWorkflow.steps.map((step, i) => {
          const Icon = icons[step.icon];
          return (
            <Reveal as="li" key={step.title} delay={i * 0.08} className="glass glass-hover flex flex-col rounded-[2rem] p-7">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-cyan-400 text-white shadow-lg shadow-indigo-500/25">
                  <Icon size={22} />
                </span>
                <span className="font-mono text-sm text-subtle">0{i + 1}</span>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
            </Reveal>
          );
        })}
      </ol>

      <Reveal delay={0.2} className="glass mt-5 flex flex-col gap-4 rounded-[2rem] p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-7">
        <p className="flex shrink-0 items-center gap-2.5 font-display font-semibold">
          <Sparkles size={20} className="text-accent" />
          In my toolkit every day
        </p>
        <ul className="flex flex-wrap gap-2">
          {aiWorkflow.tools.map((tool) => (
            <li
              key={tool}
              className="flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass)] px-3.5 py-1.5 text-sm font-medium"
            >
              <Logo name={logoFor[tool]} className="size-4" />
              {tool}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
