import { useRef, useState } from 'react';
import { MessageSquare, FileText, Search } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import ChatPanel from './ChatPanel.jsx';
import Summarizer from './playground/Summarizer.jsx';
import SemanticSearch from './playground/SemanticSearch.jsx';
import Workflow from './playground/Workflow.jsx';
import { useAssistant } from '../lib/AssistantContext.jsx';

const demos = [
  {
    id: 'assistant',
    label: 'AI Assistant',
    Icon: MessageSquare,
    note: 'Intent matching over a local knowledge base. Ready to swap for a real LLM via a server endpoint.',
    stages: [
      { label: 'Question', hint: 'Natural language input' },
      { label: 'Intent detection', hint: 'Classify what is being asked' },
      { label: 'Knowledge lookup', hint: 'Profile data on this site' },
      { label: 'Response', hint: 'Grounded answer' },
    ],
  },
  {
    id: 'summarizer',
    label: 'Text Summarizer',
    Icon: FileText,
    note: 'Extractive summarization (word-frequency scoring) running entirely in your browser.',
    stages: [
      { label: 'Raw text', hint: 'Any paragraph' },
      { label: 'Tokenize', hint: 'Split & remove stop words' },
      { label: 'Score sentences', hint: 'Term frequency weighting' },
      { label: 'Summary', hint: 'Top sentences, in order' },
    ],
  },
  {
    id: 'search',
    label: 'Semantic Search',
    Icon: Search,
    note: 'Simulated embeddings: words map to concept clusters, ranked by cosine similarity.',
    stages: [
      { label: 'Query', hint: 'What you typed' },
      { label: 'Vectorize', hint: 'Map words → concepts' },
      { label: 'Similarity', hint: 'Cosine vs. each document' },
      { label: 'Ranked results', hint: 'Closest meaning first' },
    ],
  },
];

export default function Playground() {
  const [active, setActive] = useState('assistant');
  const [runs, setRuns] = useState({ assistant: 0, summarizer: 0, search: 0 });
  const tabRefs = useRef([]);
  const { messages } = useAssistant();
  const demo = demos.find((d) => d.id === active);
  const bump = (id) => setRuns((r) => ({ ...r, [id]: r[id] + 1 }));

  const onKeyDown = (e, i) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + demos.length) % demos.length;
    setActive(demos[next].id);
    tabRefs.current[next]?.focus();
  };

  // The assistant pipeline animates on every new user message.
  const assistantRunKey = messages.filter((m) => m.role === 'user').length;
  const runKey = active === 'assistant' ? assistantRunKey : runs[active];

  return (
    <section id="playground" className="section section--lab" aria-labelledby="playground-title">
      <div className="container">
        <SectionHeading index="05" kicker="AI Playground" id="playground-title" title={<>Beyond Traditional <em>Software.</em></>}>
          Small, working experiments in AI-style interfaces. Everything here runs locally in your browser — clearly
          labelled demos, structured so real AI services can be plugged in later.
        </SectionHeading>

        <div className="lab" data-reveal>
          <div className="lab__tabs" role="tablist" aria-label="AI demos">
            {demos.map((d, i) => (
              <button
                key={d.id}
                ref={(el) => (tabRefs.current[i] = el)}
                role="tab"
                id={`tab-${d.id}`}
                aria-selected={active === d.id}
                aria-controls={`panel-${d.id}`}
                tabIndex={active === d.id ? 0 : -1}
                className="lab__tab"
                onClick={() => setActive(d.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                <d.Icon size={15} aria-hidden="true" />
                {d.label}
              </button>
            ))}
            <span className="lab__demo-badge mono">Demo · runs offline</span>
          </div>

          <Workflow stages={demo.stages} runKey={runKey} key={demo.id} />

          <div className="lab__panel" role="tabpanel" id={`panel-${demo.id}`} aria-labelledby={`tab-${demo.id}`}>
            <p className="lab__note">{demo.note}</p>
            {active === 'assistant' && <ChatPanel compact />}
            {active === 'summarizer' && <Summarizer onRun={() => bump('summarizer')} />}
            {active === 'search' && <SemanticSearch onRun={() => bump('search')} />}
          </div>
        </div>
      </div>
    </section>
  );
}
