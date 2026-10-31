import { useEffect } from 'react';

// One document-level listener feeds the cursor position to whichever .glass-hover card is under it.
export function useSpotlight() {
  useEffect(() => {
    const onMove = (e) => {
      const card = e.target.closest?.('.glass-hover');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);
}
