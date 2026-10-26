"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import styles from "@/app/page.module.css";
import { bubbles, skills } from "@/data";
import { useCharms } from "@/components/Charms";
import { sparkleAt } from "@/lib/fx";

const TINTS = [["#FFB3C8", "#DCD3FF"], ["#C9BDFF", "#B8F0DC"], ["#FFE7A3", "#FFC9DA"], ["#B8F0DC", "#C9BDFF"]];

// Lay the bubbles out on a loose grid, nudged by deterministic offsets so they look scattered.
function layout(W: number, H: number) {
  const narrow = W < 560, cols = narrow ? 3 : 6, rows = Math.ceil(bubbles.length / cols);
  return bubbles.map(({ comfy }, i) => {
    const size = (comfy ? (narrow ? 96 : 124) : (narrow ? 82 : 100)) + ((i * 37) % 18);
    const cw = W / cols, ch = H / rows, c = i % cols, r = Math.floor(i / cols);
    const x = c * cw + cw / 2 - size / 2 + (((i * 53) % 30) - 15);
    const y = r * ch + ch / 2 - size / 2 + (((i * 71) % 40) - 20);
    const [t1, t2] = TINTS[i % TINTS.length];
    return {
      width: size, height: size,
      left: Math.max(6, Math.min(W - size - 6, x)), top: Math.max(6, Math.min(H - size - 6, y)),
      "--t1": t1, "--t2": t2, "--d": `${2.6 + (i % 5) * 0.5}s`, "--del": `${-(i * 0.37)}s`,
      "--bx": `${((i % 3) - 1) * 10}px`, "--by": `${-10 - (i % 4) * 5}px`,
    } as React.CSSProperties;
  });
}

export default function SkillsSection() {
  const { grant } = useCharms();
  const pondRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ W: number; H: number } | null>(null);
  const [popped, setPopped] = useState<number[]>([]);
  const [round, setRound] = useState(0);
  const poppedCount = useRef(0);

  // Re-measure on real width changes, but never shuffle bubbles mid-game.
  useEffect(() => {
    const pond = pondRef.current!;
    const ro = new ResizeObserver(() => {
      setSize((cur) =>
        cur && (poppedCount.current > 0 || Math.abs(pond.clientWidth - cur.W) <= 40)
          ? cur
          : { W: pond.clientWidth, H: pond.clientHeight }
      );
    });
    ro.observe(pond);
    return () => ro.disconnect();
  }, []);

  const pop = (i: number, el: HTMLButtonElement) => {
    if (popped.includes(i)) return;
    sparkleAt(el);
    const next = [...popped, i];
    poppedCount.current = next.length;
    setPopped(next);
    if (document.activeElement === el) {
      const nextBubble = pondRef.current?.querySelector<HTMLButtonElement>(`button:not([data-popped])`);
      if (nextBubble && nextBubble !== el) nextBubble.focus();
    }
    if (next.length === bubbles.length) grant("flower", pondRef.current);
  };

  const refill = () => {
    poppedCount.current = 0;
    setPopped([]);
    setRound((r) => r + 1);
    const pond = pondRef.current;
    if (pond) setSize({ W: pond.clientWidth, H: pond.clientHeight });
  };

  const positions = size ? layout(size.W, size.H) : [];
  const done = popped.length === bubbles.length;

  return (
    <section id="skills" className={styles.section} aria-labelledby="skills-h">
      <div className={`${styles.secHead} ${styles.rv}`}>
        <h2 className={styles.h2} id="skills-h">
          Pop the <span>bubbles</span>
        </h2>
        <p className={styles.lead}>Every bubble is something I work with. Pop them all and something nice happens.</p>
      </div>
      <div className={`${styles.pond} ${styles.rv}`} ref={pondRef}>
        {positions.map((style, i) => {
          const isPopped = popped.includes(i);
          return (
            <button
              key={`${round}-${i}`}
              type="button"
              className={`${styles.bubble} ${isPopped ? styles.popped : ""}`}
              style={style}
              data-popped={isPopped || undefined}
              tabIndex={isPopped ? -1 : undefined}
              aria-label={`Pop the ${bubbles[i].name} bubble`}
              onClick={(e) => pop(i, e.currentTarget)}
            >
              {bubbles[i].name}
            </button>
          );
        })}
      </div>
      <div className={styles.jar} aria-live="polite">
        <span className={styles.count}>
          {popped.length} of {bubbles.length} popped
        </span>
        {popped.map((i) => (
          <span key={i} className={`${styles.chip} ${bubbles[i].comfy ? styles.chipFe : ""}`}>
            {bubbles[i].name}
          </span>
        ))}
        {done && (
          <button className={`${styles.btn} ${styles.btnWhite}`} type="button" onClick={refill}>
            <RotateCcw aria-hidden="true" />
            Refill
          </button>
        )}
      </div>
      <div className={styles.skillList}>
        {skills.map((s) => (
          <div key={s.level}>
            <b>{s.level}</b>
            {s.items.join(", ")}
          </div>
        ))}
      </div>
    </section>
  );
}
