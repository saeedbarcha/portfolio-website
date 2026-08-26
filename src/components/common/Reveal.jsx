import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion.js";
import { MOTION } from "@/utils/constants.js";
import { cx } from "@/utils/helpers.js";

const motionTags = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
  section: motion.section,
};

export function Reveal({ children, className, delay = 0, as = "div" }) {
  const reduced = useReducedMotion();
  const Component = as;
  const MotionComponent = motionTags[as] || motion.div;

  if (reduced) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <MotionComponent
      className={cx(className)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px", amount: 0.14 }}
      transition={{ duration: MOTION.duration, ease: MOTION.ease, delay }}
    >
      {children}
    </MotionComponent>
  );
}
