"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Menu, Search, X } from "lucide-react";
import styles from "@/app/page.module.css";
import { site } from "@/data";
import ThemeToggle from "@/components/ThemeToggle";
import { CHARMS, useCharms, useFound } from "@/components/Charms";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#learning", label: "Learning" },
  { href: "#designs", label: "Designs" },
  { href: "#contact", label: "Contact" },
];

type Panel = "charms" | "menu" | null;

export default function Nav() {
  const found = useFound();
  const { reset } = useCharms();
  const [panel, setPanel] = useState<Panel>(null);
  const trackerRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!panel) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      const inside = [popRef, menuRef, trackerRef, menuBtnRef].some((r) => r.current?.contains(t));
      if (!inside) setPanel(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      (panel === "charms" ? trackerRef : menuBtnRef).current?.focus();
      setPanel(null);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [panel]);

  const count = `${found.length} of ${CHARMS.length} charms found`;
  const toggle = (p: Panel) => setPanel((cur) => (cur === p ? null : p));

  return (
    <>
      <nav className={styles.nav} aria-label="Main">
        <a className={styles.wm} href="#top">
          <Heart aria-hidden="true" />
          <span>{site.fullName}</span>
        </a>
        <div className={styles.links}>
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
        <div className={styles.navRight}>
          <button
            ref={trackerRef}
            className={styles.tracker}
            type="button"
            aria-expanded={panel === "charms"}
            aria-controls="charm-hints"
            onClick={() => toggle("charms")}
          >
            <span className={styles.trackerLabel}>Charms</span>
            <span className={styles.slots} aria-hidden="true">
              {CHARMS.map(({ id, Icon }) => (
                <span key={id} className={`${styles.slot} ${found.includes(id) ? styles.got : ""}`} data-c={id} data-slot={id}>
                  <Icon />
                </span>
              ))}
            </span>
            <span className={styles.srOnly}>{count}</span>
          </button>
          <ThemeToggle />
          <button
            ref={menuBtnRef}
            type="button"
            className={`${styles.iconbtn} ${styles.menuBtn}`}
            aria-label={panel === "menu" ? "Close menu" : "Open menu"}
            aria-expanded={panel === "menu"}
            aria-controls="mobile-nav"
            onClick={() => toggle("menu")}
          >
            {panel === "menu" ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <div ref={popRef} className={styles.pop} id="charm-hints" hidden={panel !== "charms"} role="dialog" aria-label="Charm hints">
        <h3>{found.length === CHARMS.length ? "You found them all!" : count}</h3>
        <ul>
          {CHARMS.map(({ id, Icon, hint }) => {
            const got = found.includes(id);
            return (
              <li key={id} className={got ? styles.got : ""}>
                <span className={styles.hintIc}>{got ? <Icon /> : <Search />}</span>
                {got ? <s>{hint}</s> : hint}
              </li>
            );
          })}
        </ul>
        <button className={styles.linkbtn} type="button" onClick={reset}>
          Start the hunt again
        </button>
      </div>

      <nav ref={menuRef} id="mobile-nav" className={`${styles.pop} ${styles.mobileMenu}`} hidden={panel !== "menu"} aria-label="Mobile">
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setPanel(null)}>
            {l.label}
          </a>
        ))}
      </nav>
    </>
  );
}
