import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://quanthq.in',
  integrations: [mdx(), sitemap()],
  // /about/ was folded into the homepage; keep the old URL alive for inbound links.
  redirects: { '/about': '/#about' },
  vite: { plugins: [tailwindcss()] },
});
