import { useEffect } from "react";
import { FOCUSABLE_SELECTOR } from "@/utils/constants.js";

export function useFocusTrap(active, containerRef, onEscape) {
  useEffect(() => {
    if (!active || !containerRef.current) return undefined;

    const container = containerRef.current;
    const previouslyFocused = document.activeElement;
    const focusables = () =>
      Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        (node) => !node.hasAttribute("disabled") && node.getAttribute("aria-hidden") !== "true",
      );

    const first = focusables()[0];
    first?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onEscape?.();
        return;
      }

      if (event.key !== "Tab") return;

      const nodes = focusables();
      if (!nodes.length) {
        event.preventDefault();
        return;
      }

      const firstNode = nodes[0];
      const lastNode = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === firstNode) {
        event.preventDefault();
        lastNode.focus();
      } else if (!event.shiftKey && document.activeElement === lastNode) {
        event.preventDefault();
        firstNode.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [active, containerRef, onEscape]);
}
