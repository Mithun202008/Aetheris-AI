import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface ScrollAnimationOptions {
  once?: boolean;
  amount?: number | 'some' | 'all';
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: options.once ?? true,
    amount: options.amount ?? 0.2,
  });

  return { ref, isInView };
}
