// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import remarkGithubAdmonitionsToDirectives from 'remark-github-blockquote-alert';
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
  site: 'https://0xghost.dev/',
  integrations: [
    react(),
    mermaid({
      mermaidConfig: {
        theme: 'base',
        themeVariables: {
          // Typography
          fontFamily: '"JetBrains Mono", monospace',
          
          // Node Colors
          primaryColor: '#18181b',        // zinc-900
          primaryTextColor: '#f4f4f5',    // zinc-100
          primaryBorderColor: '#27272a',  // zinc-800
          nodeBorder: '#27272a',          // zinc-800
          mainBkg: '#18181b',             // zinc-900
          
          // Line & Text Colors
          lineColor: '#a1a1aa',           // zinc-400
          textColor: '#a1a1aa',           // zinc-400
          edgeLabelBackground: '#09090b', // zinc-950 (site bg)
          
          // Subgraph Colors
          clusterBkg: '#09090b',          // zinc-950
          clusterBorder: '#27272a',       // zinc-800
          titleColor: '#f4f4f5',          // zinc-100
        }
      }
    }),
    sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    remarkPlugins: [remarkGithubAdmonitionsToDirectives],
  },
});