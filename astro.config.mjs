// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import remarkGithubAdmonitionsToDirectives from 'remark-github-blockquote-alert';

// https://astro.build/config
export default defineConfig({
  site: 'https://0xghost.vercel.app',
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  },

  markdown: {
    remarkPlugins: [remarkGithubAdmonitionsToDirectives],
  }
});