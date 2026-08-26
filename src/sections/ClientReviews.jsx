import { Link } from "react-router-dom";
import { Container } from "@/components/common/Container.jsx";
import { ProofScoreboard } from "@/components/common/ProofScoreboard.jsx";
import { Reveal } from "@/components/common/Reveal.jsx";
import { SectionHeading } from "@/components/common/SectionHeading.jsx";
import { TestimonialCard } from "@/components/cards/TestimonialCard.jsx";
import { getFeaturedTestimonials, getSocialById, isSectionEnabled } from "@/utils/content.js";

export function ClientReviews() {
  const items = getFeaturedTestimonials(3);
  if (!isSectionEnabled("testimonials") || !items.length) return null;

  const featured = items[0];
  const supporting = items.slice(1);
  const upwork = getSocialById("upwork");
  const fiverr = getSocialById("fiverr");

  return (
    <section id="reviews" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Reviews"
            title="What clients say in their own words"
            description="Quoted from public Upwork and Fiverr profiles. Marketplace usernames stay as they appear on those platforms."
          />
        </Reveal>
        <Reveal>
          <ProofScoreboard className="mt-10" />
        </Reveal>
        <div className={supporting.length ? "mt-12 grid gap-6 lg:grid-cols-5" : "mt-12"}>
          <Reveal className={supporting.length ? "lg:col-span-3" : undefined}>
            <TestimonialCard item={featured} featured />
          </Reveal>
          {supporting.length ? (
            <div className="grid gap-6 lg:col-span-2">
              {supporting.map((item) => (
                <TestimonialCard key={item.id} item={item} />
              ))}
            </div>
          ) : null}
        </div>
        <p className="mt-8 text-sm text-text-muted">
          <Link to="/reviews" className="text-accent hover:text-accent-hover">
            Read all public reviews
          </Link>
          {upwork || fiverr ? (
            <>
              {" "}
              · verify on{" "}
              {upwork ? (
                <a
                  href={upwork.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover"
                >
                  Upwork
                </a>
              ) : null}
              {upwork && fiverr ? " and " : null}
              {fiverr ? (
                <a
                  href={fiverr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover"
                >
                  Fiverr
                </a>
              ) : null}
            </>
          ) : null}
          .
        </p>
      </Container>
    </section>
  );
}
