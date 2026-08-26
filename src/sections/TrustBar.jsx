import { Container } from "@/components/common/Container.jsx";
import { trustItems } from "@/data/personal.js";

export function TrustBar() {
  return (
    <section aria-label="Professional credentials" className="border-y border-border bg-bg-secondary">
      <Container>
        <ul className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
          {trustItems.map((item, index) => (
            <li
              key={item.id}
              className="animate-fade-up lg:px-6 first:lg:pl-0"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <p className="font-display text-sm font-semibold text-text">{item.label}</p>
              <p className="mt-1 text-sm text-text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
