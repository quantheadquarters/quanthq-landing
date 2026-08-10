// Simulated sample values for the demo panels. NOT a market feed — nothing here
// is fetched, and every figure derived from it must be labelled "sample" in the
// UI. Single source of truth so the dashboard panel and the /lab/ ticker tape
// cannot drift apart.
export interface SampleTicker {
  sym: string;
  price: string;
  chg: string;
  dir: 'up' | 'down';
}

export const sampleTickers: SampleTicker[] = [
  { sym: 'NVDA', price: '131.42', chg: '+2.8%', dir: 'up' },
  { sym: 'AAPL', price: '212.18', chg: '+1.4%', dir: 'up' },
  { sym: 'MSFT', price: '448.62', chg: '+0.4%', dir: 'up' },
  { sym: 'META', price: '562.90', chg: '+1.9%', dir: 'up' },
  { sym: 'TSLA', price: '189.34', chg: '-1.6%', dir: 'down' },
  { sym: 'BTC', price: '68,420', chg: '+3.1%', dir: 'up' },
  { sym: 'ETH', price: '3,840', chg: '+2.2%', dir: 'up' },
  { sym: 'VIX', price: '16.3', chg: '-2.1%', dir: 'down' },
];
