import { ArrowUpRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { MediaImage } from "@/components/common/MediaImage.jsx";
import { getProjectById } from "@/utils/content.js";
import { isConfiguredText, isValidHttpUrl } from "@/utils/helpers.js";
import { cx } from "@/utils/helpers.js";

export function TestimonialCard({ item, featured = false }) {
  const project = getProjectById(item.projectId);
  const hasAvatar = item.client?.avatar && !item.client.avatar.includes("[");
  const sourceUrl = isValidHttpUrl(item.sourceUrl) ? item.sourceUrl : null;

  return (
    <article
      className={cx(
        "surface-card h-full p-6 sm:p-8 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-accent/25 hover:shadow-soft",
        featured && "md:p-10",
      )}
    >
      <Quote className="text-accent" size={featured ? 28 : 22} aria-hidden="true" />
      <blockquote
        className={cx(
          "mt-5 text-text-secondary",
          featured
            ? "font-serif text-2xl leading-snug text-text sm:text-[1.7rem]"
            : "text-[0.98rem] leading-relaxed",
        )}
      >
        {item.review}
      </blockquote>
      <div className="mt-8 flex items-center gap-3">
        {hasAvatar ? (
          <MediaImage
            src={item.client.avatar}
            alt={`${item.client.name} portrait`}
            width={64}
            height={64}
            className="size-12 shrink-0 rounded-full"
          />
        ) : (
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border text-sm text-accent">
            {item.client.name.slice(0, 1)}
          </span>
        )}
        <div>
          <p className="font-medium text-text">{item.client.name}</p>
          <p className="text-sm text-text-muted">
            {[
              isConfiguredText(item.client.role) ? item.client.role : null,
              isConfiguredText(item.client.company) ? item.client.company : null,
              isConfiguredText(item.client.country) ? item.client.country : null,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        {project ? (
          <Link to={`/work/${project.slug}`} className="text-accent hover:text-accent-hover">
            {isConfiguredText(project.title) ? project.title : "View related project"}
          </Link>
        ) : null}
        {isConfiguredText(item.source) ? (
          sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-text-muted hover:text-text"
            >
              {item.source}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ) : (
            <span className="text-text-muted">{item.source}</span>
          )
        ) : null}
        {typeof item.rating === "number" ? (
          <span className="text-text-muted">{item.rating}/5</span>
        ) : null}
      </div>
    </article>
  );
}
