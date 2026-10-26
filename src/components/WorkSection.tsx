import styles from "@/app/page.module.css";
import { projects } from "@/data";
import ProjectCard from "@/components/ProjectCard";

// One project fills the row; two or three fall into the staggered wide/side/full layout.
const layouts = ["wide", "side", "full"] as const;

export default function WorkSection() {
  return (
    <section id="work" className={styles.section} aria-labelledby="work-h">
      <div className={`${styles.secHead} ${styles.rv}`}>
        <h2 className={styles.h2} id="work-h">
          What I&apos;ve <span>shipped</span>, honestly documented
        </h2>
        <p className={styles.lead}>
          {projects.length === 1 ? "One project so far" : `${projects.length} projects so far`}, with the bugs left in.
        </p>
      </div>
      <div className={styles.work}>
        {projects.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            layout={projects.length === 1 ? "full" : layouts[i % layouts.length]}
          />
        ))}
      </div>
    </section>
  );
}
