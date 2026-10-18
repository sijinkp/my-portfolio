import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { sampleDocument, summarize } from '../../lib/demos.js';

export default function Summarizer({ onRun }) {
  const [text, setText] = useState(sampleDocument);
  const [length, setLength] = useState(3);
  const [result, setResult] = useState(null);

  const run = (e) => {
    e.preventDefault();
    setResult(summarize(text, length));
    onRun();
  };

  return (
    <form className="demo demo--split" onSubmit={run}>
      <div className="demo__input">
        <label htmlFor="sum-text" className="demo__label">Text to summarize — edit it or paste your own</label>
        <textarea id="sum-text" value={text} onChange={(e) => setText(e.target.value)} rows={9} />
        <div className="demo__row">
          <label htmlFor="sum-len" className="demo__label demo__label--inline">
            Sentences: <strong>{length}</strong>
          </label>
          <input id="sum-len" type="range" min="1" max="5" value={length} onChange={(e) => setLength(Number(e.target.value))} />
          <button type="submit" className="btn btn--primary btn--small" disabled={text.trim().length < 40}>
            <Sparkles size={14} aria-hidden="true" /> Summarize
          </button>
        </div>
      </div>

      <div className="demo__output" aria-live="polite">
        {!result ? (
          <p className="demo__empty">Run the summarizer to see the key sentences extracted from the text.</p>
        ) : result.summary.length === 0 ? (
          <p className="demo__empty">Add a few complete sentences to summarize.</p>
        ) : (
          <>
            <p className="demo__label">Summary · {result.ratio}% shorter</p>
            <ul className="summary">
              {result.summary.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="demo__label">Key terms</p>
            <ul className="tags">
              {result.keywords.map((k) => (
                <li key={k} className="tag">{k}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </form>
  );
}
