# Blog

`/blog/`, its posts and `/blog/rss.xml` are built from this folder by
`build.mjs` (no dependencies, Node 18+). Nothing here is served.

To add a post:

1. Add an entry to `posts.json`:
   `{ "slug": "my-post", "title": "…", "date": "2026-12-01", "description": "…" }`
2. Write the body as plain HTML in `posts/my-post.html`. Each `<h2>` becomes
   an entry in the post's table of contents.
3. Run `node scripts/blog/build.mjs` and commit what it writes under
   `website/blog/`. `node scripts/blog/build.mjs --check` fails if that
   output is out of date.

The page around each post is `layout.html`; the blog's name, description
and URL are in `site.json`. `website/blog/blog.css` and `toc.js` are
hand-written, not generated.

A post merged to main is published, so drafts stay on a branch (a Vercel
preview) until they're cleared.
