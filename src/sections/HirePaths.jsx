import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/common/Button.jsx";
import { Container } from "@/components/common/Container.jsx";
import { Reveal } from "@/components/common/Reveal.jsx";
import { SectionHeading } from "@/components/common/SectionHeading.jsx";
import { getHirePaths, isSectionEnabled } from "@/utils/content.js";

export function HirePaths() {
  const paths = getHirePaths();
  if (!isSectionEnabled("hire") || !paths.length) return null;

  return (
    <section id="hire" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How to hire"
            title="Work with me the way your process already works"
              description="Direct engagement, Upwork (Top Rated, 100% Job Success), or Fiverr (Level 2 seller, $5K+ earned, 57 projects)."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {paths.map((path, index) => (
            <Reveal key={path.id} delay={index * 0.05}>
              <article className="surface-card flex h-full flex-col p-6 sm:p-8 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-accent/25 hover:shadow-soft">
                <h3 className="font-display text-xl font-semibold">{path.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">{path.body}</p>
                {path.external ? (
                  <Button
                    as="a"
                    href={path.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    className="mt-6"
                    size="sm"
                  >
                    {path.cta}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Button>
                ) : (
                  <Button as={Link} to={path.href} variant="secondary" className="mt-6" size="sm">
                    {path.cta}
                  </Button>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
