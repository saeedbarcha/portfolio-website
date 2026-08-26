import { cx } from "@/utils/helpers.js";

export function IconButton({
  as: Component = "button",
  label,
  className,
  children,
  type,
  ...props
}) {
  const isButton = Component === "button";

  return (
    <Component
      type={isButton ? type || "button" : undefined}
      aria-label={label}
      title={label}
      className={cx(
        "inline-flex size-11 items-center justify-center rounded-full border border-border text-text-secondary transition-colors",
        "hover:border-accent hover:text-accent",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
