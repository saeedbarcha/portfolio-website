import { useMemo } from "react";
import { Modal } from "@/components/common/Modal.jsx";
import { getVimeoEmbedUrl, getYoutubeEmbedUrl, isConfiguredText } from "@/utils/helpers.js";

export function VideoModal({ open, onClose, item }) {
  const title = item
    ? `Play testimonial from ${item.client?.name && isConfiguredText(item.client.name) ? item.client.name : "a client"}`
    : "Client testimonial";

  const media = useMemo(() => {
    if (!item?.video) return null;
    const { type, src } = item.video;

    if (type === "youtube") {
      const embed = getYoutubeEmbedUrl(src);
      return embed
        ? { kind: "iframe", src: `${embed}&autoplay=0` }
        : null;
    }

    if (type === "vimeo") {
      const embed = getVimeoEmbedUrl(src);
      return embed ? { kind: "iframe", src: embed } : null;
    }

    return { kind: "video", src };
  }, [item]);

  return (
    <Modal open={open} onClose={onClose} title={item?.title && isConfiguredText(item.title) ? item.title : title}>
      {item && media ? (
        <div className="space-y-4">
          <div className="aspect-video overflow-hidden rounded-2xl bg-black">
            {media.kind === "iframe" ? (
              <iframe
                title={title}
                src={open ? media.src : undefined}
                className="h-full w-full"
                key={media.src}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                key={media.src}
                className="h-full w-full"
                controls
                preload="metadata"
                poster={item.thumbnail}
                controlsList="nodownload"
              >
                <source src={media.src} type="video/mp4" />
                {item.captions ? (
                  <track
                    kind="captions"
                    src={item.captions}
                    srcLang="en"
                    label="English"
                    default
                  />
                ) : null}
                Your browser does not support embedded video.
              </video>
            )}
          </div>
          <p className="text-sm text-text-secondary">
            {[
              isConfiguredText(item.client?.name) ? item.client.name : null,
              isConfiguredText(item.client?.role) ? item.client.role : null,
              isConfiguredText(item.client?.company) ? item.client.company : null,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
      ) : (
        <p className="text-text-secondary">This testimonial video is not available yet.</p>
      )}
    </Modal>
  );
}
