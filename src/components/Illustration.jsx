import Logo from './Logo.jsx';

// Small animated "screens" for the work cards, drawn with SVG + CSS (no screenshots of confidential systems).
// Keyed by the highlight's icon name. Colours come from the theme tokens so they work in light and dark.
const stroke = 'var(--glass-border)';
const panel = 'var(--glass-strong)';

function Frame({ children, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-36 overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--glass)] ${className}`}
    >
      {children}
    </div>
  );
}

function Crm() {
  const bars = [40, 65, 50, 80, 58, 92, 70];
  return (
    <Frame>
      <svg viewBox="0 0 320 144" className="size-full">
        <rect x="0" y="0" width="64" height="144" fill={panel} />
        {[22, 42, 62, 82].map((y, i) => (
          <rect key={y} x="12" y={y} width={i === 0 ? 40 : 32} height="6" rx="3" fill={i === 0 ? 'var(--accent)' : stroke} />
        ))}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={80} y={18 + i * 22} width="14" height="14" rx="7" fill="var(--accent-3)" opacity={0.7 - i * 0.15} />
            <rect x={102} y={21 + i * 22} width={70 - i * 12} height="5" rx="2.5" fill="var(--muted)" opacity="0.6" />
            <rect x={102} y={29 + i * 22} width={44} height="4" rx="2" fill={stroke} />
          </g>
        ))}
        {bars.map((h, i) => (
          <rect
            key={i}
            className="grow-bar"
            style={{ animationDelay: `${i * 0.2}s` }}
            x={196 + i * 16}
            y={130 - h}
            width="10"
            height={h}
            rx="3"
            fill={i % 2 ? 'var(--accent-2)' : 'var(--accent)'}
            opacity="0.85"
          />
        ))}
      </svg>
    </Frame>
  );
}

function DataMerge() {
  const sources = ['Informix', 'MSSQL', 'Exchange'];
  return (
    <Frame>
      <svg viewBox="0 0 320 144" className="size-full">
        {sources.map((label, i) => {
          const y = 24 + i * 44;
          return (
            <g key={label}>
              <path d={`M86 ${y} C 150 ${y}, 160 72, 222 72`} fill="none" stroke="var(--accent)" strokeWidth="1.6" className="dash-flow" />
              <rect x="10" y={y - 13} width="76" height="26" rx="8" fill={panel} stroke={stroke} />
              <text x="48" y={y + 4} textAnchor="middle" fontSize="11" fill="var(--fg)" fontFamily="var(--font-mono)">
                {label}
              </text>
            </g>
          );
        })}
        <circle cx="262" cy="72" r="34" fill="var(--accent-strong)" opacity="0.18" className="ping" />
        <rect x="222" y="46" width="80" height="52" rx="12" fill={panel} stroke="var(--accent)" />
        <circle cx="244" cy="66" r="7" fill="var(--accent-3)" />
        <rect x="256" y="62" width="36" height="5" rx="2.5" fill="var(--muted)" />
        <rect x="234" y="80" width="58" height="4" rx="2" fill={stroke} />
      </svg>
    </Frame>
  );
}

function MailLink() {
  return (
    <Frame>
      <svg viewBox="0 0 320 144" className="size-full">
        <rect x="28" y="44" width="80" height="56" rx="8" fill={panel} stroke={stroke} />
        <path d="M30 48 L68 76 L106 48" fill="none" stroke="var(--accent)" strokeWidth="2" />
        <g className="travel">
          <circle cx="132" cy="72" r="5" fill="var(--accent-2)" />
        </g>
        <path d="M120 72 H 212" stroke={stroke} strokeWidth="1.5" strokeDasharray="3 5" />
        <rect x="216" y="34" width="84" height="76" rx="10" fill={panel} stroke="var(--accent)" />
        <circle cx="240" cy="58" r="10" fill="var(--accent-3)" opacity="0.8" />
        <rect x="256" y="52" width="34" height="5" rx="2.5" fill="var(--muted)" />
        <rect x="256" y="61" width="24" height="4" rx="2" fill={stroke} />
        {[80, 92].map((y, i) => (
          <rect key={y} className="slide-in" style={{ animationDelay: `${i * 0.4}s` }} x="228" y={y} width={60 - i * 14} height="6" rx="3" fill="var(--accent-2)" opacity="0.7" />
        ))}
      </svg>
    </Frame>
  );
}

function PhoneCalls() {
  return (
    <Frame>
      <svg viewBox="0 0 320 144" className="size-full">
        <circle cx="72" cy="72" r="22" fill="var(--accent)" opacity="0.35" className="ping" />
        <circle cx="72" cy="72" r="22" fill="var(--accent)" opacity="0.35" className="ping" style={{ animationDelay: '1.1s' }} />
        <circle cx="72" cy="72" r="22" fill="var(--accent-strong)" />
        <path
          d="M64 62c0-1 1-2 2-2h3l2 5-2 2c1 3 3 5 6 6l2-2 5 2v3c0 1-1 2-2 2-9 0-16-7-16-16z"
          fill="#fff"
        />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} className="slide-in" style={{ animationDelay: `${i * 0.35}s` }}>
            <rect x="130" y={22 + i * 26} width="170" height="20" rx="6" fill={panel} stroke={stroke} />
            <circle cx="142" cy={32 + i * 26} r="4" fill={i === 0 ? '#34d399' : 'var(--accent-2)'} />
            <rect x="152" y={29 + i * 26} width={80 - i * 8} height="5" rx="2.5" fill="var(--muted)" opacity="0.7" />
            <rect x="262" y={29 + i * 26} width="28" height="5" rx="2.5" fill={stroke} />
          </g>
        ))}
      </svg>
    </Frame>
  );
}

function ApiEndpoints() {
  const rows = [
    ['POST', '/orders', '#34d399'],
    ['GET', '/orders/{id}', 'var(--accent-2)'],
    ['PUT', '/orders/{id}', '#fbbf24'],
  ];
  return (
    <Frame className="px-4 py-4 font-mono text-[11px]">
      <div className="space-y-2.5">
        {rows.map(([method, path, color], i) => (
          <div key={path + method} className="slide-in flex items-center gap-2.5" style={{ animationDelay: `${i * 0.4}s` }}>
            <span className="w-11 rounded-md px-1.5 py-0.5 text-center font-semibold text-black" style={{ background: color }}>
              {method}
            </span>
            <span className="text-fg">{path}</span>
            <span className="ml-auto text-emerald-400">200</span>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-4 bottom-3 flex items-center gap-2 text-subtle">
        <span className="size-1.5 rounded-full bg-emerald-400 pulse-dot" />
        api · healthy
      </div>
    </Frame>
  );
}

function MobileApp() {
  return (
    <Frame className="flex items-end justify-center gap-6">
      {[0, 1].map((p) => (
        <div
          key={p}
          className={`float relative w-20 rounded-t-2xl border border-b-0 border-[var(--glass-border)] bg-[var(--glass-strong)] px-2 pt-3 ${p ? 'h-28' : 'h-32'}`}
          style={{ animationDelay: `${p * -3}s` }}
        >
          <div className="mx-auto mb-2 h-1 w-6 rounded-full bg-[var(--glass-border)]" />
          <div className={`mb-2 h-8 rounded-lg bg-gradient-to-br ${p ? 'from-cyan-400 to-indigo-500' : 'from-fuchsia-500 to-indigo-500'}`} />
          {[0, 1, 2].map((r) => (
            <div key={r} className="mb-1.5 h-1.5 rounded-full bg-[var(--muted)] opacity-40" style={{ width: `${90 - r * 18}%` }} />
          ))}
        </div>
      ))}
      <div className="float relative mb-3 w-24 self-center rounded-xl border border-[var(--glass-border)] bg-[var(--glass-strong)] p-2" style={{ animationDelay: '-1.5s' }}>
        <div className="mb-1.5 h-1.5 w-10 rounded-full bg-[var(--accent)]" />
        {[70, 50, 85].map((w) => (
          <div key={w} className="mb-1 h-1.5 rounded-full bg-[var(--muted)] opacity-40" style={{ width: `${w}%` }} />
        ))}
      </div>
    </Frame>
  );
}

function Portfolio() {
  return (
    <Frame className="h-44">
      <div className="flex items-center gap-1.5 border-b border-[var(--glass-border)] px-3 py-2">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate rounded-md bg-[var(--glass)] px-2 py-0.5 font-mono text-[10px] text-subtle">sijinkp.github.io/my-portfolio</span>
      </div>
      <div className="relative p-4">
        <div className="absolute -top-6 right-6 size-24 rounded-full bg-fuchsia-500/40 blur-2xl" />
        <div className="absolute top-8 left-10 size-20 rounded-full bg-indigo-500/40 blur-2xl" />
        <div className="relative mb-3 h-3 w-2/3 rounded-full" style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-3), var(--accent-2))' }} />
        <div className="relative grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="float h-12 rounded-lg border border-[var(--glass-border)] bg-[var(--glass-strong)]" style={{ animationDelay: `${i * -2}s` }} />
          ))}
        </div>
        <div className="relative mt-3 flex items-center gap-2">
          {['claude', 'react', 'tailwindcss', 'playwright', 'githubactions'].map((l) => (
            <span key={l} className="grid size-7 place-items-center rounded-lg border border-[var(--glass-border)] bg-[var(--glass-strong)]">
              <Logo name={l} className="size-4" />
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}

// Kanban board: one card keeps sliding from "To do" into "In progress" while counts tick by.
function TaskBoard() {
  const columns = [
    { name: 'To do', color: 'var(--subtle)', cards: [['Sales', 70], ['HR', 50]] },
    { name: 'In progress', color: 'var(--accent-2)', cards: [['Tech', 80]] },
    { name: 'Done', color: '#34d399', cards: [['Finance', 60], ['Admin', 75]] },
  ];
  return (
    <Frame className="grid grid-cols-3 gap-2 p-3">
      {columns.map((col, c) => (
        <div key={col.name} className="flex flex-col gap-1.5 rounded-xl bg-[var(--glass)] p-2">
          <p className="flex items-center gap-1.5 font-mono text-[9px] tracking-wide text-subtle uppercase">
            <span className="size-1.5 rounded-full" style={{ background: col.color }} />
            {col.name}
          </p>
          {col.cards.map(([dept, w], i) => (
            <div
              key={dept}
              className={`rounded-lg border border-[var(--glass-border)] bg-[var(--glass-strong)] p-1.5 ${c === 1 && i === 0 ? 'slide-in' : ''}`}
            >
              <span className="block font-mono text-[9px] text-accent">{dept}</span>
              <span className="mt-1 block h-1 rounded-full bg-[var(--muted)] opacity-40" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
      ))}
    </Frame>
  );
}

// Production kiosk: priority-sorted order tasks, a design preview and a progress bar that fills as work is updated.
function ProductionKiosk() {
  const tasks = [
    ['PO-1042', 'High', '#f87171'],
    ['PO-1038', 'Medium', '#fbbf24'],
    ['PO-1035', 'Low', '#34d399'],
  ];
  return (
    <Frame className="flex gap-3 p-3">
      <div className="flex flex-1 flex-col gap-1.5">
        {tasks.map(([po, prio, color], i) => (
          <div
            key={po}
            className={`flex items-center gap-2 rounded-lg border border-[var(--glass-border)] bg-[var(--glass-strong)] px-2 py-1.5 font-mono text-[10px] ${
              i === 0 ? 'ring-1 ring-[var(--accent)]' : ''
            }`}
          >
            <span className="size-1.5 shrink-0 rounded-full" style={{ background: color }} />
            <span className="text-fg">{po}</span>
            <span className="ml-auto" style={{ color }}>
              {prio}
            </span>
          </div>
        ))}
        <div className="mt-auto flex items-center gap-2">
          <span className="rounded-md bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-2 py-1 font-mono text-[9px] font-semibold text-white">START</span>
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--glass-strong)]">
            <span className="kiosk-progress block h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
          </span>
        </div>
      </div>
      <div className="hidden w-[38%] flex-col rounded-lg border border-[var(--glass-border)] bg-[var(--glass)] p-2 min-[420px]:flex">
        <p className="font-mono text-[9px] text-subtle">DESIGN · PO-1042</p>
        <svg viewBox="0 0 100 70" className="mt-1 flex-1">
          <rect x="8" y="10" width="84" height="50" fill="none" stroke="var(--accent-2)" strokeWidth="1.2" />
          <rect x="18" y="20" width="30" height="30" fill="none" stroke="var(--accent)" strokeWidth="1" className="dash-flow" />
          <circle cx="70" cy="35" r="11" fill="none" stroke="var(--accent-3)" strokeWidth="1" />
          <path d="M8 66 H92 M8 63 V69 M92 63 V69" stroke="var(--subtle)" strokeWidth="0.8" />
        </svg>
      </div>
    </Frame>
  );
}

const art = { tasks: TaskBoard, factory: ProductionKiosk, sparkles: Portfolio, users: Crm, database: DataMerge, mail: MailLink, phone: PhoneCalls, server: ApiEndpoints, smartphone: MobileApp };

export default function Illustration({ name }) {
  const Art = art[name];
  return Art ? <Art /> : null;
}
