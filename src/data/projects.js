/**
 * Published case studies.
 *
 * Titles and dates match public Upwork work history.
 * Client names and live URLs stay unpublished (confidential).
 * Additional completed jobs exist on Upwork beyond this list.
 */

function createProject(entry = {}) {
  const { client, marketplace, seo, ...rest } = entry;
  return {
    configured: false,
    featured: false,
    featuredOrder: 99,
    confidential: false,
    hideClientName: false,
    hideProjectUrl: false,
    hideMarketplaceUrl: false,
    source: "direct",
    industry: "Software",
    category: "Full-Stack Web Application",
    role: "Full-Stack Developer",
    completed: null,
    year: null,
    summary: "",
    challenge: "",
    requirements: [],
    solution: "",
    responsibilities: [],
    features: [],
    challenges: [],
    decisions: [],
    architecture: "",
    results: [],
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    images: [],
    liveUrl: null,
    githubUrl: null,
    testimonialId: null,
    videoTestimonialId: null,
    ...rest,
    client: {
      name: "International Client",
      company: null,
      country: null,
      showName: false,
      ...client,
    },
    marketplace: {
      projectUrl: null,
      gigUrl: null,
      ...marketplace,
    },
    seo: {
      title: null,
      description: null,
      ...seo,
    },
  };
}

const cover = () => [];

const upworkClient = {
  name: "International Client",
  company: null,
  country: null,
  showName: false,
};

const upworkMarket = { projectUrl: null, gigUrl: null };

export const projects = [
  createProject({
    id: "mern-full-stack",
    slug: "mern-full-stack-application",
    title: "Full-stack MERN application",
    source: "upwork",
    configured: true,
    featured: false,
    confidential: true,
    hideClientName: true,
    hideProjectUrl: true,
    hideMarketplaceUrl: false,
    industry: "Business software",
    category: "Full-Stack Web Application",
    role: "Full-Stack Developer",
    year: "2026",
    completed: "August 2026",
    testimonialId: null,
    summary:
      "I owned the React interface, Node.js/Express API, and MongoDB data layer for a live business product from December 2024 through August 2026 — one engineer, one codebase, on Upwork.",
    challenge:
      "The client needed someone who could keep frontend, API, and data in lockstep over a long remote engagement, instead of splitting the product across separate contractors.",
    requirements: [
      "React UI that matched how the business actually worked",
      "Express API and MongoDB persistence under the same contract",
      "Steady delivery across a 20-month timeline",
    ],
    solution:
      "I stayed on as the MERN full-stack developer for the life of the contract: shipping interface, API, and data work together so the product remained one system rather than three disconnected pieces.",
    responsibilities: [
      "React UI implementation and iteration",
      "Node.js and Express API work",
      "MongoDB data modeling",
    ],
    features: [
      "Production MERN application (React, Express, MongoDB)",
      "Full-stack ownership rather than a frontend-only or backend-only slice",
    ],
    challenges: [
      "Keeping a single codebase coherent as requirements accumulated over many months",
    ],
    decisions: [
      "Stay on the MERN stack the contract specified rather than introducing a parallel architecture mid-engagement",
    ],
    architecture:
      "React client, Express API, MongoDB. Product and client names withheld.",
    results: [
      "Engagement ran from December 2024 through August 2026 on Upwork — a 20-month full-stack retainer, not a one-week ticket.",
      "Published in Upwork work history as “Full Stack Developer - MERN - React, NodeJS, Express, MongoDB.”",
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "JavaScript"],
    images: cover("admin", "MERN full-stack admin interface overview"),
    client: upworkClient,
    marketplace: upworkMarket,
    seo: {
      title: "Full-stack MERN application | Saeed Hussain",
      description:
        "Confidential MERN full-stack engagement by Saeed Hussain for an international Upwork client (React, Node.js, Express, MongoDB).",
    },
  }),

  createProject({
    id: "sdk-vercel-dashboard",
    slug: "sdk-vercel-dashboard",
    title: "SDK on NPM and Vercel dashboard",
    source: "upwork",
    configured: true,
    featured: true,
    featuredOrder: 3,
    confidential: true,
    hideClientName: true,
    hideProjectUrl: true,
    hideMarketplaceUrl: false,
    industry: "Developer tools",
    category: "Dashboard",
    role: "Full-Stack Developer",
    year: "2026",
    completed: "June 2026",
    testimonialId: "review-sdk-dashboard",
    summary:
      "I shipped the dashboard UI and API, published the SDK to NPM, and set up Vercel so the client could install and run the product — 5.0 on Upwork.",
    challenge:
      "The client needed a usable dashboard and a published SDK, not a local-only prototype. NPM packaging and Vercel had to work together so other developers could install the SDK and the dashboard could stay deployed.",
    requirements: [
      "Dashboard frontend and backend",
      "SDK published to NPM",
      "Vercel setup for a running deployment",
      "Revisions based on client feedback",
    ],
    solution:
      "I delivered both sides of the dashboard, packaged the SDK for NPM, and configured Vercel so install, UI, and hosting stayed in sync.",
    responsibilities: [
      "Dashboard frontend and backend",
      "NPM SDK packaging and publish",
      "Vercel setup",
      "Feedback-driven revisions",
    ],
    features: [
      "Dashboard UI and API",
      "SDK available on NPM",
      "Vercel-hosted dashboard",
    ],
    challenges: [
      "Product UI work and package publishing in the same engagement, without letting either side drift",
    ],
    decisions: [
      "Treat the dashboard and the SDK as one delivery so what you install matches what you see",
    ],
    architecture:
      "Dashboard application with an NPM-published SDK and Vercel hosting. Client name withheld.",
    results: [
      "5.0 Upwork review for this job.",
      "Client wrote that frontend and backend were delivered professionally, with clear communication and responsiveness to revisions.",
    ],
    technologies: ["JavaScript", "Node.js", "React", "Vercel", "NPM"],
    images: cover("analytics", "SDK and Vercel dashboard interface overview"),
    client: upworkClient,
    marketplace: upworkMarket,
    seo: {
      title: "SDK on NPM and Vercel dashboard | Saeed Hussain",
      description:
        "Confidential dashboard and NPM SDK delivery by Saeed Hussain, including Vercel setup, for an international Upwork client.",
    },
  }),

  createProject({
    id: "healthcare-erp-crm",
    slug: "healthcare-erp-crm-backend",
    title: "Healthcare ERP/CRM backend",
    source: "upwork",
    configured: true,
    featured: true,
    featuredOrder: 2,
    confidential: true,
    hideClientName: true,
    hideProjectUrl: true,
    hideMarketplaceUrl: false,
    industry: "Healthcare",
    category: "Backend & API",
    role: "Backend Developer",
    year: "2024",
    completed: "December 2024",
    testimonialId: "review-healthcare-erp",
    summary:
      "MERN backend for a healthcare ERP/CRM — records and operator workflows on Node.js, Express, and MongoDB. 5.0 on Upwork.",
    challenge:
      "The client needed backend depth on a healthcare ERP/CRM, not a generic CRUD app: operational records and workflows, while staying on the MERN stack.",
    requirements: [
      "MERN stack with a backend focus",
      "ERP/CRM-style records and workflows",
      "Healthcare domain constraints respected",
    ],
    solution:
      "I concentrated on the Node.js and data layer so operators and the rest of the product had a dependable API, instead of rebuilding a frontend the contract did not ask for.",
    responsibilities: [
      "Backend design and implementation",
      "MERN data and API work",
      "Problem-solving on domain-specific flows",
    ],
    features: [
      "Healthcare ERP/CRM backend",
      "MERN APIs on Express and MongoDB",
    ],
    challenges: [
      "Modeling operational healthcare workflows without over-fitting a one-off schema",
    ],
    decisions: [
      "Keep the contract’s backend focus rather than rebuilding the entire frontend",
    ],
    architecture:
      "MERN backend for an ERP/CRM-style healthcare system. Product and client names withheld.",
    results: [
      "5.0 Upwork review for this job.",
      "Client cited technical expertise, attention to detail, and seamless communication.",
    ],
    technologies: ["Node.js", "Express", "MongoDB", "React", "JavaScript"],
    images: cover("crm", "Healthcare ERP and CRM interface overview"),
    client: upworkClient,
    marketplace: upworkMarket,
    seo: {
      title: "Healthcare ERP/CRM backend | Saeed Hussain",
      description:
        "Confidential MERN backend for a healthcare ERP/CRM system, delivered by Saeed Hussain on Upwork.",
    },
  }),

  createProject({
    id: "pet-meal-contentful",
    slug: "pet-meal-contentful-backend",
    title: "Pet meal subscription — Contentful backend",
    source: "upwork",
    configured: true,
    featured: false,
    confidential: true,
    hideClientName: true,
    hideProjectUrl: true,
    hideMarketplaceUrl: false,
    industry: "Consumer subscription",
    category: "Backend & API",
    role: "Backend Developer",
    year: "2025",
    completed: "July 2025",
    testimonialId: "review-pet-meal",
    summary:
      "Phase 1 backend for a pet meal subscription platform, using Contentful CMS. 5.0 on Upwork.",
    challenge:
      "The subscription product needed a competent backend developer who could work with Contentful as the CMS rather than inventing a parallel content model.",
    requirements: [
      "Contentful CMS integration",
      "Backend for a subscription platform",
      "Phase 1 scope held to what was agreed",
    ],
    solution:
      "I implemented the Phase 1 backend against Contentful so editorial content and the subscription product shared one CMS-backed source.",
    responsibilities: [
      "Contentful CMS backend work",
      "API integration for the subscription platform",
    ],
    features: [
      "Contentful-backed content",
      "Subscription platform backend (phase 1)",
    ],
    challenges: [
      "Fitting phase-1 scope to a CMS the client already wanted to own",
    ],
    decisions: [
      "Use Contentful as specified instead of a custom CMS",
    ],
    architecture:
      "Backend integrated with Contentful CMS for a pet meal subscription product. Client name withheld.",
    results: [
      "5.0 Upwork review: “Competent developer, that's what matters!”",
    ],
    technologies: ["Node.js", "Contentful", "JavaScript", "REST APIs"],
    images: cover("content", "Contentful subscription product interface overview"),
    client: upworkClient,
    marketplace: upworkMarket,
    seo: {
      title: "Pet meal subscription Contentful backend | Saeed Hussain",
      description:
        "Confidential Contentful CMS backend (phase 1) for a pet meal subscription platform, by Saeed Hussain on Upwork.",
    },
  }),

  createProject({
    id: "react-native-payments",
    slug: "react-native-next-nest-payments",
    title: "React Native, Next.js, NestJS & payments",
    source: "upwork",
    configured: true,
    featured: false,
    confidential: true,
    hideClientName: true,
    hideProjectUrl: true,
    hideMarketplaceUrl: false,
    industry: "Software",
    category: "Full-Stack Web Application",
    role: "Full-Stack Developer",
    year: "2026",
    completed: "June 2026",
    summary:
      "Full-stack contract covering React Native, Next.js, NestJS, email, and payment integration (August 2024 – June 2026).",
    challenge:
      "The product needed one engineer who could work across a mobile client, a Next.js web surface, a NestJS API, and email and payment integrations.",
    requirements: [
      "React Native client work",
      "Next.js web application",
      "NestJS API",
      "Email and payment integration",
    ],
    solution:
      "I took the full-stack contract as specified: mobile, Next.js, NestJS, and the email and payment integrations the product depended on.",
    responsibilities: [
      "React Native and Next.js implementation",
      "NestJS API work",
      "Email and payment integration",
    ],
    features: [
      "React Native application work",
      "Next.js frontend",
      "NestJS backend",
      "Email and payments",
    ],
    challenges: [
      "Keeping web, mobile, and API contracts aligned on one engagement",
    ],
    decisions: [
      "Use NestJS for the API so email and payments sat behind a structured module boundary",
    ],
    architecture:
      "React Native and Next.js clients on a NestJS API, with email and payment providers. Client name withheld.",
    results: [
      "Delivered on Upwork as “Full Stack Developer (React Native, Next.js, Nest.js, Email & Payment Integration).”",
    ],
    technologies: ["React Native", "Next.js", "NestJS", "Node.js", "JavaScript"],
    images: cover("ecommerce", "React Native, Next.js and NestJS product interface overview"),
    client: upworkClient,
    marketplace: upworkMarket,
    seo: {
      title: "React Native, Next.js, NestJS and payments | Saeed Hussain",
      description:
        "Confidential full-stack engagement covering React Native, Next.js, NestJS, email, and payments, by Saeed Hussain on Upwork.",
    },
  }),

  createProject({
    id: "site-maintenance",
    slug: "website-and-app-maintenance",
    title: "Ongoing website and app maintenance",
    source: "upwork",
    configured: true,
    featured: false,
    confidential: true,
    hideClientName: true,
    hideProjectUrl: true,
    hideMarketplaceUrl: false,
    industry: "Software",
    category: "Existing Product",
    role: "Software Engineer",
    year: "2026",
    completed: "January 2026",
    summary:
      "Retainer-style maintenance of an existing website and apps (July 2025 – January 2026) for an international Upwork client.",
    challenge:
      "The client needed a steady engineer on products already in production, not a greenfield rebuild.",
    requirements: [
      "Ongoing maintenance of website and apps",
      "Fixes and upkeep without disrupting live users",
    ],
    solution:
      "I provided ongoing maintenance across the website and applications for the length of the contract.",
    responsibilities: [
      "Production maintenance",
      "Fixes on the live website and apps",
    ],
    features: [
      "Website maintenance",
      "Application upkeep",
    ],
    challenges: [
      "Changing live products without a rewrite",
    ],
    decisions: [
      "Prefer bounded fixes over a redesign the retainer did not call for",
    ],
    architecture:
      "Existing client website and applications. Stack and names withheld.",
    results: [
      "Six-month maintenance engagement completed on Upwork.",
    ],
    technologies: ["JavaScript", "React", "Node.js"],
    images: cover("landing", "Website and app interface overview"),
    client: upworkClient,
    marketplace: upworkMarket,
    seo: {
      title: "Website and app maintenance | Saeed Hussain",
      description:
        "Confidential ongoing maintenance of a website and apps by Saeed Hussain for an international Upwork client.",
    },
  }),

  createProject({
    id: "nest-next-crm",
    slug: "nest-next-crm",
    title: "Nest.js, Next.js, and CRM",
    source: "upwork",
    configured: true,
    featured: false,
    confidential: true,
    hideClientName: true,
    hideProjectUrl: true,
    hideMarketplaceUrl: false,
    industry: "CRM",
    category: "Full-Stack Web Application",
    role: "Full-Stack Developer",
    year: "2024",
    completed: "August 2024",
    testimonialId: "review-nest-next-crm",
    summary:
      "Short full-stack engagement on Nest.js, Next.js, and CRM work. 5.0 on Upwork for going beyond the brief and staying on top of communication.",
    challenge:
      "The client needed Nest.js and Next.js work on a CRM surface, with someone who would stay ahead of communication rather than wait to be chased.",
    requirements: [
      "Nest.js backend",
      "Next.js frontend",
      "CRM-related product work",
    ],
    solution:
      "I delivered the Nest.js, Next.js, and CRM scope and stayed available throughout the week-long contract.",
    responsibilities: [
      "Nest.js and Next.js implementation",
      "CRM-related features",
      "Day-to-day communication",
    ],
    features: [
      "Next.js UI",
      "Nest.js API",
      "CRM flows",
    ],
    challenges: [
      "Fitting CRM work into a one-week delivery window",
    ],
    decisions: [
      "Ship the asked CRM slice completely rather than leaving half-wired screens",
    ],
    architecture:
      "Next.js frontend with a Nest.js API for CRM functionality. Client name withheld.",
    results: [
      "5.0 Upwork review: went above and beyond, communication always on top, highly recommended.",
    ],
    technologies: ["NestJS", "Next.js", "TypeScript", "JavaScript"],
    images: cover("crm", "Nest.js, Next.js and CRM interface overview"),
    client: upworkClient,
    marketplace: upworkMarket,
    seo: {
      title: "Nest.js, Next.js, and CRM | Saeed Hussain",
      description:
        "Confidential Nest.js, Next.js, and CRM engagement by Saeed Hussain, rated 5.0 on Upwork.",
    },
  }),

  createProject({
    id: "react-redesign",
    slug: "react-redesign-responsive",
    title: "React redesign and mobile responsiveness",
    source: "upwork",
    configured: true,
    featured: false,
    confidential: true,
    hideClientName: true,
    hideProjectUrl: true,
    hideMarketplaceUrl: false,
    industry: "Digital product",
    category: "React Frontend",
    role: "Frontend Developer",
    year: "2024",
    completed: "August 2024",
    testimonialId: "review-react-redesign",
    summary:
      "Team-oriented React work: website redesign and mobile responsiveness. 5.0 on Upwork.",
    challenge:
      "The existing site needed a React redesign that actually worked on phones, not only a desktop layout squeezed down.",
    requirements: [
      "React website redesign",
      "Mobile responsiveness",
      "Work as part of a team",
    ],
    solution:
      "I implemented the redesign in React with mobile layouts as a first-class requirement, not an afterthought.",
    responsibilities: [
      "React UI redesign",
      "Responsive implementation",
    ],
    features: [
      "Redesigned React pages",
      "Mobile-ready layout",
    ],
    challenges: [
      "Making the new design hold up on small screens without a separate mobile codebase",
    ],
    decisions: [
      "Treat breakpoints as part of the redesign, not a later patch",
    ],
    architecture:
      "React frontend. Client and live URL withheld.",
    results: [
      "5.0 Upwork review: “Amazing work! Extremely satisfied with the product.”",
    ],
    technologies: ["React", "JavaScript", "CSS3", "HTML5"],
    images: cover("landing", "React redesign and responsive layout overview"),
    client: upworkClient,
    marketplace: upworkMarket,
    seo: {
      title: "React redesign and mobile responsiveness | Saeed Hussain",
      description:
        "Confidential React website redesign and mobile-responsive work by Saeed Hussain on Upwork.",
    },
  }),

  createProject({
    id: "nextjs-ecommerce",
    slug: "nextjs-ecommerce",
    title: "Next.js e-commerce",
    source: "upwork",
    configured: true,
    featured: false,
    confidential: true,
    hideClientName: true,
    hideProjectUrl: true,
    hideMarketplaceUrl: false,
    industry: "E-commerce",
    category: "React Frontend",
    role: "Frontend Developer",
    year: "2024",
    completed: "May 2024",
    testimonialId: "review-nextjs-ecommerce",
    summary:
      "Next.js development for an e-commerce project. 5.0 on Upwork for meeting the brief, delivering on time, and communication.",
    challenge:
      "The client needed a Next.js developer who would hit the e-commerce requirements on a short timeline.",
    requirements: [
      "Next.js implementation for e-commerce",
      "On-time delivery",
      "Requirements met as specified",
    ],
    solution:
      "I completed the Next.js e-commerce scope on the agreed dates and kept communication clear throughout.",
    responsibilities: [
      "Next.js feature work",
      "E-commerce UI/flows in scope",
    ],
    features: [
      "Next.js e-commerce pages and flows in the agreed brief",
    ],
    challenges: [
      "A three-day window to finish a complete, reviewable slice",
    ],
    decisions: [
      "Stay inside the stated Next.js e-commerce requirements instead of expanding scope",
    ],
    architecture:
      "Next.js e-commerce frontend. Store and client names withheld.",
    results: [
      "5.0 Upwork review for fulfilling requirements, on-time delivery, communication, and quality.",
    ],
    technologies: ["Next.js", "React", "JavaScript"],
    images: cover("ecommerce", "Next.js e-commerce storefront overview"),
    client: upworkClient,
    marketplace: upworkMarket,
    seo: {
      title: "Next.js e-commerce | Saeed Hussain",
      description:
        "Confidential Next.js e-commerce work by Saeed Hussain, rated 5.0 on Upwork.",
    },
  }),

  createProject({
    id: "api-education",
    slug: "api-education",
    title: "API education for a product team",
    source: "upwork",
    configured: true,
    featured: false,
    confidential: true,
    hideClientName: true,
    hideProjectUrl: true,
    hideMarketplaceUrl: false,
    industry: "Education",
    category: "Consulting",
    role: "Software Engineer",
    year: "2023",
    completed: "November 2023",
    testimonialId: "review-api-education",
    summary:
      "Helped a client understand APIs and choose software for their project. 5.0 on Upwork; they closed this job to start a longer contract.",
    challenge:
      "The client needed someone patient who could explain APIs and which software to use, not only write code they could not yet evaluate.",
    requirements: [
      "Clear explanation of APIs",
      "Advice on software for the project",
      "A path into a longer engagement if it was a fit",
    ],
    solution:
      "I walked the client through APIs and tooling until they could decide how to continue. They ended this job specifically to start an ongoing contract.",
    responsibilities: [
      "API education",
      "Tooling recommendations",
    ],
    features: [
      "Structured explanation of APIs",
      "Software recommendations for the project",
    ],
    challenges: [
      "Teaching enough for a real decision without turning the job into unpaid build work",
    ],
    decisions: [
      "Keep the engagement educational, then convert to a longer contract when the client was ready",
    ],
    architecture: "Advisory engagement. No public architecture to list.",
    results: [
      "5.0 Upwork review. Client described the work as patient and helpful, then moved to a long-term contract.",
    ],
    technologies: ["REST APIs", "JavaScript"],
    images: cover("api", "API platform interface overview"),
    client: upworkClient,
    marketplace: upworkMarket,
    seo: {
      title: "API education | Saeed Hussain",
      description:
        "Upwork engagement where Saeed Hussain helped a client understand APIs and choose software, rated 5.0.",
    },
  }),

  createProject({
    id: "eldrin-ai",
    slug: "eldrin-ai",
    title: "Eldrin AI — LinkedIn content platform",
    source: "fiverr",
    configured: true,
    featured: true,
    featuredOrder: 1,
    confidential: true,
    hideClientName: true,
    hideProjectUrl: true,
    hideMarketplaceUrl: false,
    industry: "Artificial intelligence",
    category: "Agentic AI",
    role: "AI Engineer and Full-Stack Developer",
    year: "2025",
    completed: "2025",
    testimonialId: null,
    summary:
      "Eldrin AI is a LinkedIn content product: create, optimize, schedule, and manage posts in one full-stack app, with LangChain and agentic LLM features inside the product — not a chatbot demo.",
    challenge:
      "The product needed LinkedIn content workflows that were more than a prompt box. Creation, optimization, scheduling, and management had to live in one application operators could actually run.",
    requirements: [
      "LinkedIn content creation and optimization",
      "Scheduling and post management",
      "LLM and agentic features inside a real application",
    ],
    solution:
      "I worked as AI engineer and full-stack developer: LangChain, prompt engineering, and agentic features wired into the same product that handles scheduling and management.",
    responsibilities: [
      "AI feature design and implementation",
      "Full-stack delivery around LinkedIn content workflows",
      "LLM, LangChain, and prompt-engineering work",
    ],
    features: [
      "LinkedIn content creation and optimization",
      "Scheduling and management",
      "Agentic AI features on a full-stack application",
    ],
    challenges: [
      "Keeping generation, scheduling, and management as one product instead of disconnected tools",
    ],
    decisions: [
      "Use LangChain and agentic patterns inside the application, not as a sidecar notebook",
    ],
    architecture:
      "Full-stack application with LLM and LangChain-based features for LinkedIn content workflows. Client name withheld; product name is public on Fiverr.",
    results: [
      "Published on the Fiverr portfolio as Eldrin AI, an AI-powered LinkedIn post scheduling platform (from March 2025).",
      "This is the public AI product on my Fiverr profile — the named proof behind the Agentic AI work.",
    ],
    technologies: ["LangChain", "LLMs", "JavaScript", "React", "Node.js"],
    images: cover("content", "Eldrin AI LinkedIn content platform interface"),
    client: upworkClient,
    marketplace: { projectUrl: null, gigUrl: "https://www.fiverr.com/saeedhussain505" },
    seo: {
      title: "Eldrin AI | Saeed Hussain",
      description:
        "Eldrin AI — an AI-powered LinkedIn content creation, optimization, and scheduling platform delivered by Saeed Hussain on Fiverr.",
    },
  }),

  createProject({
    id: "pern-quiz-app",
    slug: "pern-quiz-app",
    title: "PERN stack quiz app",
    source: "fiverr",
    configured: true,
    featured: false,
    confidential: true,
    hideClientName: true,
    hideProjectUrl: true,
    hideMarketplaceUrl: false,
    industry: "Education",
    category: "Full-Stack Web Application",
    role: "Full-Stack Developer",
    year: "2025",
    completed: "2025",
    testimonialId: "review-zh-huang",
    summary:
      "A quiz product on PostgreSQL, Express, React, and Node.js for a Fiverr client in Singapore. 5.0 because the first delivery matched the brief.",
    challenge:
      "The client needed a working quiz application on the PERN stack, with requirements understood the first time rather than through a long revision loop.",
    requirements: [
      "Quiz behaviour matching the brief",
      "PostgreSQL, Express, React, and Node.js — not a MERN substitute",
    ],
    solution:
      "I built the quiz app on PERN as specified, keeping the data model, API, and React UI aligned with what was asked rather than a generic template.",
    responsibilities: [
      "Full-stack PERN implementation",
      "Requirements clarification and delivery",
    ],
    features: [
      "Quiz application on PostgreSQL, Express, React, and Node.js",
    ],
    challenges: [
      "Matching the brief tightly enough that the client did not need a second interpretation of the product",
    ],
    decisions: [
      "Stay on PERN as specified rather than substituting MongoDB from other MERN work",
    ],
    architecture:
      "React client, Express API, PostgreSQL. Client name withheld.",
    results: [
      "5.0 Fiverr review from zh_huang (Singapore).",
      "Client wrote that the work was detail-oriented, reliable, and delivered exactly what was needed.",
    ],
    technologies: ["PostgreSQL", "Express", "React", "Node.js"],
    images: cover("quiz", "PERN stack quiz application interface"),
    client: { name: "International Client", country: "Singapore", showName: false },
    marketplace: { projectUrl: null, gigUrl: "https://www.fiverr.com/saeedhussain505" },
    seo: {
      title: "PERN stack quiz app | Saeed Hussain",
      description:
        "Confidential PERN stack quiz application by Saeed Hussain for a Fiverr client in Singapore.",
    },
  }),

  createProject({
    id: "mern-app-functionality",
    slug: "mern-app-functionality",
    title: "MERN app functions, routes, and controllers",
    source: "fiverr",
    configured: true,
    featured: false,
    confidential: true,
    hideClientName: true,
    hideProjectUrl: true,
    hideMarketplaceUrl: false,
    industry: "Software",
    category: "Backend & API",
    role: "Full-Stack Developer",
    year: "2025",
    completed: "2025",
    testimonialId: "review-akirasolutions",
    summary:
      "Functionality work on a MERN stack web app: functions, routes, and controllers written in an organized, easy-to-read fashion. 5.0 on Fiverr.",
    challenge:
      "The existing MERN app needed backend structure — functions, routes, and controllers — that another engineer could still read.",
    requirements: [
      "MERN stack web app functionality",
      "Organized routes and controllers",
      "Clear communication during the work",
    ],
    solution:
      "I added the requested functions, routes, and controllers and kept the code organized so it stayed easy to read.",
    responsibilities: [
      "MERN backend functionality",
      "Route and controller structure",
    ],
    features: [
      "Functions, routes, and controllers on a MERN web app",
    ],
    challenges: [
      "Extending an existing app without turning the backend into a dump of one-off handlers",
    ],
    decisions: [
      "Prefer readable, organized controllers over the fastest possible patch",
    ],
    architecture:
      "MERN stack (MongoDB, Express, React, Node.js). Client name withheld.",
    results: [
      "5.0 Fiverr review from akirasolutions (United States) for communication, programming depth, and organized code.",
    ],
    technologies: ["MongoDB", "Express", "React", "Node.js"],
    images: cover("api", "MERN functions, routes, and controllers interface overview"),
    client: { name: "International Client", country: "United States", showName: false },
    marketplace: { projectUrl: null, gigUrl: "https://www.fiverr.com/saeedhussain505" },
    seo: {
      title: "MERN app functions, routes, and controllers | Saeed Hussain",
      description:
        "Confidential MERN stack functionality work by Saeed Hussain on Fiverr, covering functions, routes, and controllers.",
    },
  }),

  createProject({
    id: "fullstack-product-fiverr",
    slug: "full-stack-product-fiverr",
    title: "Full-stack web application",
    source: "fiverr",
    configured: true,
    featured: false,
    confidential: true,
    hideClientName: true,
    hideProjectUrl: true,
    hideMarketplaceUrl: false,
    industry: "Software",
    category: "Full-Stack Web Application",
    role: "Full-Stack Developer",
    year: "2024",
    completed: "2024",
    testimonialId: "review-sarzisarzi",
    summary:
      "Six-week full-stack engagement on Fiverr. The client asked for a build and also wanted input on how to make it better — then planned further parts of the same product.",
    challenge:
      "The brief was not only “build what I listed.” The client wanted someone who would improve the approach, not only execute tickets.",
    requirements: [
      "Full-stack web application delivery",
      "Practical input on how to make the product better",
    ],
    solution:
      "I delivered the requested work and suggested improvements the client accepted as part of making the product stronger.",
    responsibilities: [
      "Full-stack implementation",
      "Product-minded recommendations during delivery",
    ],
    features: [
      "Full-stack web application scoped to the Fiverr contract",
    ],
    challenges: [
      "Adding useful input without expanding the job past what the client wanted to pay for",
    ],
    decisions: [
      "Offer concrete improvements inside the engagement rather than staying silent on weak parts of the brief",
    ],
    architecture:
      "Full-stack web application. Stack and client name withheld.",
    results: [
      "5.0 Fiverr review from sarzisarzi (Colombia). Client planned to continue on other parts of the project.",
    ],
    technologies: ["React", "Node.js", "JavaScript"],
    images: cover("admin", "Full-stack web application interface overview"),
    client: { name: "International Client", country: "Colombia", showName: false },
    marketplace: { projectUrl: null, gigUrl: "https://www.fiverr.com/saeedhussain505" },
    seo: {
      title: "Full-stack web application | Saeed Hussain",
      description:
        "Confidential six-week full-stack web application by Saeed Hussain for a Fiverr client in Colombia.",
    },
  }),

  createProject({
    id: "figma-to-web",
    slug: "figma-to-web",
    title: "Figma to web application",
    source: "fiverr",
    configured: true,
    featured: false,
    confidential: true,
    hideClientName: true,
    hideProjectUrl: true,
    hideMarketplaceUrl: false,
    industry: "Digital product",
    category: "React Frontend",
    role: "Frontend Developer",
    year: "2023",
    completed: "2023",
    testimonialId: "review-mueez-figma",
    summary:
      "Figma-to-web delivery on Fiverr. 5.0 review for on-time work and recommending the same engineer for web applications.",
    challenge:
      "The client needed a Figma design implemented as a web application, on time, without drifting from the file.",
    requirements: [
      "Figma to web implementation",
      "On-time delivery",
    ],
    solution:
      "I converted the Figma design into a web application and delivered on the agreed timeline.",
    responsibilities: [
      "Figma-to-code implementation",
      "Responsive web layout",
    ],
    features: [
      "Web application built from a Figma design",
    ],
    challenges: [
      "Matching the design file without inventing a parallel visual language",
    ],
    decisions: [
      "Treat the Figma file as the source of truth for layout and components",
    ],
    architecture:
      "Frontend web application from Figma. Client name withheld.",
    results: [
      "5.0 Fiverr review: on-time delivery, recommended for web applications and programs.",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Figma"],
    images: cover("landing", "Figma to web application interface overview"),
    client: { name: "International Client", country: "Pakistan", showName: false },
    marketplace: { projectUrl: null, gigUrl: "https://www.fiverr.com/saeedhussain505" },
    seo: {
      title: "Figma to web application | Saeed Hussain",
      description:
        "Confidential Figma-to-web delivery by Saeed Hussain on Fiverr.",
    },
  }),
];
