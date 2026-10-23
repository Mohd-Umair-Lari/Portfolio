import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { DURATION, EASE, OFFSET, STAGGER } from "@/lib/motion";

/** Scroll-triggered fade-up. `index` staggers siblings with the shared timing. */
export function Reveal({
  children,
  index = 0,
  className,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: OFFSET }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: DURATION, delay: index * STAGGER, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
