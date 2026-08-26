import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/common/Button.jsx";
import { Container } from "@/components/common/Container.jsx";
import { Reveal } from "@/components/common/Reveal.jsx";
import { SectionHeading } from "@/components/common/SectionHeading.jsx";
import { ServiceCard } from "@/components/cards/ServiceCard.jsx";
import { services } from "@/data/services.js";
import { isSectionEnabled } from "@/utils/content.js";

const PAGE_SIZE = 6;

export function Services() {
  const [visible, setVisible] = useState(PAGE_SIZE);
  if (!isSectionEnabled("services")) return null;

  const shown = services.slice(0, visible);
  const hasMore = visible < services.length;
  const canCollapse = visible > PAGE_SIZE;

  return (
    <section id="services" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="07 — Services"
            title="Engagements I take on"
            description="Each engagement is scoped around the product, not a generic package. These are the shapes of work I typically own."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((service, index) => (
            <Reveal key={service.id} delay={index >= PAGE_SIZE ? (index - PAGE_SIZE) * 0.04 : index * 0.04}>
              <ServiceCard service={service} index={index} />
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
