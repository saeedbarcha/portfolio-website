import { cx } from "@/utils/helpers.js";

export function Container({ as: Component = "div", className, children, ...props }) {
  return (
    <Component
      className={cx("mx-auto w-full max-w-6xl px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
