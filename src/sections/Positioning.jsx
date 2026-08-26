import { Link } from "react-router-dom";
import { Container } from "@/components/common/Container.jsx";
import { aboutContent } from "@/data/personal.js";

export function Positioning() {
  return (
    <section className="border-t border-border py-12 sm:py-16">
      <Container>
        <div className="flex max-w-3xl flex-col gap-4">
          <p className="text-lg leading-relaxed text-text-secondary">{aboutContent.lead}</p>
          <Link to="/about" className="text-sm font-medium text-accent hover:text-accent-hover">
            About, experience, and how I work
          </Link>
        </div>
      </Container>
    </section>
  );
}
