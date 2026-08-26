import { useMediaQuery } from "@/hooks/useMediaQuery.js";

export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
