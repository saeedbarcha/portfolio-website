import { personalInfo } from "./personal.js";

/**
 * Site-wide configuration.
 * Set a section to false to hide it even if data exists.
 * Sections with no configured entries also hide themselves automatically.
 */
export const siteConfig = {
  name: personalInfo.name,
  defaultTitle: personalInfo.seo.title,
  defaultDescription: personalInfo.seo.description,
  language: "en",
  ogImage: personalInfo.seo.ogImage,

  get siteUrl() {
    const fromEnv = import.meta.env.VITE_SITE_URL;
    if (fromEnv && !fromEnv.includes("[")) {
      return fromEnv.replace(/\/$/, "");
    }
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    return "";
  },

  sections: {
    about: true,
    experience: true,
    skills: true,
    projects: true,
    testimonials: true,
    videoTestimonials: true,
    services: true,
    process: true,
    achievements: true,
    certifications: true,
    education: true,
    social: true,
    hire: true,
    faq: true,
    cta: true,
    contact: true,
  },
};

export const projectTypes = [
  { value: "", label: "Select a project type" },
  { value: "full-stack", label: "Full-stack web application" },
  { value: "ai", label: "Agentic AI / RAG / LangGraph" },
  { value: "frontend", label: "React / Next.js frontend" },
  { value: "backend", label: "Backend / API" },
  { value: "saas", label: "SaaS product" },
  { value: "internal-tool", label: "Internal tool / dashboard" },
  { value: "existing-product", label: "Existing product (features, fixes, modernization)" },
  { value: "other", label: "Something else" },
];

export const budgetOptions = [
  { value: "", label: "Select a range (optional)" },
  { value: "undecided", label: "Not sure yet" },
  { value: "under-2k", label: "Under $2,000" },
  { value: "2k-5k", label: "$2,000 – $5,000" },
  { value: "5k-10k", label: "$5,000 – $10,000" },
  { value: "10k-plus", label: "$10,000+" },
];

export const timelineOptions = [
  { value: "", label: "Select a timeline (optional)" },
  { value: "asap", label: "As soon as possible" },
  { value: "1-month", label: "Within a month" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "flexible", label: "Flexible" },
];
