// Single source of truth for the project list. Any "N projects" count on the
// site must be derived from this array, never written by hand.
export type Project = {
  name: string;
  blurb: string;
  status: 'Open Source' | 'Research' | 'Beta' | 'Private';
  href: string;
  updated: string; // ISO date, shown as "Updated Mon YYYY"
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: 'Alpha Extraction Pipeline',
    blurb: 'End-to-end factor research system: ingestion → attribution → signal → ranking.',
    status: 'Open Source',
    href: 'https://github.com/quanthq/alpha-extraction',
    updated: '2026-07-18',
    featured: true,
  },
  {
    name: 'Community Backtest Engine',
    blurb: 'Walk-forward testing with realistic costs. Share tearsheets to the community in one click.',
    status: 'Open Source',
    href: 'https://github.com/quanthq/backtest-engine',
    updated: '2026-06-30',
    featured: true,
  },
  {
    name: 'Cross-Sectional Signal Scanner',
    blurb: 'Ranks 8,000+ instruments by factor confluence score. Refreshes every 4 hours.',
    status: 'Open Source',
    href: 'https://github.com/quanthq/signal-scanner',
    updated: '2026-06-11',
    featured: true,
  },
  {
    name: 'Regime Classification HMM',
    blurb: 'Hidden Markov model conditioned factor rotation, driven by yield curve and credit spread inputs.',
    status: 'Research',
    href: '/research/yield-curve-regime-classifier/',
    updated: '2026-05-22',
    featured: true,
  },
  {
    name: 'LLM Earnings NLP Factor',
    blurb: 'Measures changes in forward-looking language between consecutive earnings calls.',
    status: 'Research',
    href: '/research/llm-earnings-sentiment-alpha/',
    updated: '2026-05-04',
  },
  {
    name: 'Volatility Surface Modeler',
    blurb: 'Local vol calibration from options data, with arbitrage-free interpolation.',
    status: 'Research',
    href: 'https://github.com/quanthq/vol-surface',
    updated: '2026-04-15',
  },
  {
    name: 'AI Research Assistant',
    blurb: 'Answers quant research questions with full source attribution back to the paper.',
    status: 'Beta',
    href: 'https://github.com/quanthq/ai-assistant',
    updated: '2026-03-28',
  },
  {
    name: 'Macro Regime Tracker',
    blurb: 'Regime classification across 12 macro factors, with factor rotation signals.',
    status: 'Beta',
    href: 'https://github.com/quanthq/macro-tracker',
    updated: '2026-03-02',
  },
];

export const openSourceCount = projects.filter((p) => p.status === 'Open Source').length;
