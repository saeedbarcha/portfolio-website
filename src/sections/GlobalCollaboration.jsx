import { motion } from "framer-motion";
import { Container } from "@/components/common/Container.jsx";
import { collaborationContent, collaborationCountries } from "@/data/collaboration.js";
import { useReducedMotion } from "@/hooks/useReducedMotion.js";
import { MOTION } from "@/utils/constants.js";
import { cx } from "@/utils/helpers.js";

const listTransition = {
  duration: 0.4,
  ease: MOTION.ease,
};

export function GlobalCollaboration({ className }) {
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="global-collaboration-heading"
      className={cx("border-b border-border bg-bg-secondary py-12 sm:py-16", className)}
    >
      <Container>
        <motion.p
          id="global-collaboration-heading"
          className="eyebrow"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, ease: MOTION.ease }}
        >
          {collaborationContent.eyebrow}
        </motion.p>
        <motion.p
          className="mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, ease: MOTION.ease, delay: reduced ? 0 : 0.08 }}
        >
          {collaborationContent.description}
        </motion.p>
        <ul className="mt-7 flex max-w-full flex-wrap gap-2.5">
          {collaborationCountries.map((country, index) => (
            <motion.li
              key={country.code}
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-transparent px-4 py-2 text-sm text-text transition-colors duration-300 hover:border-border-strong hover:bg-surface"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                ...listTransition,
                delay: reduced ? 0 : 0.12 + index * 0.04,
              }}
            >
              <span
                aria-hidden="true"
                className="inline-block shrink-0 translate-y-px text-[1.05em] leading-none"
                style={{ fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif' }}
              >
                {country.flag}
              </span>
              <span className="whitespace-nowrap">{country.name}</span>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
