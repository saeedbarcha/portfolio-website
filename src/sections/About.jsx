import { Container } from "@/components/common/Container.jsx";
import { Reveal } from "@/components/common/Reveal.jsx";
import { SectionHeading } from "@/components/common/SectionHeading.jsx";
import { aboutContent, personalInfo } from "@/data/personal.js";
import { collaborationCountries } from "@/data/collaboration.js";
import { engagement } from "@/data/engagement.js";
import { getSocialById } from "@/utils/content.js";
import { isConfiguredText } from "@/utils/helpers.js";

function HighlightGrid({ items }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4">
      {items.map((item) => (
        <li
          key={item.label}
          className="rounded-[1.05rem] border border-border bg-surface p-3.5 sm:p-5"
        >
          <p className="font-display text-lg font-semibold tracking-tight sm:text-2xl">
            {item.value}
          </p>
          <p className="mt-1 text-sm font-medium">{item.label}</p>
          <p className="mt-1 text-xs leading-relaxed text-text-muted">{item.detail}</p>
        </li>
      ))}
    </ul>
  );
}

export function About() {
  const upwork = getSocialById("upwork");
  const fiverr = getSocialById("fiverr");
  const languages = engagement.languages.filter((item) => item.confirmed !== false);
  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="01 — About"
              title={aboutContent.heading}
              description={aboutContent.lead}
            />
            <div className="mt-8 space-y-4 text-text-secondary">
              {aboutContent.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {aboutContent.highlights?.length ? (
              <div className="mt-10">
                <p className="eyebrow mb-4">Upwork</p>
                <HighlightGrid items={aboutContent.highlights} />
              </div>
            ) : null}
            {aboutContent.fiverrHighlights?.length ? (
              <div className="mt-8">
                <p className="eyebrow mb-4">Fiverr</p>
                <HighlightGrid items={aboutContent.fiverrHighlights} />
              </div>
            ) : null}
          </Reveal>
          <Reveal delay={0.08}>
            <aside className="overflow-hidden rounded-[1.15rem] border border-border bg-surface">
              <div className="relative aspect-[4/5] overflow-hidden sm:aspect-square">
                <img
                  src={personalInfo.photo}
                  alt={`${personalInfo.name}, ${personalInfo.primaryRole}`}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  className="size-full max-w-none object-cover object-[center_12%] transition-transform duration-700 ease-out hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent" />
                <p className="absolute bottom-3 left-4 text-xs tracking-[0.16em] text-text uppercase">
                  {personalInfo.name}
                </p>
              </div>
              <div className="p-6 sm:p-8">
              <p className="eyebrow">Profile</p>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="text-sm text-text-muted">Name</dt>
                  <dd className="mt-1 font-medium">{personalInfo.name}</dd>
                </div>
                <div>
                  <dt className="text-sm text-text-muted">Role</dt>
                  <dd className="mt-1 font-medium">{personalInfo.primaryRole}</dd>
                </div>
                <div>
                  <dt className="text-sm text-text-muted">Education</dt>
                  <dd className="mt-1 font-medium">
                    {personalInfo.education.shortDegree}
                    <span className="block text-sm font-normal text-text-secondary">
                      {personalInfo.education.university}, {personalInfo.education.graduationYear}
                    </span>
                  </dd>
                </div>
                {isConfiguredText(personalInfo.location) ? (
                  <div>
                    <dt className="text-sm text-text-muted">Based in</dt>
                    <dd className="mt-1 font-medium">{personalInfo.location}</dd>
                  </div>
                ) : null}
                {collaborationCountries.length ? (
                  <div>
                    <dt className="text-sm text-text-muted">International collaboration</dt>
                    <dd className="mt-1 font-medium">
                      {collaborationCountries.map((item) => item.name).join(" · ")}
                    </dd>
                  </div>
                ) : null}
                {languages.length ? (
                  <div>
                    <dt className="text-sm text-text-muted">Languages</dt>
                    <dd className="mt-1 font-medium">
                      {languages.map((item) => `${item.name} (${item.level})`).join(" · ")}
                    </dd>
                  </div>
                ) : null}
                {upwork ? (
                  <div>
                    <dt className="text-sm text-text-muted">Verify on Upwork</dt>
                    <dd className="mt-1">
                      <a
                        href={upwork.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-accent hover:text-accent-hover"
                      >
                        View Upwork profile
                      </a>
                    </dd>
                  </div>
                ) : null}
                {fiverr ? (
                  <div>
                    <dt className="text-sm text-text-muted">Verify on Fiverr</dt>
                    <dd className="mt-1">
                      <a
                        href={fiverr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-accent hover:text-accent-hover"
                      >
                        View Fiverr profile
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>
              <ul className="mt-8 space-y-4 border-t border-border pt-6">
                {aboutContent.focus.map((item) => (
                  <li key={item.title}>
                    <p className="font-medium">{item.title}</p>
                    <p className="mt-1 text-sm text-text-secondary">{item.body}</p>
                  </li>
                ))}
              </ul>
              </div>
            </aside>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
