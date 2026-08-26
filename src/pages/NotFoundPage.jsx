import { Link } from "react-router-dom";
import { Button } from "@/components/common/Button.jsx";
import { Container } from "@/components/common/Container.jsx";
import { Seo } from "@/components/common/Seo.jsx";

export function NotFoundPage() {
  return (
    <main id="main" className="flex min-h-[70vh] items-center">
      <Seo title="Page not found" description="The page you requested does not exist." noIndex />
      <Container>
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-display text-4xl font-semibold">This page is not available.</h1>
        <p className="mt-4 max-w-lg text-text-secondary">
          The link may be outdated, or the project has not been published yet.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button as={Link} to="/">
            Back to home
          </Button>
          <Button as={Link} to="/#contact" variant="secondary">
            Contact
          </Button>
        </div>
      </Container>
    </main>
  );
}
