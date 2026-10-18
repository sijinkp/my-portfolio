import { useState } from 'react';
import { Search } from 'lucide-react';
import { sampleQueries, semanticSearch, searchCorpus } from '../../lib/demos.js';

export default function SemanticSearch({ onRun }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const run = (q) => {
    if (!q.trim()) return;
    setQuery(q);
    setResult(semanticSearch(q));
    onRun();
  };

  return (
    <div className="demo">
      <form
        className="search-bar"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          run(query);
        }}
      >
        <Search size={16} aria-hidden="true" />
        <label htmlFor="sem-q" className="visually-hidden">Search the sample knowledge base</label>
        <input
          id="sem-q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe what you’re looking for…"
          autoComplete="off"
        />
        <button type="submit" className="btn btn--primary btn--small" disabled={!query.trim()}>Search</button>
      </form>
      <div className="chips-row">
        <span className="demo__label demo__label--inline">Try:</span>
        {sampleQueries.map((q) => (
          <button key={q} type="button" className="chip" onClick={() => run(q)}>{q}</button>
        ))}
      </div>

      <div className="demo__output" aria-live="polite">
        {!result ? (
          <p className="demo__empty">
            Searches {searchCorpus.length} sample documents by meaning — notice how results match even when the words differ.
          </p>
        ) : result.results.length === 0 ? (
          <p className="demo__empty">No related documents in this small sample set. Try one of the suggestions.</p>
        ) : (
          <>
            <p className="demo__label">
              Concepts detected: {result.concepts.join(', ')} · keyword search would find {result.keywordOnlyHits} of these{' '}
              {result.results.length}
            </p>
            <ol className="results">
              {result.results.map((r) => (
                <li key={r.id} className="result">
                  <div className="result__score" aria-label={`Similarity ${Math.round(r.score * 100)} percent`}>
                    <span style={{ '--w': r.score }} />
                    <em className="mono">{r.score.toFixed(2)}</em>
                  </div>
                  <div>
                    <strong>{r.title}</strong>
                    <p>{r.body}</p>
                    {!r.keywordHit && <span className="tag tag--explore">Matched by meaning, not keywords</span>}
                  </div>
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </div>
  );
}
