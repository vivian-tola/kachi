import styles from "@/app/page.module.css";
import { site, footer } from "@/data";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span>
          {site.fullName} — {footer.tagline}
        </span>
        <span>{footer.note}</span>
      </div>
    </footer>
  );
}
