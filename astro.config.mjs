// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import remarkGithubAdmonitionsToDirectives from 'remark-github-blockquote-alert';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: 'https://0xghost.pages.dev',
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()],

    define: {
      __dirname: '""',
      'process.env.NODE_ENV': '"production"',
    },

    ssr: {
      external: ['node:fs', 'node:path', 'node:os', 'canvaskit-wasm'],
    }
  },

  markdown: {
    remarkPlugins: [remarkGithubAdmonitionsToDirectives],
  },

  adapter: cloudflare({
    imageService: 'compile',
  })
});