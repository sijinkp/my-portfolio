import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { profile } from '../data/profile.js';
import { useActiveSection } from '../hooks/useActiveSection.js';

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'playground', label: 'AI Lab' },
  { id: 'contact', label: 'Contact' },
];
const ids = ['top', ...navItems.map((n) => n.id)];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.classList.add('no-scroll');
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
  }, [menuOpen]);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-open' : ''}`}>
      <div className="nav__inner container">
        <a href="#top" className="nav__brand" aria-label={`${profile.name} — back to top`}>
          <span className="nav__mark" aria-hidden="true">{profile.initials}</span>
          <span className="nav__name">{profile.name}</span>
        </a>

        <nav aria-label="Primary" id="primary-nav" className="nav__links">
          <ul>
            {navItems.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={active === item.id ? 'is-active' : ''}
                  aria-current={active === item.id ? 'true' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="nav__idx" aria-hidden="true">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#contact" className="btn btn--small nav__cta">Let's Connect</a>

        <button
          type="button"
          className="nav__toggle icon-btn"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
