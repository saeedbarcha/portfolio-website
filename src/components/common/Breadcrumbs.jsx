import { Link } from "react-router-dom";
import { JsonLd } from "@/components/common/JsonLd.jsx";
import { getBreadcrumbJsonLd } from "@/utils/content.js";

export function Breadcrumbs({ items }) {
  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd(items)} />
      <nav aria-label="Breadcrumb" className="text-sm text-text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-text">
                    {item.label}
                  </span>
                ) : (
                  <Link to={item.path} className="hover:text-accent">
                    {item.label}
                  </Link>
                )}
                {last ? null : <span aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
