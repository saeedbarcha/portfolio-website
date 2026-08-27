/**
 * Availability, languages, and how clients can hire.
 * Marketplace stats are taken from the public Upwork profile.
 */

export const engagement = {
  available: true,
  label: "Available for new projects",
  note: "Remote-first. International clients welcome. Open to contract-to-hire.",
  timezone: "PKT (UTC+5) · Gilgit-Baltistan",
  workingHours: "More than 30 hrs/week",
  languages: [
    { name: "English", level: "Fluent", confirmed: true },
    { name: "Urdu", level: "Native or bilingual", confirmed: true },
    { name: "Hindi", level: "Conversational", confirmed: true },
  ],
};

export const upworkProof = {
  badge: "Top Rated",
  jobSuccess: "100%",
  earnings: "$10K+",
  jobs: "19",
  hours: "164",
  completedJobs: "17",
  inProgressJobs: "2",
  profileUrl: "https://www.upwork.com/freelancers/~01392540088c12789a",
};

export const githubProof = {
  username: "saeedbarcha",
  profileUrl: "https://github.com/saeedbarcha",
  achievementsUrl: "https://github.com/saeedbarcha?tab=achievements",
  contributionsLastYear: "899",
};

export const fiverrProof = {
  rating: "5.0",
  reviews: "57",
  projects: "57",
  earnings: "$5K+",
  level: "Level 2",
  username: "saeedhussain505",
  responseTime: "1 hour",
  profileUrl: "https://www.fiverr.com/saeedhussain505",
};

export const hirePaths = [
  {
    id: "direct",
    title: "Work with me directly",
    body: "Share a brief through the contact form. I reply with clarifying questions, scope, and a practical next step.",
    cta: "Start a conversation",
    href: "/#contact",
    socialId: null,
  },
  {
    id: "upwork",
    title: "Hire on Upwork",
    body: "Top Rated, 100% Job Success, $10K+ earned across 19 jobs. Invite me on Upwork if you want platform contracts, milestones, and the public review history.",
    cta: "Open Upwork profile",
    href: "https://www.upwork.com/freelancers/~01392540088c12789a",
    socialId: "upwork",
  },
  {
    id: "fiverr",
    title: "Hire on Fiverr",
    body: "Level 2 seller, $5K+ earned, 57 projects completed, 5.0 rating as saeedhussain505. Full-stack MERN/PERN work, Figma-to-web, and coding lessons — with the public review history on the platform.",
    cta: "Open Fiverr profile",
    href: "https://www.fiverr.com/saeedhussain505",
    socialId: "fiverr",
  },
];
