import { useState } from 'react';
import { useScroll, useTransform, useSpring, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Features from './components/Features';
import SandboxSimulator from './components/SandboxSimulator';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import Preloader from './components/Preloader';
import { useScrollReveal } from './lib/useScrollReveal';

/** Cinematic scroll-linked reveal: fades + lifts content as it scrolls out of view. */
function ScrollRevealWrapper({ children, exitY = -60 }: { children: React.ReactNode; exitY?: number }) {
  const { ref, style } = useScrollReveal({ exitY, enterY: 40 });
  return (
    <motion.div ref={ref as React.RefObject<HTMLDivElement>} style={style} className="gpu-composited">
      {children}
    </motion.div>
  );
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();

  // Smoothly shift a subtle radial glow tint as user scrolls with liquid spring damping
  const rawBgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.08, 0.05, 0.12]);
  const rawGlowX = useTransform(scrollYProgress, [0, 1], [30, 70]);
  const rawGlowY = useTransform(scrollYProgress, [0, 1], [20, 80]);

  const bgOpacity = useSpring(rawBgOpacity, { stiffness: 40, damping: 22 });
  const springGlowX = useSpring(rawGlowX, { stiffness: 40, damping: 22 });
  const springGlowY = useSpring(rawGlowY, { stiffness: 40, damping: 22 });

  const glowX = useTransform(springGlowX, x => `${x}%`);
  const glowY = useTransform(springGlowY, y => `${y}%`);

  return (
    <div className="min-h-screen bg-brand-oceanic-noir text-brand-arctic-powder antialiased font-sans relative overflow-x-hidden">
      {/* Cinematic Curtain Preloader */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* Scroll-driven ambient glow blob that drifts */}
      <motion.div
        style={{ opacity: bgOpacity, left: glowX, top: glowY }}
        className="fixed w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-0"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-radial-glow rounded-full blur-3xl" />
      </motion.div>

      {/* Scroll progress bar */}
      <ScrollProgress />

      <Navbar isLoaded={isLoaded} />

      <main className="relative z-10">
        <Hero isLoaded={isLoaded} />
        <ScrollRevealWrapper exitY={-50}><SocialProof /></ScrollRevealWrapper>
        <ScrollRevealWrapper exitY={-65}><Features /></ScrollRevealWrapper>
        <ScrollRevealWrapper exitY={-55}><SandboxSimulator /></ScrollRevealWrapper>
        <ScrollRevealWrapper exitY={-60}><Pricing /></ScrollRevealWrapper>
        <ScrollRevealWrapper exitY={-45}><FAQ /></ScrollRevealWrapper>
      </main>

      <Footer />
    </div>
  );
}

export default App;
