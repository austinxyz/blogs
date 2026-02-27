# Austin Xu's Personal Blog

A blog-centric personal brand site for Austin Xu, Platform Engineering Leader at eBay. This site showcases technical insights, career experiences, and personal interests through curated blog collections.

Built with [Docusaurus](https://docusaurus.io/), a modern static website generator optimized for content-centric websites.

## Quick Start

### Installation

```bash
npm install
```

### Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window at `http://localhost:3000`. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Serve Production Build Locally

```bash
npm run serve
```

Test the production build locally before deploying.

## Site Structure

### Pages

- **Landing Page** (`/`) - Blog-focused homepage with latest posts
- **Blog** (`/blog`) - All blog posts with pagination
- **About** (`/about`) - Personal background and professional summary
- **Resume** (`/resume`) - Detailed professional experience and skills
- **Collections** - Curated topic-based blog collections:
  - `/collections/ai` - AI & Development Tools
  - `/collections/cloud-computing` - Cloud & Infrastructure
  - `/collections/career-development` - Career Growth
  - `/collections/leadership` - Leadership Insights
  - `/collections/pdlc` - Product Development Lifecycle
  - `/collections/hobbies` - Personal Interests
  - `/collections/travel` - Travel Experiences
  - `/collections/family-friends` - Family & Friends
  - `/collections/wealth-management` - Financial Planning
  - `/collections/retirement-planning` - Retirement Strategy

### Blog Organization

Blog posts are organized by tags and collections:

- **AI & Development Tools**: `ai`, `claude-code`, `development-tools`, `best-practices`
- **Cloud & Infrastructure**: `cloud-computing`, `kubernetes`, `platform-engineering`
- **Professional Development**: `career-development`, `leadership`, `software-engineering`, `methodology`
- **Personal Interests**: `hobbies`, `tennis`, `sports`, `travel`, `gratitude`

## Writing Blog Posts

### Creating a New Post

1. Create a new markdown file in the `blog/` directory with the naming format: `YYYY-MM-DD-post-title.md`

2. Add frontmatter metadata:

```markdown
---
title: Your Post Title
slug: post-url-slug
authors: austin
tags: [tag1, tag2, tag3]
---

Your post content starts here...
```

### Available Tags

Common tags used in the blog:

- **Technical**: `ai`, `claude-code`, `development-tools`, `kubernetes`, `cloud-computing`, `software-engineering`, `platform-engineering`
- **Professional**: `career-development`, `leadership`, `methodology`, `best-practices`
- **Personal**: `hobbies`, `tennis`, `sports`, `travel`, `gratitude`

### Posts with Images

For posts with multiple images, create a folder:

```
blog/
  2026-03-01-my-post/
    index.md
    image1.png
    image2.png
```

Reference images in your markdown:

```markdown
![Alt text](./image1.png)
```

### Author Configuration

Author information is configured in `blog/authors.yml`:

```yaml
austin:
  name: Austin Xu
  title: Platform Engineering Leader @ eBay
  url: https://github.com/austinxyz
  image_url: https://github.com/austinxyz.png
  email: austin.xyz@gmail.com
  socials:
    linkedin: https://www.linkedin.com/in/austin-yanzhao-xu-6301ab6
    github: https://github.com/austinxyz
```

## Deployment

### GitHub Pages

This site automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

The GitHub Actions workflow (`.github/workflows/deploy.yml`) handles:
1. Installing dependencies
2. Building the site
3. Deploying to `gh-pages` branch

### Manual Deployment

If needed, you can deploy manually:

```bash
npm run build
# Then upload the contents of the build/ directory to your hosting service
```

## Tech Stack

- **Framework**: [Docusaurus 3.6.3](https://docusaurus.io/)
- **Language**: TypeScript
- **Styling**: CSS Modules + Custom CSS
- **Deployment**: GitHub Pages (automated via GitHub Actions)
- **Content**: Markdown/MDX

## Project Configuration

Key configuration files:

- `docusaurus.config.ts` - Main site configuration (metadata, theme, plugins)
- `sidebars.ts` - Documentation sidebar configuration (if needed)
- `blog/authors.yml` - Blog author profiles
- `src/css/custom.css` - Custom styling and theme overrides
- `.github/workflows/deploy.yml` - GitHub Pages deployment workflow

## Development Tips

1. **Hot Reload**: Changes to markdown files, CSS, and React components automatically reload
2. **TypeScript**: Full TypeScript support for type-safe development
3. **Dark Mode**: Theme supports both light and dark modes
4. **SEO**: Automatic sitemap generation and meta tags
5. **Performance**: Optimized for fast loading with code splitting

## Content Guidelines

### Blog Post Best Practices

- Use descriptive titles and slugs
- Add relevant tags for discoverability
- Include images to enhance readability
- Break long content into sections with headings
- Use code blocks with language specification for syntax highlighting

### Collection Pages

Collection pages automatically filter blog posts by tags. To add a post to a collection, include the relevant tag in the post's frontmatter.

## License

This is a personal blog site for Austin Xu.

## Contact

- **Email**: austin.xyz@gmail.com
- **LinkedIn**: [Austin Xu](https://www.linkedin.com/in/austin-yanzhao-xu-6301ab6)
- **GitHub**: [@austinxyz](https://github.com/austinxyz)
