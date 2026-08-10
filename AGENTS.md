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
- **Base system** — every page except `/lab/` (home, about, community, contact, blog/*, research/*) uses `layouts/Base.astro` + `styles/global.css`. `index.astro` was moved onto Base in the 2026-08 redesign so the homepage and the rest of the site share one nav, footer, and variable set.
- **Home system (legacy, `/lab/` only)** — `pages/lab.astro` is still a standalone `<html>` document importing `styles/home.css` (theme vars under the `--black`/`--carbon`/`--blue` names) with `components/HomeNav.astro` + `components/HomeFooter.astro`. It is the last page on that system; do not add new pages to it.

Never load `home.css` and `global.css` in the same page — both define `:root` under different names. Components used by both (`KnowledgeGraph.astro`, `SignalDashboard.astro`) must give CSS-variable fallbacks, e.g. `var(--accent, #3D7BFF)`.

- `site/src/data/projects.ts` — **single source of truth for the project list and every project count** on the site. Paper/article counts come from the content collections. Never hand-write a count in markup.
- `site/src/content.config.ts` — Astro 5 `glob()` loader API (not legacy collection style). Two collections: `research`, `blog`
- `site/src/data/links.ts` — **single source of truth for every off-site URL** (LinkedIn group, GitHub). Never inline an external URL in a page.
- `site/src/components/` — `AboutStory.astro`, `CommandPalette.astro`, `JsonLd.astro`, `KnowledgeGraph.astro`, `SignalDashboard.astro`, `HomeNav.astro`, `HomeFooter.astro`
- `site/src/data/sampleMarket.ts` — **single source of truth for the simulated ticker values.** Shared by `SignalDashboard.astro` and the `/lab/` ticker tape so they cannot drift apart. Nothing here is fetched.
- Content: `site/src/content/blog/*.mdx` (5 posts), `site/src/content/research/*.mdx` (3 papers)
- Dynamic routes use `[...slug].astro` pattern

### Homepage section order
Hero (copy + knowledge graph) → 01 why join → 02 research → 03 writing → 04 join. Keep it to five; interactive spectacle belongs on `/lab/`.

### Design language
One section pattern site-wide, defined in `global.css`: `.band` (hairline-ruled block) > `.kicker` (mono number + label) > `.headline` (Instrument Serif) > `.lead`. Two buttons only — `.btn-solid`, `.btn-outline`; everything else is an `.arrow-link`. The background is flat: the aurora/nebula/grid/vignette/grain layers were deleted in the 2026-08 redesign and must not come back. One motion idea only — the `.rv` fade-and-rise on scroll, plus its `.rv-stagger` cascade (children of a revealing container) and `.headline-rule` (hairline that draws itself). All three share the one `rise` keyframe in `global.css`; do not add a fourth vocabulary.

The homepage opens with a curtain (`.intro` in `index.astro`): wordmark + rule, then a wipe upward. It is CSS-timed with nothing to remove it, so it **must** end at `opacity:0` and `pointer-events:none` on its own, and it is gated two ways — `html.intro-play` (set by an inline script only on the session's first visit), and hidden outright under `prefers-reduced-motion`. That last guard is load-bearing: `global.css` disables all animation under reduced motion, so without it the curtain freezes opaque and the homepage becomes unreachable. `--intro-lead` offsets the hero entrance so the two read as one opening.

`.rv` reveals are gated behind `html.js` (set by the inline head script) so the page is fully readable without JS, in print, and in full-page screenshots. Keep that gate on any new reveal class.

## CSS Variables
In the Base system use the canonical names from `global.css`; in the home system use `home.css`'s own set (`--black`, `--carbon`, `--blue`, `--violet`, `--gold`).

Canonical (`global.css`):
- `--bg` (not `--black`), `--card-bg` (not `--carbon`), `--accent` (not `--blue`), `--accent2` (not `--violet`)
- `--text`, `--text-1` through `--text-4`, `--border`, `--border-hover`
- `--green`, `--red`, `--cyan`

Homepage aliases exist in `global.css :root` for backwards compat only.

## Rules
- **Never modify** `CNAME` or `.github/workflows/deploy.yml`
- Keep `lab.astro` standalone — it is a full document, not a Base.astro page
- Nav link set is unified across both systems: About, Research, Blog, Community, Contact (same order, same labels). `/lab/` is reached from the homepage join section and the footer, not the nav.
- **Simulated data lives only on `/lab/` and `/about/`, and must be labelled as simulated.** The dashboard (`SignalDashboard.astro`), ticker tape, and terminal are generated in-browser from sample values. Every cell carries a `sample` chip and the host page states the disclosure in prose. Do not put them on the homepage or in `Base.astro`, and never describe them as live, real-time, or streaming.
- No unqualified counts or metrics in copy. Say what a number counts (`8 tracked projects`), and derive it from `data/projects.ts` or a content collection.
- Canvas code (knowledge graph) is decorative only. `KnowledgeGraph.astro` is shared by `/`, `/about/`, and `/lab/`; `SignalDashboard.astro` by `/about/` and `/lab/` — one implementation each, do not fork them.
- **Nothing on the site may claim a Discord.** The old `discord.gg/quanthq` invite is dead and was removed everywhere.
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