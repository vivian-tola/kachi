import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { GraduationCap, Keyboard, MapPin } from "lucide-react";
import styles from "@/app/page.module.css";
import { about } from "@/data";
import PeelSticker from "@/components/PeelSticker";

const PORTRAIT_FILE = "portrait.jpg";
const hasPortrait = fs.existsSync(
  path.join(process.cwd(), "public", PORTRAIT_FILE)
);

const factIcons = { pin: MapPin, grad: GraduationCap, keyboard: Keyboard };

export default function AboutSection() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-h">
      <div className={styles.about}>
        <div className={`${styles.polaroid} ${styles.rv}`}>
          <div className={styles.ph}>
            {hasPortrait && (
              <Image
                src={`/${PORTRAIT_FILE}`}
                alt={about.portraitAlt}
                fill
                sizes="(max-width: 960px) 90vw, 440px"
              />
            )}
          </div>
          <div className={styles.cap}>{about.portraitCaption}</div>
          <PeelSticker />
        </div>
        <div className={styles.rv}>
          <h2 className={styles.h2} id="about-h">
            {about.heading[0]} <span>{about.heading[1]}</span> {about.heading[2]}
          </h2>
          {about.paragraphs.map((p) => (
            <p key={p} className={styles.lead}>
              {p}
            </p>
          ))}
          <div className={styles.facts}>
            {about.facts.map(({ icon, label }) => {
              const Icon = factIcons[icon];
              return (
                <span key={label} className={styles.fact}>
                  <Icon aria-hidden="true" />
                  {label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
