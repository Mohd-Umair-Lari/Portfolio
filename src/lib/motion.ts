import type { Transition, Variants } from "framer-motion";

/** Single source of truth for every animation on the site. */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const DURATION = 0.7;
export const STAGGER = 0.08;
export const OFFSET = 20;

export const baseTransition: Transition = { duration: DURATION, ease: EASE };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: OFFSET },
  show: { opacity: 1, y: 0, transition: baseTransition },
};

export const staggerContainer = (delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: STAGGER, delayChildren } },
});
