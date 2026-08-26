import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/common/Container.jsx";
import { Reveal } from "@/components/common/Reveal.jsx";
import { SectionHeading } from "@/components/common/SectionHeading.jsx";
import { certifications, certificationsContent } from "@/data/credentials.js";
import { isSectionEnabled } from "@/utils/content.js";
import { configuredList, isConfiguredText, isValidHttpUrl } from "@/utils/helpers.js";

export function Certifications() {
  const items = configuredList(certifications);
  if (!isSectionEnabled("certifications") || !items.length) return null;

  return (
    <section id="certifications" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="05 — Certifications"
              title={certificationsContent.heading}
              description={certificationsContent.lead}
            />
          </Reveal>
          <div className="grid gap-5">
            {items.map((item, index) => {
              const verifyUrl = isValidHttpUrl(item.url) ? item.url : null;
              const image = isConfiguredText(item.image) ? item.image : null;
              const imageEl = image ? (
                <img
                  src={image}
                  alt={`${item.name} certificate awarded to Saeed Hussain`}
                  width={1024}
                  height={753}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full bg-white"
                />
              ) : null;

              return (
                <Reveal key={item.id || item.credentialId || item.name} delay={index * 0.05}>
                  <article className="overflow-hidden rounded-[1.15rem] border border-border bg-surface transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-accent/25 hover:shadow-soft">
                    {imageEl ? (
                      verifyUrl ? (
                        <a
                          href={verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block overflow-hidden border-b border-border bg-white"
                        >
                          {imageEl}
                        </a>
                      ) : (
                        <div className="overflow-hidden border-b border-border bg-white">{imageEl}</div>
                      )
                    ) : null}
                    <div className="p-6 sm:p-8">
                      <p className="eyebrow">{item.issuer}</p>
                      <h3 className="mt-4 font-display text-2xl font-semibold">{item.name}</h3>
                      <p className="mt-2 text-sm text-text-muted">
                        {[item.instructor ? `Taught by ${item.instructor}` : null, item.year, item.hours]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                      {isConfiguredText(item.summary) ? (
                        <p className="mt-4 text-text-secondary">{item.summary}</p>
                      ) : null}
                      {isConfiguredText(item.credentialId) ? (
                        <p className="mt-4 text-xs tracking-wide text-text-muted">
                          Credential ID {item.credentialId}
                        </p>
                      ) : null}
                      {verifyUrl ? (
                        <a
                          href={verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
                        >
                          Verify certificate
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
