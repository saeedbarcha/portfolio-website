import { faqs } from "@/data/faq.js";
import { collaborationCountries } from "@/data/collaboration.js";
import { certifications } from "@/data/credentials.js";
import { engagement, hirePaths } from "@/data/engagement.js";
import { experience } from "@/data/experience.js";
import { personalInfo } from "@/data/personal.js";
import { projects } from "@/data/projects.js";
import { siteConfig } from "@/data/site.js";
import { skillGroups } from "@/data/skills.js";
import { seoTopics } from "@/data/seoTopics.js";
import { socialLinks } from "@/data/socialLinks.js";
import { testimonials } from "@/data/testimonials.js";
import { videoTestimonials } from "@/data/videoTestimonials.js";
import { NAV_SECTIONS } from "@/utils/constants.js";
import {
  configuredList,
  isConfiguredText,
  isPlaceholder,
  isValidEmail,
  isValidHttpUrl,
  getMarketplaceProjectUrl,
  getProjectSource,
} from "@/utils/helpers.js";

export function getActiveSocialLinks(placement) {
  return socialLinks.filter((link) => {
    if (!link.enabled) return false;
    if (!isValidHttpUrl(link.url)) return false;
    if (placement && Array.isArray(link.placement)) {
      return link.placement.includes(placement);
    }
    return true;
  });
}

export function getSameAsLinks() {
  return getActiveSocialLinks().map((link) => link.url);
}

export function getConfiguredProjects() {
  return projects.filter((project) => project.configured !== false);
}

export function getFeaturedProjects() {
  const featured = getConfiguredProjects().filter((project) => project.featured);
  const pool = featured.length ? featured : getConfiguredProjects();
  return [...pool]
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99))
    .slice(0, 3);
}

export function getProjectFilters() {
  const items = getConfiguredProjects();
  const sources = [...new Set(items.map((item) => item.source).filter(Boolean))];
  const categories = [
    ...new Set(items.map((item) => item.category).filter((value) => isConfiguredText(value))),
  ];
  return { sources, categories };
}

export function filterProjects(items, { source = "all", category = "all", query = "" } = {}) {
  const needle = query.trim().toLowerCase();
  return items.filter((project) => {
    if (source !== "all" && project.source !== source) return false;
    if (category !== "all" && project.category !== category) return false;
    if (!needle) return true;
    const haystack = [
      project.title,
      project.summary,
      project.industry,
      project.category,
      ...(project.technologies || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}

export function getHirePaths() {
  return hirePaths.map((path) => {
    if (!path.socialId) {
      return { ...path, href: path.href || "/#contact", external: false };
    }

    const social = getSocialById(path.socialId);
    if (social) {
      return { ...path, href: social.url, external: true };
    }

    return {
      ...path,
      href: "/#contact",
      external: false,
      cta: path.id === "upwork" ? "Request an Upwork invite" : "Start on Fiverr via message",
    };
  });
}

export function getSocialById(id) {
  const link = socialLinks.find((item) => item.id === id);
  if (!link?.enabled || !isValidHttpUrl(link.url)) return null;
  return link;
}

export function getMarketplaceProofUrl(project) {
  if (project?.hideMarketplaceUrl) return null;
  const explicit = getMarketplaceProjectUrl(project);
  if (explicit) return explicit;
  if (project?.source === "upwork") return getSocialById("upwork")?.url || null;
  if (project?.source === "fiverr") return getSocialById("fiverr")?.url || null;
  return null;
}

export function getProjectBySlug(slug) {
  return getConfiguredProjects().find((project) => project.slug === slug) || null;
}

export function getProjectById(id) {
  return getConfiguredProjects().find((project) => project.id === id) || null;
}

export function getConfiguredTestimonials() {
  return testimonials.filter((item) => {
    if (item.configured === false) return false;
    return isConfiguredText(item.review) && isConfiguredText(item.client?.name);
  });
}

export function getFeaturedTestimonials(limit = 3) {
  const all = getConfiguredTestimonials();
  const featured = all.filter((item) => item.featured);
  const pool = featured.length ? featured : all;
  return pool.slice(0, limit);
}

export function filterTestimonials(items, source = "all") {
  if (source === "all") return items;
  const needle = source.toLowerCase();
  return items.filter((item) => (item.source || "").toLowerCase().includes(needle));
}

export function getTestimonialById(id) {
  if (!id) return null;
  return getConfiguredTestimonials().find((item) => item.id === id) || null;
}

export function getConfiguredVideoTestimonials() {
  return videoTestimonials.filter((item) => {
    if (item.configured === false) return false;
    if (!item.video?.src || isPlaceholder(item.video.src)) return false;
    if (item.video.type !== "local" && !isValidHttpUrl(item.video.src)) return false;
    return true;
  });
}

export function getVideoTestimonialById(id) {
  if (!id) return null;
  return getConfiguredVideoTestimonials().find((item) => item.id === id) || null;
}

export function getConfiguredExperience() {
  return experience.filter((item) => item.configured !== false);
}

export function getRelatedProjects(project, limit = 3) {
  const others = getConfiguredProjects().filter((item) => item.id !== project?.id);
  const tech = new Set(
    (project?.technologies || []).map((item) => String(item).toLowerCase()),
  );

  return [...others]
    .map((item) => {
      const overlap = (item.technologies || []).filter((entry) =>
        tech.has(String(entry).toLowerCase()),
      ).length;
      const sameCategory = item.category && item.category === project?.category ? 2 : 0;
      const sameSource = item.source && item.source === project?.source ? 1 : 0;
      const featuredBoost = item.featured ? 1 : 0;
      return {
        item,
        score: overlap * 3 + sameCategory + sameSource + featuredBoost,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.item);
}

export function hasSectionContent(sectionId) {
  switch (sectionId) {
    case "experience":
      return getConfiguredExperience().length > 0;
    case "work":
      return getConfiguredProjects().length > 0;
    case "reviews":
      return getConfiguredTestimonials().length > 0;
    case "videos":
      return getConfiguredVideoTestimonials().length > 0;
    case "social":
      return getActiveSocialLinks("social").length > 0;
    default:
      return true;
  }
}

export function isSectionEnabled(key) {
  return siteConfig.sections[key] !== false;
}

export function getNavItems() {
  const availability = {
    about: isSectionEnabled("about"),
    work: isSectionEnabled("projects"),
    reviews:
      isSectionEnabled("testimonials") &&
      (hasSectionContent("reviews") || hasSectionContent("videos")),
    skills: isSectionEnabled("skills"),
    contact: isSectionEnabled("contact"),
  };

  return NAV_SECTIONS.filter((item) => availability[item.id] !== false);
}

export function getPublicEmail() {
  return isValidEmail(personalInfo.email) ? personalInfo.email.trim() : null;
}

export function getConfiguredResults(project) {
  return configuredList(project?.results);
}

export function getPersonJsonLd() {
  const sameAs = getSameAsLinks();
  const email = getPublicEmail();
  const languages = engagement.languages
    .filter((item) => item.confirmed !== false)
    .map((item) => item.name);

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    jobTitle: personalInfo.primaryRole,
    description: personalInfo.seo.description,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: personalInfo.education.university,
    },
    knowsAbout: getKnowsAbout(),
    knowsLanguage: languages,
  };

  if (email) data.email = email;
  if (isConfiguredText(personalInfo.phone)) data.telephone = personalInfo.phone;
  if (isConfiguredText(personalInfo.location)) {
    data.homeLocation = personalInfo.location;
    data.address = {
      "@type": "PostalAddress",
      addressLocality: "Gilgit",
      addressCountry: "PK",
    };
  }
  if (sameAs.length) data.sameAs = sameAs;
  if (siteConfig.siteUrl) data.url = siteConfig.siteUrl;
  if (isConfiguredText(personalInfo.photo)) {
    data.image = siteConfig.siteUrl
      ? `${siteConfig.siteUrl}${personalInfo.photo}`
      : personalInfo.photo;
  }
  const issuedCerts = configuredList(certifications);
  if (issuedCerts.length) {
    data.hasCredential = issuedCerts.map((item) => {
      const credential = {
        "@type": "EducationalOccupationalCredential",
        name: item.name,
        credentialCategory: "certificate",
      };
      if (isConfiguredText(item.issuer)) {
        credential.recognizedBy = { "@type": "Organization", name: item.issuer };
      }
      if (isConfiguredText(item.credentialId)) credential.identifier = item.credentialId;
      if (isValidHttpUrl(item.url)) credential.url = item.url;
      return credential;
    });
  }
  data.hasOccupation = {
    "@type": "Occupation",
    name: personalInfo.primaryRole,
    skills: getKnowsAbout().join(", "),
  };

  return data;
}

export function getWebSiteJsonLd() {
  if (!siteConfig.siteUrl) return null;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${personalInfo.name} · ${personalInfo.primaryRole}`,
    url: siteConfig.siteUrl,
    description: personalInfo.seo.description,
    inLanguage: "en",
    publisher: {
      "@type": "Person",
      name: personalInfo.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.siteUrl}/work?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function getProfessionalServiceJsonLd() {
  const url = siteConfig.siteUrl;
  if (!url) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${personalInfo.name} — Full-Stack Software Engineering`,
    url,
    image: `${url}${siteConfig.ogImage}`,
    description: personalInfo.seo.description,
    areaServed: collaborationCountries.map((item) => ({
      "@type": "Country",
      name: item.name,
    })),
    serviceType: [
      "Full-Stack Web Development",
      "Agentic AI Development",
      "RAG Chatbots",
      "React Frontend Development",
      "Backend & API Development",
      "SaaS Development",
      "Figma to Web",
    ],
    founder: {
      "@type": "Person",
      name: personalInfo.name,
    },
  };
}

export function getFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getWorkListJsonLd() {
  const origin = siteConfig.siteUrl;
  if (!origin) return null;
  const items = getConfiguredProjects();
  if (!items.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Projects by ${personalInfo.name}`,
    itemListElement: items.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${origin}/work/${project.slug}`,
      name: isConfiguredText(project.title) ? project.title : "Confidential project",
    })),
  };
}

export function getBreadcrumbJsonLd(items) {
  const origin = siteConfig.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  if (!origin) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${origin}${item.path}`,
    })),
  };
}

export function getProjectJsonLd(project) {
  const origin = siteConfig.siteUrl;
  const title = isConfiguredText(project.title) ? project.title : "Confidential project";
  const description = isConfiguredText(project.summary)
    ? project.summary
    : `${title} — a software project by ${personalInfo.name}.`;
  const source = getProjectSource(project);
  const marketplaceUrl = getMarketplaceProofUrl(project);
  const data = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    author: {
      "@type": "Person",
      name: personalInfo.name,
      jobTitle: personalInfo.primaryRole,
    },
    keywords: configuredList(project.technologies).join(", "),
    inLanguage: "en",
  };

  if (origin) data.url = `${origin}/work/${project.slug}`;
  if (isConfiguredText(project.completed)) data.dateCreated = project.completed;
  if (source) data.creativeWorkStatus = source.label;
  if (marketplaceUrl) data.sameAs = [marketplaceUrl];
  return data;
}

export function getKnowsAbout() {
  const fromSkills = skillGroups.flatMap((group) =>
    group.items.filter((item) => item.confirmed !== false).map((item) => item.name),
  );
  const fromTopics = seoTopics.map((topic) => topic.name);
  return [...new Set(["Software Engineering", "Full-Stack Development", ...fromSkills, ...fromTopics])];
}

export function getProjectsForTopic(topic) {
  if (!topic) return [];
  const needles = [topic.name, topic.slug, ...(topic.aliases || [])].map((value) =>
    String(value).toLowerCase(),
  );
  return getConfiguredProjects().filter((project) => {
    const haystack = [
      project.title,
      project.summary,
      project.category,
      ...(project.technologies || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return needles.some((needle) => haystack.includes(needle.toLowerCase()));
  });
}

export function getSkillServiceJsonLd(topic) {
  const origin = siteConfig.siteUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${topic.name} development by ${personalInfo.name}`,
    description: topic.description,
    provider: {
      "@type": "Person",
      name: personalInfo.name,
      jobTitle: personalInfo.primaryRole,
    },
    serviceType: topic.name,
    areaServed: "Worldwide",
  };
  if (origin) data.url = `${origin}/skills/${topic.slug}`;
  return data;
}

export function getOfferCatalogJsonLd() {
  const origin = siteConfig.siteUrl;
  if (!origin) return null;
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `Services by ${personalInfo.name}`,
    itemListElement: seoTopics.map((topic) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `${topic.name} development`,
        url: `${origin}/skills/${topic.slug}`,
      },
    })),
  };
}

export { faqs, engagement };
