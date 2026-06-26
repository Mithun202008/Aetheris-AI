import { useEffect, useRef, useState } from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import {
  PRICING_MATRIX,
  TIER_ORDER,
  CURRENCY_META,
  computePrice,
  computeAnnualTotal,
  formatPrice,
  type Currency,
  type BillingInterval,
  type TierKey,
} from '../lib/pricingMatrix';
import { pricingStore } from '../lib/pricingStore';
import { stagger } from '../lib/animations';

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Switcher UI elements refs
  const usdTabRef = useRef<HTMLButtonElement>(null);
  const eurTabRef = useRef<HTMLButtonElement>(null);
  const inrTabRef = useRef<HTMLButtonElement>(null);
  const currencyIndicatorRef = useRef<HTMLDivElement>(null);

  const monthlyLabelRef = useRef<HTMLButtonElement>(null);
  const annualLabelRef = useRef<HTMLButtonElement>(null);
  const toggleCircleRef = useRef<HTMLDivElement>(null);
  const discountBadgeRef = useRef<HTMLSpanElement>(null);

  // Pricing Card nodes refs
  const priceTextRefs = {
    developer: useRef<HTMLSpanElement>(null),
    professional: useRef<HTMLSpanElement>(null),
    enterprise: useRef<HTMLSpanElement>(null),
  };
  const symbolRefs = {
    developer: useRef<HTMLSpanElement>(null),
    professional: useRef<HTMLSpanElement>(null),
    enterprise: useRef<HTMLSpanElement>(null),
  };
  const perMonthRefs = {
    developer: useRef<HTMLSpanElement>(null),
    professional: useRef<HTMLSpanElement>(null),
    enterprise: useRef<HTMLSpanElement>(null),
  };
  const annualNoteRefs = {
    developer: useRef<HTMLParagraphElement>(null),
    professional: useRef<HTMLParagraphElement>(null),
    enterprise: useRef<HTMLParagraphElement>(null),
  };
  const debugBadgeRefs = {
    developer: useRef<HTMLDivElement>(null),
    professional: useRef<HTMLDivElement>(null),
    enterprise: useRef<HTMLDivElement>(null),
  };
  const regionLabelRefs = {
    developer: useRef<HTMLParagraphElement>(null),
    professional: useRef<HTMLParagraphElement>(null),
    enterprise: useRef<HTMLParagraphElement>(null),
  };

  // State to hold hover visual badge status in React (to show badge structure)
  const [hoveredTier, setHoveredTier] = useState<TierKey | null>(null);

  // Keep track of the currently running animations & displayed values
  const currentPricesRef = useRef<Record<TierKey, number>>({
    developer: 0,
    professional: 89,
    enterprise: 249,
  });

  const activeAnimations = useRef<Record<TierKey, Animation | null>>({
    developer: null,
    professional: null,
    enterprise: null,
  });

  // VIBRANT ROCKSTAR-INSPIRED WAAPI TRANSITION: Scale, rotate, blur, and neon color shift
  const animatePrice = (tier: TierKey, element: HTMLSpanElement, from: number, to: number) => {
    if (from === to) {
      element.textContent = to.toLocaleString();
      return;
    }

    if (activeAnimations.current[tier]) {
      activeAnimations.current[tier]!.cancel();
      activeAnimations.current[tier] = null;
    }

    // 1. Text Disappearance Animation (Slide out upwards + rotate + blur + hot pink glow)
    const animOut = element.animate([
      { transform: 'translateY(0px) scale(1) rotate(0deg)', opacity: 1, filter: 'blur(0px)', textShadow: '0 0 10px rgba(255, 46, 147, 0.3)' },
      { transform: 'translateY(-15px) scale(0.9) rotate(-1.5deg)', opacity: 0, filter: 'blur(4px)', textShadow: '0 0 25px #FF2E93, 0 0 10px #FF2E93' }
    ], {
      duration: 180,
      easing: 'ease-in',
      fill: 'forwards'
    });

    activeAnimations.current[tier] = animOut;

    animOut.onfinish = () => {
      // Update text content once hidden
      element.textContent = to.toLocaleString();
      currentPricesRef.current[tier] = to;

      // 2. Text Appearance Animation (Slide in from below + scale up + slight bounce + orange-gold glow)
      const animIn = element.animate([
        { transform: 'translateY(15px) scale(1.15) rotate(1.5deg)', opacity: 0, filter: 'blur(4px)', textShadow: '0 0 25px #FF9932, 0 0 10px #FF9932' },
        { transform: 'translateY(0px) scale(1) rotate(0deg)', opacity: 1, filter: 'blur(0px)', textShadow: '0 0 10px rgba(255, 46, 147, 0.3)' }
      ], {
        duration: 260,
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Back-ease-out / springy entry
        fill: 'forwards'
      });

      activeAnimations.current[tier] = animIn;

      animIn.onfinish = () => {
        activeAnimations.current[tier] = null;
      };
    };
  };

  // Subscription setup to bypass React re-renders on currency or billing toggle
  useEffect(() => {
    const updateCurrencyUI = (curr: Currency) => {
      // 1. Move the CSS indicator
      if (currencyIndicatorRef.current) {
        if (curr === 'USD') currencyIndicatorRef.current.style.transform = 'translateX(0px)';
        if (curr === 'EUR') currencyIndicatorRef.current.style.transform = 'translateX(76px)';
        if (curr === 'INR') currencyIndicatorRef.current.style.transform = 'translateX(152px)';
      }

      // 2. Toggle active text colors on tabs
      const tabs = {
        USD: usdTabRef.current,
        EUR: eurTabRef.current,
        INR: inrTabRef.current,
      };

      Object.entries(tabs).forEach(([key, btn]) => {
        if (btn) {
          if (key === curr) {
            btn.classList.add('text-brand-oceanic-noir');
            btn.classList.remove('text-slate-400', 'hover:text-slate-200');
          } else {
            btn.classList.remove('text-brand-oceanic-noir');
            btn.classList.add('text-slate-400', 'hover:text-slate-200');
          }
        }
      });
    };

    const updateBillingUI = (interval: BillingInterval) => {
      if (interval === 'yearly') {
        if (toggleCircleRef.current) toggleCircleRef.current.style.transform = 'translateX(24px)';
        if (monthlyLabelRef.current) {
          monthlyLabelRef.current.classList.remove('text-white');
          monthlyLabelRef.current.classList.add('text-slate-500', 'hover:text-slate-300');
        }
        if (annualLabelRef.current) {
          annualLabelRef.current.classList.add('text-white');
          annualLabelRef.current.classList.remove('text-slate-500', 'hover:text-slate-300');
        }
        if (discountBadgeRef.current) {
          discountBadgeRef.current.classList.remove('scale-0', 'opacity-0');
          discountBadgeRef.current.classList.add('scale-100', 'opacity-100');
        }
      } else {
        if (toggleCircleRef.current) toggleCircleRef.current.style.transform = 'translateX(0px)';
        if (monthlyLabelRef.current) {
          monthlyLabelRef.current.classList.add('text-white');
          monthlyLabelRef.current.classList.remove('text-slate-500', 'hover:text-slate-300');
        }
        if (annualLabelRef.current) {
          annualLabelRef.current.classList.remove('text-white');
          annualLabelRef.current.classList.add('text-slate-500', 'hover:text-slate-300');
        }
        if (discountBadgeRef.current) {
          discountBadgeRef.current.classList.add('scale-0', 'opacity-0');
          discountBadgeRef.current.classList.remove('scale-100', 'opacity-100');
        }
      }
    };

    const unsubscribe = pricingStore.subscribe(() => {
      const curr = pricingStore.getCurrency();
      const interval = pricingStore.getInterval();
      const sym = CURRENCY_META[curr].symbol;

      updateCurrencyUI(curr);
      updateBillingUI(interval);

      TIER_ORDER.forEach((tier) => {
        const cfg = PRICING_MATRIX[tier];
        const targetPrice = computePrice(tier, curr, interval);
        const prevPrice = currentPricesRef.current[tier];

        // 1. Update currency symbols
        if (symbolRefs[tier].current) {
          symbolRefs[tier].current.textContent = sym;
          symbolRefs[tier].current.style.display = cfg.baseMonthlyUSD === 0 ? 'none' : 'inline';
        }

        // 2. Update "/ mo" display
        if (perMonthRefs[tier].current) {
          perMonthRefs[tier].current.style.display = cfg.baseMonthlyUSD === 0 ? 'none' : 'inline';
        }

        // 3. Update price text
        const priceTextEl = priceTextRefs[tier].current;
        if (priceTextEl) {
          if (cfg.baseMonthlyUSD === 0) {
            priceTextEl.textContent = 'Free';
          } else {
            animatePrice(tier, priceTextEl, prevPrice, targetPrice);
          }
        }

        // 4. Update billed annually note with scale/fade transition
        const noteEl = annualNoteRefs[tier].current;
        if (noteEl) {
          if (interval === 'yearly' && cfg.baseMonthlyUSD > 0) {
            const annualAmt = computeAnnualTotal(tier, curr);
            const formattedAnnual = curr === 'INR'
              ? annualAmt.toLocaleString('en-IN')
              : annualAmt.toLocaleString('en-US');
            noteEl.textContent = `${sym}${formattedAnnual} billed annually`;
            noteEl.style.display = 'block';

            noteEl.animate([
              { opacity: 0, transform: 'translateY(4px)' },
              { opacity: 1, transform: 'translateY(0px)' }
            ], {
              duration: 250,
              easing: 'ease-out',
              fill: 'forwards'
            });
          } else {
            const animOut = noteEl.animate([
              { opacity: 1, transform: 'translateY(0px)' },
              { opacity: 0, transform: 'translateY(4px)' }
            ], {
              duration: 150,
              easing: 'ease-in',
              fill: 'forwards'
            });
            animOut.onfinish = () => {
              noteEl.style.display = 'none';
            };
          }
        }

        // 5. Update debug badge text
        const debugEl = debugBadgeRefs[tier].current;
        if (debugEl && cfg.baseMonthlyUSD > 0) {
          const tariff = cfg.currencyTariffs[curr];
          const mult = interval === 'yearly' ? cfg.annualDiscountMultiplier : 1.0;
          const formattedPrice = formatPrice(targetPrice, curr);
          debugEl.innerHTML = `
            <p class="text-slate-400 font-bold mb-1">Matrix computation</p>
            <p>base: $${cfg.baseMonthlyUSD} × tariff: ${tariff} × billing: ${mult} = <span class="text-brand-deep-saffron font-bold">${formattedPrice}</span></p>
          `;
        }

        // 6. Update region and priced-in label
        const regionEl = regionLabelRefs[tier].current;
        if (regionEl) {
          regionEl.innerHTML = `
            <svg class="h-3 w-3 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            Priced in ${CURRENCY_META[curr].label} · ${CURRENCY_META[curr].region} region
          `;
        }
      });
    });

    // Run once at mount to align UI elements with default store values
    const initialCurr = pricingStore.getCurrency();
    const initialInt = pricingStore.getInterval();
    updateCurrencyUI(initialCurr);
    updateBillingUI(initialInt);

    TIER_ORDER.forEach((tier) => {
      const cfg = PRICING_MATRIX[tier];
      const initialPrice = computePrice(tier, initialCurr, initialInt);
      currentPricesRef.current[tier] = initialPrice;

      const sym = CURRENCY_META[initialCurr].symbol;
      if (symbolRefs[tier].current) {
        symbolRefs[tier].current.textContent = sym;
        symbolRefs[tier].current.style.display = cfg.baseMonthlyUSD === 0 ? 'none' : 'inline';
      }
      if (perMonthRefs[tier].current) {
        perMonthRefs[tier].current.style.display = cfg.baseMonthlyUSD === 0 ? 'none' : 'inline';
      }
      if (priceTextRefs[tier].current) {
        priceTextRefs[tier].current.textContent = cfg.baseMonthlyUSD === 0 ? 'Free' : initialPrice.toLocaleString();
      }

      const noteEl = annualNoteRefs[tier].current;
      if (noteEl) {
        if (initialInt === 'yearly' && cfg.baseMonthlyUSD > 0) {
          const annualAmt = computeAnnualTotal(tier, initialCurr);
          const formattedAnnual = initialCurr === 'INR' ? annualAmt.toLocaleString('en-IN') : annualAmt.toLocaleString('en-US');
          noteEl.textContent = `${sym}${formattedAnnual} billed annually`;
          noteEl.style.display = 'block';
          noteEl.style.opacity = '1';
        } else {
          noteEl.style.display = 'none';
        }
      }

      const debugEl = debugBadgeRefs[tier].current;
      if (debugEl && cfg.baseMonthlyUSD > 0) {
        const tariff = cfg.currencyTariffs[initialCurr];
        const mult = initialInt === 'yearly' ? cfg.annualDiscountMultiplier : 1.0;
        const formattedPrice = formatPrice(initialPrice, initialCurr);
        debugEl.innerHTML = `
          <p class="text-slate-400 font-bold mb-1">Matrix computation</p>
          <p>base: $${cfg.baseMonthlyUSD} × tariff: ${tariff} × billing: ${mult} = <span class="text-brand-deep-saffron font-bold">${formattedPrice}</span></p>
        `;
      }

      const regionEl = regionLabelRefs[tier].current;
      if (regionEl) {
        regionEl.innerHTML = `
          <svg class="h-3 w-3 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          Priced in ${CURRENCY_META[initialCurr].label} · ${CURRENCY_META[initialCurr].region} region
        `;
      }
    });

    return () => {
      unsubscribe();
      // Cancel any active number animations
      TIER_ORDER.forEach((tier) => {
        if (activeAnimations.current[tier]) {
          activeAnimations.current[tier]!.cancel();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="relative py-28 bg-brand-oceanic-noir overflow-hidden">
      {/* Background decorations */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-nocturnal-expedition/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-brand-deep-saffron/5 rounded-full blur-3xl pointer-events-none" />
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'tween', duration: 0.75, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-brand-deep-saffron">Pricing Plans</span>
          {/* ROCKSTAR TEXT VIBRANCE SHINE HEADLINE */}
          <h2 className="text-3xl sm:text-5xl font-extrabold text-vibrant-rockstar mt-3 mb-4 tracking-tight leading-tight">
            Transparent Pricing Built to Scale
          </h2>
          <p className="text-base text-slate-400 font-sans leading-relaxed">
            All prices computed via a multi-dimensional matrix that factors base rates, a flat&nbsp;
            <span className="text-brand-forsythia font-semibold">20% annual discount</span>, and regional tariff variables per currency.
          </p>
        </motion.div>

        {/* Controls row - Stateless in React, runs purely via refs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'tween', duration: 0.65, ease: 'easeOut', delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          {/* Currency Switcher Pill (Stateless UI) */}
          <div className="relative flex items-center gap-1 bg-brand-oceanic-noir border border-white/10 rounded-xl p-1 shadow-inner select-none h-[42px]">
            {/* Sliding background indicator */}
            <div
              ref={currencyIndicatorRef}
              className="absolute top-1 bottom-1 left-1 w-[72px] rounded-lg bg-gradient-to-r from-brand-deep-saffron to-brand-forsythia shadow-md transition-transform duration-300 ease-out z-0"
            />
            <button
              ref={usdTabRef}
              onClick={() => pricingStore.setCurrency('USD')}
              className="relative z-10 w-[72px] py-2 rounded-lg text-xs font-mono font-bold transition-all duration-300 text-brand-oceanic-noir cursor-pointer flex items-center justify-center gap-1 min-h-[34px] focus:outline-none"
            >
              <span>$</span><span>USD</span>
            </button>
            <button
              ref={eurTabRef}
              onClick={() => pricingStore.setCurrency('EUR')}
              className="relative z-10 w-[72px] py-2 rounded-lg text-xs font-mono font-bold transition-all duration-300 text-slate-400 hover:text-slate-200 cursor-pointer flex items-center justify-center gap-1 min-h-[34px] focus:outline-none"
            >
              <span>€</span><span>EUR</span>
            </button>
            <button
              ref={inrTabRef}
              onClick={() => pricingStore.setCurrency('INR')}
              className="relative z-10 w-[72px] py-2 rounded-lg text-xs font-mono font-bold transition-all duration-300 text-slate-400 hover:text-slate-200 cursor-pointer flex items-center justify-center gap-1 min-h-[34px] focus:outline-none"
            >
              <span>₹</span><span>INR</span>
            </button>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-white/10" />

          {/* Billing Interval Toggle (Stateless UI) */}
          <div className="flex items-center gap-3 font-sans select-none">
            <button
              ref={monthlyLabelRef}
              onClick={() => pricingStore.setInterval('monthly')}
              className="text-sm font-semibold transition-colors duration-200 text-white cursor-pointer min-h-[32px] focus:outline-none"
            >
              Monthly
            </button>
            <button
              onClick={() => {
                const next = pricingStore.getInterval() === 'monthly' ? 'yearly' : 'monthly';
                pricingStore.setInterval(next);
              }}
              role="switch"
              aria-label="Billing interval toggle"
              className="relative w-12 h-6 rounded-full border border-white/10 bg-brand-nocturnal-expedition/60 focus:outline-none cursor-pointer"
            >
              <div
                ref={toggleCircleRef}
                className="absolute top-0.5 left-0.5 w-4.5 h-4.5 rounded-full bg-gradient-to-br from-brand-deep-saffron to-brand-forsythia shadow-md transition-transform duration-300 ease-out"
              />
            </button>
            <button
              ref={annualLabelRef}
              onClick={() => pricingStore.setInterval('yearly')}
              className="text-sm font-semibold flex items-center gap-1.5 transition-colors duration-200 text-slate-500 hover:text-slate-300 cursor-pointer min-h-[32px] focus:outline-none"
            >
              <span>Annual</span>
              <span
                ref={discountBadgeRef}
                className="text-[10px] font-mono font-bold text-brand-oceanic-noir bg-brand-forsythia px-1.5 py-0.5 rounded transition-all duration-300 scale-0 opacity-0 origin-left"
              >
                −20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto"
        >
          {TIER_ORDER.map((tierKey) => {
            const cfg = PRICING_MATRIX[tierKey];
            return (
              <article
                key={tierKey}
                onMouseEnter={() => setHoveredTier(tierKey)}
                onMouseLeave={() => setHoveredTier(null)}
                className={`relative group glass-card p-8 rounded-2xl flex flex-col text-left border-glow-hover transition-all duration-300 ${
                  cfg.highlight
                    ? 'border-brand-forsythia/40 bg-brand-nocturnal-expedition/20 scale-[1.02] lg:scale-[1.04] z-10 glow-card-rockstar'
                    : 'border-white/5'
                }`}
              >
                {/* Popular badge */}
                {cfg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-brand-oceanic-noir bg-gradient-to-r from-brand-deep-saffron to-brand-forsythia px-3.5 py-1 rounded-full shadow-lg whitespace-nowrap">
                      {cfg.badge}
                    </span>
                  </div>
                )}

                {/* Tier name + description */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-brand-arctic-powder font-mono mb-1">{cfg.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed min-h-[32px]">{cfg.description}</p>
                </div>

                {/* Pricing Display Nodes */}
                <div className="relative mb-2 min-h-[72px]">
                  <div>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span
                        ref={symbolRefs[tierKey]}
                        className="text-2xl font-bold font-mono text-slate-400"
                      />
                      <span
                        ref={priceTextRefs[tierKey]}
                        className="text-5xl font-extrabold font-mono text-brand-arctic-powder tabular-nums inline-block transition-all duration-300"
                        style={{ textShadow: '0 0 10px rgba(255, 46, 147, 0.2)' }}
                      />
                      <span
                        ref={perMonthRefs[tierKey]}
                        className="text-sm text-slate-500 font-mono ml-1"
                      >
                        / mo
                      </span>
                    </div>
                    <p
                      ref={annualNoteRefs[tierKey]}
                      className="text-xs text-brand-mystic-mint font-mono transition-opacity duration-300"
                    />
                  </div>

                  {/* Matrix computation debug tooltip (hover) */}
                  {cfg.baseMonthlyUSD > 0 && hoveredTier === tierKey && (
                    <div
                      ref={debugBadgeRefs[tierKey]}
                      className="absolute -bottom-1 left-0 right-0 translate-y-full z-20 transition-opacity duration-300 bg-brand-oceanic-noir/95 border border-white/10 text-[10px] font-mono text-slate-500 text-left p-3 rounded-lg shadow-xl"
                    />
                  )}
                </div>

                {/* Currency + region label (Ref updated) */}
                <p
                  ref={regionLabelRefs[tierKey]}
                  className="text-[10px] font-mono text-slate-600 mb-7 flex items-center gap-1.5 min-h-[16px]"
                />

                {/* Divider */}
                <div className="h-px bg-white/5 mb-6" />

                {/* Feature list */}
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {cfg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-xs text-slate-300 font-sans">
                      <Check className="h-4 w-4 text-brand-mystic-mint shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#sandbox"
                  id={`pricing-cta-${tierKey}`}
                  className={`w-full text-center py-3.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center min-h-[44px] ${
                    cfg.highlight
                      ? 'text-brand-oceanic-noir bg-gradient-to-r from-brand-deep-saffron to-brand-forsythia hover:brightness-110 shadow-md shadow-brand-deep-saffron/25'
                      : 'text-slate-300 glass-panel border-white/10 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cfg.cta}
                </a>
              </article>
            );
          })}
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'tween', duration: 0.6, ease: 'easeOut', delay: 0.5 }}
          className="max-w-2xl mx-auto text-center mt-14 p-6 rounded-2xl glass-panel border-white/5 flex flex-col sm:flex-row items-center gap-4 font-sans"
        >
          <ShieldCheck className="h-6 w-6 text-brand-deep-saffron shrink-0" />
          <p className="text-xs text-slate-400 leading-relaxed text-left">
            Need a custom deployment in your VPC, compliance audits, or dedicated training clusters?
            Regional pricing is computed in real-time from our tariff matrix.&nbsp;
            <a href="#sandbox" className="text-brand-deep-saffron hover:underline font-bold">Contact sales</a>.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
