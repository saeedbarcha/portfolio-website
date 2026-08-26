import { Container } from "@/components/common/Container.jsx";
import { Reveal } from "@/components/common/Reveal.jsx";
import { SectionHeading } from "@/components/common/SectionHeading.jsx";
import { ExperienceCard } from "@/components/cards/ExperienceCard.jsx";
import { getConfiguredExperience, isSectionEnabled } from "@/utils/content.js";

export function Experience() {
  const items = getConfiguredExperience();
  if (!isSectionEnabled("experience") || !items.length) return null;

  return (
    <section id="experience" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="03 — Experience"
              title="Professional experience"
              description="Independent engineering for international clients, plus earlier MERN work at Dot Austere. Marketplace proof is on Upwork."
          />
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-8">
            {items.map((item) => (
              <ExperienceCard key={item.id} item={item} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
