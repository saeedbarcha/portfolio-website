import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/common/Badge.jsx";
import { Breadcrumbs } from "@/components/common/Breadcrumbs.jsx";
import { Button } from "@/components/common/Button.jsx";
import { Container } from "@/components/common/Container.jsx";
import { JsonLd } from "@/components/common/JsonLd.jsx";
import { MediaImage } from "@/components/common/MediaImage.jsx";
import { ProjectCover } from "@/components/cards/ProjectCover.jsx";
import { Seo } from "@/components/common/Seo.jsx";
import { TechnologyList } from "@/components/common/TechnologyTag.jsx";
import { TestimonialCard } from "@/components/cards/TestimonialCard.jsx";
import { VideoTestimonialCard } from "@/components/cards/VideoTestimonialCard.jsx";
import { ProjectCard } from "@/components/cards/ProjectCard.jsx";
import { VideoModal } from "@/components/common/VideoModal.jsx";
import { NotFoundPage } from "@/pages/NotFoundPage.jsx";
import { personalInfo } from "@/data/personal.js";
import {
  getMarketplaceProofUrl,
  getProjectBySlug,
  getProjectJsonLd,
  getRelatedProjects,
  getTestimonialById,
  getVideoTestimonialById,
} from "@/utils/content.js";
import { CONFIDENTIAL_NOTE } from "@/utils/constants.js";
import {
  configuredList,
  getProjectSource,
  getPublicClient,
  getPublicGithubUrl,
  getPublicProjectUrl,
  isConfiguredText,
  truncate,
} from "@/utils/helpers.js";
import { useState } from "react";

function Block({ title, children }) {
  if (!children) return null;
  return (
    <section className="border-t border-border py-8">
      <h2 className="font-display text-2xl font-semibold">{title}</h2>
      <div className="mt-4 text-text-secondary">{children}</div>
    </section>
  );
}

function ListBlock({ title, items }) {
  const list = configuredList(items);
  if (!list.length) return null;
  return (
    <Block title={title}>
      <ul className="list-disc space-y-2 pl-5">
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Block>
  );
}

export function CaseStudyPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const [video, setVideo] = useState(null);

  if (!project) {
    return <NotFoundPage />;
  }

  const client = getPublicClient(project);
  const liveUrl = getPublicProjectUrl(project);
  const githubUrl = getPublicGithubUrl(project);
  const source = getProjectSource(project);
  const marketplaceUrl = getMarketplaceProofUrl(project);
  const testimonial = getTestimonialById(project.testimonialId);
  const videoTestimonial = getVideoTestimonialById(project.videoTestimonialId);
  const related = getRelatedProjects(project);
  const title = isConfiguredText(project.title) ? project.title : "Confidential project";
  const description = isConfiguredText(project.seo?.description)
    ? project.seo.description
    : isConfiguredText(project.summary)
      ? truncate(project.summary, 160)
      : `${title} — a software project by ${personalInfo.name}.`;
  const pageTitle = isConfiguredText(project.seo?.title)
    ? project.seo.title
    : `${title} | ${personalInfo.name}`;
  const cover = project.images?.[0];

  return (
    <main id="main" className="pb-24">
      <Seo
        title={pageTitle}
        description={description}
        path={`/work/${project.slug}`}
        image={cover?.src && !cover.src.endsWith(".svg") ? cover.src : personalInfo.photo}
        type="article"
      />
      <JsonLd data={getProjectJsonLd(project)} />
      <Container className="pt-10">
        <Breadcrumbs
          items={[
            { label: "Home", path: "/" },
            { label: "Projects", path: "/work" },
            { label: title, path: `/work/${project.slug}` },
          ]}
        />
        <Link
          to="/work"
          className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm text-text-secondary hover:text-accent"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          All projects
        </Link>

        <article className="mt-8">
          <div className="flex flex-wrap gap-2">
            {source ? <Badge tone="accent">{source.label}</Badge> : null}
            {isConfiguredText(project.category) ? <Badge>{project.category}</Badge> : null}
            {isConfiguredText(project.industry) ? <Badge>{project.industry}</Badge> : null}
            {project.confidential ? <Badge>Confidential</Badge> : null}
          </div>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-text-secondary">
            {isConfiguredText(project.summary)
              ? project.summary
              : "A software engagement delivered around the client's business requirements."}
          </p>
          <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-sm text-text-muted">Client</dt>
              <dd className="mt-1 font-medium">{client.hidden ? "Confidential" : client.name}</dd>
            </div>
            {client.country ? (
              <div>
                <dt className="text-sm text-text-muted">Country</dt>
                <dd className="mt-1 font-medium">{client.country}</dd>
              </div>
            ) : null}
            <div>
              <dt className="text-sm text-text-muted">Role</dt>
              <dd className="mt-1 font-medium">
                {isConfiguredText(project.role) ? project.role : "Software Engineer"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-text-muted">Industry</dt>
              <dd className="mt-1 font-medium">
                {isConfiguredText(project.industry) ? project.industry : "Confidential"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-text-muted">Delivered via</dt>
              <dd className="mt-1 font-medium">{source?.label || "Direct engagement"}</dd>
            </div>
            <div>
              <dt className="text-sm text-text-muted">Completed</dt>
              <dd className="mt-1 font-medium">
                {isConfiguredText(project.completed) ? project.completed : "On request"}
              </dd>
            </div>
          </dl>
          {client.note ? (
            <p className="mt-4 text-sm text-text-muted">{CONFIDENTIAL_NOTE}</p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            {liveUrl ? (
              <Button as="a" href={liveUrl} target="_blank" rel="noopener noreferrer">
                Visit website
                <ArrowUpRight size={16} aria-hidden="true" />
              </Button>
            ) : null}
            {githubUrl ? (
              <Button
                as="a"
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                GitHub
              </Button>
            ) : null}
            {marketplaceUrl ? (
              <Button
                as="a"
                href={marketplaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                View on {source?.shortLabel || "marketplace"}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Button>
            ) : null}
            {!liveUrl ? (
              <Button as={Link} to="/#contact" variant="secondary">
                Request a private walkthrough
              </Button>
            ) : null}
            <Button as={Link} to="/#contact" variant="ghost">
              Discuss a similar project
            </Button>
          </div>

          {cover?.src ? (
            <MediaImage
              src={cover.src}
              alt={cover.alt || `${title} overview`}
              width={cover.width || 1600}
              height={cover.height || 1000}
              loading="eager"
              fetchPriority="high"
              className="mt-10 rounded-[1.5rem]"
            />
          ) : (
            <ProjectCover project={project} featured className="mt-10 rounded-[1.5rem]" />
          )}

          <Block title="The challenge">
            {isConfiguredText(project.challenge) ? project.challenge : null}
          </Block>
          <ListBlock title="Business requirements" items={project.requirements} />
          <Block title="My role">
            {isConfiguredText(project.role) ? (
              <p>
                {project.role}. Responsibilities included the work below, scoped to what this engagement needed.
              </p>
            ) : null}
          </Block>
          <ListBlock title="Responsibilities" items={project.responsibilities} />
          <Block title="The solution">
            {isConfiguredText(project.solution) ? project.solution : null}
          </Block>
          <Block title="Architecture / technical approach">
            {isConfiguredText(project.architecture) ? project.architecture : null}
          </Block>
          <ListBlock title="Key features" items={project.features} />
          <Block title="Technology stack">
            <TechnologyList items={configuredList(project.technologies)} />
          </Block>
          {project.images?.length > 1 ? (
            <Block title="Screenshots">
              <div className="grid gap-4 md:grid-cols-2">
                {project.images.slice(1).map((image) => (
                  <MediaImage
                    key={image.src}
                    src={image.src}
                    alt={image.alt || `${title} screenshot`}
                    width={image.width || 1400}
                    height={image.height || 900}
                    className="rounded-2xl"
                  />
                ))}
              </div>
            </Block>
          ) : null}
          <ListBlock title="Challenges & decisions" items={[...(project.challenges || []), ...(project.decisions || [])]} />
          <ListBlock title="Results" items={project.results} />

          {testimonial || videoTestimonial ? (
            <section className="border-t border-border py-8">
              <h2 className="font-display text-2xl font-semibold">Client feedback for this project</h2>
              <div className="mt-6 grid gap-6">
                {testimonial ? <TestimonialCard item={testimonial} featured /> : null}
                {videoTestimonial ? (
                  <VideoTestimonialCard item={videoTestimonial} onPlay={setVideo} />
                ) : null}
              </div>
            </section>
          ) : null}

          {related.length ? (
            <section className="border-t border-border py-8">
              <h2 className="font-display text-2xl font-semibold">Related projects</h2>
              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                {related.map((item) => (
                  <ProjectCard key={item.id} project={item} />
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-8 rounded-[1.5rem] border border-border bg-surface p-8">
            <h2 className="font-display text-2xl font-semibold">Have a similar problem to solve?</h2>
            <p className="mt-3 max-w-2xl text-text-secondary">
              Tell me about the product, the constraints, and the outcome you need. I will reply with
              questions and a clear next step.
            </p>
            <Button as={Link} to="/#contact" className="mt-6">
              Start a conversation
            </Button>
          </section>
        </article>
      </Container>
      <VideoModal open={Boolean(video)} item={video} onClose={() => setVideo(null)} />
    </main>
  );
}
