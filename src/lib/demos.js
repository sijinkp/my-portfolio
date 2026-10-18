/**
 * Local, dependency-free engines for the AI Playground.
 * These are honest simulations: classic NLP techniques that run in the browser.
 * Each function has the same shape a real AI-backed service would have, so it can be
 * swapped for an API call later (e.g. `summarize = (text) => fetch('/api/summarize', …)`).
 */

const STOP = new Set(
  'a an the and or but if then so of to in on at by for with from as is are was were be been being it its this that these those there their they them we our you your i me my he she his her not no do does did done have has had will would can could should may might must shall also into over under about than too very just more most some such only own same other any each few both all which who whom what when where why how up out off again further once here s t'.split(
    ' '
  )
);

const tokenize = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));

const stem = (w) => w.replace(/(ing|ed|es|s)$/, '');

/* ───────────── Extractive summarizer ───────────── */

export const sampleDocument = `Sample text (fictional): The operations team reported that customer records are duplicated across three internal systems. Sales staff often update one system but not the others, so contact details quickly drift out of date. As a result, account managers spend time each week checking which phone number or email address is correct. The team also noted that the current search only matches exact names, which makes it hard to find records with spelling variations. A proposal was made to centralize contact data behind a single API and introduce duplicate detection with a guided merge workflow. Access rules must be respected, because some records are visible only to specific regional teams. The first phase will focus on the contact service and merge workflow, while reporting improvements are planned for a later phase. Stakeholders agreed that the change should be rolled out gradually so daily work is not disrupted.`;

export function summarize(text, maxSentences = 3) {
  const sentences = (text.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [])
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length > 3);

  if (sentences.length === 0) return { summary: [], keywords: [], ratio: 0, sentenceCount: 0 };

  const freq = new Map();
  tokenize(text).forEach((w) => {
    const k = stem(w);
    freq.set(k, (freq.get(k) || 0) + 1);
  });
  const max = Math.max(...freq.values());

  const scored = sentences.map((s, index) => {
    const words = tokenize(s).map(stem);
    const score = words.reduce((acc, w) => acc + (freq.get(w) || 0) / max, 0) / Math.sqrt(words.length || 1);
    // Light position bias: opening sentences tend to carry context.
    return { s, index, score: score * (index === 0 ? 1.15 : 1) };
  });

  const n = Math.min(maxSentences, sentences.length);
  const summary = [...scored]
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .sort((a, b) => a.index - b.index)
    .map((x) => x.s);

  const keywords = [...freq.entries()]
    .filter(([w]) => w.length > 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([w]) => w);

  const summaryLen = summary.join(' ').length;
  return {
    summary,
    keywords,
    sentenceCount: sentences.length,
    ratio: Math.round((1 - summaryLen / text.length) * 100),
  };
}

/* ───────────── Simulated semantic search ───────────── */

// Concept clusters stand in for embeddings: words in the same cluster are "close" in meaning.
const CONCEPTS = {
  customer: ['customer', 'client', 'contact', 'account', 'person', 'people', 'relationship', 'crm'],
  duplicate: ['duplicate', 'dedupe', 'merge', 'same', 'twice', 'repeated', 'combine', 'clean'],
  speed: ['slow', 'fast', 'performance', 'latency', 'speed', 'optimize', 'optimization', 'timeout', 'lag', 'quick'],
  access: ['permission', 'access', 'security', 'role', 'visible', 'authorize', 'authorization', 'private', 'restrict'],
  auth: ['login', 'signin', 'password', 'authentication', 'credential', 'token', 'sso'],
  report: ['report', 'dashboard', 'chart', 'forecast', 'insight', 'analytics', 'graph', 'metric', 'kpi'],
  integration: ['api', 'integration', 'endpoint', 'connect', 'sync', 'rest', 'webhook', 'interface'],
  data: ['database', 'sql', 'query', 'table', 'index', 'stored', 'procedure', 'schema', 'migration', 'data'],
  legacy: ['legacy', 'old', 'modernize', 'modernization', 'upgrade', 'rewrite', 'refactor', 'outdated'],
  mobile: ['mobile', 'phone', 'app', 'desktop', 'web', 'client', 'device'],
  ai: ['ai', 'model', 'llm', 'assistant', 'chatbot', 'embedding', 'semantic', 'intelligent', 'agent'],
  find: ['search', 'find', 'lookup', 'locate', 'discover', 'match', 'filter'],
};

const wordToConcept = new Map();
Object.entries(CONCEPTS).forEach(([c, words]) => words.forEach((w) => wordToConcept.set(w, c)));

const conceptVector = (text) => {
  const v = new Map();
  tokenize(text).forEach((w) => {
    const c = wordToConcept.get(w) || wordToConcept.get(stem(w)) || wordToConcept.get(w.replace(/s$/, ''));
    if (c) v.set(c, (v.get(c) || 0) + 1);
  });
  return v;
};

const cosine = (a, b) => {
  let dot = 0;
  a.forEach((x, k) => (dot += x * (b.get(k) || 0)));
  const norm = (v) => Math.sqrt([...v.values()].reduce((s, x) => s + x * x, 0));
  const d = norm(a) * norm(b);
  return d ? dot / d : 0;
};

export const searchCorpus = [
  { id: 1, title: 'Merging duplicate client records', body: 'Guided workflow to combine repeated contact entries while keeping history intact.' },
  { id: 2, title: 'Speeding up slow report queries', body: 'Index tuning and stored procedure optimization for dashboard performance.' },
  { id: 3, title: 'Role-based visibility rules', body: 'Restrict which teams can see private account data based on permission.' },
  { id: 4, title: 'Single sign-on for internal tools', body: 'Authentication with tokens so staff log in once across applications.' },
  { id: 5, title: 'REST endpoints for mobile apps', body: 'API layer that lets phone and desktop clients sync shared data.' },
  { id: 6, title: 'Sales forecast dashboard', body: 'Charts and forecasts that give managers insight into the pipeline.' },
  { id: 7, title: 'Moving off an outdated desktop system', body: 'Incremental modernization plan for a legacy application and its database schema.' },
  { id: 8, title: 'Finding people with spelling variations', body: 'Fuzzy lookup so users can locate a contact even when names are misspelled.' },
  { id: 9, title: 'Assistant that answers policy questions', body: 'An LLM-based chatbot grounded on internal documents using embeddings.' },
  { id: 10, title: 'Nightly data migration job', body: 'Moves records between SQL tables with validation and rollback.' },
];

const corpusVectors = searchCorpus.map((d) => ({ doc: d, vec: conceptVector(`${d.title} ${d.title} ${d.body}`) }));

export const sampleQueries = ['customers listed twice', 'dashboards are laggy', 'who can view an account', 'old software upgrade'];

export function semanticSearch(query) {
  const qv = conceptVector(query);
  const qWords = new Set(tokenize(query));
  const concepts = [...qv.keys()];
  const results = corpusVectors
    .map(({ doc, vec }) => {
      const docWords = tokenize(`${doc.title} ${doc.body}`);
      return {
        ...doc,
        score: cosine(qv, vec),
        keywordHit: docWords.some((w) => qWords.has(w)),
        matched: concepts.filter((c) => vec.has(c)),
      };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
  return { concepts, results, keywordOnlyHits: results.filter((r) => r.keywordHit).length };
}
