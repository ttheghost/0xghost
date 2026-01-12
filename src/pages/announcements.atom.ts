import { getCollection } from 'astro:content';

export async function GET() {
    const posts = await getCollection('blog');

    // Sort posts by date, newest first
    const sortedPosts = posts.sort((a, b) =>
        b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
    );

    // Get the most recent post date for the feed's updated timestamp
    const lastUpdated = sortedPosts[0]?.data.pubDate || new Date();

    const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <title>0xGhost Announcements</title>
  <subtitle>New blog posts on C++, systems programming, and performance optimization</subtitle>
  <logo>https://0xghost.dev/favicon.png</logo>
  
  <link href="https://0xghost.dev/announcements.atom" rel="self"/>
  <link href="https://0xghost.dev/"/>
  
  <id>https://0xghost.dev/</id>
  <updated>${lastUpdated.toISOString()}</updated>
  
  <author>
    <name>0xGhost</name>
    <uri>https://0xghost.dev</uri>
  </author>
  ${sortedPosts.map(post => `
  <entry>
    <title>${escapeXml(post.data.title)}</title>
    <link href="https://0xghost.dev/blog/${post.id}/"/>
    <id>https://0xghost.dev/blog/${post.id}/</id>
    <updated>${post.data.pubDate.toISOString()}</updated>
    <summary>${escapeXml(post.data.description)}</summary>
    <content type="html">${escapeXml(post.data.description)}</content>
    <media:thumbnail url="https://0xghost.dev/og/${post.id}.png"/>
  </entry>`).join('\n')}
</feed>`;

    return new Response(feed, {
        headers: {
            'Content-Type': 'application/atom+xml; charset=utf-8',
        },
    });
}

function escapeXml(unsafe: string): string {
    if (!unsafe) return '';
    return unsafe.replace(/[<>&'"]|[\u0080-\uFFFF]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return `&#${c.charCodeAt(0)};`;
        }
    });
}