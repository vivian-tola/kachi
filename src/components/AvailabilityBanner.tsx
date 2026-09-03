import styles from "@/app/page.module.css";
import { site } from "@/data";

export default function AvailabilityBanner() {
  if (!site.showAvailability) return null;

  return (
    <div className={styles.availability}>
      <div className={styles.availabilityInner}>
        <span className={styles.availabilityDot} />
        <span>{site.availabilityText}</span>
      </div>
    </div>
  );
}
