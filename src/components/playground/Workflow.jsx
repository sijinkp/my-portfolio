import { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

/** Visual pipeline: input → processing → output. Re-animates whenever `runKey` changes. */
export default function Workflow({ stages, runKey }) {
  const [step, setStep] = useState(-1);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!runKey) return;
    if (reduced) {
      setStep(stages.length - 1);
      return;
    }
    setStep(0);
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setStep(i);
      if (i >= stages.length - 1) clearInterval(t);
    }, 320);
    return () => clearInterval(t);
  }, [runKey, stages.length, reduced]);

  return (
    <ol className="workflow" aria-label="Processing pipeline">
      {stages.map((s, i) => (
        <li key={s.label} className={`workflow__stage ${i <= step ? 'is-done' : ''} ${i === step ? 'is-current' : ''}`}>
          <span className="workflow__num mono">{String(i + 1).padStart(2, '0')}</span>
          <span className="workflow__label">{s.label}</span>
          <span className="workflow__hint">{s.hint}</span>
        </li>
      ))}
    </ol>
  );
}
