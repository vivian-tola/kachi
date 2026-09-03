import styles from "@/app/page.module.css";

export default function PlaceholderImage({
  caption,
  className,
}: {
  caption: string;
  className?: string;
}) {
  return (
    <div
      className={className ? `${styles.shot} ${className}` : styles.shot}
      role="img"
      aria-label={caption}
    >
      <svg
        className={styles.shotIcon}
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
    </div>
  );
}
