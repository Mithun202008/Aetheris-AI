import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Activity, ShieldCheck, Zap } from 'lucide-react';
import { stagger, fadeUp } from '../lib/animations';

function useCounter(target: number, isInView: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);
  return count;
}

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, amount: 0.3 });

  const logos = [
    { name: 'NovaTech',  icon: Sparkles,   color: 'text-brand-deep-saffron' },
    { name: 'spectra.io',icon: ShieldCheck, color: 'text-brand-mystic-mint'  },
    { name: 'Zenith AI', icon: Activity,   color: 'text-brand-forsythia'    },
    { name: 'Vertex',    icon: Zap,        color: 'text-brand-deep-saffron' },
  ];

  const stats = [
    { rawVal: 18,   suffix: 'M+', label: 'Daily workflow cycles',   description: 'Real-time task executions across global nodes.'     },
    { rawVal: 9999, suffix: '%',  label: 'Orchestration Uptime',    description: 'High-availability infra with instant failover.'     },
    { rawVal: 42,   suffix: 'x',  label: 'Avg productivity boost',  description: 'Reported by operational and engineering teams.'     },
    { rawVal: 45,   suffix: 'ms', label: 'Engine trigger latency',  description: 'Fast serverless task distribution worldwide.'       },
  ];

  function StatCard({ stat, idx }: { stat: typeof stats[0]; idx: number }) {
    const ref    = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
    const counted = useCounter(stat.rawVal, inView, 1600 + idx * 100);

    const display =
      stat.label === 'Engine trigger latency' ? `< ${counted}${stat.suffix}` :
      stat.label === 'Orchestration Uptime'   ? `99.99${stat.suffix}` :
      `${counted}${stat.suffix}`;

    return (
      <motion.div ref={ref} variants={fadeUp} className="glass-card p-6 rounded-2xl flex flex-col text-left group border-glow-hover">
        <span className="text-3xl font-mono font-extrabold stat-neon group-hover:drop-shadow-[0_0_12px_rgba(255,46,147,0.5)] transition-all duration-700">
          {display}
        </span>
        <span className="text-sm font-bold text-brand-mystic-mint mt-2 mb-1">{stat.label}</span>
        <span className="text-xs text-slate-400 leading-relaxed">{stat.description}</span>
      </motion.div>
    );
  }

  return (
    <section ref={sectionRef} className="relative py-4 bg-brand-oceanic-noir/60 overflow-hidden">
      <div className="section-divider" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 py-14">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'tween', duration: 0.6, ease: 'easeOut' }}
          className="text-center text-xs uppercase tracking-widest font-mono font-bold text-vibrant-rockstar mb-10"
        >
          Empowering workflows at modern software teams
        </motion.p>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center mb-16 opacity-75"
        >
          {logos.map((logo) => {
            const LogoIcon = logo.icon;
            return (
              <motion.div
                key={logo.name}
                variants={fadeUp}
                className="flex items-center gap-2 text-slate-400 hover:text-brand-arctic-powder hover:opacity-100 transition-all duration-300 group cursor-default"
              >
                <div className={`h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${logo.color}`}>
                  <LogoIcon className="h-4 w-4" />
                </div>
                <span className="font-bold tracking-wider text-sm font-mono">{logo.name}</span>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, idx) => (
            <StatCard key={stat.label} stat={stat} idx={idx} />
          ))}
        </motion.div>
      </div>
      <div className="section-divider" />
    </section>
  );
}
