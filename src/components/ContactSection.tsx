"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Copy, LockKeyhole, MailOpen } from "lucide-react";
import styles from "@/app/page.module.css";
import { contact } from "@/data";
import { CHARMS, useFound } from "@/components/Charms";
import { sparkle } from "@/lib/fx";

export default function ContactSection() {
  const found = useFound();
  const [label, setLabel] = useState("Copy email");
  const addrRef = useRef<HTMLSpanElement>(null);
  const unlocked = found.length === CHARMS.length;

  const copy = (btn: HTMLButtonElement) => {
    navigator.clipboard
      .writeText(contact.email)
      .then(() => {
        setLabel("Copied!");
        const r = btn.getBoundingClientRect();
        sparkle(r.left + r.width / 2, r.top, 16, 2);
        setTimeout(() => setLabel("Copy email"), 1600);
      })
      .catch(() => {
        if (!addrRef.current) return;
        const range = document.createRange();
        range.selectNodeContents(addrRef.current);
        const sel = getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
        setLabel("Selected, press Ctrl+C");
      });
  };

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-h">
      <div className={`${styles.contact} ${styles.rv}`}>
        <h2 id="contact-h">
          {contact.headline} <span>{contact.headlineAccent}</span>
        </h2>
        <div className={styles.mail}>
          <span className={styles.addr} ref={addrRef}>
            {contact.email}
          </span>
          <button className={`${styles.btn} ${styles.btnInk}`} type="button" onClick={(e) => copy(e.currentTarget)}>
            <Copy aria-hidden="true" />
            <span>{label}</span>
          </button>
          {contact.links.map((l) => (
            <a key={l.label} href={l.href} className={`${styles.btn} ${styles.btnWhite}`} target="_blank" rel="noreferrer">
              {l.label} <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className={`${styles.secret} ${unlocked ? "" : styles.locked}`}>
          {unlocked ? <MailOpen aria-hidden="true" /> : <LockKeyhole aria-hidden="true" />}
          <p>
            {unlocked ? (
              <>
                <b>Secret note:</b> if you found all five, you&apos;re exactly the kind of curious person I&apos;d love to
                build things with. Mention &ldquo;charm hunter&rdquo; in your email and I&apos;ll know.
              </>
            ) : (
              `A secret note unlocks here when you find all five charms. ${found.length} of ${CHARMS.length} so far.`
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
