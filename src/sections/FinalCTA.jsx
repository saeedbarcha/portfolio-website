import { CTA } from "@/components/common/CTA.jsx";
import { ctaContent } from "@/data/personal.js";
import { isSectionEnabled } from "@/utils/content.js";

export function FinalCTA() {
  if (!isSectionEnabled("cta")) return null;

  return (
    <CTA
      heading={ctaContent.heading}
      body={ctaContent.body}
      primary={ctaContent.primary}
      secondary={ctaContent.secondary}
    />
  );
}
