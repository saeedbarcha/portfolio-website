import { Badge } from "@/components/common/Badge.jsx";
import { TechnologyList } from "@/components/common/TechnologyTag.jsx";
import { configuredList, getProjectSource, isConfiguredText, cx } from "@/utils/helpers.js";

export function ProjectCover({ project, featured = false, className }) {
  const source = getProjectSource(project);
  const title = isConfiguredText(project.title) ? project.title : "Confidential engagement";
  const technologies = configuredList(project.technologies).slice(0, featured ? 6 : 4);

  return (
    <div
      className={cx(
        "relative flex min-w-0 flex-col justify-end overflow-hidden bg-surface-elevated p-6 sm:p-8",
        featured
          ? "aspect-[8/5] min-h-52 lg:aspect-auto lg:h-full lg:min-h-[18rem]"
          : "aspect-[8/5] min-h-52",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(244,241,234,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,241,234,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(circle at 80% 20%, black, transparent 72%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-accent/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative">
        <div className="flex flex-wrap gap-2">
          {source ? <Badge tone="accent">{source.label}</Badge> : null}
          {isConfiguredText(project.year) ? <Badge>{project.year}</Badge> : null}
        </div>
        <p className="mt-4 font-display text-xl font-semibold tracking-tight text-pretty sm:text-2xl">{title}</p>
        {technologies.length ? <TechnologyList items={technologies} className="mt-4" /> : null}
      </div>
    </div>
  );
}
