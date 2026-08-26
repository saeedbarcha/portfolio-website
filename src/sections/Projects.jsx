import { Link } from "react-router-dom";
import { Container } from "@/components/common/Container.jsx";
import { Reveal } from "@/components/common/Reveal.jsx";
import { SectionHeading } from "@/components/common/SectionHeading.jsx";
import { Button } from "@/components/common/Button.jsx";
import { ProjectCard } from "@/components/cards/ProjectCard.jsx";
import { getFeaturedProjects, getConfiguredProjects, isSectionEnabled } from "@/utils/content.js";

export function Projects() {
  if (!isSectionEnabled("projects")) return null;

  const featured = getFeaturedProjects();
  const hasWork = getConfiguredProjects().length > 0;

  return (
    <section id="work" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Selected work"
              title="Three projects a client can actually evaluate"
              description={
                hasWork
                  ? "Named product, healthcare domain, and developer-tool delivery — each with a public Upwork or Fiverr trail. The rest of the published list is on the projects page. Screenshots stay off the site when the client asked for confidentiality; I can walk through the product on a call."
                  : "Published case studies will appear here. Until then, I can walk through relevant work privately during a conversation."
              }
            />
            <Button as={Link} to="/work" variant="secondary" className="shrink-0">
              View all projects
            </Button>
          </div>
        </Reveal>

        {featured.length ? (
          <div className="mt-12 space-y-8">
            {featured.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.04} className="min-w-0">
                <ProjectCard project={project} featured />
              </Reveal>
            ))}
          </div>
        ) : hasWork ? (
          <p className="mt-10 text-text-secondary">
            Additional case studies are listed below.
          </p>
        ) : (
          <Reveal>
            <div className="surface-card mt-10 p-8 sm:p-10">
              <p className="max-w-2xl text-text-secondary">
                Selected client work is shared as detailed case studies. Some engagements remain
                confidential; others will be published here. If you are evaluating a collaboration,
                I can walk through relevant examples during a conversation.
              </p>
              <Button as="a" href="#contact" className="mt-6">
                Request relevant work
              </Button>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
