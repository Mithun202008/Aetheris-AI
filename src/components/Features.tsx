import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ─── Inline SVG Icons from Local SVGs Folder ─────────────────────────────────

function CubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8.372 1.349a.75.75 0 0 0-.744 0l-4.81 2.748L8 7.131l5.182-3.034zM14 5.357L8.75 8.43v6.005l4.872-2.784A.75.75 0 0 0 14 11zm-6.75 9.078V8.43L2 5.357V11c0 .27.144.518.378.651z" />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037a.75.75 0 0 1-.646 1.353a5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353a5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037a.75.75 0 0 1-.354-1Z" clipRule="evenodd" />
    </svg>
  );
}

function ChartPieIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
      <path d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
    </svg>
  );
}

function ArrowPathIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  );
}

function CogIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93c.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204c.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78c-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107c-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93c-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204c-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78c.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107c.397-.165.71-.505.78-.929l.15-.894Z" />
      <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m19.5 8.25l-7.5 7.5l-7.5-7.5" />
    </svg>
  );
}

// ─── Bento Grid Features Config ──────────────────────────────────────────────

interface BentoNode {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  points?: string[];
  previewCode: string;
  IconComponent: React.ComponentType<{ className?: string }>;
  gridClass: string;
}

export default function Features() {
  // PERSISTED STATE: Saved in localStorage
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    const saved = localStorage.getItem('aetheris-active-feature-index');
    if (saved !== null) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed < 5) {
        return parsed;
      }
    }
    return 0; // Default open index
  });

  const handleActiveIndexChange = (index: number) => {
    setActiveIndex(index);
    localStorage.setItem('aetheris-active-feature-index', index.toString());
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const nodes: BentoNode[] = [
    {
      id: 0,
      title: 'Agentic Engine',
      subtitle: 'Autonomous Reasoning Loops',
      IconComponent: CubeIcon,
      description: 'Orchestrate agents equipped with short-term context windows, database query privileges, and tool selection memory logs.',
      points: [
        'Multi-model fallback logic (OpenAI, Anthropic, Gemini, Local).',
        'State persistence across disconnected agent steps.',
        'Adaptive self-correction loops when API calls fail.',
      ],
      previewCode: `name: agent_billing_analyst
type: agentic_worker
model: gemini-1.5-pro
memory: redis_cache
tools:
  - postgres_query_reader
  - stripe_api_client
rules:
  - limit_db_rows: 100`,
      gridClass: 'md:col-span-2 md:row-span-1',
    },
    {
      id: 1,
      title: 'Integration Layer',
      subtitle: 'Zero-Config Connective Pipelines',
      IconComponent: LinkIcon,
      description: 'Hook your custom codebase directly into Aetheris using automatic schema generation or standard REST/GraphQL protocols.',
      points: [
        'Auto-generate TypeScript SDKs directly from active schemas.',
        'OAuth credential encryption vaults natively secured.',
        'Webhooks featuring automated exponential-backoff retries.',
      ],
      previewCode: `import { AetherisClient } from '@aetheris/sdk';

const aether = new AetherisClient({
  apiKey: process.env.AETHERIS_KEY
});

aether.registerTool('fetchInventory', async () => {
  return await db.inventory.findMany();
});

await aether.start();`,
      gridClass: 'md:col-span-1 md:row-span-1',
    },
    {
      id: 2,
      title: 'Trace Analytics',
      subtitle: 'Observability Debug Consoles',
      IconComponent: ChartPieIcon,
      description: 'Inspect exact prompt inputs, tool calls, token usage metrics, and node execution latencies in real time.',
      points: [
        'Interactive timeline tracing similar to OpenTelemetry.',
        'Filter runs by status, token costs, or specific step names.',
        'Replay historical pipeline runs with identical environment values.',
      ],
      previewCode: `[16:20:10] Running step 'fetchInventory'
[16:20:10] -> DB query returned 142 items
[16:20:11] LLM Output: "Identified 4 warnings"
[16:20:12] Cost: 1024 tokens | Uptime: 204ms
[16:20:12] Alert pushed to #sales-team`,
      gridClass: 'md:col-span-1 md:row-span-1',
    },
    {
      id: 3,
      title: 'GitOps Sync',
      subtitle: 'Configuration via Git',
      IconComponent: ArrowPathIcon,
      description: 'Manage your agent configuration code in git and auto-deploy changes. Enable declarative pipelines with full revision histories.',
      points: [
        'Declarative YAML workflow specifications.',
        'Automated PR previews and dry-run syntax checks.',
        'Instant rollbacks to any previous commit state.',
      ],
      previewCode: `version: "1.0"
pipeline:
  name: production-sync
  on:
    push: [main]
  jobs:
    deploy:
      runs-on: aetheris-cloud`,
      gridClass: 'md:col-span-1 md:row-span-1',
    },
    {
      id: 4,
      title: 'Encrypted Vault',
      subtitle: 'Hardware Shield Protection',
      IconComponent: CogIcon,
      description: 'Secure API keys, SSH keys, database credentials, and third-party endpoints. Strictly enforce budget limitations and security overrides.',
      points: [
        'Hardware-bound AES-256-GCM credentials.',
        'Strict budget rules: block LLM runs if limit exceeded.',
        'Auto-redact passwords and tokens from prompt logs.',
      ],
      previewCode: `{
  "vault_status": "LOCKED",
  "kms_key_arn": "arn:aws:kms:us-east-1:keys",
  "budget_guard": {
    "max_monthly_usd": 500,
    "alert_threshold": 0.85
  }
}`,
      gridClass: 'md:col-span-1 md:row-span-1',
    },
  ];

  // CONTEXT LOCK CONSTRAINT: Watch screen size and smoothly transition index over
  useEffect(() => {
    const handleResize = () => {
      const mobileNow = window.innerWidth < 768;

      if (mobileNow && !isMobile) {
        // Desktop -> Mobile Transition!
        setIsMobile(true);

        // Slide down the corresponding mobile panel smoothly via Web Animations API (WAAPI)
        requestAnimationFrame(() => {
          const panel = document.getElementById(`accordion-content-${activeIndex}`);
          if (panel) {
            // Temporarily disable CSS transitions to avoid conflicts
            panel.style.transition = 'none';
            // WAAPI animation
            panel.animate([
              { maxHeight: '0px', opacity: 0 },
              { maxHeight: '800px', opacity: 1 }
            ], {
              duration: 500,
              easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
            }).onfinish = () => {
              panel.style.transition = '';
            };
          }
        });
      } else if (!mobileNow && isMobile) {
        // Mobile -> Desktop Transition!
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, activeIndex]);

  return (
    <section ref={sectionRef} id="features" className="relative py-24 bg-brand-oceanic-noir border-b border-white/5 overflow-hidden">
      {/* Background radial overlays */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-nocturnal-expedition/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-brand-deep-saffron/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-sm font-semibold tracking-wider font-mono text-brand-deep-saffron uppercase mb-3">
            Technical Showcase
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold text-vibrant-rockstar tracking-tight leading-tight">
            Engineered for Autonomous Reliability
          </p>
          <p className="text-base text-slate-400 mt-4 leading-relaxed font-sans">
            Aetheris provides the backend orchestration, visual builder canvas, and security layers required to deploy multi-agent LLM systems into production.
          </p>
        </motion.div>

        {/* ─── DESKTOP BENTO GRID VIEW ─── */}
        <div className="hidden md:grid grid-cols-3 gap-6 items-stretch select-none">
          {nodes.map((node) => {
            const isHovered = activeIndex === node.id;
            return (
              <div
                key={node.id}
                onMouseEnter={() => handleActiveIndexChange(node.id)}
                className={`glass-card p-6 md:p-8 rounded-2xl flex flex-col text-left group border cursor-pointer relative overflow-hidden transition-all duration-500 ${node.gridClass} ${
                  isHovered
                    ? 'scale-[1.01] glow-card-rockstar'
                    : 'border-white/5 bg-brand-oceanic-noir/20'
                }`}
              >
                {/* Glow backdrop inside node on hover */}
                <div
                  className={`absolute inset-0 bg-radial-glow transition-opacity duration-500 pointer-events-none z-0 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    {/* Header bar */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 ${
                        isHovered ? 'text-brand-forsythia border-brand-forsythia/30' : 'text-slate-400'
                      }`}>
                        <node.IconComponent className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 font-bold bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                        0{node.id + 1}
                      </span>
                    </div>

                    <span className="text-[10px] font-semibold tracking-wider font-mono text-brand-deep-saffron uppercase block mb-1">
                      {node.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-brand-arctic-powder mb-3 font-mono group-hover:text-brand-forsythia transition-colors duration-300">
                      {node.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans mb-6 max-w-xl">
                      {node.description}
                    </p>
                  </div>

                  {/* Desktop Preview Details Area */}
                  {node.id === 0 ? (
                    <div className="grid grid-cols-2 gap-6 items-stretch w-full mt-2">
                      <ul className="flex flex-col gap-3 font-sans justify-center">
                        {node.points && node.points.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                            <span className="h-5 w-5 rounded-full bg-brand-deep-saffron/10 border border-brand-deep-saffron/20 flex items-center justify-center shrink-0 text-brand-deep-saffron font-bold font-mono text-[10px] mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="w-full glass-card border-white/5 rounded-xl overflow-hidden shadow-xl flex flex-col">
                        <div className="px-4 py-2 bg-brand-oceanic-noir border-b border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                          <span className="flex items-center gap-1.5 font-bold">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-deep-saffron" /> config-spec
                          </span>
                          <span>YAML</span>
                        </div>
                        <pre className="p-4 bg-brand-oceanic-noir/20 text-left font-mono text-[10px] text-brand-mystic-mint overflow-x-auto leading-relaxed max-h-[160px] no-scrollbar">
                          <code>{node.previewCode}</code>
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full mt-4">
                      <div className="w-full glass-card border-white/5 rounded-xl overflow-hidden shadow-lg flex flex-col transition-all duration-500">
                        <div className="px-3 py-1.5 bg-brand-oceanic-noir border-b border-white/5 flex items-center justify-between text-[9px] text-slate-500 font-mono">
                          <span className="flex items-center gap-1 font-bold">
                            <span className="h-1 w-1 rounded-full bg-brand-deep-saffron" /> {
                              node.id === 1 ? 'api.ts' : node.id === 2 ? 'logs.txt' : node.id === 3 ? 'config.yaml' : 'vault.json'
                            }
                          </span>
                          <span>{
                            node.id === 1 ? 'TypeScript' : node.id === 2 ? 'LOGS' : node.id === 3 ? 'YAML' : 'JSON'
                          }</span>
                        </div>
                        <pre className="p-3 bg-brand-oceanic-noir/20 text-left font-mono text-[9px] text-brand-mystic-mint overflow-x-auto leading-relaxed max-h-[110px] no-scrollbar">
                          <code>{node.previewCode}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── MOBILE ACCORDION VIEW ─── */}
        <div className="block md:hidden flex flex-col gap-4 font-sans select-none">
          {nodes.map((node) => {
            const isNodeOpen = activeIndex === node.id;
            return (
              <div
                key={node.id}
                className={`glass-panel border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isNodeOpen
                    ? 'border-brand-forsythia/30 bg-brand-nocturnal-expedition/10 shadow-[0_12px_24px_-8px_rgba(255,200,1,0.15)]'
                    : 'border-white/5 bg-brand-oceanic-noir/40'
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => handleActiveIndexChange(isNodeOpen ? -1 : node.id)}
                  className="w-full flex items-center justify-between p-5 text-left font-mono font-bold text-sm select-none cursor-pointer focus:outline-none min-h-[44px]"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-xs text-brand-deep-saffron">0{node.id + 1}</span>
                    <div className={`h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center ${
                      isNodeOpen ? 'text-brand-forsythia border-brand-forsythia/30' : 'text-slate-400'
                    }`}>
                      <node.IconComponent className="h-4 w-4" />
                    </div>
                    <span className={`transition-colors duration-300 ${isNodeOpen ? 'text-brand-forsythia' : 'text-brand-arctic-powder'}`}>
                      {node.title}
                    </span>
                  </div>
                  <div className={`text-slate-500 transition-transform duration-300 ${isNodeOpen ? 'rotate-180 text-brand-forsythia' : ''}`}>
                    <ChevronDownIcon className="h-5 w-5" />
                  </div>
                </button>

                {/* Accordion Content Panel (Pure CSS transition height, backup by WAAPI on resize crossover) */}
                <div
                  id={`accordion-content-${node.id}`}
                  className="transition-all duration-500 ease-in-out overflow-hidden"
                  style={{
                    maxHeight: isNodeOpen ? '800px' : '0px',
                    opacity: isNodeOpen ? 1 : 0,
                  }}
                >
                  <div className="p-5 pt-0 border-t border-white/5 flex flex-col gap-4">
                    <h4 className="text-base font-bold text-brand-arctic-powder mt-4">
                      {node.subtitle}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {node.description}
                    </p>

                    {/* Points list */}
                    {node.points && (
                      <ul className="flex flex-col gap-2.5 my-2">
                        {node.points.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                            <span className="h-5 w-5 rounded-full bg-brand-deep-saffron/10 border border-brand-deep-saffron/20 flex items-center justify-center shrink-0 text-brand-deep-saffron font-bold text-[10px] mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed font-sans">{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Code block */}
                    {node.previewCode && (
                      <div className="w-full glass-card border-white/5 rounded-xl overflow-hidden mt-2 flex flex-col">
                        <div className="px-4 py-2 bg-brand-oceanic-noir border-b border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                          <span className="flex items-center gap-1.5 font-bold">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-deep-saffron" /> {
                              node.id === 0 || node.id === 3 ? 'config.yaml' : node.id === 1 ? 'api.ts' : node.id === 2 ? 'logs.txt' : 'vault.json'
                            }
                          </span>
                          <span>{
                            node.id === 0 || node.id === 3 ? 'YAML' : node.id === 1 ? 'TypeScript' : node.id === 2 ? 'LOGS' : 'JSON'
                          }</span>
                        </div>
                        <pre className="p-4 bg-brand-oceanic-noir/20 text-left font-mono text-[10px] text-brand-mystic-mint overflow-x-auto leading-relaxed max-h-[220px] no-scrollbar">
                          <code>{node.previewCode}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
