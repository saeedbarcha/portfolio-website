/**
 * Client-facing services. Copy is outcome-oriented, not a technology dump.
 * Offerings match the public Upwork overview.
 */

export const services = [
  {
    id: "full-stack",
    title: "Full-Stack Web Development",
    summary:
      "End-to-end MERN and PERN applications — React or Next.js, Node.js or NestJS, MongoDB or PostgreSQL.",
    details:
      "Useful when you need one engineer who can take a product from requirements to a deployed, maintainable system.",
    outcomes: [
      "A coherent product rather than disconnected frontend and backend work",
      "Architecture that can grow with new features",
      "Clear handoff documentation if your team continues the work",
    ],
  },
  {
    id: "ai",
    title: "Agentic AI, LangGraph & RAG",
    summary:
      "Production-ready agents, LangGraph workflows, RAG chatbots, and LLM apps connected to your documents and tools.",
    details:
      "For teams that need workflow automation, internal knowledge search, document Q&A, or an AI assistant with human-in-the-loop control — not a one-off prompt demo.",
    outcomes: [
      "Agents with tool calling, memory, and conditional routing",
      "RAG pipelines with chunking, embeddings, citations, and access control",
      "OpenAI, Claude, or Gemini wired into an existing product",
    ],
  },
  {
    id: "react",
    title: "React & Next.js Frontends",
    summary:
      "Responsive product UI, redesigns, and mobile-ready interfaces in React and Next.js.",
    details:
      "Suited to dashboards, marketing sites, and product UI that needs to feel considered on every screen size.",
    outcomes: [
      "Interfaces that work without relying on hover",
      "Component structure your team can keep extending",
      "Integration with REST or GraphQL backends you already have",
    ],
  },
  {
    id: "backend",
    title: "Backend, APIs & CMS",
    summary:
      "Node.js, NestJS, Express, REST and GraphQL APIs, plus CMS work such as Contentful.",
    details:
      "For products that need reliable data flow, authentication, payments, and a backend another engineer can reason about.",
    outcomes: [
      "Predictable API contracts",
      "Authentication, payments, and third-party integrations",
      "Code organized for change rather than a one-off script",
    ],
  },
  {
    id: "internal",
    title: "Dashboards & Internal Systems",
    summary:
      "Admin dashboards, ERP/CRM-style backends, and operator tools for day-to-day work.",
    details:
      "Built around how operations actually run, so teams spend less time in spreadsheets and more time on the work.",
    outcomes: [
      "Workflows that match real processes",
      "Role-appropriate views for operators and admins",
      "Room to add reporting or automation later",
    ],
  },
  {
    id: "existing",
    title: "Existing Product Development",
    summary:
      "Feature work, bug fixing, SDK packaging, maintenance retainers, and modernization.",
    details:
      "For teams that already have a product and need a reliable engineer to improve it without destabilizing what works.",
    outcomes: [
      "Targeted improvements instead of unnecessary rewrites",
      "Fixes and features shipped with regression in mind",
      "Ongoing maintenance when the product needs a steady owner",
    ],
  },
  {
    id: "figma",
    title: "Figma to Web",
    summary:
      "Pixel-faithful conversion of Figma (or similar) designs into responsive React and HTML/CSS interfaces.",
    details:
      "For teams that already have a design file and need it built as a real website or app, on time.",
    outcomes: [
      "Layout that matches the design instead of a loose interpretation",
      "Responsive behaviour as part of the build",
      "A frontend your team can keep extending",
    ],
  },
];
