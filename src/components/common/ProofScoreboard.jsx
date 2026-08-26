import { fiverrProof, upworkProof } from "@/data/engagement.js";
import { cx } from "@/utils/helpers.js";

export function ProofScoreboard({ className }) {
  const items = [
    { value: upworkProof.badge, label: "Upwork" },
    { value: upworkProof.jobSuccess, label: "Job Success" },
    { value: fiverrProof.level, label: "Fiverr seller" },
    { value: fiverrProof.projects, label: "Fiverr projects" },
  ];

  return (
    <ul
      className={cx(
        "grid grid-cols-2 gap-4 rounded-[1.5rem] border border-border bg-surface p-6 sm:grid-cols-4 sm:p-8",
        className,
      )}
    >
      {items.map((item) => (
        <li key={item.label}>
          <p className="font-display text-2xl font-semibold tracking-tight">{item.value}</p>
          <p className="mt-1 text-sm text-text-muted">{item.label}</p>
        </li>
      ))}
    </ul>
  );
}
