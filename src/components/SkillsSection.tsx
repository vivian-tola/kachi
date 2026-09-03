import styles from "@/app/page.module.css";
import { skills } from "@/data";

export default function SkillsSection() {
  return (
    <section id="skills" className={styles.skillsSection}>
      <div className={styles.skillsInner}>
        <h2 className={styles.sectionTitle}>What I can actually do</h2>
        <p className={styles.skillsLede}>
          Sorted by how much supervision I&apos;d need, not by logo count.
        </p>
        <div className={styles.skillsGrid}>
          {skills.map((g) => (
            <div key={g.level} className={styles.skillCol}>
              <div className={styles.skillLevel}>{g.level}</div>
              <ul className={styles.skillItems}>
                {g.items.map((i) => (
                  <li key={i} className={styles.skillItem}>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
