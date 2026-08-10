# Project: QuantHQ Landing Site

## Stack
- Astro 5.10 (SSG), Tailwind CSS 4.1 (Vite plugin), MDX for content
- No React/Vue/Svelte — pure Astro components + vanilla `<script>` tags
- Deployed to GitHub Pages at https://quanthq.in

## Commands
All npm commands run from `site/`, not the repo root.
- `npm run dev` — dev server at http://localhost:4321
- `npm run build` — production build → `site/dist/`
- `npm run preview` — preview production build
- No tests, no lint, no typecheck. **`npm run build` is the only correctness gate** — run it before calling any change done.
- `site/package-lock.json` is gitignored — CI runs `npm ci` fresh (lockfile not committed)

## Architecture
- `site/src/pages/index.astro` (~2950 lines) — homepage is **standalone**: own layout, CSS, JS, nav, footer. Does NOT use Base.astro.
- `site/src/layouts/Base.astro` — shared layout for every other page (about, community, contact, blog/*, research/*)
- `site/src/styles/global.css` — shared theme variables and styles (imported by Base.astro)
- `site/src/content.config.ts` — Astro 5 `glob()` loader API (not legacy collection style). Two collections: `research`, `blog`
- `site/src/components/` — `AboutStory.astro`, `CommandPalette.astro`
- Content: `site/src/content/blog/*.mdx` (2 posts), `site/src/content/research/*.mdx` (3 papers)
- Dynamic routes use `[...slug].astro` pattern

## CSS Variables
Use canonical names from `global.css`, not homepage aliases:
- `--bg` (not `--black`), `--card-bg` (not `--carbon`), `--accent` (not `--blue`), `--accent2` (not `--violet`)
- `--text`, `--text-1` through `--text-4`, `--border`, `--border-hover`
- `--green`, `--red`, `--cyan`

Homepage aliases exist in `global.css :root` for backwards compat only.

## Rules
- **Never modify** `CNAME` or `.github/workflows/deploy.yml`
- Keep `index.astro` standalone — it intentionally has its own layout, CSS, and JS
- Nav link set is unified across homepage and inner pages: About, Research, Blog, Community, Contact (same order, same labels). The homepage nav is still its own standalone markup/CSS but renders the identical items + the same liquid-glass `.lg-nav`/`.nav-cta` treatment as `Base.astro`. Homepage-only sections (Intelligence/Network/Terminal) are reached via the right-side section dots, not the nav.
- Ticker data is hardcoded/simulated — not a real API
- Canvas code (globe, force graph) is decorative only
- `prefers-reduced-motion` must be respected — disable animations when set
- CI copies `CNAME` into `dist/` after build — don't remove that step
- Ask clarifying questions upfront before starting work

## Content Schema Gotchas
- Blog `category` is an enum: `AI | Research | Engineering | Quantitative Finance | Opinion | Tutorials`
- Research `status` is an enum: `preprint | published | technical-report`
- Research uses `authors: string[]`, blog uses `author: string` (singular)
- `date` fields use `z.coerce.date()` — string dates in frontmatter are fine

## Known Tech Debt
See `FURTHER_WORK.md` for details. Key items:
- `index.astro` duplicates a large CSS block from `global.css` (351 lines) with different variable names
- Duplicate ticker data in `Base.astro` and `index.astro`
- ~276 lines of decorative canvas code (globe + force graph)