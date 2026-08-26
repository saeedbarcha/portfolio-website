# Saeed Hussain — Portfolio

Premium personal website for **Saeed Hussain**, Software Engineer and Full-Stack Developer. The site is built to help international clients, founders, agencies, and hiring teams understand who Saeed is, how he works, what he has shipped, and how to start a conversation.

It is content-driven: most public copy, projects, reviews, videos, and social profiles live in `src/data/`. Unconfigured placeholders are never shown as if they were real.

## Design concept

The visual language is an **editorial product studio**, not a generic developer template.

- Dark ink surfaces, warm parchment text, and a copper accent
- Plus Jakarta Sans for UI and headings, Instrument Serif for featured quotes
- Left-aligned hero, numbered sections, generous whitespace, thin borders
- Evidence over marketing claims: education, process, real projects, real reviews, real video testimonials

## Design system

Tokens live in `src/index.css` (`@theme`): background, surface, text, muted, border, accent, success, error, radius, and shadow. Components consume those tokens through Tailwind utilities so spacing, type, and color stay consistent.

## Information architecture

```text
Discover Saeed
  → Understand expertise
  → See professional experience
  → Explore real projects / case studies
  → Read client reviews
  → Watch client video testimonials
  → Understand services and process
  → Verify professional presence
  → Contact / hire
```

Routes:

- `/` — long-form home
- `/work` — complete project archive (Upwork, Fiverr, direct), with filters
- `/work/:slug` — project case study (SEO + breadcrumbs)
- unknown paths — accessible 404

## Component architecture

- `components/common` — buttons, forms, media, modal, SEO
- `components/layout` — navbar, mobile menu, footer
- `components/cards` — project, experience, review, video, service
- `sections` — page-level blocks composed from primitives and data
- `pages` — home, case study, 404
- `data` — all editable content
- `hooks` / `utils` / `services` — scroll spy, reduced motion, content filters, contact submit

## Project / testimonial relationship

IDs connect the three evidence layers:

```text
Project.testimonialId      → testimonials.js
Project.videoTestimonialId → videoTestimonials.js
Testimonial.projectId      → projects.js
VideoTestimonial.projectId → projects.js
```

Case studies can therefore show “Client feedback for this project” without duplicating quotes.

## Mobile UX strategy

Mobile-first layout, large tap targets, no hover-only information, a focus-trapped mobile menu, stacked project cards, and a full-width video dialog with native controls. `prefers-reduced-motion` disables non-essential animation.

---

## Technology stack

- React 19
- Vite
- Tailwind CSS v4
- Framer Motion
- Lucide React
- React Router (home + case studies)

## Requirements

- Node.js 20+ (recommended)
- npm

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the local URL printed in the terminal (typically `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Folder structure

```text
public/
  resume.pdf
  favicon.svg
  og-image.svg
  robots.txt
  sitemap.xml
  projects/
  testimonials/
  videos/
  captions/
src/
  assets/
  components/
  data/
  hooks/
  pages/
  sections/
  services/
  utils/
  App.jsx
  main.jsx
  index.css
```

## Customizing personal information

Edit `src/data/personal.js`.

- Name, role, headline, about copy
- Email, location, phone (placeholder values stay hidden)
- Education
- SEO title and description
- Resume path

Section visibility flags live in `src/data/site.js`. Set a section to `false` to hide it even if data exists. Sections with no configured entries also hide themselves (experience, reviews, videos, social).

## Adding a project (including Fiverr and Upwork)

Every **configured** project appears on `/work`. Homepage cards are only those with `featured: true`.

### 1. Link your marketplace profiles first

In `src/data/socialLinks.js` paste real URLs:

```js
{
  id: "upwork",
  url: "https://www.upwork.com/freelancers/~yourid",
  enabled: true,
}
{
  id: "fiverr",
  url: "https://www.fiverr.com/yourusername",
  enabled: true,
}
```

The Hire section then shows **Open Upwork profile** / **Open Fiverr profile**.

### 2. Add each past job as a case study

Duplicate a template in `src/data/projects.js` (`upwork-project-1`, `fiverr-project-1`, or `direct-project-1`).

```js
createProject({
  id: "upwork-crm-dashboard",
  slug: "upwork-crm-dashboard",
  title: "CRM dashboard for an operations team",
  source: "upwork",          // "upwork" | "fiverr" | "direct"
  configured: true,          // required or it stays hidden
  featured: true,            // homepage highlight; leave false for archive-only
  marketplace: {
    // Upwork: portfolio item or public contract URL
    // Fiverr: portfolio item or gig URL
    projectUrl: "https://www.upwork.com/freelancers/~id?p=123",
  },
  liveUrl: "https://client-site.com", // omit or hide if confidential
  summary: "Short description of the product and outcome.",
  technologies: ["React", "Node.js", "MongoDB"],
})
```

Where to find marketplace URLs:

- **Upwork** — Profile → Portfolio → open the item → copy the URL. If the contract is private, leave `projectUrl` empty; the site will fall back to your Upwork profile.
- **Fiverr** — Profile → Portfolio or the gig page → copy the URL.
- **Direct clients** — use `source: "direct"` and the live product URL when you are allowed to share it.

### 3. Screenshots and SEO

1. Add images under `public/projects/<slug>/cover.webp`
2. Fill `seo.title` and `seo.description` on the project if you want a custom Google title
3. Set `configured: true`
4. Production build writes every published case study into `dist/sitemap.xml`

### Confidential marketplace work

```js
confidential: true,
hideClientName: true,
hideProjectUrl: true,
hideMarketplaceUrl: true,
```

The project still appears in `/work` as “International Client” without names or marketplace URLs.

The case study URL is always `/work/your-slug`.

## Adding a written client review

1. Paste the real review into `src/data/testimonials.js`.
2. Set `configured: true` only when the quote, name, and source are genuine.
3. Optional: `sourceUrl` for Upwork/LinkedIn/email archives.
4. Set `projectId` to the matching project.
5. Optional client photo: `public/testimonials/client-name.webp`.

If no reviews are configured, the section is not rendered.

## Adding a client video testimonial

1. Add a thumbnail in `public/testimonials/videos/`.
2. For a local file, put the MP4 in `public/videos/` and set:

```js
video: { type: "local", src: "/videos/your-file.mp4" }
```

3. Or use a hosted video:

```js
video: { type: "youtube", src: "https://www.youtube.com/watch?v=VIDEO_ID" }
video: { type: "vimeo", src: "https://vimeo.com/VIDEO_ID" }
```

4. Optional captions: `captions: "/captions/your-file.vtt"`.
5. Set `configured: true` and `projectId` when relevant.

Videos are not preloaded. Thumbnails render first; playback happens in an accessible modal (Esc, focus trap, no autoplay).

## Associating a testimonial with a project

Use the same IDs on both sides:

```js
// projects.js
testimonialId: "testimonial-1",
videoTestimonialId: "video-testimonial-1",

// testimonials.js / videoTestimonials.js
projectId: "project-1",
```

## Adding social media URLs

Edit `src/data/socialLinks.js` only.

Paste a real `https://` URL and keep `enabled: true`. Placeholder strings such as `[ADD_LINKEDIN_URL]` are ignored. Empty or invalid profiles are never shown.

Placement is controlled per link (`hero`, `social`, `contact`, `footer`).

## Replacing the resume

Replace `public/resume.pdf`. Navbar, hero, and footer link to `/resume.pdf`.

## Adding images

- Project screenshots: `public/projects/<slug>/cover.webp`
- Client photos: `public/testimonials/`
- Video posters: `public/testimonials/videos/`
- Prefer WebP or AVIF, with explicit width/height in project data
- Below-the-fold images lazy-load; missing files fall back to a branded placeholder (no broken-image icon)

Update `og-image.svg` (or a 1200×630 PNG) for social sharing. If you add `og-image.png`, point `personalInfo.seo.ogImage` to it.

## Adding video captions

Create a WebVTT file:

```vtt
WEBVTT

00:00:00.000 --> 00:00:04.000
Thank you for watching this testimonial.
```

Save it as `public/captions/client-1.vtt` and set `captions` on that video entry.

## Environment variables

Copy `.env.example` to `.env`:

```bash
VITE_SITE_URL=https://your-domain.com
VITE_CONTACT_ENDPOINT=https://formspree.io/f/your-id
```

- `VITE_SITE_URL` — canonical URLs, Open Graph, JSON-LD
- `VITE_CONTACT_ENDPOINT` — POST JSON to Formspree, Getform, Basin, or your own API

If no endpoint is set, the form falls back to `mailto:` using the email in `src/data/personal.js`. Do not put private API secrets in frontend code. A hidden honeypot field (`website`) is included as basic spam protection.

After setting the site URL, update `public/sitemap.xml` and `public/robots.txt` with absolute URLs.

## Deployment to Vercel

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Framework preset: Vite.
4. Set `VITE_SITE_URL` (and optionally `VITE_CONTACT_ENDPOINT`).
5. Deploy. SPA routing is handled by `vercel.json`.

## Deployment to Netlify

1. Connect the repository.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set the same environment variables.
5. `netlify.toml` already rewrites routes to `index.html`.

## Accessibility notes

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`)
- Skip link, visible focus, keyboard-accessible menus and dialogs
- Form labels, `aria-invalid`, and error text wired with `aria-describedby`
- Video play buttons include the client name
- Captions supported on local video
- `prefers-reduced-motion` respected
- Touch targets generally 44px or larger

## Performance recommendations

- Keep screenshots compressed; 1600px-wide WebP is usually enough
- Do not autoplay video; keep using thumbnails
- Replace the SVG Open Graph image with a compressed PNG/JPG for LinkedIn/Twitter
- Set `VITE_SITE_URL` in production
- Avoid adding large UI kits or unused icon packs
- After adding case studies, list them in `public/sitemap.xml`

## Content integrity

Do not invent companies, projects, statistics, reviews, or repositories. Keep placeholder strings in `[brackets]` until real data is ready. The site will hide them automatically.
