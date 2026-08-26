import { Link } from "react-router-dom";
import { Container } from "@/components/common/Container.jsx";
import { Reveal } from "@/components/common/Reveal.jsx";
import { SectionHeading } from "@/components/common/SectionHeading.jsx";
import { skillGroups } from "@/data/skills.js";
import { getSeoTopicForTech } from "@/data/seoTopics.js";
import { isSectionEnabled } from "@/utils/content.js";

export function Skills() {
  if (!isSectionEnabled("skills")) return null;

  const groups = skillGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.confirmed !== false),
    }))
    .filter((group) => group.items.length);

  return (
    <section id="skills" className="scroll-mt-24 border-t border-border bg-bg-secondary py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="06 — Skills"
            title="Technical expertise"
            description="The stack I use to ship production web apps and Agentic AI systems. Open a skill to see matching case studies."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {groups.map((group, index) => (
            <Reveal key={group.id} delay={index * 0.05}>
              <article className="surface-card h-full p-6 sm:p-8 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-accent/25 hover:shadow-soft">
                <h3 className="font-display text-xl font-semibold">{group.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{group.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const topic = getSeoTopicForTech(item.name);
                    const className =
                      "rounded-full border border-border bg-bg px-3 py-1.5 text-sm text-text-secondary hover:border-accent hover:text-accent";
                    return (
                      <li key={item.name}>
                        {topic ? (
                          <Link to={`/skills/${topic.slug}`} className={className}>
                            {item.name}
                          </Link>
                        ) : (
                          <span className="rounded-full border border-border bg-bg px-3 py-1.5 text-sm text-text-secondary">
                            {item.name}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm text-text-muted">
          <Link to="/skills" className="text-accent hover:text-accent-hover">
            Browse all hire-by-stack pages
          </Link>
        </p>
      </Container>
    </section>
  );
}
