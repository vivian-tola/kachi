import styles from "@/app/page.module.css";
import { projects } from "@/data";
import ProjectCard from "@/components/ProjectCard";

export default function WorkSection() {
  return (
    <section id="work" className={styles.workSection}>
      <div className={styles.workInner}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>
            Two projects, honestly documented
          </h2>
          <div className={styles.sectionCounter}>01 — 02</div>
        </div>
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
