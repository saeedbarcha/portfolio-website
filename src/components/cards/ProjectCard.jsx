import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/common/Badge.jsx";
import { Button } from "@/components/common/Button.jsx";
import { MediaImage } from "@/components/common/MediaImage.jsx";
import { ProjectCover } from "@/components/cards/ProjectCover.jsx";
import { TechnologyList } from "@/components/common/TechnologyTag.jsx";
import { getMarketplaceProofUrl } from "@/utils/content.js";
import {
  configuredList,
  getProjectSource,
  getPublicClient,
  getPublicProjectUrl,
  isConfiguredText,
  cx,
} from "@/utils/helpers.js";
import { CONFIDENTIAL_NOTE } from "@/utils/constants.js";

export function ProjectCard({ project, featured = false, priority = false }) {
  const client = getPublicClient(project);
  const liveUrl = getPublicProjectUrl(project);
  const source = getProjectSource(project);
  const marketplaceUrl = getMarketplaceProofUrl(project);
  const cover = project.images?.[0];
  const technologies = configuredList(project.technologies).slice(0, featured ? 6 : 4);
  const title = isConfiguredText(project.title) ? project.title : "Confidential engagement";

  return (
    <article
      className={cx(
        "surface-card group isolate overflow-hidden transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-accent/25 hover:shadow-soft",
        featured
          ? "grid items-stretch lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
          : "flex flex-col",
      )}
    >
      {cover?.src ? (
        <MediaImage
          src={cover.src}
          alt={cover.alt || `${title} preview`}
          width={cover.width || 1600}
          height={cover.height || 1000}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          className={cx(
            featured
              ? "aspect-[8/5] min-h-52 lg:aspect-auto lg:h-full lg:min-h-[18rem]"
              : "aspect-[8/5] min-h-52",
          )}
        />
      ) : (
        <ProjectCover project={project} featured={featured} />
      )}
      <div
        className={cx(
          "relative z-[1] flex min-w-0 flex-1 flex-col p-6 sm:p-8",
          featured && "lg:p-10",
        )}
      >
        <div className="flex flex-wrap gap-2">
          {source ? <Badge tone="accent">{source.label}</Badge> : null}
          {isConfiguredText(project.category) ? <Badge>{project.category}</Badge> : null}
          {project.confidential ? <Badge>Confidential</Badge> : null}
        </div>
        <h3 className={cx("mt-4 font-display font-semibold tracking-tight text-pretty", featured ? "text-2xl sm:text-3xl" : "text-xl")}>
          <Link to={`/work/${project.slug}`} className="hover:text-accent">
            {title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-text-muted">
          {client.hidden
            ? [
                client.country || "Confidential",
                source?.label,
                isConfiguredText(project.role) ? project.role : null,
              ]
                .filter(Boolean)
                .join(" · ")
            : [client.name, client.country, isConfiguredText(project.role) ? project.role : null]
                .filter(Boolean)
                .join(" · ")}
        </p>
        {client.note && !client.hidden ? (
          <p className="mt-2 text-sm text-text-muted">{CONFIDENTIAL_NOTE}</p>
        ) : null}
        {isConfiguredText(project.summary) ? (
          <p className="mt-4 text-text-secondary">{project.summary}</p>
        ) : (
          <p className="mt-4 text-text-muted">Project details can be shared in conversation.</p>
        )}
        <TechnologyList items={technologies} className="mt-5" />
        <div className="mt-8 flex flex-wrap gap-3">
          <Button as={Link} to={`/work/${project.slug}`} size="sm">
            View Case Study
          </Button>
          {liveUrl ? (
            <Button
              as="a"
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="sm"
            >
              Visit Website
              <ArrowUpRight size={15} aria-hidden="true" />
            </Button>
          ) : (
            <Button as={Link} to="/#contact" variant="secondary" size="sm">
              Private walkthrough
            </Button>
          )}
          {marketplaceUrl ? (
            <Button
              as="a"
              href={marketplaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="sm"
            >
              View on {source?.shortLabel || "profile"}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
