import { Container } from "@/components/common/Container.jsx";
import { Reveal } from "@/components/common/Reveal.jsx";
import { SectionHeading } from "@/components/common/SectionHeading.jsx";
import { faqs } from "@/data/faq.js";
import { isSectionEnabled } from "@/utils/content.js";

export function Faq() {
  if (!isSectionEnabled("faq")) return null;

  return (
    <section id="faq" className="scroll-mt-24 border-t border-border bg-bg-secondary py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Questions"
            title="What clients usually ask before we start"
            description="Clear answers for remote and marketplace engagements."
          />
        </Reveal>
        <div className="mt-12 max-w-3xl divide-y divide-border">
          {faqs.map((item) => (
            <details key={item.id} className="group py-5">
              <summary className="cursor-pointer list-none font-display text-base font-semibold marker:content-none sm:text-lg">
                <span className="flex items-start justify-between gap-4">
                  {item.question}
                  <span className="mt-1 text-accent transition group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
