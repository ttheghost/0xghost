import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()),
    videoUrl: z.string().optional(), // YouTube video URL for video posts
    videoDuration: z.string().optional(), // e.g., "45:30" for display
  })
});

export const collections = { blog };