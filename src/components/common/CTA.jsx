import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/common/Button.jsx";
import { Container } from "@/components/common/Container.jsx";
import { Reveal } from "@/components/common/Reveal.jsx";
import { cx } from "@/utils/helpers.js";

function ActionButton({ action, variant, children }) {
  const internal = action.href.startsWith("/") && !action.href.startsWith("/#");
  if (internal) {
    return (
      <Button as={Link} to={action.href} variant={variant}>
        {children}
      </Button>
    );
  }
  return (
    <Button as="a" href={action.href} variant={variant}>
      {children}
    </Button>
  );
}

export function CTA({
  heading,
  body,
  primary,
  secondary,
  className,
}) {
  return (
    <section className={cx("py-20 sm:py-24", className)}>
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface px-6 py-12 sm:px-10 sm:py-16">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(circle at 12% 20%, rgba(201,160,108,0.16), transparent 36%), radial-gradient(circle at 90% 80%, rgba(201,160,108,0.08), transparent 30%)",
              }}
            />
            <div className="relative max-w-2xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {heading}
              </h2>
              <p className="mt-4 text-text-secondary">{body}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {primary ? (
                  <ActionButton action={primary}>
                    {primary.label}
                    <ArrowRight size={16} aria-hidden="true" />
                  </ActionButton>
                ) : null}
                {secondary ? (
                  <ActionButton action={secondary} variant="secondary">
                    {secondary.label}
                  </ActionButton>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
