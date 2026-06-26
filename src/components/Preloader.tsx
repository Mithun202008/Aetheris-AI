import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading');

  useEffect(() => {
    // Phase 1: loading / logo scanning sequence (1.5s)
    const t1 = setTimeout(() => {
      setPhase('reveal');
    }, 1500);

    // Phase 2: reveal wipe completes (0.9s duration, total 2.4s)
    const t2 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setPhase('done');
    onComplete();
  };

  if (phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden select-none pointer-events-auto bg-transparent">
      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-[10000] px-4.5 py-2.5 text-[10px] font-mono font-bold tracking-[0.2em] text-slate-500 hover:text-brand-forsythia border border-white/5 hover:border-brand-forsythia/30 bg-brand-oceanic-noir/50 backdrop-blur-md rounded-xl transition-all duration-300 active:scale-95 cursor-pointer"
      >
        SKIP INTRO
      </button>

      {/* Dual split-panel curtains */}
      <div className="absolute inset-0 flex w-full h-full pointer-events-none">
        {/* Left Curtain */}
        <motion.div
          initial={{ x: 0 }}
          animate={phase === 'reveal' ? { x: '-100%' } : { x: 0 }}
          transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1] }}
          className="w-1/2 h-full bg-[#071319] border-r border-brand-deep-saffron/10 relative pointer-events-auto flex items-center justify-end"
        >
          {/* Edge Glow Line */}
          <div className="absolute top-0 right-0 w-[1.5px] h-full bg-gradient-to-b from-brand-deep-saffron via-brand-forsythia to-transparent shadow-[0_0_15px_#FF9932,0_0_30px_#FFC801] opacity-75" />
        </motion.div>

        {/* Right Curtain */}
        <motion.div
          initial={{ x: 0 }}
          animate={phase === 'reveal' ? { x: '100%' } : { x: 0 }}
          transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1] }}
          className="w-1/2 h-full bg-[#071319] border-l border-brand-deep-saffron/10 relative pointer-events-auto flex items-center justify-start"
        >
          {/* Edge Glow Line */}
          <div className="absolute top-0 left-0 w-[1.5px] h-full bg-gradient-to-b from-brand-deep-saffron via-brand-forsythia to-transparent shadow-[0_0_15px_#FF9932,0_0_30px_#FFC801] opacity-75" />
        </motion.div>
      </div>

      {/* Intro Logo & Scanning Elements (Center Overlay) */}
      <AnimatePresence>
        {phase === 'loading' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.94, filter: 'blur(12px)' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute inset-0 flex flex-col items-center justify-center z-[100] pointer-events-none"
          >
            {/* Ambient Background Aura Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-deep-saffron/5 rounded-full blur-3xl pointer-events-none" />

            {/* Scanning Laser Line */}
            <motion.div
              initial={{ top: '-5%' }}
              animate={{ top: '105%' }}
              transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
              className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-deep-saffron to-transparent shadow-[0_0_10px_#FF9932,0_0_20px_#FFC801] pointer-events-none"
            />

            {/* Glowing Icon container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 h-14 w-14 rounded-2xl bg-gradient-to-tr from-brand-deep-saffron to-brand-forsythia flex items-center justify-center shadow-xl shadow-brand-deep-saffron/15 relative"
            >
              <Terminal className="h-6 w-6 text-brand-oceanic-noir" />
              <div className="absolute -inset-2 rounded-[20px] border border-brand-deep-saffron/20 animate-ping opacity-60" />
            </motion.div>

            {/* Logo letters reveal */}
            <div className="flex gap-2">
              {"AETHERIS".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    delay: 0.25 + index * 0.07,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-4xl sm:text-5xl font-extrabold font-mono tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-brand-arctic-powder via-brand-forsythia to-brand-arctic-powder text-shimmer"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Subtle sub text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0.4, 0.8, 0.6] }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-4 text-[10px] font-mono tracking-[0.25em] uppercase text-brand-mystic-mint/70"
            >
              Initializing Agent Networks...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
