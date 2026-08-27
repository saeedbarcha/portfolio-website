import { fiverrProof, githubProof, upworkProof } from "@/data/engagement.js";

/**
 * Public achievements and issued credentials.
 * Do not add awards, badges, or certificates that cannot be verified.
 */

export const achievements = [
  {
    id: "upwork-top-rated",
    source: "Upwork",
    metric: "Top Rated",
    title: "100% Job Success",
    body: "19 jobs and 164 hours on Upwork, with every published contract in good standing.",
    href: upworkProof.profileUrl,
  },
  {
    id: "upwork-earnings",
    source: "Upwork",
    metric: "$10K+",
    title: "Client revenue on Upwork",
    body: "Earned across full-stack product work on the public Upwork profile.",
    href: upworkProof.profileUrl,
  },
  {
    id: "fiverr-level",
    source: "Fiverr",
    metric: "Level 2",
    title: "Fiverr seller",
    body: "57 projects completed as saeedhussain505, with a public 5.0 client rating.",
    href: fiverrProof.profileUrl,
  },
  {
    id: "fiverr-earnings",
    source: "Fiverr",
    metric: "$5K+",
    title: "Client revenue on Fiverr",
    body: "Earned across 57 completed Fiverr projects.",
    href: fiverrProof.profileUrl,
  },
  {
    id: "fiverr-rating",
    source: "Fiverr",
    metric: "5.0",
    title: "Client rating on Fiverr",
    body: "Public reviews on the Fiverr profile — quoted as they appear on the platform.",
    href: fiverrProof.profileUrl,
  },
  {
    id: "years",
    source: "Career",
    metric: "7+",
    title: "Years of full-stack development",
    body: "Including HeyCarla, Artilect Solutions since 2019, and two years as a MERN Stack Developer at Dot Austere.",
    href: null,
  },
];

export const githubAchievementsContent = {
  heading: "GitHub achievements",
  lead: `Public badges on github.com/${githubProof.username} — ${githubProof.contributionsLastYear} contributions in the last year. Each badge opens the matching GitHub achievement.`,
};

export const githubAchievements = [
  {
    id: "pair-extraordinaire",
    name: "Pair Extraordinaire",
    body: "Coauthored commits on a merged pull request.",
    image: "/achievements/pair-extraordinaire.png",
    href: "https://github.com/saeedbarcha?achievement=pair-extraordinaire&tab=achievements",
  },
  {
    id: "pull-shark",
    name: "Pull Shark",
    count: "×3",
    body: "Opened pull requests that were merged into a repository.",
    image: "/achievements/pull-shark.png",
    href: "https://github.com/saeedbarcha?achievement=pull-shark&tab=achievements",
  },
  {
    id: "yolo",
    name: "YOLO",
    body: "Merged a pull request without waiting for a review.",
    image: "/achievements/yolo.png",
    href: "https://github.com/saeedbarcha?achievement=yolo&tab=achievements",
  },
  {
    id: "quickdraw",
    name: "Quickdraw",
    body: "Closed an issue or pull request within five minutes of opening it.",
    image: "/achievements/quickdraw.png",
    href: "https://github.com/saeedbarcha?achievement=quickdraw&tab=achievements",
  },
];

export const certificationsContent = {
  heading: "Certified in the MERN stack",
  lead:
    "I completed a project-based Udemy course that builds a full eCommerce product in MongoDB, Express, React, and Node.js — the same stack I use for client work. The certificate is issued by Udemy and opens to a public verification page.",
};

export const certifications = [
  {
    id: "udemy-mern-ecommerce",
    name: "MERN From Scratch 2023 | eCommerce Platform",
    issuer: "Udemy",
    instructor: "Brad Traversy",
    year: "January 31, 2024",
    hours: "13.5 hours",
    credentialId: "UC-c730a107-487b-4166-871e-811474ffedba",
    url: "https://ude.my/UC-c730a107-487b-4166-871e-811474ffedba",
    image: "/certificates/udemy-mern-from-scratch.jpg",
    summary:
      "A 13.5-hour production course covering authentication, product catalog, cart, checkout, and admin in a real MERN application — not isolated syntax lessons.",
  },
];
