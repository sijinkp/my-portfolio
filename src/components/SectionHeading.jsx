import Reveal from './Reveal.jsx';

export default function SectionHeading({ eyebrow, title, intro }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="mb-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">{eyebrow}</p>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">{title}</h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
    </Reveal>
  );
}
