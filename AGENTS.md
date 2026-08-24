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
- **One layout system.** Every page — home, lab, community, contact, blog/*, research/* — uses `layouts/Base.astro` + `styles/global.css`. There is no second stylesheet and no standalone document. `home.css` (1,123 lines), `HomeNav.astro`, and `HomeFooter.astro` were deleted in the 2026-08 cleanup when `/lab/` was ported onto Base; do not reintroduce a parallel design system.

- `site/src/data/projects.ts` — **single source of truth for the project list and every project count** on the site. Paper/article counts come from the content collections. Never hand-write a count in markup.
- `site/src/content.config.ts` — Astro 5 `glob()` loader API (not legacy collection style). Two collections: `research`, `blog`
- `site/src/data/links.ts` — **single source of truth for every off-site URL** (LinkedIn group, GitHub). Never inline an external URL in a page.
- `site/src/components/` — `CommandPalette.astro`, `JsonLd.astro`, `KnowledgeGraph.astro`, `SignalDashboard.astro`
- `site/src/data/sampleMarket.ts` — **single source of truth for the simulated ticker values.** Shared by `SignalDashboard.astro` and the `/lab/` ticker tape so they cannot drift apart. Nothing here is fetched.
- Content: `site/src/content/blog/*.mdx` (5 posts). **The `research` collection is intentionally empty** — see Honesty rules.
- Dynamic routes use `[...slug].astro` pattern

### Homepage section order
Hero (centred copy) → knowledge graph (full width, below the hero) → 01 why join → 02 reading list → 03 writing → 04 who it's for → 05 about → 06 join. The homepage is the whole landing page: there is no separate About page. Interactive spectacle belongs on `/lab/`.

The homepage is centre-aligned, modelled on openalgo.in: the hero is a single centred column (eyebrow, headline, lead, CTAs, stats row) with the `KnowledgeGraph` as its own full-width section underneath rather than a second grid column. Each band carries `.band-center` (scoped in `index.astro`, not `global.css` — other pages stay left-aligned), which centres the kicker, headline, lead, and trailing `.arrow-link`. **Data rows stay left-aligned** — the reading, writing, and fit lists are long-line content and become unreadable centred. `.band-center` also flips `.headline-rule`'s `transform-origin` to `center` so the hairline opens from the middle.

### Design language
One section pattern site-wide, defined in `global.css`: `.band` (hairline-ruled block) > `.kicker` (mono number + label) > `.headline` (Instrument Serif) > `.lead`. Two buttons only — `.btn-solid`, `.btn-outline`; everything else is an `.arrow-link`. The background is flat: the aurora/nebula/grid/vignette/grain layers were deleted in the 2026-08 redesign and must not come back. One motion idea only — the `.rv` fade-and-rise on scroll, plus its `.rv-stagger` cascade (children of a revealing container) and `.headline-rule` (hairline that draws itself). All three share the one `rise` keyframe in `global.css`; do not add a fourth vocabulary.

The homepage opens with a curtain (`.intro` in `index.astro`): wordmark + rule, then a wipe upward. It is CSS-timed with nothing to remove it, so it **must** end at `opacity:0` and `pointer-events:none` on its own, and it is gated two ways — `html.intro-play` (set by an inline script only on the session's first visit), and hidden outright under `prefers-reduced-motion`. That last guard is load-bearing: `global.css` disables all animation under reduced motion, so without it the curtain freezes opaque and the homepage becomes unreachable. `--intro-lead` offsets the hero entrance so the two read as one opening.

Alignment is centred site-wide: homepage bands carry `.band-center` (scoped in `index.astro`), interior pages wrap their header in `.page-head` (defined in `global.css`). **Long-line content stays left-aligned** — paper rows, article rows, and card bodies become unreadable centred. One h1 scale everywhere: `clamp(44px,7vw,92px)`.

`--nav-h` (`global.css`) is the single source for the fixed nav height; `.page-main`, the reading-progress bar, the `/lab/` ticker tape, and anchor `scroll-margin-top` all derive from it. Never hard-code 64px again.

`.rv` reveals are gated behind `html.js` (set by the inline head script) so the page is fully readable without JS, in print, and in full-page screenshots. Keep that gate on any new reveal class.

## CSS Variables
One set, canonical, from `global.css` — the `home.css` alias set is gone with the file.
- `--bg` (not `--black`), `--card-bg` (not `--carbon`), `--accent` (not `--blue`), `--accent2` (not `--violet`)
- `--text`, `--text-1` through `--text-4`, `--border`, `--border-hover`
- `--green`, `--red`, `--cyan`, `--gold`, `--surface-2`, `--nav-h`
- **`--text-4` is decorative only** (dots, hairlines, text-stroke) — it fails AA as text. Use `--text-3` for anything readable.

Homepage aliases exist in `global.css :root` for backwards compat only.

## Honesty rules (non-negotiable)
The 2026-08 audit found the site was asserting things that were not true. Do not
reintroduce any of them:
- **No invented research.** Three papers with fabricated authors ("Chen, A.", "Rodriguez, M.", "Liu, J.") and fabricated results (Sharpe 1.72, 1.8% alpha) were deleted. The `research` collection is empty and the route renders fine that way — `research/index.astro` guards the papers section and the ItemList schema on `papers.length`. If a real paper is ever added, it needs a real author and a real, reproducible result.
- **No scheduled programs that do not run.** "Reading Groups — Every Tuesday" and "Quarterly hackathons with prizes" were deleted from `/community/`. Do not advertise a cadence nobody can show up to.
- **Every project in `data/projects.ts` must be a repo that resolves.** The list previously held eight entries pointing at `github.com/quanthq/*`, an org that does not exist — all six repo links 404'd. The real org is `quantheadquarters`.
- **No fake engagement.** The blog's localStorage-backed reaction counters were deleted; they showed each reader their own clicks as if it were a tally.
- **No "papers we published" count.** We curate a reading list and write articles. Say that.

## Rules
- **Never modify** `CNAME` or `.github/workflows/deploy.yml`
- Nav link set is unified across both systems: About, Research, Blog, Community, Contact (same order, same labels). **About is the anchor `/#about` on the homepage, not a page** — `/about/` was folded into the homepage and now only exists as a redirect declared in `astro.config.mjs`. `/lab/` is reached from the homepage join section and the footer, not the nav.
- **Simulated data lives only on `/lab/`, and must be labelled as simulated.** The dashboard (`SignalDashboard.astro`), ticker tape, and terminal are generated in-browser from sample values. Every cell carries a `sample` chip and the host page states the disclosure in prose. Do not put them on the homepage or in `Base.astro`, and never describe them as live, real-time, or streaming.
- No unqualified counts or metrics in copy. Say what a number counts (`8 tracked projects`), and derive it from `data/projects.ts` or a content collection.
- Canvas code (knowledge graph) is decorative only. `KnowledgeGraph.astro` is shared by `/` and `/lab/`; `SignalDashboard.astro` is used by `/lab/` only — one implementation each, do not fork them.
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
- `.rv2` reveal elements are `opacity:0` until JS runs, so the homepage body is blank with JS disabled
- `home.css` retains some rules for panels that now only exist on `/lab/`