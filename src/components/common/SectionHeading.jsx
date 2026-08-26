import { cx } from "@/utils/helpers.js";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleAs: TitleTag = "h2",
}) {
  return (
    <div
      className={cx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <TitleTag className="font-display text-3xl font-semibold tracking-tight text-balance text-text sm:text-4xl">
        {title}
      </TitleTag>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-[1.05rem]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
