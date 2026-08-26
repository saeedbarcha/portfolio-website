import { useState } from "react";
import { Container } from "@/components/common/Container.jsx";
import { Reveal } from "@/components/common/Reveal.jsx";
import { SectionHeading } from "@/components/common/SectionHeading.jsx";
import { VideoModal } from "@/components/common/VideoModal.jsx";
import { VideoTestimonialCard } from "@/components/cards/VideoTestimonialCard.jsx";
import { getConfiguredVideoTestimonials, isSectionEnabled } from "@/utils/content.js";

export function VideoTestimonials() {
  const items = getConfiguredVideoTestimonials();
  const [active, setActive] = useState(null);

  if (!isSectionEnabled("videoTestimonials") || !items.length) return null;

  return (
    <section id="videos" className="scroll-mt-24 border-t border-border bg-bg-secondary py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Hear from clients"
            title="What clients say"
            description="Short conversations with people I have worked with. Videos load only when you choose to play them."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <VideoTestimonialCard item={item} onPlay={setActive} />
            </Reveal>
          ))}
        </div>
      </Container>
      <VideoModal open={Boolean(active)} item={active} onClose={() => setActive(null)} />
    </section>
  );
}
