# Implementation Plan: SEO Audit Fixes

## Overview
Implement comprehensive SEO improvements for QuantHQ landing site based on August 2026 audit. Focus on canonical tags, unique metadata, heading structure, JSON-LD structured data, and content clarity for search engines.

## Architecture Decisions
- **Canonical URLs**: Self-referencing canonicals on every indexable page using exact preferred URL format
- **Structured Data**: JSON-LD for Organization, Article, ScholarlyArticle, BreadcrumbList, and ItemList schemas
- **Semantic HTML**: Add proper `<main>`, `<header>`, `<section>` structure for accessibility and SEO
- **Logo Asset**: Create `/public/logo.png` for Organization schema (cannot use data-URI favicon)
- **Component Reuse**: Use existing `JsonLd.astro` component for structured data injection
- **Minimal Changes**: Follow ponytail principle - smallest working diff that addresses root causes

## Task List

### Phase 1: Foundation (First Week - Critical SEO Fixes)

#### Task 1: Add canonical URL system to Base.astro
**Description:** Implement a canonical URL system in Base.astro that generates self-referencing canonical tags for all pages using the layout.

**Acceptance criteria:**
- [ ] Base.astro generates canonical URL using `Astro.url.pathname` and `Astro.site`
- [ ] Canonical URL format matches preferred format: `https://quanthq.in/`, `https://quanthq.in/about/`, etc.
- [ ] Homepage (index.astro) also gets canonical tag despite having standalone layout
- [ ] Canonical URLs are consistent with sitemap URLs

**Verification:**
- [ ] Build succeeds: `cd site && npm run build`
- [ ] Manual check: View source on multiple pages, verify canonical tags present and correct

**Dependencies:** None

**Files likely touched:**
- `site/src/layouts/Base.astro`
- `site/src/pages/index.astro`

**Estimated scope:** Small (2 files)

#### Task 2: Replace generic page descriptions with unique descriptions
**Description:** Update page-specific metadata in Base.astro props to use unique, descriptive titles and meta descriptions for each page type.

**Acceptance criteria:**
- [ ] About page: Title "About QuantHQ | Open Quantitative Finance Research", description about bringing together quants/engineers/mathematicians/AI scientists
- [ ] Research page: Title "Quantitative Finance Research Papers | QuantHQ", description about papers on factor investing, financial AI, NLP, macro regimes
- [ ] Blog page: Title "Quant Finance & Financial AI Blog | QuantHQ", description about practical guides on quantitative research, backtesting, financial AI
- [ ] Community page: Title "Quantitative Finance Community | QuantHQ", description about global community for research discussions, hackathons, collaboration
- [ ] Contact page: Title "Contact QuantHQ | Research Collaboration", description about research collaboration, speaking, partnerships
- [ ] Homepage: Title "QuantHQ | Quantitative Finance & Financial AI Research", description about open research institution for quantitative finance and financial AI
- [ ] Individual research/blog pages keep their existing unique titles/descriptions

**Verification:**
- [ ] Build succeeds: `cd site && npm run build`
- [ ] Manual check: View source on each page, verify unique titles and descriptions

**Dependencies:** Task 1 (canonical system)

**Files likely touched:**
- `site/src/pages/about.astro`
- `site/src/pages/research/index.astro`
- `site/src/pages/blog/index.astro`
- `site/src/pages/community.astro`
- `site/src/pages/contact.astro`
- `site/src/pages/index.astro`

**Estimated scope:** Medium (6 files)

#### Task 3: Fix heading structure across all pages
**Description:** Repair H1/H2 hierarchy and add missing H1s. Add semantic HTML structure with proper `<main>`, `<header>`, `<section>` elements.

**Acceptance criteria:**
- [ ] Homepage: Add explanatory sentence after H1, convert section text to real H2 headings
- [ ] About page: Add `<h1>About QuantHQ</h1>` (currently missing H1)
- [ ] Research archive: Keep H1 "Research", add descriptive introduction paragraph
- [ ] Blog archive: Change H1 from "Blogs" to "Quant Finance and Financial AI Blog"
- [ ] Community page: Keep current H1, add paragraph explaining who community is for
- [ ] Contact page: Add "Contact QuantHQ" in H1 or introductory text
- [ ] All pages: Add semantic `<main id="main-content">`, `<header>`, `<section>` structure
- [ ] Base.astro already has `<main>`, verify individual pages use it correctly

**Verification:**
- [ ] Build succeeds: `cd site && npm run build`
- [ ] Manual check: Use browser dev tools to verify heading hierarchy and semantic structure

**Dependencies:** Task 2 (unique descriptions)

**Files likely touched:**
- `site/src/pages/index.astro`
- `site/src/pages/about.astro`
- `site/src/pages/research/index.astro`
- `site/src/pages/blog/index.astro`
- `site/src/pages/community.astro`
- `site/src/pages/contact.astro`

**Estimated scope:** Medium (6 files)

#### Task 4: Add Organization JSON-LD structured data
**Description:** Add Organization schema JSON-LD to homepage or About page using existing JsonLd.astro component.

**Acceptance criteria:**
- [ ] Organization JSON-LD includes: @context, @type, @id, name, url, logo, sameAs
- [ ] Logo references real `/logo.png` file (not data-URI)
- [ ] sameAs includes: LinkedIn, GitHub, Discord URLs
- [ ] Only real information included (no fake social links)
- [ ] Uses existing JsonLd.astro component for rendering

**Verification:**
- [ ] Build succeeds: `cd site && npm run build`
- [ ] Manual check: View source, verify JSON-LD present and valid schema
- [ ] Manual check: Test with Google Rich Results Test

**Dependencies:** Task 3 (heading structure)

**Files likely touched:**
- `site/src/pages/index.astro` or `site/src/pages/about.astro`
- `site/public/logo.png` (new file)

**Estimated scope:** Small (2 files)

#### Task 5: Add Article/ScholarlyArticle JSON-LD to research and blog pages
**Description:** Add Article structured data to blog posts and ScholarlyArticle to research papers using JsonLd.astro component.

**Acceptance criteria:**
- [ ] Blog posts get Article schema with: headline, description, datePublished, dateModified, author, publisher, image, url, mainEntityOfPage
- [ ] Research papers get ScholarlyArticle schema with same fields plus additional academic fields where available
- [ ] Author names included from frontmatter data
- [ ] Publication dates from content schema
- [ ] Uses existing JsonLd.astro component
- [ ] Individual pages (dynamic routes) include schema

**Verification:**
- [ ] Build succeeds: `cd site && npm run build`
- [ ] Manual check: View source on blog post and research paper, verify JSON-LD present
- [ ] Manual check: Test with Google Rich Results Test

**Dependencies:** Task 4 (Organization schema)

**Files likely touched:**
- `site/src/pages/blog/[...slug].astro`
- `site/src/pages/research/[...slug].astro`

**Estimated scope:** Small (2 files)

#### Task 6: Add BreadcrumbList JSON-LD to individual content pages
**Description:** Add BreadcrumbList schema to individual research papers and blog posts showing navigation path.

**Acceptance criteria:**
- [ ] BreadcrumbList includes: Home → Research/Blog → Individual item
- [ ] Proper itemListElement structure with position and item properties
- [ ] Uses existing JsonLd.astro component
- [ ] Added to both blog and research individual pages

**Verification:**
- [ ] Build succeeds: `cd site && npm run build`
- [ ] Manual check: View source on individual pages, verify breadcrumb JSON-LD

**Dependencies:** Task 5 (Article schema)

**Files likely touched:**
- `site/src/pages/blog/[...slug].astro`
- `site/src/pages/research/[...slug].astro`

**Estimated scope:** Small (2 files)

#### Task 7: Add ItemList JSON-LD to archive pages
**Description:** Add ItemList schema to research and blog archive pages representing the visible lists of papers/posts.

**Acceptance criteria:**
- [ ] Research archive gets ItemList schema with paper list
- [ ] Blog archive gets ItemList schema with post list
- [ ] Includes itemListElement with position and item (name, url)
- [ ] Uses existing JsonLd.astro component
- [ ] Accurately represents visible content

**Verification:**
- [ ] Build succeeds: `cd site && npm run build`
- [ ] Manual check: View source on archive pages, verify ItemList JSON-LD

**Dependencies:** Task 6 (Breadcrumb schema)

**Files likely touched:**
- `site/src/pages/research/index.astro`
- `site/src/pages/blog/index.astro`

**Estimated scope:** Small (2 files)

#### Task 8: Create logo asset for Organization schema
**Description:** Create a proper crawlable logo file at `/public/logo.png` or `/public/logo.svg` for Organization schema (cannot use data-URI favicon).

**Acceptance criteria:**
- [ ] Logo file created at `site/public/logo.png` or `site/public/logo.svg`
- [ ] Logo is QuantHQ branding (consistent with favicon)
- [ ] File is crawlable (not data-URI)
- [ ] Organization schema references this logo URL
- [ ] Logo has reasonable dimensions for web use

**Verification:**
- [ ] Build succeeds: `cd site && npm run build`
- [ ] Manual check: Access `https://quanthq.in/logo.png` after deploy, verify loads
- [ ] Manual check: Organization schema references correct logo URL

**Dependencies:** Task 4 (Organization schema setup)

**Files likely touched:**
- `site/public/logo.png` (new file)

**Estimated scope:** XS (1 file)

#### Task 9: Fix inconsistent/stale site metrics
**Description:** Address inconsistent statistics across pages (582 findings vs 3 papers, 200+ vs 2400+ community members, expired events).

**Acceptance criteria:**
- [ ] Identify all metric instances across site
- [ ] Either: Remove inconsistent metrics, OR make them consistent with one source of truth, OR label them clearly as simulations/examples
- [ ] Remove expired events (Mar 2026 event when current date is Aug 2026)
- [ ] Add "last updated" timestamps to dynamic metrics
- [ ] Do not claim "live" or "real-time" unless data is genuinely live
- [ ] Add short research disclaimer that results are not investment advice

**Verification:**
- [ ] Build succeeds: `cd site && npm run build`
- [ ] Manual check: Review all pages with metrics, verify consistency

**Dependencies:** Task 3 (heading structure - for context on page structure)

**Files likely touched:**
- `site/src/pages/index.astro`
- `site/src/pages/about.astro`
- `site/src/pages/community.astro`

**Estimated scope:** Medium (3 files)

### Checkpoint: Phase 1 Complete
- [ ] All tests pass (build succeeds)
- [ ] Canonical tags sitewide
- [ ] Unique descriptions on all pages
- [ ] Heading structure repaired
- [ ] Semantic HTML structure added
- [ ] Organization, Article, Breadcrumb, ItemList JSON-LD added
- [ ] Logo asset created
- [ ] Inconsistent metrics fixed
- [ ] Ready for Search Console submission

### Phase 2: Content Enhancement (Weeks Two to Four)

#### Task 10: Expand research pages with methodology details
**Description:** Strengthen research pages by adding author profiles, methodology details, limitations, and reproducibility information.

**Acceptance criteria:**
- [ ] Each research paper includes: full title, author names (not initials), author profile links, abstract, keywords, research question, data sources, sample period, methodology, baselines, results, transaction-cost assumptions, out-of-sample methodology, limitations, reproducibility information, code/dataset links, citations, PDF/DOI/preprint links, publication/update dates, related QuantHQ research
- [ ] Financial claims (Sharpe ratios, alpha) include calculation details: sample period, universe, turnover, costs, benchmark, limitations
- [ ] Methodology is transparent and credible
- [ ] Links to supporting explanatory content for complex concepts

**Verification:**
- [ ] Build succeeds: `cd site && npm run build`
- [ ] Manual check: Review each research paper page, verify comprehensive information

**Dependencies:** Phase 1 complete

**Files likely touched:**
- `site/src/content/research/*.mdx` (content files)

**Estimated scope:** Large (3-5 content files)

#### Task 11: Add internal linking between related content
**Description:** Improve internal linking with contextual links: "Related research" on research pages, "Related reading" on blog posts, cross-links between blog and research, author links.

**Acceptance criteria:**
- [ ] Every research page has "Related research" section
- [ ] Every blog post has "Related reading" section
- [ ] Blog posts link to relevant research papers
- [ ] Research pages link to methodology blog posts
- [ ] About page links to research archive and community
- [ ] Community page links to GitHub projects and research
- [ ] Author links from every paper and article
- [ ] Descriptive anchor text (not "Read more", "Click here")

**Verification:**
- [ ] Build succeeds: `cd site && npm run build`
- [ ] Manual check: Navigate content pages, verify contextual links present and descriptive

**Dependencies:** Task 10 (research page expansion)

**Files likely touched:**
- `site/src/pages/research/[...slug].astro`
- `site/src/pages/blog/[...slug].astro`
- `site/src/pages/about.astro`
- `site/src/pages/community.astro`

**Estimated scope:** Medium (4 files)

#### Task 12: Add visible breadcrumbs to content pages
**Description:** Add visible breadcrumb navigation to individual research and blog pages for better UX and SEO.

**Acceptance criteria:**
- [ ] Breadcrumbs visible on individual research pages: Home → Research → Paper Title
- [ ] Breadcrumbs visible on individual blog pages: Home → Blog → Post Title
- [ ] Breadcrumbs are clickable links
- [ ] Breadcrumb JSON-LD already added in Task 6, ensure visual breadcrumbs match
- [ ] Breadcrumbs styled consistently with site design

**Verification:**
- [ ] Build succeeds: `cd site && npm run build`
- [ ] Manual check: Navigate to individual pages, verify breadcrumbs visible and functional

**Dependencies:** Task 11 (internal linking)

**Files likely touched:**
- `site/src/pages/research/[...slug].astro`
- `site/src/pages/blog/[...slug].astro`

**Estimated scope:** Small (2 files)

#### Task 13: Make project cards crawlable links
**Description:** Convert JavaScript-only clickable project cards to actual `<a href="...">` elements for better crawling and accessibility.

**Acceptance criteria:**
- [ ] Project cards that lead to repositories/tools use real `<a>` elements
- [ ] No JavaScript-only click handlers for navigation
- [ ] Cards remain visually consistent
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] Screen readers announce as links

**Verification:**
- [ ] Build succeeds: `cd site && npm run build`
- [ ] Manual check: Tab through project cards, verify they are actual links
- [ ] Manual check: Screen reader test (if available)

**Dependencies:** Task 12 (breadcrumbs)

**Files likely touched:**
- `site/src/pages/index.astro` (project cards in homepage)
- `site/src/pages/community.astro` (if project cards present)

**Estimated scope:** Small (1-2 files)

#### Task 14: Add HTML alternatives for canvas content
**Description:** Make canvas content search-friendly by adding HTML text explanations and text alternatives for visual information.

**Acceptance criteria:**
- [ ] Homepage canvas elements (hero, globe, knowledge graph) have nearby HTML text explanations
- [ ] Canvas elements have `aria-hidden="true"` if decorative
- [ ] Text alternatives explain what the visual represents
- [ ] Research findings not only inside canvas/animation
- [ ] Published charts use `<img>` or `<picture>` with descriptive filenames and alt text
- [ ] Images have explicit `width` and `height` attributes
- [ ] Below-fold images use lazy loading

**Verification:**
- [ ] Build succeeds: `cd site && npm run build`
- [ ] Manual check: View homepage with canvas elements, verify text alternatives present
- [ ] Manual check: Disable JavaScript, verify content still understandable

**Dependencies:** Task 13 (project cards)

**Files likely touched:**
- `site/src/pages/index.astro` (canvas elements)

**Estimated scope:** Medium (1 file with significant additions)

### Checkpoint: Phase 2 Complete
- [ ] All tests pass (build succeeds)
- [ ] Research pages expanded with comprehensive methodology
- [ ] Internal linking network established
- [ ] Visible breadcrumbs added
- [ ] Project cards are crawlable links
- [ ] Canvas content has HTML alternatives
- [ ] Ready for content cluster development

### Phase 3: Content Clusters (Month Two Onward)

#### Task 15: Create factor investing and backtesting content cluster
**Description:** Build supporting articles around existing "Five Backtesting Pitfalls That Fake Your Sharpe" blog post to create a topical cluster.

**Acceptance criteria:**
- [ ] Existing backtesting pitfalls article is cluster hub
- [ ] Supporting articles: lookahead bias, survivorship bias, walk-forward validation, deflated Sharpe ratios, transaction-cost modelling, regime-aware backtesting, reproducible backtests
- [ ] Internal links between all cluster articles
- [ ] Each article targets specific search themes (factor investing research, systematic investing research)
- [ ] Content is high-quality, not AI-generated filler

**Verification:**
- [ ] Build succeeds: `cd site && npm run build`
- [ ] Manual check: Navigate cluster, verify internal linking network

**Dependencies:** Phase 2 complete

**Files likely touched:**
- `site/src/content/blog/*.mdx` (new articles)

**Estimated scope:** Large (7-8 new blog posts)

#### Task 16: Create financial AI and NLP content cluster
**Description:** Build supporting articles around LLM earnings sentiment research paper to create a topical cluster.

**Acceptance criteria:**
- [ ] LLM earnings sentiment paper is cluster hub
- [ ] Supporting articles: LLMs for financial sentiment analysis, earnings-call NLP, semantic delta in financial text, evaluating language models on financial data, leakage risks in financial NLP
- [ ] Internal links between research paper and supporting articles
- [ ] Targets financial machine learning research themes
- [ ] High-quality, researched content

**Verification:**
- [ ] Build succeeds: `cd site && npm run build`
- [ ] Manual check: Navigate cluster, verify research-to-blog linking

**Dependencies:** Task 15 (first cluster complete)

**Files likely touched:**
- `site/src/content/blog/*.mdx` (new articles)

**Estimated scope:** Large (5-6 new blog posts)

#### Task 17: Create macro regimes and factor rotation content cluster
**Description:** Build supporting articles around yield curve regime classifier research paper to create a topical cluster.

**Acceptance criteria:**
- [ ] Yield curve regime classifier paper is cluster hub
- [ ] Supporting articles: yield curve inversion and equities, Hidden Markov models for market regimes, factor rotation by macro regime, momentum versus value across market cycles
- [ ] Internal links between research paper and supporting articles
- [ ] Targets macroeconomic and systematic investing themes
- [ ] High-quality, researched content

**Verification:**
- [ ] Build succeeds: `cd site && npm run build`
- [ ] Manual check: Navigate cluster, verify research-to-blog linking

**Dependencies:** Task 16 (second cluster complete)

**Files likely touched:**
- `site/src/content/blog/*.mdx` (new articles)

**Estimated scope:** Large (4-5 new blog posts)

#### Task 18: Release code, datasets, and reproducibility artifacts
**Description:** Publish code, datasets, charts, or reproducibility notes for research papers to enhance credibility and earn citations.

**Acceptance criteria:**
- [ ] GitHub repositories linked from research papers
- [ ] Datasets made available where possible
- [ ] Reproducibility notes included with methodology
- [ ] Code is well-documented and runnable
- [ ] Licenses are clear for reuse
- [ ] Citations and links encouraged

**Verification:**
- [ ] Build succeeds: `cd site && npm run build`
- [ ] Manual check: Verify GitHub links work, repositories exist

**Dependencies:** Task 17 (third cluster complete)

**Files likely touched:**
- GitHub repositories (external)
- `site/src/content/research/*.mdx` (add github links)

**Estimated scope:** Large (external repositories + content updates)

### Checkpoint: Phase 3 Complete
- [ ] All tests pass (build succeeds)
- [ ] Three content clusters established
- [ ] Supporting articles published for each cluster
- [ ] Code/datasets/reproducibility artifacts released
- [ ] Internal linking network comprehensive
- [ ] Ready for Search Console monitoring and iteration

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking existing layout/design | High | Test each change with build, verify visual appearance unchanged |
| Introducing inconsistent metadata | Medium | Use systematic approach, audit all pages after changes |
| JSON-LD schema validation errors | Medium | Test with Google Rich Results Test, use only real data |
| Content cluster quality issues | High | Focus on quality over quantity, research topics thoroughly |
| Performance regression from new content | Medium | Monitor load times, optimize images, use lazy loading |
| Logo asset not matching branding | Low | Use existing favicon design as basis for logo file |

## Open Questions
- Should Organization schema go on homepage or About page? (Recommend: homepage for maximum visibility)
- What specific logo dimensions/format should be used? (Recommend: PNG, 200x200px or similar square format)
- For research expansion, should we prioritize methodology details or supporting articles first? (Recommend: methodology details first as audit highlights this as major issue)
- Should we remove inconsistent metrics entirely or make them consistent? (Recommend: make consistent with one source of truth or label as simulations)

## Implementation Notes
- Follow ponytail principle: smallest working diff, reuse existing patterns, no unnecessary abstractions
- Use existing `JsonLd.astro` component for all structured data
- Homepage is standalone - changes there must not affect Base.astro
- All npm commands run from `site/` directory
- `npm run build` is the only correctness gate - run before considering any task complete
- Do not modify `CNAME` or `.github/workflows/deploy.yml`
- Keep `index.astro` standalone per project rules
