import { Badge } from "@/components/common/Badge.jsx";
import { TechnologyList } from "@/components/common/TechnologyTag.jsx";
import { configuredList, isConfiguredText } from "@/utils/helpers.js";

export function ExperienceCard({ item }) {
  const achievements = configuredList(item.achievements);
  const technologies = configuredList(item.technologies);

  return (
    <article className="relative grid gap-4 border-b border-border py-10 last:border-b-0 md:grid-cols-[11rem_1fr] md:gap-10">
      <p className="text-sm text-text-muted">
        {isConfiguredText(item.startDate) ? item.startDate : ""}
        {isConfiguredText(item.endDate) ? ` — ${item.endDate}` : ""}
      </p>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-xl font-semibold">{item.role}</h3>
          {isConfiguredText(item.location) ? <Badge>{item.location}</Badge> : null}
        </div>
        <p className="mt-1 text-accent">{item.company}</p>
        {isConfiguredText(item.description) ? (
          <p className="mt-4 max-w-2xl text-text-secondary">{item.description}</p>
        ) : null}
        {achievements.length ? (
          <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-sm text-text-secondary">
            {achievements.map((achievement) => (
              <li key={achievement}>{achievement}</li>
            ))}
          </ul>
        ) : null}
        <TechnologyList items={technologies} className="mt-5" />
      </div>
    </article>
  );
}
