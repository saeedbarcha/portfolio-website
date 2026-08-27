import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { ResumeDownload } from "@/components/common/ResumeDownload.jsx";
import { personalInfo } from "@/data/personal.js";
import { useFocusTrap } from "@/hooks/useFocusTrap.js";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock.js";
import { useReducedMotion } from "@/hooks/useReducedMotion.js";
import { useCallback, useRef } from "react";
import { cx } from "@/utils/helpers.js";

export function MobileMenu({ open, onClose, items, activeId, onNavigate }) {
  const panelRef = useRef(null);
  const reduced = useReducedMotion();
  const handleClose = useCallback(() => onClose?.(), [onClose]);

  useBodyScrollLock(open);
  useFocusTrap(open, panelRef, handleClose);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 flex h-dvh w-full flex-col bg-bg px-6 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] lg:hidden"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8 flex items-center justify-between">
            <span className="flex min-w-0 items-center gap-3">
              <img
                src={personalInfo.photo}
                alt=""
                width={40}
                height={40}
                className="size-10 rounded-full object-cover object-top"
              />
              <span className="font-display truncate text-sm font-semibold">{personalInfo.name}</span>
            </span>
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-bg"
              aria-label="Close menu"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile" className="min-h-0 flex-1 overflow-y-auto">
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
          <div className="shrink-0 border-t border-border pt-6">
            <ResumeDownload variant="stack" />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
