import { Container } from "@/components/common/Container.jsx";
import { Reveal } from "@/components/common/Reveal.jsx";
import { SectionHeading } from "@/components/common/SectionHeading.jsx";
import { personalInfo } from "@/data/personal.js";
import { isSectionEnabled } from "@/utils/content.js";
import { configuredList, isConfiguredText } from "@/utils/helpers.js";

export function Education() {
  if (!isSectionEnabled("education")) return null;

  const { education } = personalInfo;
  const coursework = configuredList(education.coursework);
  const achievements = configuredList(education.achievements);

  return (
    <section id="education" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="09 — Education"
              title="Formal foundation in software engineering"
              description="A structured engineering education, applied since through client work."
            />
          </Reveal>
          <Reveal delay={0.06}>
            <article className="surface-card p-5 sm:p-8">
              <p className="text-sm text-accent">{education.graduationYear}</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-pretty sm:text-2xl">{education.degree}</h3>
              <p className="mt-2 text-text-secondary">{education.university}</p>
              {isConfiguredText(education.location) ? (
                <p className="mt-1 text-sm text-text-muted">{education.location}</p>
              ) : null}
              {isConfiguredText(education.finalYearProject) ? (
                <p className="mt-6 text-sm text-text-secondary">
                  <span className="font-medium text-text">Final-year project. </span>
                  {education.finalYearProject}
                </p>
              ) : null}
              {coursework.length ? (
                <div className="mt-6">
                  <p className="text-sm font-medium">Relevant coursework</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {coursework.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border px-3 py-1 text-sm text-text-secondary"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {achievements.length ? (
                <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  {achievements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {personalInfo.education.prior?.length ? (
                <div className="mt-8 space-y-6 border-t border-border pt-6">
                  {personalInfo.education.prior.map((item) => (
                    <article key={`${item.year}-${item.title}`}>
                      <p className="text-sm text-accent">{item.year}</p>
                      <h4 className="mt-1 font-display text-lg font-semibold">{item.title}</h4>
                      <p className="mt-1 text-text-secondary">{item.school}</p>
                      {item.detail ? (
                        <p className="mt-1 text-sm text-text-muted">{item.detail}</p>
                      ) : null}
                    </article>
                  ))}
                </div>
              ) : null}
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
