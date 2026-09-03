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
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a href="#top" className={styles.logo}>
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
      </div>
    </header>
  );
}
