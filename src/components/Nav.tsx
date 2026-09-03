"use client";

import { useState } from "react";
import styles from "@/app/page.module.css";
import { site } from "@/data";

const links = [
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#learning", label: "Learning" },
  { href: "#designs", label: "Designs" },
  { href: "#about", label: "About" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a href="#top" className={styles.logo} onClick={() => setOpen(false)}>
          {site.fullName}
          <span className={styles.logoDot}>.</span>
        </a>
        <nav className={styles.nav}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className={styles.navLink}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className={styles.navContact}>
            Contact
          </a>
        </nav>
        <button
          type="button"
          className={styles.hamburgerBtn}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6 L18 18 M18 6 L6 18" />
            ) : (
              <path d="M4 7 L20 7 M4 12 L20 12 M4 17 L20 17" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className={styles.mobileNav}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={styles.mobileNavLink}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className={`${styles.mobileNavLink} ${styles.mobileNavContact}`}
            onClick={() => setOpen(false)}
          >
            Contact
          </a>
        </nav>
      )}
    </header>
  );
}
