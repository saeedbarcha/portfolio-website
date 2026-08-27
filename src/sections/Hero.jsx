import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/common/Button.jsx";
import { Container } from "@/components/common/Container.jsx";
import { ResumeDownload } from "@/components/common/ResumeDownload.jsx";
import { SocialLinks } from "@/components/common/SocialLinks.jsx";
import { engagement } from "@/data/engagement.js";
import { heroContent, personalInfo } from "@/data/personal.js";
import { getActiveSocialLinks, getPublicEmail } from "@/utils/content.js";
import { isConfiguredText } from "@/utils/helpers.js";

export function Hero() {
  const social = getActiveSocialLinks("hero");
  const email = getPublicEmail();

  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-16 lg:pt-20">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(244,241,234,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,241,234,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(circle at 30% 20%, black, transparent 58%)",
        }}
      />
      <div
        className="animate-float pointer-events-none absolute -left-24 top-10 size-[28rem] rounded-full bg-accent/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="animate-float-delayed pointer-events-none absolute -right-16 bottom-0 size-[22rem] rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div className="max-w-2xl">
            <p className="eyebrow">{personalInfo.eyebrow}</p>
            {engagement.available ? (
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-muted px-3 py-1 text-xs font-medium text-accent">
                <span className="animate-pulse-dot size-1.5 rounded-full bg-accent" aria-hidden="true" />
                {engagement.label}
                {isConfiguredText(engagement.timezone) ? ` · ${engagement.timezone}` : ""}
              </p>
            ) : null}
            <h1 className="mt-5 font-display text-[1.85rem] font-semibold leading-[1.15] tracking-tight text-pretty sm:text-5xl lg:text-6xl">
              {personalInfo.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">{personalInfo.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button as={Link} to={heroContent.primaryCta.href} size="lg">
                {heroContent.primaryCta.label}
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button as="a" href={heroContent.secondaryCta.href} variant="secondary" size="lg">
                {heroContent.secondaryCta.label}
              </Button>
              <ResumeDownload size="lg" />
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex min-h-11 items-center gap-2 text-sm text-text-secondary hover:text-accent"
                >
                  <Mail size={16} aria-hidden="true" />
                  {email}
                </a>
              ) : null}
              <SocialLinks links={social} />
            </div>
          </div>

          <figure className="relative mx-auto w-full max-w-md lg:max-w-lg">
            <div className="absolute -inset-3 rounded-[2rem] border border-accent/25" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[1.6rem] border border-border bg-surface shadow-soft">
              <img
                src={personalInfo.photo}
                alt={`${personalInfo.name}, ${personalInfo.primaryRole}`}
                width={1024}
                height={1024}
                decoding="async"
                fetchPriority="high"
                className="aspect-square h-full w-full max-w-none object-cover object-[center_12%]"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-bg/80 to-transparent"
                aria-hidden="true"
              />
            </div>
            <figcaption className="pointer-events-none absolute inset-x-8 bottom-8 z-10">
              <span className="block font-display text-sm font-medium text-text">{personalInfo.name}</span>
              <span className="mt-0.5 block text-xs tracking-[0.16em] text-accent uppercase">
                {personalInfo.primaryRole}
              </span>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
