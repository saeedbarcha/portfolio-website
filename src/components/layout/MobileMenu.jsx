import { AnimatePresence, motion } from "framer-motion";
import { Download, X } from "lucide-react";
import { Button } from "@/components/common/Button.jsx";
import { personalInfo } from "@/data/personal.js";
import { useFocusTrap } from "@/hooks/useFocusTrap.js";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock.js";
import { useReducedMotion } from "@/hooks/useReducedMotion.js";
import { useCallback, useRef } from "react";
import { cx } from "@/utils/helpers.js";

export function MobileMenu({ open, onClose, items, activeId, onNavigate, resumeHref }) {
  const panelRef = useRef(null);
  const reduced = useReducedMotion();
  const handleClose = useCallback(() => onClose?.(), [onClose]);

  useBodyScrollLock(open);
  useFocusTrap(open, panelRef, handleClose);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-40 lg:hidden"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            aria-label="Close menu"
            onClick={handleClose}
          />
          <motion.div
            ref={panelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="absolute inset-y-0 right-0 flex w-[min(100%,24rem)] flex-col border-l border-border bg-bg px-5 py-6 shadow-soft"
            initial={reduced ? false : { x: 24 }}
            animate={{ x: 0 }}
            exit={reduced ? { x: 0 } : { x: 24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="flex items-center gap-3">
                <img
                  src={personalInfo.photo}
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 rounded-full object-cover object-top"
                />
                <span className="font-display text-sm font-semibold">{personalInfo.name}</span>
              </span>
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex size-11 items-center justify-center rounded-full border border-border"
                aria-label="Close menu"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {items.map((item) => {
                  const current = activeId === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={item.to}
                        aria-current={current ? "true" : undefined}
                        onClick={(event) => onNavigate(event, item)}
                        className={cx(
                          "flex min-h-12 items-center rounded-xl px-3 text-lg",
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
            <div className="mt-auto pt-8">
              <Button as="a" href={resumeHref} className="w-full" download>
                <Download size={16} aria-hidden="true" />
                Download Resume
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
