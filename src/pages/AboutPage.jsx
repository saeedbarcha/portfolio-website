import { Link } from "react-router-dom";
import { Breadcrumbs } from "@/components/common/Breadcrumbs.jsx";
import { Button } from "@/components/common/Button.jsx";
import { Container } from "@/components/common/Container.jsx";
import { JsonLd } from "@/components/common/JsonLd.jsx";
import { Seo } from "@/components/common/Seo.jsx";
import { About } from "@/sections/About.jsx";
import { AboutCapabilities } from "@/sections/AboutCapabilities.jsx";
import { Achievements } from "@/sections/Achievements.jsx";
import { Certifications } from "@/sections/Certifications.jsx";
import { Education } from "@/sections/Education.jsx";
import { Experience } from "@/sections/Experience.jsx";
import { Faq } from "@/sections/Faq.jsx";
import { Services } from "@/sections/Services.jsx";
import { Skills } from "@/sections/Skills.jsx";
import { SocialPresence } from "@/sections/SocialPresence.jsx";
import { WorkProcess } from "@/sections/WorkProcess.jsx";
import { personalInfo } from "@/data/personal.js";
import { getFaqJsonLd, getPersonJsonLd } from "@/utils/content.js";

export function AboutPage() {
  return (
    <main id="main" className="pb-8">
      <Seo
        title={`About | ${personalInfo.name}`}
        description="Saeed Hussain is a full-stack and AI engineer based in Gilgit. Background, Upwork and Fiverr achievements, Udemy certification, and how engagements typically run."
        path="/about"
      />
      <JsonLd data={getPersonJsonLd()} />
      <JsonLd data={getFaqJsonLd()} />
      <Container className="pt-10">
        <Breadcrumbs
          items={[
            { label: "Home", path: "/" },
            { label: "About", path: "/about" },
          ]}
        />
      </Container>
      <About />
      <AboutCapabilities />
      <Experience />
      <Achievements />
      <Certifications />
      <Skills />
      <Services />
      <WorkProcess />
      <Education />
      <Faq />
      <SocialPresence />
      <Container className="pb-20">
        <div className="rounded-[1.5rem] border border-border bg-surface p-8 sm:p-10">
          <h2 className="font-display text-2xl font-semibold">Have a project in mind?</h2>
          <p className="mt-3 max-w-2xl text-text-secondary">
            Share a short brief. I reply with questions, scope, and a practical next step — directly,
            or on Upwork or Fiverr if you already work there.
          </p>
          <Button as={Link} to="/#contact" className="mt-6">
            Start a conversation
          </Button>
        </div>
      </Container>
    </main>
  );
}
