import { ArrowDownRight, FileText, Gift, Sparkles } from "lucide-react";
import styles from "@/app/page.module.css";
import { hero, site } from "@/data";
import LaptopStage from "@/components/LaptopStage";

// Each letter is its own span so it can drop in and hop on hover; the h1's aria-label keeps it readable.
function BouncyTitle() {
  let i = 0;
  const words = hero.title.split(" ");
  return (
    <h1 className={styles.title} aria-label={hero.title}>
      {words.map((w, wi) => (
        <span key={wi} aria-hidden="true">
          <span className={styles.word}>
            {[...w].map((ch, ci) => (
              <span
                key={ci}
                className={`${styles.l} ${hero.titleHighlight.includes(w) ? styles.hl : ""}`}
                style={{ "--i": i++ } as React.CSSProperties}
              >
                {ch}
              </span>
            ))}
          </span>
          {wi < words.length - 1 && " "}
        </span>
      ))}
    </h1>
  );
}

export default function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroCopy}>
        <span className={styles.sticker}>
          <Sparkles aria-hidden="true" />
          {site.showAvailability ? site.availabilityText : hero.kicker}
        </span>
        <BouncyTitle />
        <p className={styles.sub}>{hero.paragraph}</p>
        <div className={styles.ctas}>
          <a className={`${styles.btn} ${styles.btnInk}`} href={hero.primaryCta.href}>
            {hero.primaryCta.label} <ArrowDownRight aria-hidden="true" />
          </a>
          <a className={`${styles.btn} ${styles.btnWhite}`} href={hero.secondaryCta.href} target="_blank" rel="noreferrer">
            <FileText aria-hidden="true" /> {hero.secondaryCta.label}
          </a>
        </div>
        <div className={styles.psst}>
          <span className={styles.psstIc}>
            <Gift aria-hidden="true" />
          </span>
          <span>
            <b>Psst.</b> Five charms are hidden on this page. Can you find them all?
          </span>
        </div>
      </div>
      <LaptopStage />
    </header>
  );
}
