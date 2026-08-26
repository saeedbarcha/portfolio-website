import { lazy, Suspense, useEffect } from "react";
import { JsonLd } from "@/components/common/JsonLd.jsx";
import { Seo } from "@/components/common/Seo.jsx";
import { Hero } from "@/sections/Hero.jsx";
import { TrustBar } from "@/sections/TrustBar.jsx";
import { GlobalCollaboration } from "@/sections/GlobalCollaboration.jsx";
import { personalInfo } from "@/data/personal.js";
import {
  getOfferCatalogJsonLd,
  getPersonJsonLd,
  getProfessionalServiceJsonLd,
  getWebSiteJsonLd,
  getWorkListJsonLd,
} from "@/utils/content.js";

const HomeBelowFold = lazy(() =>
  import("@/sections/HomeBelowFold.jsx").then((module) => ({ default: module.HomeBelowFold })),
);

export function HomePage() {
  const structured = [
    getPersonJsonLd(),
    getWebSiteJsonLd(),
    getProfessionalServiceJsonLd(),
    getOfferCatalogJsonLd(),
    getWorkListJsonLd(),
  ].filter(Boolean);

  useEffect(() => {
    const prefetch = () => {
      import("@/pages/WorkPage.jsx");
      import("@/pages/AboutPage.jsx");
      import("@/pages/ReviewsPage.jsx");
      import("@/pages/SkillsIndexPage.jsx");
    };
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(prefetch, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(prefetch, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main id="main">
      <Seo
        title={personalInfo.seo.title}
        description={personalInfo.seo.description}
        path="/"
        keywords={personalInfo.seo.keywords}
      />
      {structured.map((data, index) => (
        <JsonLd key={`${data["@type"]}-${index}`} data={data} />
      ))}
      <Hero />
      <TrustBar />
      <GlobalCollaboration />
      <Suspense fallback={null}>
        <HomeBelowFold />
      </Suspense>
    </main>
  );
}
