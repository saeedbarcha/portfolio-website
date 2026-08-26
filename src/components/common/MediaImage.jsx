import { useState } from "react";
import { cx } from "@/utils/helpers.js";

function hasBoxSizing(className = "") {
  return /\b(aspect-|size-|h-|min-h-|max-h-)/.test(className);
}

export function MediaImage({
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
  loading = "lazy",
  decoding = "async",
  fetchPriority,
}) {
  const [status, setStatus] = useState("loading");
  const isPriority = loading === "eager" || fetchPriority === "high";

  return (
    <div
      className={cx(
        "relative min-w-0 w-full overflow-hidden bg-surface-elevated",
        !hasBoxSizing(className) && "aspect-[8/5]",
        className,
      )}
    >
      {status !== "error" ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding={isPriority ? "sync" : decoding}
          fetchPriority={isPriority ? "high" : "auto"}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={cx(
            "absolute inset-0 size-full max-w-none object-cover",
            isPriority ? "opacity-100" : "transition-opacity duration-500",
            !isPriority && (status === "loaded" ? "opacity-100" : "opacity-0"),
            imgClassName,
          )}
        />
      ) : (
        <div
          className="flex h-full min-h-[12rem] w-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(201,160,108,0.16),_transparent_55%),linear-gradient(180deg,#16161b,#101014)]"
          role="img"
          aria-label={alt || "Project visual placeholder"}
        >
          <span className="font-display text-sm tracking-[0.2em] text-accent/80">SH</span>
        </div>
      )}
    </div>
  );
}
