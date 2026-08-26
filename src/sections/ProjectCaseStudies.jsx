import { ProjectCard } from "@/components/cards/ProjectCard.jsx";
import { Container } from "@/components/common/Container.jsx";
import { Reveal } from "@/components/common/Reveal.jsx";
import { SectionHeading } from "@/components/common/SectionHeading.jsx";
import { getConfiguredProjects } from "@/utils/content.js";

/**
 * Additional published projects that are not marked featured.
 * Featured work is rendered by the Projects section.
 */
export function ProjectCaseStudies() {
  const items = getConfiguredProjects().filter((project) => !project.featured);
  if (!items.length) return null;

  return (
    <section id="case-studies" className="scroll-mt-24 pb-8">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="More case studies"
            title="Additional published work"
            description="Further engagements with public write-ups. Confidential details stay withheld."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {items.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
