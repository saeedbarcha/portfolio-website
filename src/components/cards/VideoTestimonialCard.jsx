import { Play } from "lucide-react";
import { MediaImage } from "@/components/common/MediaImage.jsx";
import { getYoutubePoster, isConfiguredText, isPlaceholder } from "@/utils/helpers.js";

export function VideoTestimonialCard({ item, onPlay }) {
  const name = isConfiguredText(item.client?.name) ? item.client.name : "a client";
  const label = `Play testimonial from ${name}`;
  const poster =
    item.thumbnail && !isPlaceholder(item.thumbnail)
      ? item.thumbnail
      : item.video?.type === "youtube"
        ? getYoutubePoster(item.video.src)
        : null;

  return (
    <article className="surface-card overflow-hidden">
      <div className="relative">
        <MediaImage
          src={poster}
          alt={`${name} video testimonial`}
          width={1280}
          height={720}
          className="aspect-video"
        />
        <button
          type="button"
          onClick={() => onPlay(item)}
          aria-label={label}
          className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/35"
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-accent text-bg shadow-soft">
            <Play size={22} fill="currentColor" aria-hidden="true" />
          </span>
        </button>
        {isConfiguredText(item.duration) ? (
          <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2.5 py-1 text-xs">
            {item.duration}
          </span>
        ) : null}
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold">
          {isConfiguredText(item.title) ? item.title : `Client testimonial`}
        </h3>
        <p className="mt-1 text-sm text-text-muted">
          {[
            isConfiguredText(item.client?.name) ? item.client.name : "International client",
            isConfiguredText(item.client?.company) ? item.client.company : null,
            isConfiguredText(item.client?.country) ? item.client.country : null,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>
    </article>
  );
}
