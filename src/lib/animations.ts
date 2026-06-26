import type { Variants } from 'framer-motion';

export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'tween', duration: 0.95, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: 'tween', duration: 0.95, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: 'tween', duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: 'tween', duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};
