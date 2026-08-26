import { CONFIDENTIAL_CLIENT_LABEL, CONFIDENTIAL_NAME_NOTE, PROJECT_SOURCES } from "@/utils/constants.js";

const PLACEHOLDER_PATTERN = /^\[[^\]]+\]$/;

export function isPlaceholder(value) {
  if (value == null) return true;
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!trimmed) return true;
  if (PLACEHOLDER_PATTERN.test(trimmed)) return true;
  if (trimmed.startsWith("[ADD_") || trimmed.startsWith("[OPTIONAL")) return true;
  if (trimmed.includes("Replace with real")) return true;
  if (trimmed.includes("Add Project") || trimmed.includes("Add Client")) return true;
  if (trimmed.includes("Add Description") || trimmed.includes("Add Screenshot")) return true;
  if (trimmed.includes("Add Results") || trimmed.includes("Add a verified")) return true;
  return false;
}

export function isConfiguredText(value) {
  return !isPlaceholder(value);
}

export function isValidHttpUrl(value) {
  if (isPlaceholder(value) || typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function isValidEmail(value) {
  if (isPlaceholder(value) || typeof value !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function configuredList(values = []) {
  return values.filter((item) => {
    if (typeof item === "string") return isConfiguredText(item);
    if (item && typeof item === "object") {
      if (item.confirmed === false) return false;
      if (item.configured === false) return false;
      return isConfiguredText(item.name || item.title || item.src || "");
    }
    return Boolean(item);
  });
}

export function getPublicClient(project) {
  if (!project) {
    return {
      name: CONFIDENTIAL_CLIENT_LABEL,
      note: null,
      country: null,
      company: null,
      hidden: true,
    };
  }

  const confidential = Boolean(project.confidential || project.hideClientName);
  const showName = project.client?.showName !== false && !confidential;

  if (!showName) {
    return {
      name: CONFIDENTIAL_CLIENT_LABEL,
      note: CONFIDENTIAL_NAME_NOTE,
      company: null,
      country: isConfiguredText(project.client?.country) ? project.client.country : null,
      hidden: true,
    };
  }

  const name = isConfiguredText(project.client?.name)
    ? project.client.name
    : CONFIDENTIAL_CLIENT_LABEL;
  const company = isConfiguredText(project.client?.company) ? project.client.company : null;
  const country = isConfiguredText(project.client?.country) ? project.client.country : null;

  return { name, company, country, note: null, hidden: false };
}

export function getPublicProjectUrl(project) {
  if (!project || project.confidential || project.hideProjectUrl) return null;
  return isValidHttpUrl(project.liveUrl) ? project.liveUrl : null;
}

export function getPublicGithubUrl(project) {
  if (!project || project.confidential) return null;
  return isValidHttpUrl(project.githubUrl) ? project.githubUrl : null;
}

export function getProjectSource(project) {
  const key = project?.source;
  if (!key) return null;
  return PROJECT_SOURCES[key] || null;
}

export function getMarketplaceProjectUrl(project) {
  if (!project || project.confidential || project.hideMarketplaceUrl) return null;
  const urls = [project.marketplace?.projectUrl, project.marketplace?.gigUrl];
  return urls.find((url) => isValidHttpUrl(url)) || null;
}

export function absoluteUrl(path, origin) {
  if (!path) return origin || "";
  if (/^https?:\/\//i.test(path)) return path;
  const base = (origin || "").replace(/\/$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}

export function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function formatMetaTitle(title, siteName = "Saeed Hussain") {
  if (!title || title === siteName) return siteName;
  if (title.includes(siteName)) return title;
  const combined = `${title} | ${siteName}`;
  return combined.length <= 60 ? combined : title;
}

export function truncate(value, length = 160) {
  if (!value) return "";
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= length) return text;
  return `${text.slice(0, length - 1).trim()}…`;
}

export function extractYoutubeId(url) {
  if (!isValidHttpUrl(url)) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1);
    }
    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.split("/embed/")[1];
      }
      return parsed.searchParams.get("v");
    }
  } catch {
    return null;
  }
  return null;
}

export function extractVimeoId(url) {
  if (!isValidHttpUrl(url)) return null;
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("vimeo.com")) return null;
    const parts = parsed.pathname.split("/").filter(Boolean);
    return parts[0] || null;
  } catch {
    return null;
  }
}

export function getYoutubeEmbedUrl(url) {
  const id = extractYoutubeId(url);
  if (!id) return null;
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`;
}

export function getVimeoEmbedUrl(url) {
  const id = extractVimeoId(url);
  if (!id) return null;
  return `https://player.vimeo.com/video/${id}`;
}

export function getYoutubePoster(url) {
  const id = extractYoutubeId(url);
  if (!id) return null;
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function buildMailto({ email, name, company, projectType, budget, timeline, message }) {
  const subject = encodeURIComponent(`Project inquiry from ${name}`);
  const lines = [
    message,
    "",
    "—",
    `Name: ${name}`,
    company ? `Company: ${company}` : null,
    projectType ? `Project type: ${projectType}` : null,
    budget ? `Budget: ${budget}` : null,
    timeline ? `Timeline: ${timeline}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return `mailto:${email}?subject=${subject}&body=${encodeURIComponent(lines)}`;
}

export function scrollToId(id, behavior = "smooth") {
  if (!id || typeof document === "undefined") return () => {};

  const jump = () => {
    const target = document.getElementById(id);
    if (!target) return false;
    target.scrollIntoView({ behavior, block: "start" });
    return true;
  };

  if (jump()) return () => {};

  const root = document.getElementById("main") || document.body;
  const mutation = new MutationObserver(() => {
    if (jump()) mutation.disconnect();
  });
  mutation.observe(root, { childList: true, subtree: true });
  const timeout = window.setTimeout(() => mutation.disconnect(), 5000);
  return () => {
    mutation.disconnect();
    window.clearTimeout(timeout);
  };
}
