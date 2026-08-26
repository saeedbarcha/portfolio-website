import { personalInfo } from "@/data/personal.js";
import { siteConfig } from "@/data/site.js";
import { formatMetaTitle, isConfiguredText } from "@/utils/helpers.js";
import { useLayoutEffect } from "react";

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function setCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!href) {
    element?.remove();
    return;
  }
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function imageType(src = "") {
  if (src.endsWith(".png")) return "image/png";
  if (src.endsWith(".jpg") || src.endsWith(".jpeg")) return "image/jpeg";
  if (src.endsWith(".webp")) return "image/webp";
  if (src.endsWith(".svg")) return "image/svg+xml";
  return "image/png";
}

export function Seo({
  title,
  description,
  path = "/",
  image,
  type = "website",
  noIndex = false,
  keywords,
}) {
  useLayoutEffect(() => {
    const pageTitle = formatMetaTitle(title || siteConfig.defaultTitle);
    const pageDescription = description || siteConfig.defaultDescription;
    const origin = siteConfig.siteUrl || window.location.origin;
    const pathname = noIndex ? window.location.pathname || "/" : path === "/" ? "/" : path;
    const url = `${origin}${pathname}`;
    const imagePath = image || siteConfig.ogImage;
    const ogImage = imagePath.startsWith("http") ? imagePath : `${origin}${imagePath}`;
    const keywordList = keywords?.length ? keywords : personalInfo.seo.keywords;

    document.title = pageTitle;
    document.documentElement.lang = "en";

    upsertMeta('meta[name="description"]', { name: "description", content: pageDescription });
    upsertMeta('meta[name="author"]', { name: "author", content: personalInfo.name });
    if (keywordList?.length) {
      upsertMeta('meta[name="keywords"]', {
        name: "keywords",
        content: Array.isArray(keywordList) ? keywordList.join(", ") : keywordList,
      });
    }
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: noIndex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    });
    upsertMeta('meta[name="googlebot"]', {
      name: "googlebot",
      content: noIndex ? "noindex, nofollow" : "index, follow",
    });
    upsertMeta('meta[name="referrer"]', { name: "referrer", content: "strict-origin-when-cross-origin" });
    if (isConfiguredText(personalInfo.location)) {
      upsertMeta('meta[name="geo.region"]', { name: "geo.region", content: "PK-GB" });
      upsertMeta('meta[name="geo.placename"]', { name: "geo.placename", content: personalInfo.location });
    }

    setCanonical(noIndex ? "" : url);

    upsertMeta('meta[property="og:title"]', { property: "og:title", content: pageTitle });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: pageDescription });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: type });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: url });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: ogImage });
    upsertMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: pageTitle });
    upsertMeta('meta[property="og:image:type"]', { property: "og:image:type", content: imageType(imagePath) });
    upsertMeta('meta[property="og:image:width"]', { property: "og:image:width", content: "1200" });
    upsertMeta('meta[property="og:image:height"]', { property: "og:image:height", content: "630" });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: personalInfo.name });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: personalInfo.seo.locale });

    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: pageTitle });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: pageDescription });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: ogImage });
    upsertMeta('meta[name="twitter:image:alt"]', { name: "twitter:image:alt", content: pageTitle });

    if (isConfiguredText(personalInfo.seo.twitterHandle)) {
      upsertMeta('meta[name="twitter:site"]', {
        name: "twitter:site",
        content: personalInfo.seo.twitterHandle,
      });
    }
  }, [title, description, path, image, type, noIndex, keywords]);

  return null;
}
