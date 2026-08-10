# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

All project guidance lives in @AGENTS.md — stack, commands, conventions, rules, and known tech debt. Keep that file as the single source of truth; update it there, not here.

Quick orientation (verified against the code):
- Astro 5 static site in `site/` — all npm commands run from `site/`, not the repo root.
- `npm run dev` / `npm run build` / `npm run preview`. No tests, no lint — `npm run build` is the only correctness gate; run it before calling any change done.
- `lab.astro` is the only standalone full `<html>` document left (uses `styles/home.css` + `HomeNav`/`HomeFooter`). Every other page, including `index.astro`, uses `layouts/Base.astro` + `styles/global.css`. Never load both stylesheets in one page — they define `:root` under different variable names.
- External URLs live in `site/src/data/links.ts`, never inline.
- Blog/research content is MDX under `site/src/content/`, schemas in `site/src/content.config.ts` — Astro 5 `glob()` loader API, not the legacy `src/content/config.ts` collection style.
- Deploys to GitHub Pages (quanthq.in). Never touch `CNAME` or `.github/workflows/deploy.yml`.
