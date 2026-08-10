# Project: QuantHQ Landing Site

## Stack
- Astro 5.10 (SSG), Tailwind CSS 4.1 (Vite plugin), MDX for content, `@astrojs/sitemap`
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
Two page systems that do **not** share CSS:
- **Home system** — `pages/index.astro` + `pages/lab.astro`. Full `<html>` documents, no Base.astro. Both import `styles/home.css` (theme vars under the `--black`/`--carbon`/`--blue` names) and share `components/HomeNav.astro` + `components/HomeFooter.astro`.
- **Base system** — every other page (about, community, contact, blog/*, research/*) uses `layouts/Base.astro` + `styles/global.css`.

Never load `home.css` and `global.css` in the same page — both define `:root` under different names.

- `site/src/data/projects.ts` — **single source of truth for the project list and every project count** on the site. Paper/article counts come from the content collections. Never hand-write a count in markup.
- `site/src/content.config.ts` — Astro 5 `glob()` loader API (not legacy collection style). Two collections: `research`, `blog`
- `site/src/components/` — `AboutStory.astro`, `CommandPalette.astro`, `JsonLd.astro`, `HomeNav.astro`, `HomeFooter.astro`
- Content: `site/src/content/blog/*.mdx` (5 posts), `site/src/content/research/*.mdx` (3 papers)
- Dynamic routes use `[...slug].astro` pattern

### Homepage section order
Hero → featured research → what we do → active projects (+ lab link) → latest writing → community → mailing list. Keep it to that; interactive spectacle belongs on `/lab/`.

## CSS Variables
In the Base system use the canonical names from `global.css`; in the home system use `home.css`'s own set (`--black`, `--carbon`, `--blue`, `--violet`, `--gold`).

Canonical (`global.css`):
- `--bg` (not `--black`), `--card-bg` (not `--carbon`), `--accent` (not `--blue`), `--accent2` (not `--violet`)
- `--text`, `--text-1` through `--text-4`, `--border`, `--border-hover`
- `--green`, `--red`, `--cyan`

Homepage aliases exist in `global.css :root` for backwards compat only.

## Rules
- **Never modify** `CNAME` or `.github/workflows/deploy.yml`
- Keep `index.astro` and `lab.astro` standalone — they are full documents, not Base.astro pages
- Nav link set is unified across both systems: About, Research, Blog, Community, Contact (same order, same labels). `/lab/` is reached from the homepage projects section and the footer, not the nav.
- **Simulated data lives only on `/lab/`, and must be labelled as simulated.** The ticker tape, dashboard, and terminal are generated in-browser from sample values. Do not put them on the homepage or in `Base.astro`, and never describe them as live, real-time, or streaming.
- No unqualified counts or metrics in copy. Say what a number counts (`8 tracked projects`), and derive it from `data/projects.ts` or a content collection.
- Canvas code (knowledge graph) is decorative only
- `nav` sets `backdrop-filter`, which makes it the containing block for fixed descendants — the mobile menu must be `position:absolute` under the bar, not a `position:fixed` overlay
- The homepage `.nav-cta` pill is hidden below 768px; Join lives inside the mobile menu instead
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
- `home.css` and `global.css` still describe the same design system under two sets of variable names
- `.rv2` reveal elements are `opacity:0` until JS runs, so the homepage body is blank with JS disabled
- `home.css` retains some rules for panels that now only exist on `/lab/`