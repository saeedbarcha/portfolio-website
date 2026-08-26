import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/common/Button.jsx";
import { Container } from "@/components/common/Container.jsx";
import { Reveal } from "@/components/common/Reveal.jsx";
import { SectionHeading } from "@/components/common/SectionHeading.jsx";
import { aboutContent } from "@/data/personal.js";

const PAGE_SIZE = 6;

export function AboutCapabilities() {
  const items = aboutContent.capabilities || [];
  const [visible, setVisible] = useState(PAGE_SIZE);
  if (!items.length) return null;

  const shown = items.slice(0, visible);
  const hasMore = visible < items.length;
  const canCollapse = visible > PAGE_SIZE;

  return (
    <section id="how-i-can-help" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="02 — How I can help"
            title={aboutContent.capabilitiesHeading}
            description={aboutContent.capabilitiesLead}
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {shown.map((item, index) => (
            <Reveal key={item.title} delay={index >= PAGE_SIZE ? (index - PAGE_SIZE) * 0.04 : index * 0.04}>
              <article className="surface-card h-full p-6 sm:p-8 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-accent/25 hover:shadow-soft">
                <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-text-secondary">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        {hasMore || canCollapse ? (
          <div className="mt-10 flex justify-center">
            <Button
              variant="secondary"
              aria-expanded={!hasMore}
              onClick={() =>
                setVisible((count) => (hasMore ? count + PAGE_SIZE : PAGE_SIZE))
              }
            >
              {hasMore ? (
                <>
                  Show more
                  <ChevronDown size={16} aria-hidden="true" />
                </>
              ) : (
                <>
                  Show less
                  <ChevronUp size={16} aria-hidden="true" />
                </>
              )}
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
