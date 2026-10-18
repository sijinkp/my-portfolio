/** Small data-driven architecture diagram. Nodes use abstract grid coords (x: columns, y: rows 0–2). */
const BOX_W = 128;
const BOX_H = 36;
const PAD = 16;

export default function ArchitectureDiagram({ nodes, edges, title }) {
  const maxX = Math.max(...nodes.map((n) => n.x));
  const W = 640;
  const H = 250;
  const pos = Object.fromEntries(
    nodes.map((n) => [
      n.id,
      {
        ...n,
        cx: PAD + BOX_W / 2 + (n.x / (maxX || 1)) * (W - 2 * PAD - BOX_W),
        cy: PAD + BOX_H / 2 + (n.y / 2) * (H - 2 * PAD - BOX_H),
      },
    ])
  );

  const path = (a, b) => {
    const A = pos[a];
    const B = pos[b];
    if (Math.abs(A.cx - B.cx) < 2) {
      const dir = B.cy > A.cy ? 1 : -1;
      return `M${A.cx},${A.cy + (dir * BOX_H) / 2} L${B.cx},${B.cy - (dir * BOX_H) / 2}`;
    }
    const x1 = A.cx + BOX_W / 2;
    const x2 = B.cx - BOX_W / 2;
    const mx = (x1 + x2) / 2;
    return `M${x1},${A.cy} C${mx},${A.cy} ${mx},${B.cy} ${x2},${B.cy}`;
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="arch" role="img" aria-label={`Architecture overview: ${title}`}>
      {edges.map(([a, b], i) => (
        <g key={`${a}-${b}`}>
          <path d={path(a, b)} className="arch__edge" />
          <path d={path(a, b)} className="arch__flow" style={{ animationDelay: `${i * -0.4}s` }} />
        </g>
      ))}
      {Object.values(pos).map((n) => (
        <g key={n.id} className={`arch__node ${n.accent ? 'is-accent' : ''}`}>
          <rect x={n.cx - BOX_W / 2} y={n.cy - BOX_H / 2} width={BOX_W} height={BOX_H} rx="7" />
          <text x={n.cx} y={n.cy + 4.5} textAnchor="middle">{n.label}</text>
        </g>
      ))}
    </svg>
  );
}
