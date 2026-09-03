"use client";

import { useState } from "react";
import styles from "@/app/page.module.css";
import type { Project } from "@/data";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <article className={styles.article}>
      <PlaceholderImage caption={project.shotCaption} />
      <div>
        <div className={styles.projectHead}>
          <span className={styles.projectNum}>{project.num}</span>
          <span className={styles.projectKicker}>{project.kicker}</span>
        </div>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectBlurb}>{project.blurb}</p>
        <div className={styles.stackList}>
          {project.stack.map((t) => (
            <span key={t} className={styles.stackTag}>
              {t}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={styles.toggleBtn}
          aria-expanded={open}
        >
          <span>What broke, and what I did</span>
          <span className={styles.toggleSign}>{open ? "–" : "+"}</span>
        </button>
        {open && (
          <div className={styles.notesWrap}>
            {project.notes.map((n) => (
              <div key={n.label} className={styles.noteRow}>
                <div className={styles.noteLabel}>{n.label}</div>
                <div className={styles.noteText}>{n.text}</div>
              </div>
            ))}
            <div className={styles.notesCtas}>
              <a href={project.demoHref} className={styles.ctaPrimarySmall}>
                Live demo →
              </a>
              <a href={project.codeHref} className={styles.ctaSecondarySmall}>
                Read the code
              </a>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
