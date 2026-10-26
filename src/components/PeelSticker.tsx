"use client";

import { useRef, useState } from "react";
import { Gem } from "lucide-react";
import styles from "@/app/page.module.css";
import { useCharms, useFound } from "@/components/Charms";

function Sticker() {
  const { grant } = useCharms();
  const hasGem = useFound().includes("gem");
  const [peeled, setPeeled] = useState(false);
  const gemRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        className={`${styles.peel} ${peeled || hasGem ? styles.gone : ""}`}
        type="button"
        onClick={() => {
          setPeeled(true);
          setTimeout(() => gemRef.current?.focus(), 300);
        }}
      >
        Peel me!
      </button>
      <button
        ref={gemRef}
        className={styles.under}
        type="button"
        aria-label="Collect the Gem charm"
        hidden={!peeled || hasGem}
        onClick={(e) => grant("gem", e.currentTarget)}
      >
        <Gem />
      </button>
    </>
  );
}

// Remounts on "Start the hunt again" so the sticker goes back on.
export default function PeelSticker() {
  const { resetKey } = useCharms();
  return <Sticker key={resetKey} />;
}
