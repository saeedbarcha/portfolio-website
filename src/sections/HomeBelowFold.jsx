import { ClientReviews } from "@/sections/ClientReviews.jsx";
import { Contact } from "@/sections/Contact.jsx";
import { HirePaths } from "@/sections/HirePaths.jsx";
import { Positioning } from "@/sections/Positioning.jsx";
import { Projects } from "@/sections/Projects.jsx";
import { getConfiguredTestimonials } from "@/utils/content.js";

export function HomeBelowFold() {
  const hasReviews = getConfiguredTestimonials().length > 0;

  return (
    <>
      <Positioning />
      <Projects />
      {hasReviews ? <ClientReviews /> : null}
      <HirePaths />
      <Contact />
    </>
  );
}
