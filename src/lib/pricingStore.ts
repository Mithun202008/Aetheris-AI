import type { Currency, BillingInterval } from './pricingMatrix';

class PricingStore {
  private currency: Currency = 'USD';
  private interval: BillingInterval = 'monthly';
  private listeners: Set<() => void> = new Set();

  getCurrency(): Currency {
    return this.currency;
  }

  getInterval(): BillingInterval {
    return this.interval;
  }

  setCurrency(c: Currency) {
    if (this.currency === c) return;
    this.currency = c;
    this.notify();
  }

  setInterval(i: BillingInterval) {
    if (this.interval === i) return;
    this.interval = i;
    this.notify();
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }
}

export const pricingStore = new PricingStore();
