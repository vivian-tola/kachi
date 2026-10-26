// Draws the laptop's screen (1024×640) onto a 2D canvas that three.js uses as a texture.
// Three states, cycled by tapping: a hello card, a typing code editor, and the secret heart.

import { COLORS } from "@/lib/fx";

export const SCREEN_W = 1024;
export const SCREEN_H = 640;

export type ScreenOpts = {
  name: string;
  tagline: string;
  display: string;
  body: string;
  reduce: boolean;
  heartFound: boolean;
};

function heartPath(c: CanvasRenderingContext2D, x: number, y: number, s: number) {
  c.beginPath();
  c.moveTo(x, y + s * 0.3);
  c.bezierCurveTo(x, y, x - s * 0.5, y - s * 0.1, x - s * 0.5, y + s * 0.25);
  c.bezierCurveTo(x - s * 0.5, y + s * 0.6, x, y + s * 0.75, x, y + s);
  c.bezierCurveTo(x, y + s * 0.75, x + s * 0.5, y + s * 0.6, x + s * 0.5, y + s * 0.25);
  c.bezierCurveTo(x + s * 0.5, y - s * 0.1, x, y, x, y + s * 0.3);
  c.closePath();
}

const CODE: [string, string][][] = [
  [["const ", "#FF8FB0"], ["you", "#FFF"], [" = ", "#C9B7C4"], ["await ", "#FF8FB0"], ["visit", "#FFD66B"], ["(site)", "#C9B7C4"]],
  [["if ", "#FF8FB0"], ["(you.curious) {", "#C9B7C4"]],
  [["  hideCharms", "#FFD66B"], ["(", "#C9B7C4"], ["5", "#9FE3C9"], [")", "#C9B7C4"]],
  [["}", "#C9B7C4"]],
  [["", "#fff"]],
  [["// keep tapping me...", "#8C6B82"]],
];

export function drawScreen(c: CanvasRenderingContext2D, state: number, now: number, t0: number, o: ScreenOpts) {
  const W = SCREEN_W, H = SCREEN_H, t = o.reduce ? 0 : now / 1000, st = (now - t0) / 1000;
  if (state === 0) {
    const g = c.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#FFE3EA"); g.addColorStop(1, "#E8E2FF");
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    for (let i = 0; i < 7; i++) {
      c.fillStyle = COLORS[i % 5]; c.globalAlpha = 0.55;
      heartPath(c, 120 + i * 130, 560 - ((t * 40 + i * 90) % 600), 34 + (i % 3) * 10);
      c.fill();
    }
    c.globalAlpha = 1; c.fillStyle = "#3A1630";
    c.font = `600 38px ${o.body}`; c.fillText("Hi, I'm", 90, 230);
    c.font = `600 92px ${o.display}`; c.fillText(o.name, 84, 335);
    c.fillStyle = "#80566C"; c.font = `700 34px ${o.body}`; c.fillText(o.tagline, 90, 405);
  } else if (state === 1) {
    c.fillStyle = "#2A1426"; c.fillRect(0, 0, W, H);
    ["#FF5C8A", "#FFD66B", "#9FE3C9"].forEach((col, i) => {
      c.fillStyle = col; c.beginPath(); c.arc(44 + i * 32, 36, 10, 0, 7); c.fill();
    });
    c.fillStyle = "rgba(255,255,255,.5)"; c.font = `700 24px ${o.body}`; c.fillText("hello.ts", 160, 44);
    let budget = o.reduce ? 999 : Math.floor(st * 26);
    c.font = "500 32px 'Courier New', monospace";
    let y = 150, lx = 60, ly = 150;
    for (const ln of CODE) {
      let x = 60;
      for (const [txt, col] of ln) {
        if (budget <= 0) break;
        const p = txt.slice(0, budget); budget -= p.length;
        c.fillStyle = col; c.fillText(p, x, y); x += c.measureText(p).width;
      }
      lx = x; ly = y;
      if (budget <= 0) break;
      y += 60; budget--;
    }
    if (Math.floor(now / 450) % 2 === 0) { c.fillStyle = "#FF5C8A"; c.fillRect(lx + 4, ly - 26, 16, 34); }
  } else {
    const g = c.createRadialGradient(W / 2, H / 2, 40, W / 2, H / 2, 600);
    g.addColorStop(0, "#FFF7E0"); g.addColorStop(1, "#FFC9DA");
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    const s = 200 * (1 + Math.sin(t * 4) * 0.05);
    c.fillStyle = "#FF5C8A"; heartPath(c, W / 2, 110 + (200 - s) / 2, s); c.fill();
    c.fillStyle = "rgba(255,255,255,.7)"; c.beginPath(); c.ellipse(W / 2 - s * 0.22, 110 + s * 0.25, s * 0.07, s * 0.12, -0.5, 0, 7); c.fill();
    c.fillStyle = "#3A1630"; c.textAlign = "center"; c.font = `600 56px ${o.display}`;
    c.fillText(o.heartFound ? "Heart charm: yours" : "You found a secret!", W / 2, 420);
    c.font = `700 30px ${o.body}`; c.fillStyle = "#80566C"; c.fillText("thanks for being curious", W / 2, 470);
    c.textAlign = "left";
  }
  for (let i = 0; i < 3; i++) {
    c.fillStyle = state === 1 ? "#FFFFFF" : "#3A1630";
    c.globalAlpha = i === state ? 0.8 : 0.22;
    c.beginPath(); c.arc(W / 2 - 30 + i * 30, H - 30, i === state ? 9 : 7, 0, 7); c.fill();
  }
  c.globalAlpha = 1;
}
