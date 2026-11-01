import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Download, Linkedin, Mail, MapPin } from 'lucide-react';
import { contact, profile, stats, yearsExperience } from '../data/content.js';
import Logo from './Logo.jsx';

const ease = [0.22, 1, 0.36, 1];
const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

export default function Hero() {
  return (
    <section id="top" className="relative mx-auto max-w-6xl px-4 pt-32 pb-16 sm:px-6 sm:pt-40 md:pb-24">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          {profile.status && (
            <motion.p {...fadeUp(0)} className="glass mb-7 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm text-muted">
              <span className="pulse-dot size-2 rounded-full bg-emerald-400" />
              {profile.status}
            </motion.p>
          )}

          <motion.h1 {...fadeUp(0.08)} className="font-display text-[2.6rem] leading-[1.04] font-semibold tracking-tight sm:text-6xl lg:text-[3.6rem] xl:text-6xl">
            Hi, I’m {profile.firstName}.
            <span className="mt-2 block text-balance text-gradient">I build software businesses run on.</span>
          </motion.h1>

          <motion.p {...fadeUp(0.16)} className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
            {profile.summary}
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-3 font-medium text-white shadow-[0_10px_30px_-10px_rgb(129_140_248/0.8)] transition-transform hover:scale-[1.03]"
            >
              See my work
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={profile.cvUrl}
              download="Sijin-Prakasan-CV.pdf"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-transform hover:scale-[1.03]"
            >
              <Download size={18} />
              Download CV
            </a>
          </motion.div>

          <motion.ul {...fadeUp(0.32)} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-accent" />
              {profile.location}
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-fg">
                <Mail size={16} className="text-accent" />
                {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-fg">
                <Linkedin size={16} className="text-accent" />
                LinkedIn
              </a>
            </li>
          </motion.ul>
        </div>

        <HeroVisual />
      </div>

      <motion.dl {...fadeUp(0.45)} className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 md:mt-24 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass glass-hover flex flex-col rounded-3xl p-5 sm:p-6">
            <dt className="order-2 mt-1 text-sm text-muted">{s.label}</dt>
            <dd className="font-display text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">{s.value}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}

// Syntax-coloured C# "about me" in a glass editor window. Each line is a list of [className, text] tokens.
const k = 'text-[#c4b5fd]'; // keyword
const t = 'text-[#67e8f9]'; // type
const s = 'text-[#f0abfc]'; // string
const n = 'text-[#fcd34d]'; // number
const m = 'text-[#93c5fd]'; // member
const p = 'text-[#a6adcc]'; // punctuation
const c = 'text-[#8c93b5] italic'; // comment

const code = [
  [[c, '// Hello, world 👋']],
  [[k, 'public class '], [t, 'SijinPrakasan'], [p, ' : '], [t, 'SeniorEngineer']],
  [[p, '{']],
  [[k, '  public string '], [m, 'Location'], [p, ' =>']],
  [[s, `    "${profile.location}"`], [p, ';']],
  [[k, '  public int '], [m, 'Years'], [p, ' => '], [n, String(yearsExperience)], [p, ';']],
  [[k, '  public string '], [m, 'Role'], [p, ' => '], [s, '"Technical Lead"'], [p, ';']],
  [[k, '  public string'], [p, '[] '], [m, 'Stack'], [p, ' =>']],
  [[p, '    ['], [s, '".NET"'], [p, ', '], [s, '"C#"'], [p, ', '], [s, '"SQL"'], [p, ', '], [s, '"React"'], [p, '];']],
  [[k, '  public string'], [p, '[] '], [m, 'AiTools'], [p, ' =>']],
  [[p, '    ['], [s, '"Claude Code"'], [p, ', '], [s, '"ChatGPT"'], [p, '];']],
  [],
  [[k, '  public '], [t, 'Solution'], [m, ' Deliver'], [p, '('], [t, 'Requirement'], [p, ' req)']],
  [[p, '    => '], [m, 'Design'], [p, '(req).'], [m, 'Plan'], [p, '().'], [m, 'Build'], [p, '().'], [m, 'Ship'], [p, '();']],
  [[p, '}']],
];

function CodeWindow() {
  return (
    <figure
      className="glass glow-border overflow-hidden rounded-[2rem]"
      style={{ background: 'linear-gradient(145deg, rgb(20 24 56 / 0.85), rgb(9 12 30 / 0.8))' }}
      aria-label={`${profile.name}, written as a C# class`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-[#8c93b5]">SijinPrakasan.cs</span>
      </div>
      <pre className="overflow-x-auto px-4 py-6 font-mono [font-variant-ligatures:none] text-[10.5px] sm:px-5 leading-[1.9] sm:text-[13px]">
        <code>
          {code.map((line, i) => (
            <span key={i} className="flex">
              <span aria-hidden="true" className="mr-3 w-4 shrink-0 sm:mr-5 text-right text-[#4b5277] select-none">
                {i + 1}
              </span>
              <span>
                {line.map(([cls, text], j) => (
                  <span key={j} className={cls}>
                    {text}
                  </span>
                ))}
                {line.length === 0 && ' '}
                {i === code.length - 1 && <span aria-hidden="true" className="caret ml-1 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-[#a5b4fc]" />}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}

// Code window that tilts gently toward the pointer, with floating glass chips.
function HeroVisual() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), { stiffness: 150, damping: 18 });

  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.15, ease }}
      className="relative mx-auto w-full max-w-[22rem] [perspective:1200px] sm:max-w-sm lg:max-w-none"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="relative">
        <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-indigo-500/40 via-fuchsia-500/30 to-cyan-400/40 blur-3xl" />
        <CodeWindow />

        <FloatingChip className="-top-7 right-2 sm:-right-6" delay={0.7} depth={60}>
          <span className="font-display text-2xl font-semibold text-gradient">{yearsExperience}+</span>
          <span className="text-xs leading-tight text-muted">
            years in
            <br />
            enterprise software
          </span>
        </FloatingChip>

        <FloatingChip className="right-2 -bottom-6 sm:-right-8" delay={0.85} depth={50} floatDelay={-2}>
          <span className="size-2 rounded-full bg-fuchsia-400" />
          <span className="text-sm font-medium">Technical Lead · .NET · AI-first</span>
        </FloatingChip>

        <FloatingChip className="-bottom-7 -left-8 hidden lg:block" delay={1} depth={70} floatDelay={-4}>
          {['claude', 'openai', 'dotnet', 'sqlserver'].map((l) => (
            <span key={l} className="grid size-9 place-items-center rounded-xl bg-[var(--glass-strong)] text-fg">
              <Logo name={l} className="size-5" />
            </span>
          ))}
        </FloatingChip>
      </motion.div>
    </motion.div>
  );
}

// Outer element: entrance + 3D depth (Motion owns its transform). Inner element: the CSS bobbing loop.
function FloatingChip({ children, className, delay, depth, floatDelay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease }}
      style={{ z: depth }}
      className={`absolute ${className}`}
    >
      <div className="glass float flex items-center gap-2.5 rounded-2xl px-4 py-3" style={{ animationDelay: `${floatDelay}s` }}>
        {children}
      </div>
    </motion.div>
  );
}
