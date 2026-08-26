import { cx } from "@/utils/helpers.js";

const variants = {
  primary:
    "bg-accent text-bg hover:bg-accent-hover active:translate-y-px disabled:bg-accent/40 disabled:text-bg/70",
  secondary:
    "border border-border-strong bg-transparent text-text hover:border-accent hover:text-accent",
  ghost:
    "text-text-secondary hover:text-text hover:bg-white/5",
  inverse:
    "bg-text text-bg hover:bg-white",
};

const sizes = {
  sm: "min-h-10 px-3.5 text-sm",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-[0.95rem]",
};

export function Button({
  as: Component = "button",
  variant = "primary",
  size = "md",
  className,
  children,
  type,
  loading = false,
  disabled,
  ...props
}) {
  const isButton = Component === "button";

  return (
    <Component
      type={isButton ? type || "button" : undefined}
      disabled={isButton ? disabled || loading : undefined}
      aria-busy={loading || undefined}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading ? (
        <>
          <span
            className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
          <span>{children}</span>
        </>
      ) : (
        children
      )}
    </Component>
  );
}
