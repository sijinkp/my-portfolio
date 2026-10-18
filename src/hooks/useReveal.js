import { useEffect } from 'react';

/**
 * Sets `data-revealed` on every `[data-reveal]` element once it scrolls into view.
 * Also picks up elements mounted later (e.g. after filtering).
 */
export function useReveal() {
  useEffect(() => {
    const reveal = (el) => el.setAttribute('data-revealed', '');
    const io =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries) =>
              entries.forEach((e) => {
                if (e.isIntersecting) {
                  reveal(e.target);
                  io.unobserve(e.target);
                }
              }),
            { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
          )
        : null;

    // Tracked per effect run (not in the DOM), so a re-run after cleanup observes everything again.
    const observed = new WeakSet();
    const scan = () =>
      document.querySelectorAll('[data-reveal]:not([data-revealed])').forEach((el) => {
        if (observed.has(el)) return;
        observed.add(el);
        if (io) io.observe(el);
        else reveal(el);
      });

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.getElementById('root'), { childList: true, subtree: true });
    return () => {
      io?.disconnect();
      mo.disconnect();
    };
  }, []);
}
