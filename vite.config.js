import { writeFileSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { projects } from "./src/data/projects.js";
import { seoTopics } from "./src/data/seoTopics.js";

function htmlSeoPlugin(siteUrl) {
  return {
    name: "html-seo",
    transformIndexHtml(html) {
      const origin = (siteUrl || "").replace(/\/$/, "");
      if (!origin) {
        console.warn(
          "[seo] Set VITE_SITE_URL (e.g. https://your-domain.com) so canonical URLs, Open Graph, sitemap.xml, and robots.txt use absolute addresses Google can index.",
        );
        return html;
      }

      const og = `${origin}/og-image.png`;
      const injected = `    <link rel="canonical" href="${origin}/" />
    <link rel="sitemap" type="application/xml" title="Sitemap" href="${origin}/sitemap.xml" />
    <meta property="og:url" content="${origin}/" />
`;
      return html.replaceAll('content="/og-image.png"', `content="${og}"`).replace("</head>", `${injected}  </head>`);
    },
  };
}

function seoFilesPlugin(siteUrl) {
  return {
    name: "seo-files",
    closeBundle() {
      const origin = (siteUrl || "").replace(/\/$/, "");
      const published = projects.filter((project) => project.configured !== false);
      const paths = [
        "/",
        "/about",
        "/work",
        "/reviews",
        "/skills",
        ...published.map((project) => `/work/${project.slug}`),
        ...seoTopics.map((topic) => `/skills/${topic.slug}`),
      ];
      const loc = (path) => (origin ? `${origin}${path}` : path);
      const lastmod = new Date().toISOString().slice(0, 10);
      const priorityFor = (path) => {
        if (path === "/") return "1.0";
        if (path === "/work" || path === "/about" || path === "/reviews" || path === "/skills") return "0.9";
        if (path.startsWith("/skills/")) return "0.85";
        return "0.8";
      };
      const urls = paths
        .map(
          (path) => `  <url>
    <loc>${loc(path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${priorityFor(path)}</priority>
  </url>`,
        )
        .join("\n");

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
      writeFileSync("dist/sitemap.xml", sitemap);

      const robots = origin
        ? `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`
        : `User-agent: *
Allow: /
`;
      writeFileSync("dist/robots.txt", robots);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = env.VITE_SITE_URL || "";

  return {
    plugins: [react(), tailwindcss(), htmlSeoPlugin(siteUrl), seoFilesPlugin(siteUrl)],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      target: "es2022",
      cssMinify: true,
      modulePreload: {
        polyfill: false,
        resolveDependencies(_filename, deps) {
          return deps.filter((dep) => !dep.includes("motion"));
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules/react-dom") || id.includes("node_modules/react/") || id.includes("node_modules/scheduler")) {
              return "react-vendor";
            }
            if (id.includes("react-router")) {
              return "router";
            }
            if (id.includes("framer-motion") || id.includes("motion-dom") || id.includes("motion-utils")) {
              return "motion";
            }
          },
        },
      },
    },
  };
});
