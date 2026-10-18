import { useState } from 'react';
import { Plus, Briefcase, FlaskConical } from 'lucide-react';
import { projects, asset } from '../data/profile.js';
import SectionHeading from './SectionHeading.jsx';
import ArchitectureDiagram from './ArchitectureDiagram.jsx';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'professional', label: 'Professional' },
  { id: 'prototype', label: 'Prototypes' },
];

const kindMeta = {
  professional: { label: 'Professional experience', Icon: Briefcase },
  prototype: { label: 'Personal prototype', Icon: FlaskConical },
};

function Project({ p, index }) {
  const [open, setOpen] = useState(false);
  const { label, Icon } = kindMeta[p.kind];
  const detailsId = `project-${p.id}-details`;

  return (
    <article className={`project ${open ? 'is-open' : ''}`} data-reveal aria-labelledby={`project-${p.id}-title`}>
      <div className="project__main">
        <div className="project__copy">
          <div className="project__meta">
            <span className="project__idx mono">{String(index + 1).padStart(2, '0')}</span>
            <span className={`kind kind--${p.kind}`}>
              <Icon size={13} aria-hidden="true" /> {label}
            </span>
          </div>
          <h3 id={`project-${p.id}-title`} className="project__title">{p.title}</h3>
          <p className="project__summary">{p.summary}</p>
          <ul className="tags" aria-label="Technologies">
            {p.tags.map((t) => (
              <li key={t} className="tag">{t}</li>
            ))}
          </ul>
          <button
            type="button"
            className="project__toggle"
            aria-expanded={open}
            aria-controls={detailsId}
            onClick={() => setOpen((o) => !o)}
          >
            <Plus size={16} aria-hidden="true" className="project__plus" />
            {open ? 'Hide details' : 'View details'}
          </button>
        </div>

        <figure className="project__visual">
          {p.image ? (
            <img src={asset(p.image)} alt={`${p.title} screenshot`} loading="lazy" />
          ) : (
            <ArchitectureDiagram nodes={p.diagram.nodes} edges={p.diagram.edges} title={p.title} />
          )}
          <figcaption className="mono">{p.image ? 'Screenshot' : 'Simplified architecture · illustrative'}</figcaption>
        </figure>
      </div>

      <div id={detailsId} className="project__details" inert={open ? undefined : ''}>
        <div className="project__details-inner">
          <div>
            <h4>The problem</h4>
            <p>{p.details.problem}</p>
          </div>
          <div>
            <h4>Approach</h4>
            <ul>
              {p.details.approach.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>My role</h4>
            <p>{p.details.role}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const shown = projects.filter((p) => filter === 'all' || p.kind === filter);

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading index="03" kicker="Selected Work" id="work-title" title={<>Systems that <em>businesses run on.</em></>}>
          Professional projects are generalized from real experience — no confidential details, source code or client
          information. Prototypes are personal explorations.
        </SectionHeading>

        <div className="filters" role="group" aria-label="Filter projects" data-reveal>
          {filters.map((f) => (
            <button key={f.id} type="button" aria-pressed={filter === f.id} className="filter" onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="projects">
          {shown.map((p) => (
            <Project key={p.id} p={p} index={projects.indexOf(p)} />
          ))}
        </div>
      </div>
    </section>
  );
}
