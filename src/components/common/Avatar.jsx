import { personalInfo } from "@/data/personal.js";
import { cx, isConfiguredText } from "@/utils/helpers.js";

const sizes = {
  sm: "size-8",
  md: "size-10",
  lg: "size-14",
};

export function Avatar({ size = "md", className, priority = false, alt }) {
  const photo = isConfiguredText(personalInfo.photo) ? personalInfo.photo : null;
  const dim = size === "lg" ? 112 : size === "sm" ? 64 : 80;
  const label = alt === undefined ? personalInfo.name : alt;

  if (!photo) {
    return (
      <span
        className={cx(
          "inline-flex items-center justify-center rounded-full border border-border font-display text-sm font-semibold tracking-[0.18em] text-accent",
          sizes[size],
          className,
        )}
      >
        {personalInfo.monogram}
      </span>
    );
  }

  return (
    <img
      src={photo}
      alt={label}
      width={dim}
      height={dim}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      className={cx("rounded-full object-cover object-top", sizes[size], className)}
    />
  );
}
