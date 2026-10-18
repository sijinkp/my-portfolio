import { useEffect, useMemo, useState } from 'react';
import { skillGroups } from '../data/profile.js';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import SectionHeading from './SectionHeading.jsx';

const W = 1000;
const H = 640;
const C = { x: W / 2, y: H / 2 };
const HUB_R = 135;

// Deterministic constellation layout: hubs around a core, skills fanned outward from each hub.
function useLayout() {
  return useMemo(() => {
    const n = skillGroups.length;
    return skillGroups.map((g, gi) => {
      const theta = -Math.PI / 2 + (gi / n) * Math.PI * 2;
      const hub = { x: C.x + Math.cos(theta) * HUB_R, y: C.y + Math.sin(theta) * HUB_R * 0.9 };
      const spread = 1.7;
      const skills = g.skills.map((label, si) => {
        const t = g.skills.length === 1 ? 0 : si / (g.skills.length - 1) - 0.5;
        const a = theta + t * spread;
        const r = si % 2 ? 150 : 105;
        const x = hub.x + Math.cos(a) * r;
        const y = hub.y + Math.sin(a) * r * 0.9;
        return { label, x, y };
      });
      return { ...g, theta, hub, skills };
    });
  }, []);
}

export default function Skills() {
  const layout = useLayout();
  const [active, setActive] = useState(skillGroups[0].id);
  const [userPicked, setUserPicked] = useState(false);
  const reduced = useReducedMotion();

  // Gently cycle through groups until the visitor interacts.
  useEffect(() => {
    if (userPicked || reduced) return;
    const t = setInterval(() => {
      setActive((cur) => {
        const i = skillGroups.findIndex((g) => g.id === cur);
        return skillGroups[(i + 1) % skillGroups.length].id;
      });
    }, 3800);
    return () => clearInterval(t);
  }, [userPicked, reduced]);

  const pick = (id) => {
    setUserPicked(true);
    setActive(id);
  };
  const current = layout.find((g) => g.id === active);

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading index="02" kicker="Skills & Technology" id="skills-title" title={<>A connected <em>toolkit.</em></>}>
          No arbitrary percentages — just the technologies I work with, how they connect, and what I’m actively learning.
        </SectionHeading>

        <div className="skills">
          <ul className="skills__groups" data-reveal>
            {layout.map((g, i) => (
              <li key={g.id}>
                <button
                  type="button"
                  className={`skills__group ${active === g.id ? 'is-active' : ''} ${g.level === 'exploring' ? 'is-exploring' : ''}`}
                  aria-pressed={active === g.id}
                  onClick={() => pick(g.id)}
                  onMouseEnter={() => pick(g.id)}
                  onFocus={() => pick(g.id)}
                >
                  <span className="mono">0{i + 1}</span>
                  <span className="skills__group-label">{g.label}</span>
                  <span className="skills__group-blurb">{g.blurb}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="skills__viz" data-reveal>
            <svg viewBox={`0 0 ${W} ${H}`} className="constellation" aria-hidden="true">
              <defs>
                <radialGradient id="coreGlow">
                  <stop offset="0" stopColor="var(--accent)" stopOpacity="0.35" />
                  <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx={C.x} cy={C.y} r="120" fill="url(#coreGlow)" />
              <circle cx={C.x} cy={C.y} r={HUB_R} className="orbit" />
              <circle cx={C.x} cy={C.y} r="300" className="orbit orbit--outer" />

              {layout.map((g) => {
                const on = g.id === active;
                return (
                  <g key={g.id} className={`cg ${on ? 'is-on' : ''} ${g.level === 'exploring' ? 'is-exploring' : ''}`}>
                    <line x1={C.x} y1={C.y} x2={g.hub.x} y2={g.hub.y} className="link link--hub" />
                    {g.skills.map((s) => (
                      <line key={s.label} x1={g.hub.x} y1={g.hub.y} x2={s.x} y2={s.y} className="link" />
                    ))}
                    {g.skills.map((s, si) => (
                      <g key={s.label} className="node" style={{ '--d': `${si * 60}ms` }}>
                        <circle cx={s.x} cy={s.y} r={on ? 7 : 4} />
                        {on && <circle cx={s.x} cy={s.y} r="16" className="node__halo" />}
                      </g>
                    ))}
                    <circle cx={g.hub.x} cy={g.hub.y} r={on ? 11 : 7} className="hub" />
                  </g>
                );
              })}
              <circle cx={C.x} cy={C.y} r="22" className="core" />
              <text x={C.x} y={C.y + 5} textAnchor="middle" className="core-label">SP</text>
            </svg>

            <div className="skills__detail" aria-live="polite">
              <p className="skills__detail-title">
                <span className="mono">{current.label}</span>
                {current.level === 'exploring' && <span className="tag tag--explore">Exploring</span>}
              </p>
              <ul className="skills__chips" key={current.id}>
                {current.skills.map((s, i) => (
                  <li key={s.label} style={{ '--d': `${i * 50}ms` }} className={current.level === 'exploring' ? 'is-exploring' : ''}>
                    {s.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
