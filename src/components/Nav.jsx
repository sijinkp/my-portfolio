import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { navLinks, profile } from '../data/content.js';
import { useActiveSection } from '../hooks/useActiveSection.js';

// 'top' (the hero) is observed too, so scrolling back up clears the highlight.
const sectionIds = ['top', ...navLinks.map((l) => l.id)];

export default function Nav({ theme, onToggleTheme }) {
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const ThemeIcon = theme === 'dark' ? Sun : Moon;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        aria-label="Main"
        className={`glass mx-auto flex max-w-5xl items-center justify-between rounded-full py-2 pr-2 pl-3 transition-shadow duration-500 ${
          scrolled ? 'shadow-2xl' : ''
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5 rounded-full pr-2" aria-label={`${profile.name} — back to top`}>
          <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-cyan-400 font-display text-sm font-bold text-white">
            {profile.initials}
          </span>
          <span className="hidden font-display text-sm font-semibold sm:block">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? 'true' : undefined}
                className={`relative block rounded-full px-4 py-2 text-sm transition-colors hover:text-fg ${
                  active === link.id ? 'text-fg' : 'text-muted'
                }`}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full border border-glass-border bg-[var(--glass-strong)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-[var(--glass-strong)] hover:text-fg"
          >
            <ThemeIcon size={18} />
          </button>
          <a
            href="#contact"
            className="hidden rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-transform hover:scale-[1.03] sm:block"
          >
            Let’s talk
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-10 place-items-center rounded-full text-fg md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="glass mx-auto mt-2 max-w-5xl rounded-3xl p-2 md:hidden"
          >
            <ul>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className={`block rounded-2xl px-4 py-3 font-display text-lg ${
                      active === link.id ? 'bg-[var(--glass-strong)] text-fg' : 'text-muted'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
