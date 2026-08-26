import { Container } from "@/components/common/Container.jsx";
import { Reveal } from "@/components/common/Reveal.jsx";
import { SectionHeading } from "@/components/common/SectionHeading.jsx";
import { SocialLinks } from "@/components/common/SocialLinks.jsx";
import { getActiveSocialLinks, isSectionEnabled } from "@/utils/content.js";

export function SocialPresence() {
  const links = getActiveSocialLinks("social");
  if (!isSectionEnabled("social") || !links.length) return null;

  return (
    <section id="social" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Find me online"
            title="Social and professional profiles"
            description="The public links I work from. Each one opens the live profile."
          />
        </Reveal>
        <Reveal delay={0.05}>
          <SocialLinks links={links} variant="row" className="mt-10" />
        </Reveal>
      </Container>
    </section>
  );
}
