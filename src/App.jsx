import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout/Layout.jsx";
import { ScrollManager } from "@/components/layout/ScrollManager.jsx";
import { HomePage } from "@/pages/HomePage.jsx";

const AboutPage = lazy(() =>
  import("@/pages/AboutPage.jsx").then((module) => ({ default: module.AboutPage })),
);
const WorkPage = lazy(() =>
  import("@/pages/WorkPage.jsx").then((module) => ({ default: module.WorkPage })),
);
const CaseStudyPage = lazy(() =>
  import("@/pages/CaseStudyPage.jsx").then((module) => ({ default: module.CaseStudyPage })),
);
const ReviewsPage = lazy(() =>
  import("@/pages/ReviewsPage.jsx").then((module) => ({ default: module.ReviewsPage })),
);
const SkillsIndexPage = lazy(() =>
  import("@/pages/SkillsIndexPage.jsx").then((module) => ({ default: module.SkillsIndexPage })),
);
const SkillPage = lazy(() =>
  import("@/pages/SkillPage.jsx").then((module) => ({ default: module.SkillPage })),
);
const NotFoundPage = lazy(() =>
  import("@/pages/NotFoundPage.jsx").then((module) => ({ default: module.NotFoundPage })),
);

function RouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-sm text-text-muted" role="status">
      Loading…
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="work" element={<WorkPage />} />
            <Route path="work/:slug" element={<CaseStudyPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="skills" element={<SkillsIndexPage />} />
            <Route path="skills/:slug" element={<SkillPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
