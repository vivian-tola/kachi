import styles from "@/app/page.module.css";
import { hero } from "@/data";

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div>
        <div className={styles.heroKicker}>{hero.kicker}</div>
        <h1 className={styles.heroTitle}>
          {hero.titleLines.map((line, i) => (
            <span key={line}>
              {line}
              {i < hero.titleLines.length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p className={styles.heroParagraph}>{hero.paragraph}</p>
        <div className={styles.heroCtas}>
          <a href={hero.primaryCta.href} className={styles.ctaPrimary}>
            {hero.primaryCta.label}
          </a>
          <a href={hero.secondaryCta.href} target="_blank" className={styles.ctaSecondary}>
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>
      <dl className={styles.factsList}>
        {hero.facts.map((f) => (
          <div key={f.label} className={styles.factRow}>
            <dt className={styles.factLabel}>{f.label}</dt>
            {"value" in f ? (
              <dd className={styles.factValue}>{f.value}</dd>
            ) : (
              <dd className={styles.factLinks}>
                {f.links.map((l) => (
                  <a key={l.label} href={l.href}>
                    {l.label}
                  </a>
                ))}
              </dd>
            )}
          </div>
        ))}
      </dl>
    </section>
  );
}
