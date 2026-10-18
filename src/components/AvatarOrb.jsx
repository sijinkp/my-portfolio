import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

const ACCENT = [200, 245, 96];
const POINTS = 460;

// Evenly distributed points on a unit sphere (Fibonacci lattice).
const sphere = Array.from({ length: POINTS }, (_, i) => {
  const y = 1 - (i / (POINTS - 1)) * 2;
  const r = Math.sqrt(1 - y * y);
  const t = i * Math.PI * (3 - Math.sqrt(5));
  return [Math.cos(t) * r, y, Math.sin(t) * r];
});

/**
 * Abstract "digital representative": a point-cloud sphere with a simple face.
 * `mood`: 'idle' | 'hover' | 'thinking' | 'listening'
 */
export default function AvatarOrb({ mood = 'idle', size = 420, className = '' }) {
  const canvasRef = useRef(null);
  const moodRef = useRef(mood);
  const reduced = useReducedMotion();
  moodRef.current = mood;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;

    const state = {
      angle: 0.6,
      tiltX: 0,
      tiltY: 0,
      targetX: 0,
      targetY: 0,
      radius: 1,
      speed: 0.0035,
      glow: 0.5,
      blink: 0,
      nextBlink: performance.now() + 2500,
      pulse: 0,
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointer = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - (rect.left + rect.width / 2)) / window.innerWidth;
      const ny = (e.clientY - (rect.top + rect.height / 2)) / window.innerHeight;
      state.targetX = Math.max(-1, Math.min(1, nx * 2));
      state.targetY = Math.max(-1, Math.min(1, ny * 2));
    };

    const draw = (now) => {
      const m = moodRef.current;
      const goalRadius = m === 'hover' ? 1.07 : m === 'thinking' ? 1.02 : 1;
      const goalSpeed = m === 'thinking' ? 0.016 : m === 'hover' ? 0.006 : 0.0035;
      const goalGlow = m === 'thinking' ? 0.95 : m === 'hover' || m === 'listening' ? 0.8 : 0.5;
      state.radius += (goalRadius - state.radius) * 0.08;
      state.speed += (goalSpeed - state.speed) * 0.05;
      state.glow += (goalGlow - state.glow) * 0.06;
      state.tiltX += (state.targetX - state.tiltX) * 0.05;
      state.tiltY += (state.targetY - state.tiltY) * 0.05;
      state.angle += reduced ? 0 : state.speed;
      state.pulse = reduced ? 0 : Math.sin(now / (m === 'thinking' ? 180 : 900)) * (m === 'thinking' ? 0.025 : 0.012);

      if (!reduced && now > state.nextBlink) {
        state.blink = 1;
        state.nextBlink = now + 2800 + Math.random() * 3200;
      }
      state.blink = Math.max(0, state.blink - 0.12);

      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.37 * (state.radius + state.pulse);
      ctx.clearRect(0, 0, w, h);

      // Core glow
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.6);
      g.addColorStop(0, `rgba(${ACCENT}, ${0.16 * state.glow})`);
      g.addColorStop(0.45, `rgba(${ACCENT}, ${0.05 * state.glow})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Orbit ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.35 + state.tiltX * 0.2);
      ctx.beginPath();
      ctx.ellipse(0, 0, R * 1.32, R * 0.3, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${ACCENT}, ${0.12 + 0.1 * state.glow})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      const sat = state.angle * 2.2;
      ctx.beginPath();
      ctx.arc(Math.cos(sat) * R * 1.32, Math.sin(sat) * R * 0.3, 2.6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${ACCENT}, 0.9)`;
      ctx.fill();
      ctx.restore();

      // Point sphere
      const ay = state.angle + state.tiltX * 0.6;
      const ax = 0.25 + state.tiltY * 0.5;
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      const cosX = Math.cos(ax);
      const sinX = Math.sin(ax);
      for (let i = 0; i < POINTS; i++) {
        const [px, py, pz] = sphere[i];
        const x1 = px * cosY - pz * sinY;
        const z1 = px * sinY + pz * cosY;
        const y2 = py * cosX - z1 * sinX;
        const z2 = py * sinX + z1 * cosX;
        const depth = (z2 + 1) / 2; // 0 back → 1 front
        const persp = 1 / (1.9 - z2 * 0.5);
        const sx = cx + x1 * R * persp * 1.3;
        const sy = cy + y2 * R * persp * 1.3;
        const a = 0.08 + depth * 0.75;
        const s = 0.5 + depth * 1.35;
        ctx.fillStyle =
          depth > 0.55 ? `rgba(${ACCENT}, ${a * (0.55 + state.glow * 0.5)})` : `rgba(170, 178, 190, ${a * 0.6})`;
        ctx.fillRect(sx - s / 2, sy - s / 2, s, s);
      }

      // Face: two soft capsule "eyes" that follow the pointer
      const eyeH = (m === 'thinking' ? 4 : 15) * (1 - state.blink * 0.9);
      const eyeW = 9;
      const ex = cx + state.tiltX * R * 0.18;
      const ey = cy + state.tiltY * R * 0.14 - R * 0.04;
      ctx.fillStyle = 'rgba(244, 247, 238, 0.95)';
      ctx.shadowColor = `rgba(${ACCENT}, 0.9)`;
      ctx.shadowBlur = 18 * state.glow;
      [-1, 1].forEach((side) => {
        const x = ex + side * R * 0.17 - eyeW / 2;
        const y = ey - eyeH / 2;
        const hh = Math.max(eyeH, 1.5);
        const r = Math.min(eyeW, hh) / 2;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + eyeW, y, x + eyeW, y + hh, r);
        ctx.arcTo(x + eyeW, y + hh, x, y + hh, r);
        ctx.arcTo(x, y + hh, x, y, r);
        ctx.arcTo(x, y, x + eyeW, y, r);
        ctx.closePath();
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      if (!reduced && visible) raf = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);

    window.addEventListener('pointermove', onPointer, { passive: true });
    raf = requestAnimationFrame(draw);

    // In reduced-motion mode, redraw a few frames when mood changes so state still reads.
    let moodTimer;
    if (reduced) {
      let last = moodRef.current;
      moodTimer = setInterval(() => {
        if (moodRef.current !== last) last = moodRef.current;
        draw(performance.now());
      }, 250);
    }

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(moodTimer);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointer);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={`avatar-orb ${className}`}
      style={{ width: '100%', aspectRatio: '1', maxWidth: size }}
      aria-hidden="true"
    />
  );
}
