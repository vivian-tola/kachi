import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import styles from "@/app/page.module.css";
import { about } from "@/data";
import PlaceholderImage from "@/components/PlaceholderImage";

const PORTRAIT_FILE = "portrait.jpg";
const hasPortrait = fs.existsSync(
  path.join(process.cwd(), "public", PORTRAIT_FILE)
);

export default function AboutSection() {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.aboutInner}>
        {hasPortrait ? (
          <div className={`${styles.portrait} ${styles.portraitFrame}`}>
            <Image
              src={`/portrait.jpg`}
              alt={about.portraitCaption}
              fill
              sizes="(max-width: 700px) 90vw, 340px"
              className={styles.portraitImg}
            />
          </div>
        ) : (
          <PlaceholderImage
            caption={about.portraitCaption}
            className={styles.portrait}
          />
        )}
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
