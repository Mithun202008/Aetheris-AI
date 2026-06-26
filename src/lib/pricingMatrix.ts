// ─────────────────────────────────────────────────────────────────────────────
// PRICING MATRIX  —  Multi-dimensional configuration object
//
// Final price computation:
//   price = baseMonthlyUSD × currencyTariff[currency] × billingMultiplier
//   where billingMultiplier = 1.0 (monthly) | 0.80 (annual → 20% off)
// ─────────────────────────────────────────────────────────────────────────────

export type Currency        = 'USD' | 'EUR' | 'INR';
export type BillingInterval = 'monthly' | 'yearly';
export type TierKey         = 'developer' | 'professional' | 'enterprise';

// ── Currency metadata ────────────────────────────────────────────────────────
export interface CurrencyMeta {
  symbol:  string;
  code:    Currency;
  label:   string;
  region:  string;
}

export const CURRENCY_META: Record<Currency, CurrencyMeta> = {
  USD: { symbol: '$',  code: 'USD', label: 'US Dollar',    region: 'United States' },
  EUR: { symbol: '€',  code: 'EUR', label: 'Euro',         region: 'Europe' },
  INR: { symbol: '₹',  code: 'INR', label: 'Indian Rupee', region: 'India' },
};

// ── Regional tariff variables ────────────────────────────────────────────────
// Tariff multipliers encode purchasing-power parity & market positioning.
// USD = 1.0 (baseline). EUR and INR are pegged relative to USD rates.
export type TariffMatrix = Record<Currency, number>;

// ── Per-tier configuration ───────────────────────────────────────────────────
export interface TierConfig {
  name:                    string;
  badge:                   string | null;
  description:             string;
  baseMonthlyUSD:          number;         // source-of-truth USD monthly rate
  annualDiscountMultiplier: number;        // 0.80 → 20% discount
  currencyTariffs:         TariffMatrix;  // regional adjustment multipliers
  features:                string[];
  highlight:               boolean;
  cta:                     string;
}

// ── Master pricing matrix ────────────────────────────────────────────────────
export const PRICING_MATRIX: Record<TierKey, TierConfig> = {
  developer: {
    name:        'Developer',
    badge:       null,
    description: 'Ideal for prototyping and local development.',
    baseMonthlyUSD: 0,
    annualDiscountMultiplier: 0.80,
    currencyTariffs: {
      USD: 1.0,   // Free
      EUR: 1.0,   // Free
      INR: 1.0,   // Free
    },
    features: [
      '2,000 executions / month',
      '3 active pipelines',
      'Single-thread execution',
      'Redis cache (1-day TTL)',
      'Community forum support',
    ],
    highlight: false,
    cta: 'Start Free Sandbox',
  },

  professional: {
    name:        'Professional',
    badge:       'Recommended',
    description: 'For teams scaling their automation operations.',
    baseMonthlyUSD: 89,
    annualDiscountMultiplier: 0.80,
    // Regional tariff variables:
    //   EUR → 0.91 accounts for EU VAT-inclusive market positioning
    //   INR → 74.0 encodes PPP-adjusted India market rate (× USD base)
    currencyTariffs: {
      USD: 1.00,
      EUR: 0.91,
      INR: 74.00,
    },
    features: [
      '50,000 executions / month',
      'Unlimited active pipelines',
      '10 parallel agent threads',
      'Encrypted credential vault',
      'Shared context memory store',
      'Priority support (12h SLA)',
    ],
    highlight: true,
    cta: 'Upgrade to Pro',
  },

  enterprise: {
    name:        'Enterprise',
    badge:       null,
    description: 'Compliant deployments for regulated industries.',
    baseMonthlyUSD: 249,
    annualDiscountMultiplier: 0.80,
    currencyTariffs: {
      USD: 1.00,
      EUR: 0.90,
      INR: 73.50,
    },
    features: [
      'Unlimited executions',
      'VPC-isolated deployment',
      'Custom guardrail overrides',
      'SSO / SAML / OAuth 2.0',
      'Direct uptime SLA guarantee',
      'Dedicated Account Manager',
    ],
    highlight: false,
    cta: 'Contact Sales',
  },
};

// ── Ordered tier list ────────────────────────────────────────────────────────
export const TIER_ORDER: TierKey[] = ['developer', 'professional', 'enterprise'];

// ── Core computation function ────────────────────────────────────────────────
// Returns the final per-month display price (already factoring in annual billing).
// Returns 0 for free tiers. For enterprise you may treat 0 as "Contact us".
export function computePrice(
  tier:     TierKey,
  currency: Currency,
  interval: BillingInterval,
): number {
  const cfg = PRICING_MATRIX[tier];
  if (cfg.baseMonthlyUSD === 0) return 0;

  const tariff         = cfg.currencyTariffs[currency];
  const baseInCurrency = cfg.baseMonthlyUSD * tariff;
  const multiplier     = interval === 'yearly' ? cfg.annualDiscountMultiplier : 1.0;

  return Math.round(baseInCurrency * multiplier);
}

// ── Format a computed price for display ─────────────────────────────────────
export function formatPrice(amount: number, currency: Currency): string {
  const { symbol } = CURRENCY_META[currency];
  if (amount === 0) return 'Free';
  if (currency === 'INR') {
    return `${symbol}${amount.toLocaleString('en-IN')}`;
  }
  return `${symbol}${amount.toLocaleString('en-US')}`;
}

// ── Annual totals (shown as "billed as X/yr") ────────────────────────────────
export function computeAnnualTotal(
  tier:     TierKey,
  currency: Currency,
): number {
  return computePrice(tier, currency, 'yearly') * 12;
}
