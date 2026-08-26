import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@/components/common/Breadcrumbs.jsx";
import { Button } from "@/components/common/Button.jsx";
import { Container } from "@/components/common/Container.jsx";
import { ProofScoreboard } from "@/components/common/ProofScoreboard.jsx";
import { Seo } from "@/components/common/Seo.jsx";
import { TestimonialCard } from "@/components/cards/TestimonialCard.jsx";
import { HirePaths } from "@/sections/HirePaths.jsx";
import { fiverrProof, upworkProof } from "@/data/engagement.js";
import { personalInfo } from "@/data/personal.js";
import { filterTestimonials, getConfiguredTestimonials } from "@/utils/content.js";
import { cx } from "@/utils/helpers.js";

const FILTERS = [
  { id: "all", label: "All reviews" },
  { id: "upwork", label: "Upwork" },
  { id: "fiverr", label: "Fiverr" },
];

export function ReviewsPage() {
  const all = getConfiguredTestimonials();
  const [source, setSource] = useState("all");
  const visible = useMemo(() => filterTestimonials(all, source), [all, source]);

  return (
    <main id="main" className="pb-8">
      <Seo
        title={`Client reviews | ${personalInfo.name}`}
        description={`Public client reviews for Saeed Hussain. Upwork Top Rated with ${upworkProof.jobSuccess} Job Success; Fiverr ${fiverrProof.level} seller with ${fiverrProof.projects} projects and a ${fiverrProof.rating} rating. Quoted as they appear on those platforms.`}
        path="/reviews"
      />
      <Container className="pt-10">
        <Breadcrumbs
          items={[
            { label: "Home", path: "/" },
            { label: "Reviews", path: "/reviews" },
          ]}
        />
        <header className="mt-8 max-w-3xl">
          <p className="eyebrow">Public marketplace reviews</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            What clients wrote, in their own words
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            {all.length} published quotes from Upwork and Fiverr. Ratings and names stay as they
            appear on those profiles. Open a platform link on any card to verify.
          </p>
        </header>
        <ProofScoreboard className="mt-10" />
        <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter reviews by platform">
          {FILTERS.map((item) => (
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
        <p className="mt-8 text-sm text-text-muted">
          Showing {visible.length} of {all.length} review{all.length === 1 ? "" : "s"}
        </p>
        {visible.length ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {visible.map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-text-secondary">No reviews match that filter.</p>
        )}
        <div className="mt-12 rounded-[1.5rem] border border-border bg-surface p-8">
          <h2 className="font-display text-2xl font-semibold">Want similar delivery on your product?</h2>
          <p className="mt-3 max-w-2xl text-text-secondary">
            Share a short brief, or hire through the same platforms these reviews came from.
          </p>
          <Button as={Link} to="/#contact" className="mt-6">
            Start a conversation
          </Button>
        </div>
      </Container>
      <HirePaths />
    </main>
  );
}
