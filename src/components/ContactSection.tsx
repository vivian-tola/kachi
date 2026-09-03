import styles from "@/app/page.module.css";
import { contact } from "@/data";

export default function ContactSection() {
  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.contactInner}>
        <div className={styles.contactKicker}>{contact.kicker}</div>
        <h2 className={styles.contactHeadline}>{contact.headline}</h2>
        <div className={styles.contactGrid}>
          {contact.cards.map((c) => (
            <a key={c.label} href={c.href} target="_blank" className={styles.contactCard}>
              <span className={styles.contactCardLabel}>{c.label}</span>
              <span className={styles.contactCardValue}>{c.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
