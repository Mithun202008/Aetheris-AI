import { useState } from 'react';
import type { FormEvent } from 'react';
import { Terminal, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const productLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Sandbox', href: '#sandbox' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Documentation', href: '#' },
    { name: 'System Status', href: '#' },
  ];

  const resourceLinks = [
    { name: 'Developer Guide', href: '#' },
    { name: 'Self-Hosting CLI', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'GitHub Repo', href: '#' },
    { name: 'Security Policy', href: '#' },
  ];

  const companyLinks = [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Use', href: '#' },
  ];

  return (
    <footer className="relative bg-brand-oceanic-noir border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Glow elements */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-nocturnal-expedition/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 font-sans">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          {/* Logo Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <a href="#" className="flex items-center gap-2 group mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-deep-saffron to-brand-forsythia flex items-center justify-center shadow-lg shadow-brand-deep-saffron/10 group-hover:scale-105 transition-transform duration-300">
                <Terminal className="h-5 w-5 text-brand-oceanic-noir" />
              </div>
              <span className="text-xl font-bold tracking-tight text-brand-arctic-powder font-mono">
                Aetheris
              </span>
            </a>
            <p className="text-xs text-slate-400 leading-relaxed text-left max-w-sm mb-6">
              Automate enterprise API & LLM operations with next-generation agent networks. Built for low latency, observability, and robust security.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-brand-forsythia hover:bg-brand-nocturnal-expedition/30 transition-colors flex items-center justify-center min-h-[32px] min-w-[32px]" aria-label="Twitter">
                <svg className="h-4 w-4 fill-current">
                  <use href="/icons.svg#x-icon" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-brand-forsythia hover:bg-brand-nocturnal-expedition/30 transition-colors flex items-center justify-center min-h-[32px] min-w-[32px]" aria-label="GitHub">
                <svg className="h-4 w-4 fill-current">
                  <use href="/icons.svg#github-icon" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-brand-forsythia hover:bg-brand-nocturnal-expedition/30 transition-colors flex items-center justify-center min-h-[32px] min-w-[32px]" aria-label="Discord">
                <svg className="h-4 w-4 fill-current">
                  <use href="/icons.svg#discord-icon" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav Columns */}
          <div className="grid grid-cols-3 gap-6 lg:col-span-5 text-left">
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-mystic-mint mb-4">Product</h4>
              <ul className="flex flex-col gap-2.5">
                {productLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-xs text-slate-500 hover:text-brand-deep-saffron transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-mystic-mint mb-4">Resources</h4>
              <ul className="flex flex-col gap-2.5">
                {resourceLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-xs text-slate-500 hover:text-brand-deep-saffron transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-mystic-mint mb-4">Company</h4>
              <ul className="flex flex-col gap-2.5">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-xs text-slate-500 hover:text-brand-deep-saffron transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 flex flex-col items-start text-left">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-mystic-mint mb-4">
              Developer Newsletter
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Receive updates on SDK releases, workflow templates, and engine optimizations.
            </p>
            <form onSubmit={handleSubmit} className="w-full flex gap-2">
              <input
                type="email"
                placeholder="developer@aetheris.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-brand-oceanic-noir/80 border border-white/10 rounded-xl px-4 py-2 text-xs text-brand-arctic-powder focus:outline-none focus:border-brand-deep-saffron/50 min-h-[44px]"
                required
              />
              <button
                type="submit"
                className="bg-brand-deep-saffron hover:bg-brand-forsythia p-2.5 rounded-xl text-brand-oceanic-noir font-bold transition-colors flex items-center justify-center shrink-0 min-w-[44px] min-h-[44px] cursor-pointer"
                aria-label="Subscribe"
              >
                {subscribed ? (
                  <span className="text-[10px] font-mono font-bold">Done</span>
                ) : (
                  <Send className="h-4 w-4 text-brand-oceanic-noir" />
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 text-[11px] text-slate-500 font-mono font-semibold">
          <p>© {new Date().getFullYear()} Aetheris AI, Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Server Status: <span className="text-brand-mystic-mint font-bold">ALL SYSTEMS OPERATIONAL</span></span>
          </div>
        </div>

      </div>
    </footer>
  );
}
