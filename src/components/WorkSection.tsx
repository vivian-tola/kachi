import styles from "@/app/page.module.css";
import { projects } from "@/data";
import ProjectCard from "@/components/ProjectCard";

export default function WorkSection() {
  const counter =
    projects.length > 1
      ? `01 — ${String(projects.length).padStart(2, "0")}`
      : "01";

  return (
    <section id="work" className={styles.workSection}>
      <div className={styles.workInner}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>
            What I&apos;ve shipped, honestly documented
          </h2>
          <div className={styles.sectionCounter}>{counter}</div>
        </div>
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
