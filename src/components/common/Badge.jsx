import { cx } from "@/utils/helpers.js";

export function Badge({ children, className, tone = "default" }) {
  const tones = {
    default: "border-border text-text-secondary",
    accent: "border-accent/30 bg-accent-muted text-accent",
  };

  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
