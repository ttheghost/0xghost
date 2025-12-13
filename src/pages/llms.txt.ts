import { getCollection } from 'astro:content';

export async function GET() {
    const posts = await getCollection('blog');

    // Sort posts by date, newest first
    const sortedPosts = posts.sort((a, b) =>
        b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
    );

    const baseUrl = 'https://0xghost.dev';

    const llmsTxt = `# 0xGhost - Systems Programming & C++ Blog

> A deep dive into C++, systems programming, performance optimization, and low-level computing

## Site Information

- **Name**: 0xGhost
- **Author**: 0xGhost
- **URL**: ${baseUrl}
- **Topics**: C++, Systems Programming, Performance Optimization, Move Semantics, Template Metaprogramming
- **Language**: English

## Main Pages

- Home: ${baseUrl}/
- Blog: ${baseUrl}/blog/
- Projects: ${baseUrl}/projects/
- About: ${baseUrl}/about/
- Privacy Policy: ${baseUrl}/privacy/

## Blog Posts (${sortedPosts.length} total)

${sortedPosts.map(post => {
        const url = `${baseUrl}/blog/${post.slug}/`;
        const date = post.data.pubDate.toISOString().split('T')[0];
        const tags = post.data.tags?.join(', ') ?? 'none';
        const description = post.data.description ?? 'No description provided.';

        return `### ${post.data.title}
- URL: ${url}
- Published: ${date}
- Tags: ${tags}
- Description: ${description}
`;
    }).join('\n')} 

## Tags

${Array.from(new Set(sortedPosts.flatMap(p => p.data.tags)))
            .sort()
            .map(tag => `- ${tag}: ${baseUrl}/tags/${tag}/`)
            .join('\n')}

## Additional Resources

- RSS/Atom Feed: ${baseUrl}/announcements.atom
- GitHub Discussions: https://github.com/ttheghost/0xghost/discussions/categories/announcements

## Content Guidelines

This blog focuses on:
- Deep technical dives into C++ language features
- Performance optimization techniques
- Move semantics and value categories
- Template metaprogramming
- Systems-level programming concepts
- Real-world code examples with benchmarks

All code examples are tested and production-ready. Articles include detailed explanations, 
performance benchmarks, and references to C++ standards.

## Contact & Social

- GitHub: https://github.com/ttheghost/0xghost
- Website: ${baseUrl}

---
Last updated: ${new Date().toISOString().split('T')[0]}
Generated automatically from blog content
`;

    return new Response(llmsTxt, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
}
