export const NAV_SECTIONS = [
  { id: "about", label: "About", to: "/about" },
  { id: "work", label: "Projects", to: "/work" },
  { id: "reviews", label: "Reviews", to: "/reviews" },
  { id: "skills", label: "Skills", to: "/skills" },
  { id: "contact", label: "Contact", to: "/#contact" },
];

export const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export const MOTION = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1],
  stagger: 0.08,
};

export const BREAKPOINTS = {
  md: 768,
  lg: 1024,
};

export const CONFIDENTIAL_CLIENT_LABEL = "Confidential client";
export const CONFIDENTIAL_NOTE = "Client details withheld due to confidentiality.";
export const CONFIDENTIAL_NAME_NOTE = "Client name withheld due to confidentiality.";

export const PROJECT_SOURCES = {
  upwork: { id: "upwork", label: "Upwork", shortLabel: "Upwork" },
  fiverr: { id: "fiverr", label: "Fiverr", shortLabel: "Fiverr" },
  direct: { id: "direct", label: "Direct engagement", shortLabel: "Direct" },
};
