import styles from "@/app/page.module.css";
import { learning } from "@/data";

export default function LearningSection() {
  return (
    <section id="learning" className={styles.learningSection}>
      <div className={styles.learningInner}>
        <div>
          <h2 className={styles.sectionTitle}>Learning in the open</h2>
          <p className={styles.learningLede}>
            Whatever I&apos;m stuck on this month, plus the thing
            I&apos;ll be stuck on next. Updated when it changes, not
            weekly for show.
          </p>
        </div>
        <ol className={styles.learningList}>
          {learning.map((l) => (
            <li key={l.what} className={styles.learningRow}>
              <span className={styles.learningWhen}>{l.when}</span>
              <span>
                <span className={styles.learningWhat}>{l.what}</span>
                <span className={styles.learningNote}>{l.note}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
