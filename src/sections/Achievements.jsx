import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/common/Container.jsx";
import { Reveal } from "@/components/common/Reveal.jsx";
import { SectionHeading } from "@/components/common/SectionHeading.jsx";
import {
  achievements,
  githubAchievements,
  githubAchievementsContent,
} from "@/data/credentials.js";
import { githubProof } from "@/data/engagement.js";
import { isSectionEnabled } from "@/utils/content.js";
import { configuredList, isConfiguredText, isValidHttpUrl } from "@/utils/helpers.js";

export function Achievements() {
  const items = configuredList(achievements);
  const githubBadges = configuredList(githubAchievements);
  if (!isSectionEnabled("achievements") || !items.length) return null;

  return (
    <section id="achievements" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="04 — Achievements"
            title="Public standing, not invented claims"
            description="Marketplace delivery on Upwork and Fiverr, plus GitHub badges from the public saeedbarcha profile. Open a link to verify."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.04}>
              <article className="surface-card flex h-full flex-col p-6 sm:p-8 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-accent/25 hover:shadow-soft">
                <p className="eyebrow">{item.source}</p>
                <p className="mt-4 font-display text-3xl font-semibold tracking-tight">{item.metric}</p>
                <h3 className="mt-2 font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">{item.body}</p>
                {isValidHttpUrl(item.href) ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
                  >
                    Verify on {item.source}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>

        {githubBadges.length ? (
          <div className="mt-16 border-t border-border pt-16">
            <Reveal>
              <SectionHeading
                eyebrow="GitHub"
                title={githubAchievementsContent.heading}
                description={githubAchievementsContent.lead}
              />
            </Reveal>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {githubBadges.map((item, index) => (
                <Reveal key={item.id} delay={index * 0.04}>
                  <li className="h-full">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="surface-card flex h-full flex-col items-center p-6 text-center transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-accent/25 hover:shadow-soft"
                    >
                      {isConfiguredText(item.image) ? (
                        <img
                          src={item.image}
                          alt=""
                          width={128}
                          height={128}
                          loading="lazy"
                          decoding="async"
                          className="size-24 object-contain sm:size-28"
                        />
                      ) : null}
                      <p className="mt-4 font-display text-lg font-semibold">
                        {item.name}
                        {item.count ? (
                          <span className="ml-1.5 text-sm font-medium text-accent">{item.count}</span>
                        ) : null}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.body}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent">
                        View on GitHub
                        <ArrowUpRight size={12} aria-hidden="true" />
                      </span>
                    </a>
                  </li>
                </Reveal>
              ))}
            </ul>
            {isValidHttpUrl(githubProof.profileUrl) ? (
              <p className="mt-8 text-sm text-text-muted">
                <a
                  href={githubProof.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover"
                >
                  Open GitHub profile
                </a>
                {" · "}
                @{githubProof.username}
              </p>
            ) : null}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
