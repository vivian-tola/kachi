import styles from "@/app/page.module.css";
import { learning } from "@/data";

const tints = ["var(--mint)", "var(--butter)", "var(--lilac)", "var(--peach)"];

export default function LearningSection() {
  return (
    <section id="learning" className={styles.section} aria-labelledby="learning-h">
      <div className={`${styles.secHead} ${styles.rv}`}>
        <h2 className={styles.h2} id="learning-h">
          What I&apos;m <span>learning</span>
        </h2>
        <p className={styles.lead}>Where the evenings and weekends are going right now.</p>
      </div>
      <div className={styles.timeline}>
        {learning.map((l, i) => (
          <div key={l.what} className={`${styles.tItem} ${styles.rv}`}>
            <span className={styles.when} style={{ "--tint": tints[i % tints.length] } as React.CSSProperties}>
              {l.when}
            </span>
            <h3>{l.what}</h3>
            <p>{l.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
