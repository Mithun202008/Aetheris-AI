import { useRef } from 'react';
import { useScroll, useTransform, useSpring, useReducedMotion, type MotionStyle } from 'framer-motion';

interface ScrollRevealOptions {
  /** How far past the top the exit fade completes. 0.35 = 35% of section height scrolled out. */
  exitAt?: number;
  /** Y offset (px) to drift upward on exit. */
  exitY?: number;
  /** Y offset (px) to start from on enter. */
  enterY?: number;
}

const springConfig = { stiffness: 80, damping: 24, mass: 0.6 };

export function useScrollReveal(opts: ScrollRevealOptions = {}): {
  ref: React.RefObject<HTMLElement | null>;
  style: MotionStyle;
} {
  const { exitAt = 0.38, exitY = -60, enterY = 40 } = opts;
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'], // full lifecycle: enter bottom → exit top
  });

  // Fade IN: 0→0.10 of scroll progress (section entering from bottom)
  // Stable: 0.10→0.62
  // Fade OUT: 0.62→(0.62+exitAt) (section scrolling out upward)
  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.10, 0.62, 0.62 + exitAt],
    [0, 1, 1, 0]
  );

  // Y: slides in from below, then drifts up and vanishes
  const rawY = useTransform(
    scrollYProgress,
    [0, 0.10, 0.62, 0.62 + exitAt],
    [enterY, 0, 0, exitY]
  );

  // Scale: dynamic zoom reveal
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.10, 0.62, 0.62 + exitAt],
    [0.97, 1, 1, 0.97]
  );

  // RotateX: 3D rotation tilt
  const rawRotateX = useTransform(
    scrollYProgress,
    [0, 0.10, 0.62, 0.62 + exitAt],
    [2, 0, 0, -2]
  );

  // Apply spring damping to smooth out mouse wheel ticks
  const opacity = useSpring(rawOpacity, springConfig);
  const y = prefersReducedMotion ? 0 : useSpring(rawY, springConfig);
  const scale = prefersReducedMotion ? 1 : useSpring(rawScale, springConfig);
  const rotateX = prefersReducedMotion ? 0 : useSpring(rawRotateX, springConfig);
  const transformPerspective = prefersReducedMotion ? undefined : 1200;

  return {
    ref,
    style: {
      opacity,
      y,
      scale,
      rotateX,
      transformPerspective,
    },
  };
}

/**
 * useScrollRevealFast — for smaller sections (stats, logos, etc.)
 * Enters faster and exits faster.
 */
export function useScrollRevealFast(opts: ScrollRevealOptions = {}): {
  ref: React.RefObject<HTMLElement | null>;
  style: MotionStyle;
} {
  const { exitAt = 0.3, exitY = -40, enterY = 28 } = opts;
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.65, 0.65 + exitAt],
    [0, 1, 1, 0]
  );

  const rawY = useTransform(
    scrollYProgress,
    [0, 0.08, 0.65, 0.65 + exitAt],
    [enterY, 0, 0, exitY]
  );

  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.08, 0.65, 0.65 + exitAt],
    [0.98, 1, 1, 0.98]
  );

  const rawRotateX = useTransform(
    scrollYProgress,
    [0, 0.08, 0.65, 0.65 + exitAt],
    [1.5, 0, 0, -1.5]
  );

  const opacity = useSpring(rawOpacity, springConfig);
  const y = prefersReducedMotion ? 0 : useSpring(rawY, springConfig);
  const scale = prefersReducedMotion ? 1 : useSpring(rawScale, springConfig);
  const rotateX = prefersReducedMotion ? 0 : useSpring(rawRotateX, springConfig);
  const transformPerspective = prefersReducedMotion ? undefined : 1200;

  return {
    ref,
    style: {
      opacity,
      y,
      scale,
      rotateX,
      transformPerspective,
    },
  };
}
