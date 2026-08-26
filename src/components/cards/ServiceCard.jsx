export function ServiceCard({ service, index }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="surface-card h-full p-6 sm:p-8 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-accent/25 hover:shadow-soft">
      <p className="eyebrow">{number}</p>
      <h3 className="mt-4 font-display text-xl font-semibold">{service.title}</h3>
      <p className="mt-3 text-text-secondary">{service.summary}</p>
      <p className="mt-3 text-sm text-text-muted">{service.details}</p>
      {service.outcomes?.length ? (
        <ul className="mt-5 space-y-2 text-sm text-text-secondary">
          {service.outcomes.map((outcome) => (
            <li key={outcome} className="flex gap-2">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
