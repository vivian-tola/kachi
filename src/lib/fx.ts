// Full-screen sparkle trail + confetti, drawn on one fixed canvas.
// `mountFx` attaches the canvas; `sparkle` and `confetti` can then be called from anywhere.

export const COLORS = ["#FF5C8A", "#B9A8FF", "#FFD66B", "#9FE3C9", "#FFC9A8"];

type Particle = {
  kind: "star" | "conf";
  x: number; y: number; vx: number; vy: number; g: number;
  r: number; rot: number; vr: number; life: number; decay: number; c: string;
};

let ctx: CanvasRenderingContext2D | null = null;
let W = 0;
let H = 0;
let parts: Particle[] = [];
let running = false;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function starPath(c: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number) {
  c.beginPath();
  for (let i = 0; i < 8; i++) {
    const a = rot + (i * Math.PI) / 4, rr = i % 2 ? r * 0.38 : r;
    c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
  }
  c.closePath();
}

function loop() {
  if (!ctx) { running = false; return; }
  ctx.clearRect(0, 0, W, H);
  parts = parts.filter((p) => p.life > 0);
  for (const p of parts) {
    p.life -= p.decay; p.x += p.vx; p.y += p.vy; p.vy += p.g; p.vx *= 0.985; p.rot += p.vr;
    ctx.globalAlpha = Math.max(0, Math.min(1, p.life));
    ctx.fillStyle = p.c;
    if (p.kind === "conf") {
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.fillRect(-p.r, -p.r * 0.45, p.r * 2, p.r * 0.9);
      ctx.restore();
    } else {
      starPath(ctx, p.x, p.y, p.r * (0.5 + p.life * 0.5), p.rot);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
  if (parts.length) requestAnimationFrame(loop);
  else running = false;
}

function kick() {
  if (!running && ctx) { running = true; requestAnimationFrame(loop); }
}

export function sparkle(x: number, y: number, n = 1, spread = 1) {
  if (prefersReducedMotion()) return;
  for (let i = 0; i < n; i++) {
    parts.push({
      kind: "star", x, y,
      vx: (Math.random() - 0.5) * 2.4 * spread, vy: (Math.random() - 0.8) * 2.2 * spread, g: 0.04,
      r: 4 + Math.random() * 6, rot: Math.random() * 3, vr: (Math.random() - 0.5) * 0.2,
      life: 1, decay: 0.02 + Math.random() * 0.02, c: COLORS[(Math.random() * COLORS.length) | 0],
    });
  }
  kick();
}

export function sparkleAt(el: Element, n = 14, spread = 2.2) {
  const r = el.getBoundingClientRect();
  sparkle(r.left + r.width / 2, r.top + r.height / 2, n, spread);
}

export function confetti() {
  if (prefersReducedMotion()) return;
  for (let i = 0; i < 160; i++) {
    parts.push({
      kind: "conf", x: W / 2 + (Math.random() - 0.5) * 200, y: H * 0.45,
      vx: (Math.random() - 0.5) * 22, vy: -Math.random() * 18 - 6, g: 0.35,
      r: 5 + Math.random() * 5, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4,
      life: 1.6, decay: 0.006 + Math.random() * 0.006, c: COLORS[i % COLORS.length],
    });
  }
  kick();
}

export function mountFx(canvas: HTMLCanvasElement) {
  ctx = canvas.getContext("2d");
  const size = () => {
    const d = Math.min(window.devicePixelRatio, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * d; canvas.height = H * d;
    ctx?.setTransform(d, 0, 0, d, 0, 0);
  };
  size();
  window.addEventListener("resize", size);

  let last = 0;
  const trail = (e: PointerEvent) => {
    const now = performance.now();
    if (now - last > 40) { last = now; sparkle(e.clientX, e.clientY, 1, 0.6); }
  };
  const fine = window.matchMedia("(pointer: fine)").matches;
  if (fine && !prefersReducedMotion()) window.addEventListener("pointermove", trail, { passive: true });

  return () => {
    window.removeEventListener("resize", size);
    window.removeEventListener("pointermove", trail);
    ctx = null; parts = [];
  };
}
