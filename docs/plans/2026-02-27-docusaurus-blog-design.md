# Docusaurus Personal Blog Design

**Date:** 2026-02-27
**Author:** Austin Xu
**Status:** Approved

## Purpose

Create a personal brand blog site that showcases professional expertise (platform engineering, cloud computing, leadership) while also highlighting personal interests (tennis, travel, wealth management, career development). The site will serve a mixed audience including potential employers, peers, mentees, family, and friends.

## Goals

- Professional-first presentation with personal interests enriching the full picture
- Support regular publishing cadence (1-2 posts per month)
- Convert existing materials (resume, Claude Code guide, tennis journey) into blog posts
- Host on GitHub Pages for simplicity
- Enable easy content discovery through tags and collections

## Architecture

### Site Structure

```
/ (landing page)
├── /blog (chronological posts with tags)
├── /collections (curated topic pages)
│   ├── /cloud-computing
│   ├── /ai
│   ├── /leadership
│   ├── /pdlc
│   ├── /hobbies
│   ├── /travel
│   ├── /wealth-management
│   ├── /retirement-planning
│   ├── /career-development
│   └── /family-friends
├── /about (personal introduction)
└── /resume (standalone resume page)
```

### Technology Stack

- **Framework:** Docusaurus 3.x (latest stable)
- **Hosting:** GitHub Pages
- **Deployment:** GitHub Actions for automated CI/CD
- **Content:** Markdown blog posts with frontmatter
- **Plugins:**
  - Built-in blog plugin
  - Built-in search
  - Custom collection pages using React components

### Content Strategy

- Raw materials stored in `raw_docs/` directory
- Converted to blog posts in `blog/` directory
- Posts tagged with relevant categories (e.g., `cloud-computing`, `leadership`, `tennis`)
- Collection pages dynamically aggregate posts by tag
- Landing page features recent posts and professional highlights

## Components

### 1. Landing Page

**Purpose:** First impression that establishes professional credibility while hinting at personal interests

**Contents:**
- **Hero section:** Name, professional title, tagline ("Experienced platform engineering leader with 20+ years...")
- **Featured content:** 3-4 pinned posts or achievements (technical deep-dives, leadership insights, tennis championship)
- **Recent posts:** Latest 3-5 blog entries with excerpts
- **Quick links:** Navigate to About, Resume, Blog, Collections
- **Footer:** Social links (LinkedIn, GitHub), contact email

### 2. Blog Section

**Purpose:** Primary content area for chronological posts

**Features:**
- Standard Docusaurus blog with sidebar
- Tag system: `cloud-computing`, `ai`, `kubernetes`, `leadership`, `management`, `pdlc`, `tennis`, `pickleball`, `travel`, `wealth-management`, `retirement`, `career`, `family`
- Post metadata: author, date, tags, reading time, description
- Pagination: 10 posts per page
- RSS feed: auto-generated
- Search: built-in Docusaurus search

**Post Frontmatter:**
```yaml
---
title: "Post Title"
date: 2026-02-27
authors: [austin]
tags: [cloud-computing, kubernetes, leadership]
description: "Brief post description for SEO and previews"
image: ./images/post-image.jpg (optional)
---
```

### 3. Collection Pages

**Purpose:** Curated views of content by topic area

**Implementation:**
- Custom React components using `@docusaurus/plugin-content-blog` API
- Filter posts by tag at build time
- Display list of matching posts ordered by date
- Each collection page includes:
  - Topic description/introduction
  - List of all tagged posts
  - Automatic updates when new tagged posts are added

**Example:** `/collections/cloud-computing` shows all posts tagged with `cloud-computing`

### 4. Static Pages

**About Page:**
- Convert introduction PDF to narrative format
- Include photo, background, interests
- Personal story that connects professional and personal themes

**Resume Page:**
- Clean web-formatted version of resume markdown
- Download link to PDF version
- Highlight key achievements and skills

### 5. Navigation

**Top Navbar:**
- Home | Blog | Collections (dropdown) | About | Resume
- Search bar
- Mobile-responsive hamburger menu
- Breadcrumbs for context

## Data Flow

### Content Creation Flow

```
Raw materials (raw_docs/)
  ↓
Convert to blog posts (blog/YYYY-MM-DD-title.md)
  ↓
Add frontmatter (title, date, tags, author, description)
  ↓
Docusaurus build process
  ↓
Static site generation
  ↓
Deploy to GitHub Pages
```

### Build & Deployment Flow

```
Commit to main branch (GitHub)
  ↓
GitHub Actions workflow triggered
  ↓
npm install dependencies
  ↓
npm run build (Docusaurus builds static site)
  ↓
Deploy to gh-pages branch
  ↓
GitHub Pages serves from gh-pages
  ↓
Site live at https://[username].github.io/blogs
```

### Asset Management

- **Images:** Store alongside blog posts in `blog/YYYY-MM-DD-post/images/`
- **Downloads:** Store in `static/downloads/` (e.g., PDFs, resumes)
- **References:** Use relative paths in markdown

### Search Indexing

- Docusaurus automatically indexes all markdown content
- Search bar provides instant results
- No external search service required

## Error Handling

### Build-time Errors

**Issues:**
- Broken internal links
- Invalid frontmatter YAML
- Missing images
- Markdown syntax errors

**Strategy:**
- Docusaurus validates and fails build on errors
- Run `npm run build` locally before pushing
- Fix errors based on clear error messages

### Deployment Errors

**Issues:**
- GitHub Actions workflow failures
- Build failures in CI

**Strategy:**
- GitHub notifications (email/web) on failures
- View build logs in Actions tab
- Failed builds don't affect live site (previous version stays)
- Fix locally and re-push

### Runtime Errors

**Issues:**
- 404 pages (invalid URLs)
- Broken external links
- Failed image loading

**Mitigation:**
- Custom 404 page with navigation
- Use `target="_blank" rel="noopener noreferrer"` for external links
- Provide alt text for all images
- Static site minimizes runtime issues

### Content Quality

**Optional tooling:**
- Dead link checker (GitHub Action)
- Spell check (editor plugins)
- Preview builds locally before committing

## Testing

### Local Development

**Commands:**
- `npm run start`: Hot-reload dev server for previewing
- `npm run build`: Production build to catch errors
- `npm run serve`: Preview production build locally

### Pre-deployment Checklist

1. New blog post renders correctly
2. Tags appear and link to collection pages
3. Images load properly
4. Links work (internal and external)
5. Mobile responsive (test with browser dev tools)
6. No console errors in browser

### Post-deployment Verification

1. GitHub Actions deployment succeeds
2. New content appears on live site
3. RSS feed updates
4. Search indexes new content
5. Collection pages update automatically

### Ongoing Maintenance

- Update Docusaurus dependencies quarterly
- Periodically check for broken external links
- Optional: Add Google Analytics to track popular content
- Backup: GitHub repo is source of truth (version controlled)

## Initial Content Migration

### Phase 1: Setup & Structure
1. Initialize Docusaurus project
2. Configure GitHub Pages deployment
3. Create custom landing page
4. Set up collection pages
5. Create About and Resume pages

### Phase 2: Content Conversion
1. Convert resume to blog post and resume page
2. Convert Claude Code guide chapters to blog posts (6 posts)
3. Convert tennis journey materials to blog posts (2-3 posts)
4. Write introduction/about page from PDF
5. Tag all posts appropriately

### Phase 3: Polish & Deploy
1. Create featured content for landing page
2. Test locally (build, serve, verify)
3. Configure GitHub Actions
4. Deploy to GitHub Pages
5. Verify live site

## Success Criteria

- Site deploys successfully to GitHub Pages
- All raw materials converted to blog posts
- Collection pages correctly filter and display posts
- Mobile-responsive design
- Search functionality works
- RSS feed generated
- Easy to add new blog posts (just create markdown file with frontmatter)
- Professional-first impression on landing page
- Clear navigation for mixed audience

## Future Enhancements (Out of Scope)

- Custom domain setup
- Comments system (e.g., Giscus)
- Google Analytics integration
- Newsletter subscription
- Dark mode toggle
- Social share buttons
- Related posts suggestions
