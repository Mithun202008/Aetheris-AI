import { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, CheckCircle, Terminal as TermIcon } from 'lucide-react';

interface PresetStep {
  text: string;
  type: 'info' | 'tool' | 'agent' | 'success' | 'warning';
  delay: number;
}

interface LogLine {
  text: string;
  type: 'info' | 'tool' | 'agent' | 'success' | 'warning';
  time: string;
}

export default function SandboxSimulator() {
  const [activePreset, setActivePreset] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  const presets: {
    name: string;
    description: string;
    trigger: string;
    steps: PresetStep[];
  }[] = [
    {
      name: 'Lead Enrichment',
      description: 'Enrich new users on stripe signup.',
      trigger: 'Stripe webhook payment_intent.succeeded',
      steps: [
        { text: 'Received payment notification: customer_id = usr_8923', type: 'info', delay: 400 },
        { text: 'Tool call [stripe.retrieveCustomer] -> Email: alex@quantum-ops.com', type: 'tool', delay: 800 },
        { text: 'Agent planning: Search domain logs & identify company profile.', type: 'agent', delay: 1400 },
        { text: 'Tool call [clearbit.enrichDomain] -> Company: Quantum Ops (150-500 employees, Series B)', type: 'tool', delay: 2000 },
        { text: 'Agent planning: Generate tailored sales outreach strategy based on company tier.', type: 'agent', delay: 2600 },
        { text: 'Tool call [hubspot.createDeal] -> Created ticket #902, Value: $1,200/mo', type: 'tool', delay: 3200 },
        { text: 'Tool call [slack.sendMessage] -> Dispatched lead notification to #sales-alerts', type: 'tool', delay: 3800 },
        { text: 'Pipeline run complete. Total duration: 3.8s | Cost: $0.0064', type: 'success', delay: 4200 },
      ]
    },
    {
      name: 'DevOps Autopilot',
      description: 'Auto-debug CI failure events.',
      trigger: 'GitHub Action event build.failed',
      steps: [
        { text: 'Received GitHub webhook for failed build ref: main-sha893', type: 'info', delay: 400 },
        { text: 'Tool call [github.retrieveLogs] -> Extracted error: "TypeError: Cannot read properties of undefined (reading \'id\') at line 42"', type: 'warning', delay: 1000 },
        { text: 'Agent planning: Parse file index.ts, check object structures.', type: 'agent', delay: 1600 },
        { text: 'Tool call [filesystem.readFile] -> Read src/index.ts lines 35-50', type: 'tool', delay: 2200 },
        { text: 'Agent planning: Safe guard needed for config payload check. Writing patch diff.', type: 'agent', delay: 2900 },
        { text: 'Tool call [github.createBranch] -> Created branch: hotfix/index-undefined-guard', type: 'tool', delay: 3500 },
        { text: 'Tool call [github.createPullRequest] -> PR #234 opened: "Safely handle undefined user configs"', type: 'tool', delay: 4100 },
        { text: 'Pipeline run complete. Total duration: 4.1s | Cost: $0.0089', type: 'success', delay: 4500 },
      ]
    },
    {
      name: 'Competitor Price Tracker',
      description: 'Scrape competitor pricing daily.',
      trigger: 'Scheduled Cron: 0 0 * * *',
      steps: [
        { text: 'Cron triggered: Running scheduled tracker...', type: 'info', delay: 400 },
        { text: 'Tool call [scraper.fetchHtml] -> URL: https://competitor-store.com/pricing', type: 'tool', delay: 900 },
        { text: 'Agent planning: Parse markup table, map values to structured JSON.', type: 'agent', delay: 1500 },
        { text: 'LLM Extraction: Core Plan ($79), Enterprise Plan ($299)', type: 'agent', delay: 2200 },
        { text: 'Tool call [postgres.query] -> Historical price check (Previous price: $89)', type: 'tool', delay: 2800 },
        { text: 'Agent planning: Detected price drop of $10. Update internal reports.', type: 'agent', delay: 3400 },
        { text: 'Tool call [sendgrid.sendEmail] -> Sent competitor update report to board@acme.com', type: 'tool', delay: 4000 },
        { text: 'Pipeline run complete. Total duration: 4.0s | Cost: $0.0051', type: 'success', delay: 4400 },
      ]
    }
  ];

  // Handle logging scroll
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Clean log execution loop
  const startSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setIsCompleted(false);
    setLogs([]);

    const steps = presets[activePreset].steps;
    
    steps.forEach((step) => {
      setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          {
            text: step.text,
            type: step.type,
            time: new Date().toLocaleTimeString().split(' ')[0]
          }
        ]);
        if (step.type === 'success') {
          setIsRunning(false);
          setIsCompleted(true);
        }
      }, step.delay);
    });
  };

  const resetSimulation = () => {
    setLogs([]);
    setIsRunning(false);
    setIsCompleted(false);
  };

  const selectPreset = (idx: number) => {
    if (isRunning) return;
    setActivePreset(idx);
    resetSimulation();
  };

  return (
    <section id="sandbox" className="relative py-24 bg-brand-oceanic-noir border-b border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial-glow pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-sm font-semibold tracking-wider font-mono text-brand-deep-saffron uppercase mb-3">
            Developer Sandbox
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-brand-arctic-powder tracking-tight leading-tight">
            See the Agent Sandbox in Action
          </p>
          <p className="text-base text-slate-400 mt-4 font-sans">
            Select a preset automation template, trigger the pipeline, and inspect the real-time execution flow logs in our virtual console.
          </p>
        </div>

        {/* Preset Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 font-sans">
          {presets.map((preset, idx) => (
            <button
              key={preset.name}
              onClick={() => selectPreset(idx)}
              disabled={isRunning}
              className={`p-5 rounded-2xl border text-left transition-all duration-300 focus:outline-none min-h-[44px] ${
                activePreset === idx
                  ? 'bg-brand-nocturnal-expedition/50 border-brand-forsythia/50 shadow-[0_10px_25px_-10px_rgba(255,200,1,0.15)]'
                  : 'bg-brand-oceanic-noir/30 border-white/5 hover:border-white/10'
              } ${isRunning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <h3 className="font-bold text-brand-arctic-powder font-mono">{preset.name}</h3>
              <p className="text-xs text-slate-400 mt-1.5">{preset.description}</p>
            </button>
          ))}
        </div>

        {/* Sandbox Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
          
          {/* Left Panel: Trigger & Configuration Details */}
          <div className="lg:col-span-4 glass-panel rounded-2xl p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-brand-deep-saffron bg-brand-deep-saffron/10 border border-brand-deep-saffron/20 px-2 py-1 rounded">
                Config.yaml
              </span>
              <h4 className="text-lg font-bold text-brand-arctic-powder mt-4 mb-2 font-mono">Workflow Properties</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                This schema outlines the execution environment configuration. Once triggered, the backend spins up an agentic thread executing each step sequentially.
              </p>

              <div className="flex flex-col gap-4 font-mono text-xs mb-8">
                <div className="bg-brand-oceanic-noir/80 p-3 rounded-lg border border-white/5">
                  <span className="text-slate-500 block mb-1">Trigger Event:</span>
                  <span className="text-brand-forsythia font-bold">{presets[activePreset].trigger}</span>
                </div>
                <div className="bg-brand-oceanic-noir/80 p-3 rounded-lg border border-white/5">
                  <span className="text-slate-500 block mb-1">Max Budget Limit:</span>
                  <span className="text-brand-mystic-mint font-semibold">$0.50 per run</span>
                </div>
                <div className="bg-brand-oceanic-noir/80 p-3 rounded-lg border border-white/5">
                  <span className="text-slate-500 block mb-1">State Database:</span>
                  <span className="text-brand-arctic-powder font-semibold">Redis Cache v7</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={startSimulation}
                disabled={isRunning}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-brand-oceanic-noir bg-gradient-to-r from-brand-deep-saffron to-brand-forsythia hover:brightness-110 transition-colors disabled:opacity-50 disabled:hover:brightness-100 min-h-[44px] cursor-pointer"
              >
                <Play className="h-4 w-4 fill-brand-oceanic-noir text-brand-oceanic-noir" />
                Run Pipeline
              </button>
              {(logs.length > 0 && !isRunning) && (
                <button
                  onClick={resetSimulation}
                  className="flex items-center justify-center p-3 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-colors min-h-[44px] cursor-pointer"
                  title="Clear Console"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Panel: Simulated Live Console */}
          <div className="lg:col-span-8 glass-panel rounded-2xl overflow-hidden flex flex-col min-h-[350px]">
            {/* Terminal Header */}
            <div className="px-5 py-3.5 bg-brand-oceanic-noir/80 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-nocturnal-expedition" />
                <span className="w-2.5 h-2.5 rounded-full bg-brand-nocturnal-expedition" />
                <span className="w-2.5 h-2.5 rounded-full bg-brand-nocturnal-expedition" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono font-bold">
                <TermIcon className="h-3.5 w-3.5" /> aetheris-console
              </div>
              <span className="w-4" />
            </div>

            {/* Terminal Console log stream */}
            <div className="flex-1 p-6 bg-brand-oceanic-noir/10 font-mono text-xs text-left overflow-y-auto max-h-[360px] flex flex-col gap-2.5">
              {logs.length === 0 && (
                <div className="text-slate-500 h-full flex flex-col items-center justify-center text-center gap-2 py-12">
                  <TermIcon className="h-8 w-8 text-slate-700 animate-pulse" />
                  <p>Console idle. Click "Run Pipeline" to trigger this automation thread.</p>
                </div>
              )}
              {logs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="text-slate-600 select-none">{log.time}</span>
                  <span
                    className={`leading-relaxed ${
                      log.type === 'tool'
                        ? 'text-brand-forsythia font-semibold'
                        : log.type === 'agent'
                        ? 'text-brand-deep-saffron font-semibold'
                        : log.type === 'success'
                        ? 'text-brand-mystic-mint font-bold'
                        : log.type === 'warning'
                        ? 'text-brand-deep-saffron font-semibold brightness-110'
                        : 'text-brand-arctic-powder'
                    }`}
                  >
                    {log.type === 'tool' && '🛠️ '}
                    {log.type === 'agent' && '🤖 '}
                    {log.type === 'success' && '✅ '}
                    {log.type === 'warning' && '⚠️ '}
                    {log.text}
                  </span>
                </div>
              ))}
              <div ref={consoleEndRef} />
            </div>

            {/* Run Stats Bar */}
            {isCompleted && (
              <div className="px-6 py-4 bg-brand-mystic-mint/5 border-t border-brand-mystic-mint/20 flex items-center justify-between text-xs font-mono text-brand-mystic-mint animate-fade-in">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  <span>Pipeline execution exited with status code: 0 (OK)</span>
                </div>
                <div className="hidden sm:flex gap-4">
                  <span>Usage: 0.001 CPU Hrs</span>
                  <span>Cost: ~$0.005</span>
                </div>
              </div>
            )}
            {isRunning && (
              <div className="px-6 py-4 bg-brand-deep-saffron/5 border-t border-brand-deep-saffron/20 flex items-center justify-between text-xs font-mono text-brand-deep-saffron">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-deep-saffron animate-ping" />
                  <span>Executing agentic operations...</span>
                </div>
                <span className="animate-pulse font-bold">RUNNING</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
