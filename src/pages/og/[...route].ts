import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

const entries = await getCollection('blog');

const pages = Object.fromEntries(entries.map((post) => [post.id, post.data]));

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'route',
  pages: pages,

  getSlug: (_path, page) => _path + '.png',

  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    
    bgGradient: [[9, 9, 11]], // Zinc-950 (#09090b)
    border: { color: [74, 222, 128], width: 20 }, // Green-400
    padding: 60,
    font: {
      title: { 
        size: 80, 
        families: ['JetBrains Mono'], 
        weight: 'Bold', 
        color: [255, 255, 255],
      },
      description: { 
        size: 40, 
        families: ['JetBrains Mono'], 
        color: [161, 161, 170], // Zinc-400
        lineHeight: 1.4,
      },
    },
    logo: {
      path: './public/favicon.svg',
      size: [100],
    },
  }),
});