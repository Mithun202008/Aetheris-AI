import { useState, useEffect, Fragment } from 'react';
import { Play, Terminal, Cpu, Database, MessageSquare, Zap, CheckCircle2 } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { stagger, fadeUp, fadeScale } from '../lib/animations';

export default function Hero({ isLoaded = true }: { isLoaded?: boolean }) {
  const [activeStep, setActiveStep] = useState(0);
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  // Parallax: glow drifts upward slightly as user scrolls with liquid spring
  const rawGlowY = useTransform(scrollY, [0, 600], [0, -80]);
  const glowY = useSpring(rawGlowY, { stiffness: 50, damping: 22 });
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.6]);

  const rawHeroScale = useTransform(scrollY, [0, 500], [1, 0.96]);
  const rawHeroRotateX = useTransform(scrollY, [0, 500], [0, 3]);
  const heroScale = prefersReducedMotion ? 1 : useSpring(rawHeroScale, { stiffness: 50, damping: 22 });
  const heroRotateX = prefersReducedMotion ? 0 : useSpring(rawHeroRotateX, { stiffness: 50, damping: 22 });

  const nodes = [
    { id: 1, label: 'GitHub Hook',      icon: Terminal,     desc: 'Repo push event trigger',        color: 'from-brand-nocturnal-expedition to-brand-mystic-mint text-brand-arctic-powder' },
    { id: 2, label: 'Aetheris Planner', icon: Cpu,          desc: 'Task breakdown & LLM reasoning', color: 'from-brand-deep-saffron to-brand-forsythia text-brand-oceanic-noir' },
    { id: 3, label: 'Data Extractor',   icon: Database,     desc: 'Query database schema',          color: 'from-brand-nocturnal-expedition to-brand-deep-saffron text-brand-arctic-powder' },
    { id: 4, label: 'Slack Alert',      icon: MessageSquare,desc: 'Post execution summary',         color: 'from-brand-deep-saffron to-brand-forsythia text-brand-oceanic-noir' },
  ];

  useEffect(() => {
    const t = setInterval(() => setActiveStep(p => (p + 1) % (nodes.length + 1)), 2800);
    return () => clearInterval(t);
  }, [nodes.length]);

  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 bg-grid-pattern overflow-hidden scanlines-overlay">
      {/* Parallax radial glow */}
      <motion.div
        style={{ y: glowY }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none z-0"
      >
        <div className="w-full h-full bg-radial-glow rounded-full blur-3xl" />
      </motion.div>
      {/* Aurora orbs — GTA VI cinematic ambient */}
      <div className="aurora-orb absolute -top-32 -left-32 w-[560px] h-[560px] z-0" />
      <div className="aurora-orb absolute -bottom-24 -right-24 w-[420px] h-[420px] z-0" style={{ animationDelay: '4s' }} />
      <div className="absolute top-16 left-16 w-72 h-72 bg-brand-nocturnal-expedition/20 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-deep-saffron/8 rounded-full blur-3xl pointer-events-none z-0" />

      <motion.div
        style={{ 
          opacity: heroOpacity, 
          scale: heroScale, 
          rotateX: heroRotateX, 
          transformPerspective: 1200 
        }}
        initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.05, rotateX: prefersReducedMotion ? 0 : 8 }}
        animate={isLoaded ? { opacity: 1, scale: 1, rotateX: 0 } : { opacity: 0, scale: prefersReducedMotion ? 1 : 1.05, rotateX: prefersReducedMotion ? 0 : 8 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
      >
        {/* ── Left: Copy ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
          className="lg:col-span-6 flex flex-col items-start text-left"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-brand-deep-saffron/30 text-xs font-mono font-bold text-brand-deep-saffron mb-6"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-forsythia opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-deep-saffron" />
            </span>
            Introducing Aetheris v2.0
          </motion.div>

          {/* Headline with shimmer gradient + blur-reveal */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-arctic-powder leading-[1.08] mb-6 text-reveal text-reveal-delay-1"
          >
            Orchestrate AI Agents.{' '}
            <span className="text-vibrant-rockstar glitch-on-hover">Automate Anything.</span>
          </motion.h1>

          {/* Description */}
          <motion.p variants={fadeUp} className="text-base sm:text-lg text-slate-400 leading-relaxed mb-8 max-w-xl font-sans">
            Deploy networks of autonomous AI agents that integrate directly into your database, codebase, and API pipelines. Design workflows visually and scale effortlessly.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <a
              href="#sandbox"
              className="px-8 py-4 rounded-xl text-center font-bold text-brand-oceanic-noir bg-gradient-to-r from-brand-deep-saffron to-brand-forsythia hover:brightness-110 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-brand-deep-saffron/20"
            >
              Start for Free
            </a>
            <a
              href="#sandbox"
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold glass-panel border-glow-hover text-slate-300 hover:text-white transition-all duration-200 hover:bg-brand-nocturnal-expedition/30"
            >
              <Play className="h-4 w-4 fill-slate-300" />
              Watch Live Demo
            </a>
          </motion.div>

          {/* Trust micro-badges */}
          <motion.div variants={fadeUp}
            className="flex flex-wrap gap-x-6 gap-y-3 mt-10 text-xs font-mono font-semibold text-slate-500 border-t border-white/5 pt-8 w-full"
          >
            {['No credit card required', 'SOC2 Certified', 'Self-hosting option'].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-deep-saffron" />
                {t}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: Live Workflow Simulator ── */}
        <motion.div
          variants={fadeScale}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
          className="lg:col-span-6 relative w-full flex justify-center"
        >
          <div className="absolute inset-0 bg-brand-deep-saffron/5 rounded-3xl blur-2xl pointer-events-none" />

          <div className="w-full max-w-lg gradient-border rounded-2xl overflow-hidden shadow-2xl flex flex-col" style={{ padding: 0 }}>
            {/* Window chrome */}
            <div className="px-5 py-3.5 bg-brand-oceanic-noir/80 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/70" />
                <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
              </div>
              <div className="flex items-center gap-1 text-[10px] uppercase font-mono tracking-widest text-slate-500 font-semibold">
                <Zap className="h-3 w-3 text-brand-deep-saffron fill-brand-deep-saffron" /> Live Orchestration
              </div>
              <span className="text-xs text-slate-500 font-mono">workflow.yaml</span>
            </div>

            {/* Workflow Canvas */}
            <div className="p-6 bg-brand-oceanic-noir/40 relative flex flex-col gap-5 min-h-[380px] justify-center items-center">
              {nodes.map((node, index) => {
                const isActive    = activeStep === index;
                const isCompleted = activeStep > index;
                const NodeIcon    = node.icon;

                return (
                  <Fragment key={node.id}>
                    <motion.div
                      animate={{
                        scale: isActive ? 1.03 : 1,
                        boxShadow: isActive
                          ? '0 0 20px rgba(255,200,1,0.15)'
                          : '0 0 0px rgba(0,0,0,0)',
                      }}
                      transition={{ duration: 0.4 }}
                      className={`relative w-full max-w-[340px] px-5 py-3.5 rounded-xl border flex items-center gap-4 z-10 transition-colors duration-500 ${
                        isActive
                          ? 'bg-brand-nocturnal-expedition border-brand-forsythia/50 neon-border-active'
                          : isCompleted
                          ? 'bg-brand-nocturnal-expedition/30 border-brand-mystic-mint/30'
                          : 'bg-brand-oceanic-noir/30 border-white/5'
                      }`}
                    >
                      <div className={`h-10 w-10 rounded-lg bg-gradient-to-tr ${node.color} flex items-center justify-center shrink-0 shadow-md ${isActive ? 'animate-pulse' : ''}`}>
                        <NodeIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-brand-arctic-powder truncate">{node.label}</h4>
                          {isCompleted
                            ? <span className="text-[10px] font-mono font-bold text-brand-mystic-mint bg-brand-mystic-mint/10 px-1.5 py-0.5 rounded">Success</span>
                            : isActive
                            ? <span className="text-[10px] font-mono font-bold text-brand-deep-saffron bg-brand-deep-saffron/10 px-1.5 py-0.5 rounded animate-pulse">Running</span>
                            : <span className="text-[10px] font-mono text-slate-600">Pending</span>
                          }
                        </div>
                        <p className="text-xs text-slate-500 truncate mt-0.5">{node.desc}</p>
                      </div>
                      {isActive && <div className="absolute inset-0 bg-brand-deep-saffron/5 rounded-xl animate-pulse pointer-events-none" />}
                    </motion.div>

                    {/* Connecting line */}
                    {index < nodes.length - 1 && (
                      <div className="h-5 w-0.5 bg-brand-nocturnal-expedition relative">
                        <motion.div
                          animate={{ height: activeStep > index ? '100%' : '0%' }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          className="absolute top-0 left-0 right-0 w-full rounded-full bg-brand-deep-saffron"
                        />
                      </div>
                    )}
                  </Fragment>
                );
              })}

              {/* Success overlay */}
              {activeStep === nodes.length && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  className="absolute inset-0 m-6 glass-panel border-brand-forsythia/30 bg-brand-nocturnal-expedition/90 flex flex-col items-center justify-center text-center p-6 rounded-xl z-20"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                    className="h-14 w-14 rounded-full bg-brand-forsythia/10 border border-brand-forsythia/30 flex items-center justify-center mb-4 text-brand-forsythia"
                  >
                    <CheckCircle2 className="h-8 w-8" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-brand-arctic-powder mb-1">Workflow Completed</h3>
                  <p className="text-xs text-slate-400 max-w-[240px] mb-4">
                    GitHub deployment verified and metrics reported to Slack in 2.3 seconds.
                  </p>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-mono font-bold text-brand-deep-saffron bg-brand-deep-saffron/10 px-2 py-1 rounded">Latency: 2320ms</span>
                    <span className="text-[10px] font-mono font-bold text-brand-mystic-mint bg-brand-mystic-mint/10 px-2 py-1 rounded">Cost: $0.0042</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
