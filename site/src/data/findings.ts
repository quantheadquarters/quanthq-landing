// Reported in Alpha Engine FINDINGS.md, 2026-07-27. This is a historical
// evaluation of that project, not a claim about current predictive power.
import { links } from './links';

export const alphaFinding = {
  date: '27 Jul 2026',
  signals: 6788,
  assetCount: 7,
  horizon: 'next 10 bars',
  edge: '+0.0 pp',
  source: links.alphaEngineFindings,
  assets: [
    { symbol: 'BTC', signals: 830, edge: -1.7 },
    { symbol: 'ETH', signals: 854, edge: -0.7 },
    { symbol: 'SOL', signals: 829, edge: -0.3 },
    { symbol: 'AAPL', signals: 1080, edge: 2.0 },
    { symbol: 'MSFT', signals: 1051, edge: -0.5 },
    { symbol: 'GOOGL', signals: 1067, edge: 0.1 },
    { symbol: 'NVDA', signals: 1077, edge: 0.7 },
  ],
} as const;
