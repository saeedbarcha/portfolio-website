import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Breadcrumbs } from "@/components/common/Breadcrumbs.jsx";
import { Button } from "@/components/common/Button.jsx";
import { Container } from "@/components/common/Container.jsx";
import { JsonLd } from "@/components/common/JsonLd.jsx";
import { Seo } from "@/components/common/Seo.jsx";
import { ProjectCard } from "@/components/cards/ProjectCard.jsx";
import { HirePaths } from "@/sections/HirePaths.jsx";
import { fiverrProof, upworkProof } from "@/data/engagement.js";
import { personalInfo } from "@/data/personal.js";
import { PROJECT_SOURCES } from "@/utils/constants.js";
import {
  filterProjects,
  getConfiguredProjects,
  getProjectFilters,
  getWorkListJsonLd,
} from "@/utils/content.js";
import { cx } from "@/utils/helpers.js";

const PAGE_SIZE = 4;

export function WorkPage() {
  const all = getConfiguredProjects();
  const { sources, categories } = getProjectFilters();
  const [searchParams] = useSearchParams();
  const [source, setSource] = useState("all");
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [shownCount, setShownCount] = useState(PAGE_SIZE);

  const filtered = useMemo(
    () => filterProjects(all, { source, category, query }),
    [all, source, category, query],
  );

  useEffect(() => {
    setShownCount(PAGE_SIZE);
  }, [source, category, query]);

  const shown = filtered.slice(0, shownCount);
  const hasMore = shownCount < filtered.length;
  const canCollapse = shownCount > PAGE_SIZE && filtered.length > PAGE_SIZE;

  const sourceFilters = [
    { id: "all", label: "All work" },
    ...sources.map((id) => ({ id, label: PROJECT_SOURCES[id]?.label || id })),
  ];

  return (
    <main id="main" className="pb-8">
      <Seo
        title={`Projects | ${personalInfo.name}`}
        description="Upwork and Fiverr case studies by Saeed Hussain — full-stack MERN/PERN work, dashboards, AI products, and product UI. Client names stay unpublished."
        path="/work"
      />
      <JsonLd data={getWorkListJsonLd()} />
      <Container className="pt-10">
        <Breadcrumbs
          items={[
            { label: "Home", path: "/" },
            { label: "Projects", path: "/work" },
          ]}
        />
        <header className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">All published work</p>
            <h1 className="mt-4 font-display text-[1.85rem] font-semibold leading-[1.15] tracking-tight text-pretty sm:text-5xl">
              Projects for international clients
            </h1>
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              Named products with public URLs include HeyCarla, Eldrin AI, Plex Medical, and Equipmates.
              Additional case studies from Upwork and Fiverr keep client names unpublished.
              For quotes, see{" "}
              <Link to="/reviews" className="text-accent hover:text-accent-hover">
                all public reviews
              </Link>
              .
            </p>
          </div>
          <aside className="surface-card grid grid-cols-2 gap-4 p-6 sm:p-8">
            <div>
              <p className="text-2xl font-display font-semibold">{upworkProof.jobSuccess}</p>
              <p className="mt-1 text-sm text-text-muted">Upwork Job Success</p>
            </div>
            <div>
              <p className="text-2xl font-display font-semibold">{fiverrProof.level}</p>
              <p className="mt-1 text-sm text-text-muted">Fiverr seller</p>
            </div>
            <div>
              <p className="text-2xl font-display font-semibold">{upworkProof.jobs}</p>
              <p className="mt-1 text-sm text-text-muted">Upwork jobs</p>
            </div>
            <div>
              <p className="text-2xl font-display font-semibold">{fiverrProof.projects}</p>
              <p className="mt-1 text-sm text-text-muted">Fiverr projects</p>
            </div>
            <div className="col-span-2 border-t border-border pt-4 text-sm text-text-secondary">
              {upworkProof.badge} · {all.length} case studies · Client names withheld ·{" "}
              <Link to="/reviews" className="text-accent hover:text-accent-hover">
                Public reviews
              </Link>
            </div>
          </aside>
        </header>

        {all.length ? (
          <>
            <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by platform">
                {sourceFilters.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSource(item.id)}
                    aria-pressed={source === item.id}
                    className={cx(
                      "min-h-11 rounded-full border px-4 text-sm",
                      source === item.id
                        ? "border-accent bg-accent-muted text-accent"
                        : "border-border text-text-secondary hover:text-text",
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <label className="relative block w-full max-w-sm">
                <span className="sr-only">Search projects</span>
                <Search
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by name, stack, or industry"
                  className="min-h-12 w-full rounded-full border border-border bg-bg pl-11 pr-4 text-sm placeholder:text-text-muted"
                />
              </label>
            </div>
            {categories.length > 1 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setCategory("all")}
                  className={cx(
                    "min-h-10 rounded-full px-3 text-sm",
                    category === "all" ? "text-accent" : "text-text-muted hover:text-text",
                  )}
                >
                  All types
                </button>
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={cx(
                      "min-h-10 rounded-full px-3 text-sm",
                      category === item ? "text-accent" : "text-text-muted hover:text-text",
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            ) : null}

            <p className="mt-8 text-sm text-text-muted">
              Showing {shown.length} of {filtered.length} project{filtered.length === 1 ? "" : "s"}
              {filtered.length !== all.length ? ` (from ${all.length} published)` : ""}
            </p>
            {filtered.length ? (
              <>
                <div className="mt-6 grid gap-5 sm:gap-6 lg:grid-cols-2">
                  {shown.map((project, index) => (
                    <ProjectCard key={project.id} project={project} priority={index === 0} />
                  ))}
                </div>
                {hasMore || canCollapse ? (
                  <div className="mt-10 flex justify-center">
                    <Button
                      variant="secondary"
                      aria-expanded={!hasMore}
                      onClick={() =>
                        setShownCount((count) => (hasMore ? count + PAGE_SIZE : PAGE_SIZE))
                      }
                    >
                      {hasMore ? (
                        <>
                          Show more
                          <ChevronDown size={16} aria-hidden="true" />
                        </>
                      ) : (
                        <>
                          Show less
                          <ChevronUp size={16} aria-hidden="true" />
                        </>
                      )}
                    </Button>
                  </div>
                ) : null}
              </>
            ) : (
              <p className="mt-8 text-text-secondary">No projects match those filters.</p>
            )}
          </>
        ) : (
          <div className="surface-card mt-10 p-8">
            <p className="max-w-2xl text-text-secondary">
              Case studies from Upwork, Fiverr, and direct clients will appear here as they are
              published. Until then, you can still start a conversation or hire through a
              marketplace profile once it is linked.
            </p>
          </div>
        )}
      </Container>
      <HirePaths />
    </main>
  );
}
