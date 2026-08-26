import { Link } from "react-router-dom";
import { getSeoTopicForTech } from "@/data/seoTopics.js";
import { cx } from "@/utils/helpers.js";

export function TechnologyTag({ children, className }) {
  return (
    <li
      className={cx(
        "rounded-full border border-border bg-bg-secondary px-3 py-1 text-xs text-text-secondary",
        className,
      )}
    >
      {children}
    </li>
  );
}

export function TechnologyList({ items = [], className, linkToSkills = true }) {
  if (!items.length) return null;

  return (
    <ul className={cx("flex flex-wrap gap-2", className)}>
      {items.map((item) => {
        const topic = linkToSkills ? getSeoTopicForTech(item) : null;
        if (topic) {
          return (
            <li key={item}>
              <Link
                to={`/skills/${topic.slug}`}
                className="inline-flex rounded-full border border-border bg-bg-secondary px-3 py-1 text-xs text-text-secondary hover:border-accent hover:text-accent"
              >
                {item}
              </Link>
            </li>
          );
        }
        return <TechnologyTag key={item}>{item}</TechnologyTag>;
      })}
    </ul>
  );
}
