import { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { stagger, fadeUp } from '../lib/animations';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Which LLMs and models are supported by default?',
      a: 'Aetheris connects with OpenAI (GPT-4o), Anthropic (Claude 3.5 Sonnet), Google Gemini Pro, and open-source models like Llama 3 via local servers (Ollama, vLLM). You can toggle between these providers inside individual workflow configuration schemas.',
    },
    {
      q: 'How are my database and API credentials secured?',
      a: 'All database connection strings and client keys are stored in encrypted vaults secured by hardware modules. Our task agent workers only access these credentials inside secure, isolated execution containers that expire immediately after the task runs.',
    },
    {
      q: 'Can I self-host Aetheris inside my own cloud subnet?',
      a: 'Yes. Enterprise subscribers have full access to our Kubernetes Helm charts and Docker compose configurations. Self-hosted instances run completely offline and comply with internal data perimeter requirements.',
    },
    {
      q: 'What happens if a third-party API tool fails during an execution step?',
      a: 'Aetheris features native self-healing parameters. If a request returns an error, the agent can retry with exponential backoff, swap model parameters, or execute designated fallback pipelines (e.g., alert the developer or log to cache) automatically.',
    },
    {
      q: 'Is there a limit on monthly task runtime durations?',
      a: 'Developer accounts support step execution limits of up to 2 minutes. Professional tiers scale that limit to 15 minutes per single runner, while Enterprise setups accommodate long-running agent listeners with persistent states.',
    },
  ];

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section ref={sectionRef} id="faqs" className="relative py-24 bg-brand-oceanic-noir border-b border-white/5 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16,1,0.3,1] }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold tracking-wider font-mono text-vibrant-rockstar uppercase mb-3">
            Got Questions?
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-brand-arctic-powder tracking-tight leading-tight">
            Frequently Asked Questions
          </p>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="flex flex-col gap-4 font-sans"
        >
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                variants={fadeUp}
                className={`glass-panel rounded-2xl border transition-all duration-300 ${
                  isOpen ? 'border-brand-forsythia/30 bg-brand-nocturnal-expedition/25 neon-border-active' : 'border-white/5'
                }`}
              >
                {/* FAQ Question Button */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none min-h-[44px] cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-brand-arctic-powder text-sm md:text-base pr-4 font-mono">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-4.5 w-4.5 shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'rotate-180 text-brand-forsythia drop-shadow-[0_0_8px_rgba(255,200,1,0.8)]'
                        : 'rotate-0 text-slate-500'
                    }`}
                  />
                </button>

                {/* FAQ Answer Animation */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-slate-400 leading-relaxed border-t border-white/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
