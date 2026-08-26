import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToId } from "@/utils/helpers.js";

export function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      return scrollToId(location.hash.replace("#", ""));
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" in window ? "instant" : "auto" });
    return undefined;
  }, [location.pathname, location.hash]);

  return null;
}
