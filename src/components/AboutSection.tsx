import styles from "@/app/page.module.css";
import { about } from "@/data";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function AboutSection() {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.aboutInner}>
        <PlaceholderImage
          caption={about.portraitCaption}
          className={styles.portrait}
        />
        <div className={styles.aboutContent}>
          <h2 className={styles.sectionTitle}>About</h2>
          {about.paragraphs.map((p) => (
            <p key={p} className={styles.aboutParagraph}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
