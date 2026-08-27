import { Link } from "react-router-dom";
import { Breadcrumbs } from "@/components/common/Breadcrumbs.jsx";
import { Container } from "@/components/common/Container.jsx";
import { JsonLd } from "@/components/common/JsonLd.jsx";
import { Seo } from "@/components/common/Seo.jsx";
import { personalInfo } from "@/data/personal.js";
import { siteConfig } from "@/data/site.js";
import { seoTopics } from "@/data/seoTopics.js";
import { getBreadcrumbJsonLd, getPersonJsonLd } from "@/utils/content.js";

export function SkillsIndexPage() {
  const breadcrumbs = [
    { label: "Home", path: "/" },
    { label: "Skills & stacks", path: "/skills" },
  ];

  return (
    <main id="main" className="pb-20">
      <Seo
        title="Skills & stacks | Saeed Hussain"
        description={`Hire ${personalInfo.name} for React, Next.js, Node.js, MERN, PERN, NestJS, LangGraph, RAG, and PostgreSQL. Top Rated on Upwork, 5.0 on Fiverr.`}
        path="/skills"
        keywords={[
          "React developer",
          "MERN stack developer",
          "Node.js developer",
          "LangGraph developer",
          "hire full-stack developer",
        ]}
      />
      <JsonLd data={getPersonJsonLd()} />
      <JsonLd data={getBreadcrumbJsonLd(breadcrumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `Skills and stacks — ${personalInfo.name}`,
          itemListElement: seoTopics.map((topic, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: topic.name,
            url: `${siteConfig.siteUrl || (typeof window !== "undefined" ? window.location.origin : "")}/skills/${topic.slug}`,
          })),
        }}
      />
      <Container className="pt-10">
        <Breadcrumbs items={breadcrumbs} />
        <header className="mt-8 max-w-3xl">
          <p className="eyebrow">Hire by stack</p>
          <h1 className="mt-4 font-display text-[1.85rem] font-semibold leading-[1.15] tracking-tight text-pretty sm:text-5xl">
            Skills and stacks you can hire me for
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            Each page is written for a real search — React developer, MERN stack, LangGraph, PostgreSQL —
            and points at public Upwork and Fiverr work, not invented case studies.
          </p>
        </header>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {seoTopics.map((topic) => (
            <li key={topic.slug}>
              <Link
                to={`/skills/${topic.slug}`}
                className="surface-card flex h-full flex-col p-6 transition-colors hover:border-accent/40"
              >
                <h2 className="font-display text-xl font-semibold">{topic.name}</h2>
                <p className="mt-2 flex-1 text-sm text-text-secondary">{topic.summary}</p>
                <p className="mt-4 text-sm text-accent">View {topic.name} work</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
