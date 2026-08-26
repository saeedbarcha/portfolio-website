import { useCallback, useId, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock.js";
import { useFocusTrap } from "@/hooks/useFocusTrap.js";
import { useReducedMotion } from "@/hooks/useReducedMotion.js";
import { IconButton } from "@/components/common/IconButton.jsx";

export function Modal({ open, onClose, title, children, labelledBy }) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const reduced = useReducedMotion();
  const handleClose = useCallback(() => onClose?.(), [onClose]);

  useBodyScrollLock(open);
  useFocusTrap(open, dialogRef, handleClose);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? { opacity: 1 } : { opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-black/70"
            onClick={handleClose}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy || titleId}
            className="relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-border bg-bg-secondary p-5 shadow-soft sm:max-w-3xl sm:rounded-3xl sm:p-6"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              {title ? (
                <h2 id={titleId} className="font-display text-xl font-semibold">
                  {title}
                </h2>
              ) : (
                <span id={titleId} className="sr-only">
                  Dialog
                </span>
              )}
              <IconButton label="Close dialog" onClick={handleClose} className="shrink-0">
                <X size={18} aria-hidden="true" />
              </IconButton>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
