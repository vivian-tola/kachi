import styles from "@/app/page.module.css";
import { designInspirations } from "@/data";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function DesignsSection() {
  return (
    <section id="designs" className={styles.designsSection}>
      <div className={styles.designsInner}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Designs I want to try</h2>
          <div className={styles.sectionCounter}>
            {designInspirations.length} queued
          </div>
        </div>
        <p className={styles.designsLede}>
          Interfaces I&apos;ve bookmarked to rebuild for practice — I&apos;ll
          link each one to my own attempt once it&apos;s built.
        </p>
        <div className={styles.designsGrid}>
          {designInspirations.map((d) => (
            <div key={d.id} className={styles.designCard}>
              <PlaceholderImage caption={d.title} />
              <div className={styles.designBody}>
                <div className={styles.designStatusRow}>
                  <span
                    className={styles.designStatus}
                    data-status={d.status}
                  >
                    {d.status}
                  </span>
                  <span className={styles.designSource}>{d.source}</span>
                </div>
                <h3 className={styles.designTitle}>{d.title}</h3>
                <p className={styles.designFocus}>{d.focus}</p>
                {d.projectHref && (
                  <a href={d.projectHref} className={styles.designLink}>
                    See my version →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
