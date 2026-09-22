// Single source of truth for the project list. Any "N projects" count on the
// site must be derived from this array, never written by hand.
//
// Every entry must be a repository that actually exists and that someone can
// open right now. This list previously held eight projects pointing at
// `github.com/quanthq/*` — an organisation that does not exist; all six repo
// links 404'd. Real org is `quantheadquarters` (see data/links.ts).
import { links } from './links';

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
    name: 'finance-project-quant',
    blurb: 'Quantitative finance experiments and factor research notebooks.',
    status: 'Open Source',
    href: links.alphaEngine,
    updated: '2026-08-21',
    featured: true,
  },
  {
    name: 'quanthq-landing',
    blurb: 'This site. Astro, statically built, deployed to GitHub Pages.',
    status: 'Open Source',
    href: `${links.github}/quanthq-landing`,
    updated: '2026-08-21',
  },
];
