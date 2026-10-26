import styles from "@/app/page.module.css";
import { designInspirations } from "@/data";

const statusTint = {
  "Not started": "var(--bg2)",
  "In progress": "var(--butter)",
  Done: "var(--mint)",
};

export default function DesignsSection() {
  return (
    <section id="designs" className={styles.section} aria-labelledby="designs-h">
      <div className={`${styles.secHead} ${styles.rv}`}>
        <h2 className={styles.h2} id="designs-h">
          Designs I want to <span>try</span>
        </h2>
        <p className={styles.lead}>
          Interfaces I&apos;ve bookmarked to rebuild for practice — {designInspirations.length} queued. I&apos;ll
          link each one to my own attempt once it&apos;s built.
        </p>
      </div>
      <div className={styles.designs}>
        {designInspirations.map((d) => (
          <div key={d.id} className={`${styles.dcard} ${styles.rv}`}>
            <div className={styles.dtop}>
              <span
                className={styles.when}
                style={{ "--tint": statusTint[d.status], color: d.status === "Not started" ? "var(--ink)" : undefined } as React.CSSProperties}
              >
                {d.status}
              </span>
              <span className={styles.source}>{d.source}</span>
            </div>
            <h3>{d.title}</h3>
            <p>{d.focus}</p>
            {d.projectHref && (
              <a href={d.projectHref} className={styles.dlink}>
                See my version →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
