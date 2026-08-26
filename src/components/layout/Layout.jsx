import { Outlet } from "react-router-dom";
import { SkipLink } from "@/components/common/SkipLink.jsx";
import { Footer } from "@/components/layout/Footer.jsx";
import { Navbar } from "@/components/layout/Navbar.jsx";

export function Layout() {
  return (
    <>
      <SkipLink />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
