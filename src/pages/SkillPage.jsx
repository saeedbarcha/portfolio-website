import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs.jsx";
import { Button } from "@/components/common/Button.jsx";
import { Container } from "@/components/common/Container.jsx";
import { JsonLd } from "@/components/common/JsonLd.jsx";
import { Seo } from "@/components/common/Seo.jsx";
import { ProjectCard } from "@/components/cards/ProjectCard.jsx";
import { NotFoundPage } from "@/pages/NotFoundPage.jsx";
import { personalInfo } from "@/data/personal.js";
import { getSeoTopicBySlug } from "@/data/seoTopics.js";
import {
  getBreadcrumbJsonLd,
  getPersonJsonLd,
  getProjectsForTopic,
  getSkillServiceJsonLd,
  getSocialById,
} from "@/utils/content.js";

export function SkillPage() {
  const { slug } = useParams();
  const topic = getSeoTopicBySlug(slug);

  if (!topic) {
    return <NotFoundPage />;
  }

  const related = getProjectsForTopic(topic);
  const upwork = getSocialById("upwork");
  const fiverr = getSocialById("fiverr");
  const breadcrumbs = [
    { label: "Home", path: "/" },
    { label: "Skills & stacks", path: "/skills" },
    { label: topic.name, path: `/skills/${topic.slug}` },
  ];

  return (
    <main id="main" className="pb-20">
      <Seo
        title={topic.title}
        description={topic.description}
        path={`/skills/${topic.slug}`}
        keywords={[
          `${topic.name} developer`,
          `hire ${topic.name} developer`,
          `${topic.name} freelancer`,
          "Upwork",
          "Fiverr",
          personalInfo.name,
        ]}
      />
      <JsonLd data={getPersonJsonLd()} />
      <JsonLd data={getSkillServiceJsonLd(topic)} />
      <JsonLd data={getBreadcrumbJsonLd(breadcrumbs)} />
      <Container className="pt-10">
        <Breadcrumbs items={breadcrumbs} />
        <header className="mt-8 max-w-3xl">
          <p className="eyebrow">{topic.name}</p>
          <h1 className="mt-4 font-display text-[1.85rem] font-semibold leading-[1.15] tracking-tight text-pretty sm:text-5xl">
            {topic.headline}
          </h1>
          <p className="mt-4 text-lg text-text-secondary">{topic.summary}</p>
        </header>
        <div className="mt-10 max-w-3xl space-y-4 text-text-secondary">
          {topic.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button as={Link} to="/#contact">
            Hire for {topic.name}
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
          {upwork ? (
            <Button as="a" href={upwork.url} target="_blank" rel="noopener noreferrer" variant="secondary">
              Upwork profile
            </Button>
          ) : null}
          {fiverr ? (
            <Button as="a" href={fiverr.url} target="_blank" rel="noopener noreferrer" variant="ghost">
              Fiverr profile
            </Button>
          ) : null}
        </div>

        {related.length ? (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-semibold">
              {topic.name} projects
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-text-secondary">
              Case studies on this site that use {topic.name}. Client names stay unpublished.
            </p>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {related.slice(0, 4).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            <p className="mt-6">
              <Link to="/work" className="text-sm text-accent hover:text-accent-hover">
                All projects
              </Link>
            </p>
          </section>
        ) : null}
      </Container>
    </main>
  );
}
