export default function SectionHeading({ index, kicker, title, children, id }) {
  return (
    <header className="section-head" data-reveal>
      <p className="section-head__kicker">
        <span className="mono">{index}</span>
        <span className="rule" aria-hidden="true" />
        {kicker}
      </p>
      <h2 id={id} className="section-head__title">{title}</h2>
      {children && <p className="section-head__lede">{children}</p>}
    </header>
  );
}
