import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Container } from "@/components/common/Container.jsx";
import { Avatar } from "@/components/common/Avatar.jsx";
import { ResumeDownload } from "@/components/common/ResumeDownload.jsx";
import { personalInfo } from "@/data/personal.js";
import { useMediaQuery } from "@/hooks/useMediaQuery.js";
import { useScrollSpy } from "@/hooks/useScrollSpy.js";
import { BREAKPOINTS } from "@/utils/constants.js";
import { getNavItems } from "@/utils/content.js";
import { cx, scrollToId } from "@/utils/helpers.js";

function isItemCurrent(item, pathname, isHome, activeId) {
  if (!item.to.includes("#")) {
    if (item.to === "/") return pathname === "/";
    return pathname === item.to || pathname.startsWith(`${item.to}/`);
  }
  return isHome && activeId === item.id;
}

function getMobileActiveId(pathname, isHome, activeId) {
  if (pathname.startsWith("/work")) return "work";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/reviews")) return "reviews";
  if (pathname.startsWith("/skills")) return "skills";
  return isHome ? activeId : null;
}

const MobileMenu = lazy(() =>
  import("@/components/layout/MobileMenu.jsx").then((module) => ({ default: module.MobileMenu })),
);

export function Navbar() {
  const items = getNavItems();
  const ids = items.map((item) => item.id);
  const activeId = useScrollSpy(ids);
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const [menuReady, setMenuReady] = useState(false);
  const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);

  if (open && !menuReady) {
    setMenuReady(true);
  }

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToItem = (event, item) => {
    event.preventDefault();
    setOpen(false);

    if (!item.to.includes("#")) {
      navigate(item.to);
      return;
    }

    if (!isHome) {
      navigate(item.to);
      return;
    }

    scrollToId(item.id);
  };

  return (
    <header
      className={cx(
        "sticky top-0 z-30 border-b transition-colors duration-300",
        open
          ? "border-border bg-bg"
          : scrolled
            ? "border-border bg-bg/90 backdrop-blur-md"
            : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.25rem]">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-full"
          aria-label={`${personalInfo.name} home`}
        >
          <Avatar size="md" priority alt="" className="border border-border" />
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-medium">{personalInfo.name}</span>
            <span className="block text-xs text-text-muted">{personalInfo.primaryRole}</span>
          </span>
        </Link>

        <nav className="hidden lg:block" aria-label="Primary">
          <ul className="flex items-center gap-1">
            {items.map((item) => {
              const current = isItemCurrent(item, location.pathname, isHome, activeId);
              return (
                <li key={item.id}>
                  <a
                    href={item.to}
                    onClick={(event) => goToItem(event, item)}
                    aria-current={current ? "true" : undefined}
                    className={cx(
                      "inline-flex min-h-10 items-center rounded-full px-3 text-sm transition-colors",
                      current ? "text-accent" : "text-text-secondary hover:text-text",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ResumeDownload />
          </div>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-border lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(true)}
          >
            <Menu size={18} aria-hidden="true" />
          </button>
        </div>
      </Container>

      {!isDesktop && menuReady ? (
        <Suspense fallback={null}>
          <MobileMenu
            open={open}
            onClose={() => setOpen(false)}
            items={items}
            activeId={getMobileActiveId(location.pathname, isHome, activeId)}
            onNavigate={goToItem}
          />
        </Suspense>
      ) : null}
    </header>
  );
}
