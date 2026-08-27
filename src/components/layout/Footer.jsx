import { ArrowUp, Mail } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container } from "@/components/common/Container.jsx";
import { ResumeDownload } from "@/components/common/ResumeDownload.jsx";
import { SocialLinks } from "@/components/common/SocialLinks.jsx";
import { personalInfo } from "@/data/personal.js";
import { getActiveSocialLinks, getNavItems, getPublicEmail } from "@/utils/content.js";
import { scrollToId } from "@/utils/helpers.js";

export function Footer() {
  const year = new Date().getFullYear();
  const items = getNavItems();
  const social = getActiveSocialLinks("footer");
  const email = getPublicEmail();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const goToItem = (event, item) => {
    event.preventDefault();
    if (!item.to.includes("#") || !isHome) {
      navigate(item.to);
      return;
    }
    scrollToId(item.id);
  };

  return (
    <footer className="border-t border-border bg-bg-secondary">
      <Container className="py-10 sm:py-14">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-[1.2fr_1fr_auto]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={personalInfo.photo}
                alt=""
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
                className="size-12 rounded-full object-cover object-top"
              />
              <div>
                <p className="font-display text-lg font-semibold">{personalInfo.name}</p>
                <p className="text-sm text-text-muted">{personalInfo.primaryRole}</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm text-text-secondary">
              Full-stack product engineering for businesses and remote teams.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
              Navigate
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:max-w-xs">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.to}
                    onClick={(event) => goToItem(event, item)}
                    className="inline-flex min-h-10 items-center text-text-secondary hover:text-text"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
              Connect
            </p>
            {email ? (
              <a
                href={`mailto:${email}`}
                className="flex min-h-11 items-center gap-2 break-all text-sm text-text-secondary hover:text-accent"
              >
                <Mail size={16} className="shrink-0" aria-hidden="true" />
                {email}
              </a>
            ) : null}
            <ResumeDownload variant="links" />
            <SocialLinks links={social} />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-sm text-text-muted sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {personalInfo.name}.{" "}
            <span className="text-text-muted/80">Built with React.</span>
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link to="/" className="hover:text-text">
              Home
            </Link>
            <Link to="/about" className="hover:text-text">
              About
            </Link>
            <Link to="/about#certifications" className="hover:text-text">
              Certifications
            </Link>
            <Link to="/work" className="hover:text-text">
              Projects
            </Link>
            <Link to="/reviews" className="hover:text-text">
              Reviews
            </Link>
            <Link to="/skills" className="hover:text-text">
              Skills
            </Link>
            <button
              type="button"
              className="inline-flex min-h-11 items-center gap-2 hover:text-text"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Back to top
              <ArrowUp size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
