"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Code2, Plus, Star } from "lucide-react";
import styles from "@/app/page.module.css";
import type { Project } from "@/data";
import { useCharms, useFound } from "@/components/Charms";

const covers = [
  { c1: "#E8E2FF", c2: "#C9BDFF", c3: "#9F8CFF" },
  { c1: "#FFE0EA", c2: "#FFB3C8", c3: "#FF7AA0" },
  { c1: "#DFF6EC", c2: "#B8F0DC", c3: "#6FD0AD" },
];

export default function ProjectCard({
  project,
  index,
  layout,
}: {
  project: Project;
  index: number;
  layout: "wide" | "side" | "full";
}) {
  const [open, setOpen] = useState(false);
  const { grant } = useCharms();
  const hasStar = useFound().includes("star");
  const cover = covers[index % covers.length];

  return (
    <article className={`${styles.wcard} ${styles[layout]} ${styles.rv}`}>
      <div className={`${styles.wcover} ${project.shot ? styles.hasShot : ""}`} style={{ "--c1": cover.c1, "--c2": cover.c2, "--c3": cover.c3 } as React.CSSProperties}>
        <span className={styles.bub} style={{ width: "30%", left: "14%", top: "18%", "--dx": "14px", "--dy": "10px" } as React.CSSProperties} />
        <span className={styles.bub} style={{ width: "14%", left: "66%", top: "58%", "--dx": "-12px", "--dy": "-10px", "--c2": "#B8F0DC", "--c3": "#7DD8B6" } as React.CSSProperties} />
        {project.shot && (
          <div className={styles.browser}>
            <div className={styles.browserBar} aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div className={styles.browserShot}>
              <Image
                src={project.shot}
                alt={project.shotCaption}
                fill
                sizes="(max-width: 960px) 86vw, 940px"
              />
            </div>
          </div>
        )}
        {index === 0 && !hasStar && (
          <button className={styles.star} type="button" aria-label="Collect the Star charm" onClick={(e) => grant("star", e.currentTarget)}>
            <Star />
          </button>
        )}
        {!project.shot && <span className={styles.wph}>{project.shotCaption}</span>}
      </div>
      <div className={styles.wbody}>
        <div className={styles.wtop}>
          <h3>{project.title}</h3>
          <span className={styles.cat}>{project.kicker}</span>
        </div>
        <p>{project.blurb}</p>
        <div className={styles.chips}>
          {project.stack.map((t) => (
            <span key={t} className={styles.chip}>
              {t}
            </span>
          ))}
        </div>
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`notes-${project.id}`}
        >
          <Plus aria-hidden="true" />
          What broke, and what I did
        </button>
        {open && (
          <div className={styles.notes} id={`notes-${project.id}`}>
            {project.notes.map((n) => (
              <div key={n.label} className={styles.note}>
                <b>{n.label}</b>
                <span>{n.text}</span>
              </div>
            ))}
          </div>
        )}
        <div className={styles.wlinks}>
          <a href={project.demoHref} className={`${styles.btn} ${styles.btnInk}`} target="_blank" rel="noreferrer">
            Live demo <ArrowUpRight aria-hidden="true" />
          </a>
          <a href={project.codeHref} className={`${styles.btn} ${styles.btnWhite}`} target="_blank" rel="noreferrer">
            <Code2 aria-hidden="true" /> Read the code
          </a>
        </div>
      </div>
    </article>
  );
}
