import { Container } from "@/components/common/Container.jsx";
import { Reveal } from "@/components/common/Reveal.jsx";
import { SectionHeading } from "@/components/common/SectionHeading.jsx";
import { workProcess } from "@/data/process.js";
import { isSectionEnabled } from "@/utils/content.js";

export function WorkProcess() {
  if (!isSectionEnabled("process")) return null;

  return (
    <section id="process" className="scroll-mt-24 border-t border-border bg-bg-secondary py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="08 — Process"
            title="A clear way of working with remote clients"
            description="International collaboration works when the process is visible. This is the sequence I typically follow."
          />
        </Reveal>
        <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {workProcess.map((step, index) => (
            <Reveal key={step.id} delay={index * 0.04} as="li">
              <article className="surface-card h-full p-6">
                <p className="font-display text-sm text-accent">{step.step}</p>
                <h3 className="mt-3 font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{step.body}</p>
              </article>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
