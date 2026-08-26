import { IconButton } from "@/components/common/IconButton.jsx";
import {
  FacebookIcon,
  FiverrIcon,
  GithubIcon,
  GlobeIcon,
  IndeedIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  UpworkIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "@/components/common/SocialIcons.jsx";
import { cx } from "@/utils/helpers.js";

const ICONS = {
  linkedin: LinkedinIcon,
  github: GithubIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  youtube: YoutubeIcon,
  upwork: UpworkIcon,
  fiverr: FiverrIcon,
  whatsapp: WhatsappIcon,
  indeed: IndeedIcon,
  external: GlobeIcon,
};

const BRAND = {
  linkedin: "text-[#0A66C2]",
  github: "text-text",
  facebook: "text-[#1877F2]",
  instagram: "text-[#E4405F]",
  twitter: "text-text",
  youtube: "text-[#FF0000]",
  upwork: "text-[#14A800]",
  fiverr: "text-[#1DBF73]",
  whatsapp: "text-[#25D366]",
  indeed: "text-[#003A9B]",
  external: "text-text-secondary",
};

function displayUrl(url) {
  try {
    const parsed = new URL(url);
    return `${parsed.host}${parsed.pathname === "/" ? "" : parsed.pathname}`.replace(/\/$/, "");
  } catch {
    return url;
  }
}

export function SocialLink({
  link,
  variant = "icon",
  className,
}) {
  const Icon = ICONS[link.icon] || GlobeIcon;
  const brand = BRAND[link.icon] || BRAND.external;
  const label =
    link.icon === "whatsapp"
      ? `Chat on WhatsApp (${link.username})`
      : `Visit ${link.platform} profile${link.username && !link.username.startsWith("[") ? ` (${link.username})` : ""}`;

  if (variant === "row") {
    return (
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cx(
          "group flex min-h-14 items-center justify-between gap-4 rounded-2xl border border-border bg-surface px-4 py-3 transition-colors hover:border-accent",
          className,
        )}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border">
            <Icon size={18} className={brand} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-medium text-text">{link.platform}</span>
            <span className="block truncate text-xs text-text-muted">{displayUrl(link.url)}</span>
          </span>
        </span>
        <span className="shrink-0 text-xs text-text-muted group-hover:text-accent">Visit</span>
      </a>
    );
  }

  return (
    <IconButton
      as="a"
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      label={label}
      className={className}
    >
      <Icon size={18} className={brand} aria-hidden="true" />
    </IconButton>
  );
}

export function SocialLinks({ links, variant = "icon", columns = 2, className }) {
  if (!links?.length) return null;

  return (
    <ul
      className={cx(
        variant === "row"
          ? cx("grid gap-3", columns === 1 ? "grid-cols-1" : "sm:grid-cols-2")
          : "flex flex-wrap gap-2.5",
        className,
      )}
    >
      {links.map((link) => (
        <li key={link.id}>
          <SocialLink link={link} variant={variant} />
        </li>
      ))}
    </ul>
  );
}
