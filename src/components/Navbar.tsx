import { useState, useEffect } from 'react';
import { Menu, X, Terminal, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ isLoaded = true }: { isLoaded?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Sandbox', href: '#sandbox' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQs', href: '#faqs' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={isLoaded ? { y: 0, opacity: 1 } : { y: -70, opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-4 glass-panel shadow-[0_4px_32px_rgba(255,46,147,0.08),0_10px_30px_rgba(23,43,54,0.3)] border-b border-brand-forsythia/10'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group focus:outline-none">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-deep-saffron to-brand-forsythia flex items-center justify-center shadow-lg shadow-brand-deep-saffron/10 group-hover:scale-105 transition-transform duration-300">
              <Terminal className="h-5 w-5 text-brand-oceanic-noir" />
            </div>
            <span className="text-xl font-bold tracking-tight text-vibrant-rockstar glitch-on-hover">
              Aetheris
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-slate-400 hover:text-brand-arctic-powder transition-colors duration-200 relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-brand-deep-saffron to-brand-forsythia transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#sandbox"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold glass-panel text-slate-300 hover:text-white transition-all duration-200"
            >
              Sign In
            </a>
            <a
              href="#sandbox"
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl text-sm font-bold text-brand-oceanic-noir bg-gradient-to-r from-brand-deep-saffron to-brand-forsythia hover:brightness-110 transition-all duration-300 shadow-lg shadow-brand-deep-saffron/15 flex items-center gap-1.5"
            >
              Launch Sandbox
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none min-h-[44px] min-w-[44px]"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[73px] z-40 bg-brand-oceanic-noir/95 backdrop-blur-lg border-t border-white/5 md:hidden flex flex-col justify-between p-8"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold font-mono text-slate-300 hover:text-white transition-colors duration-200 py-2 border-b border-white/5"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4 mt-auto"
            >
              <a
                href="#sandbox"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-4 rounded-xl font-semibold glass-panel text-slate-300 hover:text-white transition-colors min-h-[48px] flex items-center justify-center"
              >
                Sign In
              </a>
              <a
                href="#sandbox"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-4 rounded-xl font-bold text-brand-oceanic-noir bg-gradient-to-r from-brand-deep-saffron to-brand-forsythia hover:brightness-110 transition-colors shadow-lg shadow-brand-deep-saffron/15 min-h-[48px] flex items-center justify-center gap-2"
              >
                Launch Sandbox
                <ArrowRight className="h-5 w-5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
