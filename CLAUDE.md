# Austin Xu Blog - Claude Context

## Project Overview

Personal brand blog built with Docusaurus 3.x, deployed to GitHub Pages.
Focus: Platform engineering, cloud computing, leadership, and personal interests (tennis, travel).

**Live site:** https://austinxyz.github.io/blogs/

## Tech Stack

- **Framework:** Docusaurus 3.9.2 (blog-only mode, docs disabled)
- **Language:** TypeScript + React 19
- **Node.js:** >= 20.0
- **Hosting:** GitHub Pages (`gh-pages` branch)
- **Deployment:** Manual via `npm run deploy` or GitHub Actions

## Key Commands

```bash
npm run start       # Dev server with hot reload (http://localhost:3000)
npm run build       # Production build (validates links, frontmatter)
npm run serve       # Preview production build locally
npm run clear       # Clear Docusaurus cache
npm run typecheck   # TypeScript type check
npm run deploy      # Build + deploy to GitHub Pages
```

Always run `npm run build` before pushing to catch broken links and frontmatter errors.

## Directory Structure

```
blog/               # Blog posts (Markdown/MDX)
  YYYY-MM-DD-title.md          # Single-file post
  YYYY-MM-DD-title/            # Multi-file post (with images)
    index.md
    images/
src/
  components/       # React components (e.g., HomepageFeatures)
  css/custom.css    # Global CSS overrides
  pages/            # Static pages (about.md, resume.md, index.tsx)
static/
  img/              # Site-wide images
  downloads/        # PDFs and downloadable files
docs/
  plans/            # Architecture and design documents
  rules/            # Project conventions and guidelines
docusaurus.config.ts  # Main config (navbar, footer, plugins)
sidebars.ts           # Sidebar config (unused, docs disabled)
```

## Blog Post Conventions

**Frontmatter template:**
```yaml
---
title: "Post Title"
date: 2026-01-15
authors: [austin]
tags: [cloud-computing, kubernetes, leadership]
description: "One-sentence summary for SEO and post previews"
---
```

**Available tags:** `ai`, `cloud-computing`, `kubernetes`, `leadership`, `management`,
`career-development`, `tennis`, `hobbies`, `travel`, `wealth-management`

**Truncation marker:** Add `<!--truncate-->` after the intro paragraph so the blog list shows a preview instead of the full post.

**Images:** Store alongside the post in `blog/YYYY-MM-DD-title/images/`, reference with `./images/filename.jpg`.

## Code Patterns

- New React components → follow pattern in `src/components/HomepageFeatures/index.tsx`
- New static pages → follow pattern in `src/pages/about.md` (Markdown) or `src/pages/index.tsx` (React)
- CSS → add to `src/css/custom.css` using Docusaurus CSS variables where possible

## Common Issues

- **Build fails on broken links:** Check frontmatter paths and internal links; `onBrokenLinks: 'throw'` is set
- **"onUntruncatedBlogPosts" warning:** Add `<!--truncate-->` to long posts
- **Image 404 in production:** Use `/blogs/img/...` for `static/img/` assets (baseUrl is `/blogs/`)
