"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { Flower2, Gem, Heart, Moon, PartyPopper, Star, type LucideIcon } from "lucide-react";
import styles from "@/app/page.module.css";
import { confetti, mountFx, prefersReducedMotion, sparkle } from "@/lib/fx";

export type CharmId = "heart" | "star" | "flower" | "gem" | "moon";

export const CHARMS: { id: CharmId; name: string; Icon: LucideIcon; hint: string }[] = [
  { id: "heart", name: "Heart", Icon: Heart, hint: "Keep tapping the laptop screen until it whispers." },
  { id: "star", name: "Star", Icon: Star, hint: "Something twinkles on the project card." },
  { id: "flower", name: "Flower", Icon: Flower2, hint: "Pop every single bubble." },
  { id: "gem", name: "Gem", Icon: Gem, hint: "That sticker on my photo looks peelable." },
  { id: "moon", name: "Moon", Icon: Moon, hint: "Look for the moon at the very bottom." },
];

/* found charms live in localStorage, read through an external store so SSR renders "none found" */
const KEY = "charms";
const EMPTY: CharmId[] = [];
const listeners = new Set<() => void>();
let found: CharmId[] | null = null;

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot(): CharmId[] {
  if (found) return found;
  try {
    found = JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    found = [];
  }
  return found!;
}

function write(next: CharmId[]) {
  found = next;
  try {
    if (next.length) localStorage.setItem(KEY, JSON.stringify(next));
    else localStorage.removeItem(KEY);
  } catch {}
  listeners.forEach((cb) => cb());
}

export function useFound() {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
}

type Toast = { id: number; text: string; Icon: LucideIcon; out: boolean };
type Flyer = { id: number; Icon: LucideIcon; x: number; y: number; dx: number; dy: number };

type CharmsApi = {
  grant: (id: CharmId, from?: Element | null) => void;
  reset: () => void;
  resetKey: number;
};

const CharmsContext = createContext<CharmsApi | null>(null);

export function useCharms() {
  const api = useContext(CharmsContext);
  if (!api) throw new Error("useCharms must be used inside <CharmsProvider>");
  return api;
}

function FlyerDot({ flyer }: { flyer: Flyer }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (ref.current) ref.current.style.transform = `translate(${flyer.dx}px, ${flyer.dy}px) scale(.7) rotate(360deg)`;
    });
    return () => cancelAnimationFrame(raf);
  }, [flyer]);
  return (
    <div ref={ref} className={styles.flyer} style={{ left: flyer.x - 17, top: flyer.y - 17 }}>
      <flyer.Icon />
    </div>
  );
}

export default function CharmsProvider({ children }: { children: ReactNode }) {
  const fxRef = useRef<HTMLCanvasElement>(null);
  const pending = useRef(new Set<CharmId>());
  const nextId = useRef(0);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => (fxRef.current ? mountFx(fxRef.current) : undefined), []);

  const toast = useCallback((text: string, Icon: LucideIcon) => {
    const id = nextId.current++;
    setToasts((t) => [...t, { id, text, Icon, out: false }]);
    setTimeout(() => setToasts((t) => t.map((x) => (x.id === id ? { ...x, out: true } : x))), 2800);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const grant = useCallback(
    (id: CharmId, from?: Element | null) => {
      const current = getSnapshot();
      if (current.includes(id) || pending.current.has(id)) return;
      pending.current.add(id);
      const charm = CHARMS.find((c) => c.id === id)!;
      const total = current.length + pending.current.size;

      let sx = window.innerWidth / 2, sy = window.innerHeight / 2;
      if (from) {
        const r = from.getBoundingClientRect();
        sx = r.left + r.width / 2; sy = r.top + r.height / 2;
      }
      sparkle(sx, sy, 24, 3);

      const commit = () => {
        pending.current.delete(id);
        write([...getSnapshot(), id]);
      };
      const slot = document.querySelector(`[data-slot="${id}"]`);
      if (slot && !prefersReducedMotion()) {
        const t = slot.getBoundingClientRect();
        const flyerId = nextId.current++;
        setFlyers((f) => [...f, { id: flyerId, Icon: charm.Icon, x: sx, y: sy, dx: t.left + t.width / 2 - sx, dy: t.top + t.height / 2 - sy }]);
        setTimeout(() => {
          setFlyers((f) => f.filter((x) => x.id !== flyerId));
          commit();
        }, 900);
      } else commit();

      if (total === CHARMS.length) {
        setTimeout(() => {
          confetti();
          toast("You found all five charms! A secret note just appeared in Contact.", PartyPopper);
        }, 950);
      } else toast(`You found the ${charm.name} charm! ${total} of ${CHARMS.length}`, charm.Icon);
    },
    [toast]
  );

  const reset = useCallback(() => {
    pending.current.clear();
    write([]);
    setResetKey((k) => k + 1);
  }, []);

  return (
    <CharmsContext.Provider value={{ grant, reset, resetKey }}>
      <canvas ref={fxRef} className={styles.fx} aria-hidden="true" />
      {children}
      {flyers.map((f) => (
        <FlyerDot key={f.id} flyer={f} />
      ))}
      <div className={styles.toasts} aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`${styles.toast} ${t.out ? styles.out : ""}`}>
            <span className={styles.toastIc}>
              <t.Icon />
            </span>
            <span>{t.text}</span>
          </div>
        ))}
      </div>
    </CharmsContext.Provider>
  );
}
