import { ArrowUp } from 'lucide-react';
import { profile } from '../data/content.js';

export default function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--glass-border)] pt-8 text-sm text-subtle sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <a href="#top" className="inline-flex items-center gap-1.5 hover:text-fg">
          Back to top
          <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}
