import { useCallback, useState } from 'react';

// index.html sets data-theme before first paint; this hook just reads and toggles it.
export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark');

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#070a17' : '#eef1fb');
      try {
        localStorage.setItem('theme', next);
      } catch {
        // Storage can be blocked (private mode); the toggle still works for this visit.
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}
