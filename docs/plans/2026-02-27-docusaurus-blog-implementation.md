# Docusaurus Personal Blog Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a blog-centric personal brand site using Docusaurus with blog posts, tag-based collections, and GitHub Pages deployment.

**Architecture:** Docusaurus 3.x static site with custom landing page, blog plugin for chronological posts, React-based collection pages that filter by tags, and GitHub Actions for automated deployment to GitHub Pages.

**Tech Stack:** Docusaurus 3.x, React, TypeScript, Markdown, GitHub Pages, GitHub Actions

---

## Task 1: Initialize Docusaurus Project

**Files:**
- Create: `package.json`, `docusaurus.config.ts`, `tsconfig.json`, `sidebars.ts`
- Create: `src/`, `blog/`, `static/`, `docs/` directories

**Step 1: Verify Node.js version**

Run: `node --version`
Expected: v18.x or higher

**Step 2: Initialize Docusaurus with blog preset**

Run: `npx create-docusaurus@latest . classic --typescript`
Expected: Prompts for project creation, select "classic" preset

**Step 3: Clean up default files**

Remove example docs and blog posts:
```bash
rm -rf docs/*
rm -rf blog/*
mkdir -p blog
mkdir -p static/downloads
mkdir -p static/img
```

**Step 4: Install dependencies**

Run: `npm install`
Expected: Dependencies installed successfully

**Step 5: Test local dev server**

Run: `npm run start`
Expected: Dev server starts on http://localhost:3000
Action: Open browser, verify site loads
Action: Stop server with Ctrl+C

**Step 6: Commit**

```bash
git add .
git commit -m "chore: initialize Docusaurus project

- Set up classic preset with TypeScript
- Clean default content
- Verify dev server works

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 2: Configure Site Metadata and Theme

**Files:**
- Modify: `docusaurus.config.ts`

**Step 1: Update site configuration**

Edit `docusaurus.config.ts`:
```typescript
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Austin Xu',
  tagline: 'Platform Engineering Leader | Tennis Enthusiast | Lifelong Learner',
  favicon: 'img/favicon.ico',

  url: 'https://austinxyz.github.io',
  baseUrl: '/blogs/',

  organizationName: 'austinxyz',
  projectName: 'blogs',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: false, // Disable docs, we're blog-focused
        blog: {
          showReadingTime: true,
          blogTitle: 'Blog',
          blogDescription: 'Thoughts on cloud computing, leadership, and life',
          postsPerPage: 10,
          blogSidebarTitle: 'Recent Posts',
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    navbar: {
      title: 'Austin Xu',
      logo: {
        alt: 'Austin Xu Logo',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          label: 'Collections',
          position: 'left',
          items: [
            {label: 'Cloud Computing', to: '/collections/cloud-computing'},
            {label: 'AI', to: '/collections/ai'},
            {label: 'Leadership', to: '/collections/leadership'},
            {label: 'PDLC', to: '/collections/pdlc'},
            {label: 'Hobbies', to: '/collections/hobbies'},
            {label: 'Travel', to: '/collections/travel'},
            {label: 'Wealth Management', to: '/collections/wealth-management'},
            {label: 'Retirement Planning', to: '/collections/retirement-planning'},
            {label: 'Career Development', to: '/collections/career-development'},
            {label: 'Family & Friends', to: '/collections/family-friends'},
          ],
        },
        {to: '/about', label: 'About', position: 'left'},
        {to: '/resume', label: 'Resume', position: 'left'},
        {
          href: 'https://github.com/austinxyz',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.linkedin.com/in/austin-yanzhao-xu-6301ab6',
          label: 'LinkedIn',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Content',
          items: [
            {label: 'Blog', to: '/blog'},
            {label: 'About', to: '/about'},
            {label: 'Resume', to: '/resume'},
          ],
        },
        {
          title: 'Connect',
          items: [
            {label: 'LinkedIn', href: 'https://www.linkedin.com/in/austin-yanzhao-xu-6301ab6'},
            {label: 'GitHub', href: 'https://github.com/austinxyz'},
            {label: 'Email', href: 'mailto:austin.xyz@gmail.com'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Austin Xu. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
```

**Step 2: Test configuration**

Run: `npm run start`
Expected: Site loads with updated title, tagline, and navbar
Action: Verify navbar shows Blog, Collections dropdown, About, Resume
Action: Stop server

**Step 3: Commit**

```bash
git add docusaurus.config.ts
git commit -m "config: update site metadata and navigation

- Set site title, tagline, URL
- Configure GitHub Pages deployment
- Add collections dropdown to navbar
- Disable docs, enable blog
- Add footer with links

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 3: Create Custom Landing Page

**Files:**
- Create: `src/pages/index.tsx`
- Create: `src/components/HomepageFeatures/index.tsx`
- Modify: `src/css/custom.css`

**Step 1: Create landing page component**

Create `src/pages/index.tsx`:
```typescript
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/blog">
            Read My Blog
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/about"
            style={{marginLeft: '1rem'}}>
            About Me
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Home`}
      description="Platform Engineering Leader, Tennis Enthusiast, and Lifelong Learner">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
```

**Step 2: Create homepage features component**

Create `src/components/HomepageFeatures/index.tsx`:
```typescript
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Platform Engineering',
    description: (
      <>
        20+ years building and operating large-scale cloud platforms.
        Kubernetes, DevOps, SRE, and developer experience.
      </>
    ),
    link: '/collections/cloud-computing',
  },
  {
    title: 'Leadership & Management',
    description: (
      <>
        Leading global teams, driving organizational change, and
        mentoring engineers to build better systems and careers.
      </>
    ),
    link: '/collections/leadership',
  },
  {
    title: 'Life Beyond Code',
    description: (
      <>
        USTA national champion, pickleball player, hobby developer,
        and lifelong learner sharing insights on career and life.
      </>
    ),
    link: '/collections/hobbies',
  },
];

function Feature({title, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={link}>Learn more →</a>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Create styles for homepage features**

Create `src/components/HomepageFeatures/styles.module.css`:
```css
.features {
  display: flex;
  align-items: center;
  padding: 2rem 0;
  width: 100%;
}
```

**Step 4: Create styles for landing page**

Create `src/pages/index.module.css`:
```css
.heroBanner {
  padding: 4rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
}

@media screen and (max-width: 996px) {
  .heroBanner {
    padding: 2rem;
  }

  .buttons {
    flex-direction: column;
  }

  .buttons > * {
    margin-left: 0 !important;
    margin-top: 0.5rem;
  }
}
```

**Step 5: Test landing page**

Run: `npm run start`
Expected: Landing page with hero, features, and CTA buttons
Action: Verify responsive design on mobile (resize browser)
Action: Stop server

**Step 6: Commit**

```bash
git add src/pages/index.tsx src/components/ src/pages/index.module.css
git commit -m "feat: create custom landing page

- Add hero section with CTA buttons
- Add featured content sections (Engineering, Leadership, Life)
- Responsive design for mobile
- Link to blog, about, and collections

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 4: Create Collection Pages

**Files:**
- Create: `src/pages/collections/[tag].tsx`
- Create: `src/pages/collections/cloud-computing.tsx`
- Create: `src/pages/collections/ai.tsx`
- Create: `src/pages/collections/leadership.tsx`
- Create: `src/pages/collections/pdlc.tsx`
- Create: `src/pages/collections/hobbies.tsx`
- Create: `src/pages/collections/travel.tsx`
- Create: `src/pages/collections/wealth-management.tsx`
- Create: `src/pages/collections/retirement-planning.tsx`
- Create: `src/pages/collections/career-development.tsx`
- Create: `src/pages/collections/family-friends.tsx`

**Step 1: Create collection page template**

Create `src/pages/collections/cloud-computing.tsx`:
```typescript
import React from 'react';
import Layout from '@theme/Layout';
import {usePluginData} from '@docusaurus/useGlobalData';
import Link from '@docusaurus/Link';

type BlogPost = {
  id: string;
  metadata: {
    title: string;
    description: string;
    date: string;
    permalink: string;
    tags: Array<{label: string; permalink: string}>;
  };
};

export default function CloudComputingCollection(): JSX.Element {
  const {blogPosts} = usePluginData('docusaurus-plugin-content-blog') as {
    blogPosts: BlogPost[];
  };

  const filteredPosts = blogPosts.filter(post =>
    post.metadata.tags.some(tag => tag.label === 'cloud-computing')
  );

  return (
    <Layout
      title="Cloud Computing"
      description="Articles about cloud platforms, Kubernetes, and infrastructure">
      <div className="container margin-vert--lg">
        <h1>Cloud Computing</h1>
        <p>
          Deep dives into cloud platforms, Kubernetes infrastructure, DevOps automation,
          and building scalable systems at eBay and beyond.
        </p>

        {filteredPosts.length === 0 ? (
          <p>No posts yet in this collection. Check back soon!</p>
        ) : (
          <div>
            {filteredPosts.map(post => (
              <article key={post.id} style={{marginBottom: '2rem'}}>
                <h2>
                  <Link to={post.metadata.permalink}>{post.metadata.title}</Link>
                </h2>
                <p>
                  <small>{new Date(post.metadata.date).toLocaleDateString()}</small>
                </p>
                <p>{post.metadata.description}</p>
                <Link to={post.metadata.permalink}>Read more →</Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
```

**Step 2: Create AI collection page**

Create `src/pages/collections/ai.tsx`:
```typescript
import React from 'react';
import Layout from '@theme/Layout';
import {usePluginData} from '@docusaurus/useGlobalData';
import Link from '@docusaurus/Link';

type BlogPost = {
  id: string;
  metadata: {
    title: string;
    description: string;
    date: string;
    permalink: string;
    tags: Array<{label: string; permalink: string}>;
  };
};

export default function AICollection(): JSX.Element {
  const {blogPosts} = usePluginData('docusaurus-plugin-content-blog') as {
    blogPosts: BlogPost[];
  };

  const filteredPosts = blogPosts.filter(post =>
    post.metadata.tags.some(tag => tag.label === 'ai')
  );

  return (
    <Layout
      title="AI"
      description="Articles about artificial intelligence, Claude Code, and AI-assisted development">
      <div className="container margin-vert--lg">
        <h1>AI</h1>
        <p>
          Exploring AI tools, Claude Code workflows, and how AI is transforming
          software development and operations.
        </p>

        {filteredPosts.length === 0 ? (
          <p>No posts yet in this collection. Check back soon!</p>
        ) : (
          <div>
            {filteredPosts.map(post => (
              <article key={post.id} style={{marginBottom: '2rem'}}>
                <h2>
                  <Link to={post.metadata.permalink}>{post.metadata.title}</Link>
                </h2>
                <p>
                  <small>{new Date(post.metadata.date).toLocaleDateString()}</small>
                </p>
                <p>{post.metadata.description}</p>
                <Link to={post.metadata.permalink}>Read more →</Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
```

**Step 3: Create Leadership collection page**

Create `src/pages/collections/leadership.tsx`:
```typescript
import React from 'react';
import Layout from '@theme/Layout';
import {usePluginData} from '@docusaurus/useGlobalData';
import Link from '@docusaurus/Link';

type BlogPost = {
  id: string;
  metadata: {
    title: string;
    description: string;
    date: string;
    permalink: string;
    tags: Array<{label: string; permalink: string}>;
  };
};

export default function LeadershipCollection(): JSX.Element {
  const {blogPosts} = usePluginData('docusaurus-plugin-content-blog') as {
    blogPosts: BlogPost[];
  };

  const filteredPosts = blogPosts.filter(post =>
    post.metadata.tags.some(tag => tag.label === 'leadership')
  );

  return (
    <Layout
      title="Leadership"
      description="Articles about engineering leadership, team management, and organizational growth">
      <div className="container margin-vert--lg">
        <h1>Leadership</h1>
        <p>
          Lessons from leading global teams, building engineering culture,
          and driving organizational transformation.
        </p>

        {filteredPosts.length === 0 ? (
          <p>No posts yet in this collection. Check back soon!</p>
        ) : (
          <div>
            {filteredPosts.map(post => (
              <article key={post.id} style={{marginBottom: '2rem'}}>
                <h2>
                  <Link to={post.metadata.permalink}>{post.metadata.title}</Link>
                </h2>
                <p>
                  <small>{new Date(post.metadata.date).toLocaleDateString()}</small>
                </p>
                <p>{post.metadata.description}</p>
                <Link to={post.metadata.permalink}>Read more →</Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
```

**Step 4: Create remaining collection pages**

Create the following files with similar structure (changing tag filter and description):
- `src/pages/collections/pdlc.tsx` (tag: 'pdlc')
- `src/pages/collections/hobbies.tsx` (tag: 'hobbies')
- `src/pages/collections/travel.tsx` (tag: 'travel')
- `src/pages/collections/wealth-management.tsx` (tag: 'wealth-management')
- `src/pages/collections/retirement-planning.tsx` (tag: 'retirement-planning')
- `src/pages/collections/career-development.tsx` (tag: 'career-development')
- `src/pages/collections/family-friends.tsx` (tag: 'family-friends')

**Step 5: Test collection pages**

Run: `npm run start`
Expected: Collection pages accessible via navbar dropdown
Action: Visit /collections/cloud-computing, verify empty state message
Action: Stop server

**Step 6: Commit**

```bash
git add src/pages/collections/
git commit -m "feat: create collection pages for all topics

- Cloud Computing, AI, Leadership, PDLC collections
- Hobbies, Travel, Wealth Management, Retirement collections
- Career Development, Family & Friends collections
- Filter blog posts by tag
- Show empty state when no posts

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 5: Create About and Resume Pages

**Files:**
- Create: `src/pages/about.md`
- Create: `src/pages/resume.md`

**Step 1: Create About page**

Create `src/pages/about.md`:
```markdown
---
title: About Austin
description: Platform engineering leader, tennis enthusiast, and lifelong learner
---

# About Austin Xu

Hi, I'm Austin (Yanzhao Xu) — a platform engineering leader with over 20 years of experience building and operating large-scale cloud platforms.

## Professional Journey

I currently lead Cloud Platform teams at eBay, where we've migrated 5,000+ applications to Kubernetes across 100+ clusters and 2M+ pods. My work focuses on:

- **Kubernetes Infrastructure**: Building and scaling core K8s infrastructure across multiple regions
- **Application Lifecycle**: Automating deployment, scaling, and recovery for cloud-native applications
- **Developer Experience**: Creating tools and platforms that make developers more productive
- **SRE Excellence**: Applying SLO/SLI, MTTD/MTTR, and incident management best practices

Before leading the Cloud Platform team, I:
- Built eBay's multi-cloud migration platform and CI/CD automation
- Architected eBay's internal cloud platforms across three generations (VMware, OpenStack, Kubernetes)
- Led China Center of Excellence teams delivering platform tools and developer experience

## Beyond Engineering

When I'm not building platforms, you'll find me:

- **Playing Tennis**: USTA national champion, team captain, and organizer
- **Playing Pickleball**: eBay champion (2023, 2024)
- **Building Side Projects**: Created a match analysis system using SpringBoot + Vue
- **Mentoring**: Running tech/career/finance seminar series
- **Learning**: Always exploring new technologies and sharing insights

## Education

- **Master's Degree** in EE/Automation, Zhejiang University
- **Bachelor's Degree** in EE/Automation, Zhejiang University

## Connect

I'm always happy to connect with fellow engineers, leaders, and anyone interested in cloud platforms, career development, or tennis!

- LinkedIn: [austin-yanzhao-xu](https://www.linkedin.com/in/austin-yanzhao-xu-6301ab6)
- GitHub: [austinxyz](https://github.com/austinxyz)
- Email: austin.xyz@gmail.com
```

**Step 2: Create Resume page**

Create `src/pages/resume.md`:
```markdown
---
title: Resume
description: Austin Xu's professional resume
---

# Austin Xu - Resume

**Platform Engineering Leader | 20+ Years Experience**

📧 austin.xyz@gmail.com | 📱 (408) 797-7545
🔗 [LinkedIn](https://www.linkedin.com/in/austin-yanzhao-xu-6301ab6) | 💻 [GitHub](https://github.com/austinxyz)

[Download PDF Resume](/downloads/Austin-Xu-Resume.pdf)

---

## Experience

### eBay Inc, San Jose
**Software Development Manager - Cloud Fleet Management** | Sept 2023 - Present

- Led Cloud Platform teams to migrate 5,000+ applications to Kubernetes
- Built and scaled K8s infrastructure: 3 regions, 25 AZs, 100+ clusters, 2M+ pods
- Applied SRE best practices (SLO/SLI, MTTD/MTTR, incident/capacity management)
- Delivered AZ/Region auto-scaling and traffic rebalancing for managed-stack applications
- Managed full K8s cluster lifecycle across dev/staging/prod/PCI environments

**2025-2026 Key Outcomes:**
- DoJ & Jade programs: Accelerated SDDZ AZ and DCPX cluster stand-up
- Global team expansion: Established hubs in Europe and India, hired 8+ engineers
- AI innovation: Built 6+ Claude-based hiring skills, piloted spec-driven development

**Software Development Manager - Cloud App Lifecycle** | Feb 2017 - Aug 2023

- Led global teams (San Jose & Shanghai) to migrate 5,000+ apps from OpenStack to Kubernetes
- Developed end-to-end CI/CD platform using Tekton pipelines
- Owned auto-deployment platform: 35,000+ deployments/week across 20,000+ app pools
- Built self-healing remediation system (LOM) using observability signals
- Drove regional data center migration (PHX exit, RENO launch) with zero downtime

### eBay China Center of Excellence, Shanghai
**Software Development Manager - Cloud** | Feb 2012 - Feb 2017

- Led 20 engineers to architect and deliver eBay's internal cloud platforms (IaaS & PaaS)
- Designed MongoDB-based Configuration Management System (CMS)
- Built Zebra: Fully automated provisioning system (reduced provisioning from days to 10 minutes)
- Drove eBay China Innovation Program, won multiple Skunkworks awards

**Team Lead - Platform DevEx Tools** | June 2007 - Feb 2012

- Built Platform Development Experience Tools team (8 members)
- Delivered Raptor IDE, optimized eBay IDE, wizards for frontend/service/database frameworks
- Improved productivity for 2,000+ eBay developers
- Developed eBay APIs and SDKs for third-party developers

### Mainet System Inc., Shanghai
**Project Manager / Architect** | April 2000 - April 2007

- Architected RAD tools for web applications (Spring, Hibernate, Struts, SOA)
- Built web-based ERP products (CRM, HRM, CMS) for 40+ enterprise customers
- Hired and built R&D teams (50+ developers) across Shanghai, Shenzhen, Qingdao
- Improved software development flow based on RUP

---

## Skills

**Cloud & Infrastructure:** OpenStack, Docker/Kubernetes, Service Mesh/Istio/Envoy, Tess (eBay K8s)

**Languages:** Java, J2EE, Go, Python, JavaScript, TypeScript

**Frameworks:** Spring, SpringBoot, React, Vue, Node.js, eBay Raptor

**Data:** MySQL, MongoDB, Postgres, Cassandra, Redis, Kafka, Elasticsearch

**DevOps:** Tekton, Jenkins, Git, Linux, Prometheus, Grafana, Kibana

**Methodologies:** Agile Scrum/Kanban, SRE, TDD

---

## Education

**Zhejiang University, Hangzhou**
- Master's Degree, EE/Automation (Sept 1997 - April 2000)
- Bachelor's Degree, EE/Automation (Sept 1993 - July 1997)

---

## Certifications & Training

- PMP, Scrum, eBay People Management
- OpenStack, Kubernetes, RedHat

---

## Languages

English, Mandarin

---

## Hobbies & Interests

- **Tennis**: USTA national champion, team captain/organizer
- **Pickleball**: eBay 2023/2024 champion
- **Software Projects**: Built match analysis system ([SpringBoot](https://github.com/austinxyz/MatchApp) + [Vue](https://github.com/austinxyz/tennis-analysis-app))
- **Community**: Organizer of tech/career/finance seminar series
```

**Step 3: Copy resume PDF to static folder**

Note: You'll need to generate a PDF version of the resume and place it in `static/downloads/`

**Step 4: Test static pages**

Run: `npm run start`
Expected: About page accessible at /about
Expected: Resume page accessible at /resume
Action: Stop server

**Step 5: Commit**

```bash
git add src/pages/about.md src/pages/resume.md
git commit -m "feat: create About and Resume pages

- Add personal introduction and background
- Add professional resume with experience
- Include links to LinkedIn, GitHub, email
- Note: PDF resume to be added separately

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 6: Convert Claude Code Guide to Blog Posts

**Files:**
- Create: `blog/2026-02-27-claude-code-introduction.md`
- Create: `blog/2026-02-28-claude-code-overview.md`
- Create: `blog/2026-03-01-claude-code-development-walkthrough.md`
- Create: `blog/2026-03-02-claude-code-methodology-evolution.md`
- Create: `blog/2026-03-03-claude-code-use-cases-and-limitations.md`
- Create: `blog/2026-03-04-claude-code-conclusion.md`

**Step 1: Convert introduction chapter**

Read `raw_docs/claude-code-guide-en/01-introduction.md` and create blog post:

Create `blog/2026-02-27-claude-code-introduction.md`:
```markdown
---
title: "Claude Code: Introduction to AI-Assisted Development"
date: 2026-02-27
authors: [austin]
tags: [ai, claude-code, development-tools]
description: "An introduction to Claude Code, Anthropic's AI-powered development assistant that's changing how we write software."
---

[Content from raw_docs/claude-code-guide-en/01-introduction.md]

<!--truncate-->

[Rest of content...]
```

**Step 2: Convert overview chapter**

Create `blog/2026-02-28-claude-code-overview.md`:
```markdown
---
title: "Claude Code: Feature Overview and Capabilities"
date: 2026-02-28
authors: [austin]
tags: [ai, claude-code, development-tools]
description: "A comprehensive overview of Claude Code's features, from code generation to debugging and testing."
---

[Content from raw_docs/claude-code-guide-en/02-claude-code-overview.md]

<!--truncate-->

[Rest of content...]
```

**Step 3: Convert development walkthrough**

Create `blog/2026-03-01-claude-code-development-walkthrough.md`:
```markdown
---
title: "Claude Code: Development Walkthrough"
date: 2026-03-01
authors: [austin]
tags: [ai, claude-code, development-tools, tutorial]
description: "A step-by-step walkthrough of using Claude Code for real-world development tasks."
---

[Content from raw_docs/claude-code-guide-en/03-development-walkthrough.md]

<!--truncate-->

[Rest of content...]
```

**Step 4: Convert methodology evolution**

Create `blog/2026-03-02-claude-code-methodology-evolution.md`:
```markdown
---
title: "Claude Code: Evolution of Development Methodology"
date: 2026-03-02
authors: [austin]
tags: [ai, claude-code, methodology, software-engineering]
description: "How Claude Code is evolving software development methodologies and practices."
---

[Content from raw_docs/claude-code-guide-en/04-methodology-evolution.md]

<!--truncate-->

[Rest of content...]
```

**Step 5: Convert use cases and limitations**

Create `blog/2026-03-03-claude-code-use-cases-and-limitations.md`:
```markdown
---
title: "Claude Code: Use Cases and Limitations"
date: 2026-03-03
authors: [austin]
tags: [ai, claude-code, best-practices]
description: "Real-world use cases for Claude Code and understanding its current limitations."
---

[Content from raw_docs/claude-code-guide-en/05-use-cases-and-limitations.md]

<!--truncate-->

[Rest of content...]
```

**Step 6: Convert conclusion**

Create `blog/2026-03-04-claude-code-conclusion.md`:
```markdown
---
title: "Claude Code: Conclusion and Future Outlook"
date: 2026-03-04
authors: [austin]
tags: [ai, claude-code, future-of-development]
description: "Final thoughts on Claude Code and the future of AI-assisted software development."
---

[Content from raw_docs/claude-code-guide-en/06-conclusion.md]

<!--truncate-->

[Rest of content...]
```

**Step 7: Copy images**

```bash
mkdir -p blog/2026-02-27-claude-code-introduction/images
cp raw_docs/claude-code-guide-en/images/* blog/2026-02-27-claude-code-introduction/images/
```

**Step 8: Test blog posts**

Run: `npm run start`
Expected: 6 new blog posts appear on /blog
Action: Verify images load correctly
Action: Verify tags link to tag pages
Action: Stop server

**Step 9: Commit**

```bash
git add blog/
git commit -m "feat: convert Claude Code guide to blog posts

- Add 6 blog posts from Claude Code guide
- Include images and proper frontmatter
- Tag with ai, claude-code, development-tools
- Set sequential publish dates

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 7: Convert Tennis Journey to Blog Posts

**Files:**
- Create: `blog/2026-03-05-tennis-journey-royal-flush.md`
- Create: `blog/2026-03-06-thanks-royal-flush-team.md`

**Step 1: Convert team sharing PDF**

Read `raw_docs/hobby/My tennis journey - team sharing.pdf` and create blog post:

Create `blog/2026-03-05-tennis-journey-royal-flush.md`:
```markdown
---
title: "My Tennis Journey: Royal Flush Team and USTA National Championship"
date: 2026-03-05
authors: [austin]
tags: [hobbies, tennis, sports]
description: "My journey from recreational player to USTA national champion with the Royal Flush team."
image: ./images/tennis-team.jpg
---

My tennis journey has been one of the most rewarding experiences of my life, taking me from weekend recreational play to becoming a USTA national champion.

<!--truncate-->

## The Beginning

[Content extracted from PDF about starting tennis...]

## Joining Royal Flush

[Content about team formation and early competitions...]

## Road to Nationals

[Content about qualification and preparation...]

## National Championship

[Content about the championship experience...]

## Lessons Learned

Beyond the trophy, tennis has taught me:
- Teamwork and leadership
- Resilience under pressure
- The importance of practice and preparation
- How to celebrate wins and learn from losses

These lessons apply just as much to engineering leadership as they do to tennis.
```

**Step 2: Convert thanks message**

Read `raw_docs/hobby/Thanks for 40+ 7.0 RoyalFlush Team.md` and create blog post:

Create `blog/2026-03-06-thanks-royal-flush-team.md`:
```markdown
---
title: "Thanks to the Royal Flush 40+ 7.0 Team"
date: 2026-03-06
authors: [austin]
tags: [hobbies, tennis, gratitude, sports]
description: "A heartfelt thanks to my Royal Flush teammates for an incredible season."
---

[Content from markdown file...]

<!--truncate-->

[Extended content and reflections...]
```

**Step 3: Test blog posts**

Run: `npm run start`
Expected: 2 new tennis posts appear
Action: Verify /collections/hobbies shows tennis posts
Action: Stop server

**Step 4: Commit**

```bash
git add blog/
git commit -m "feat: add tennis journey blog posts

- Add Royal Flush team championship story
- Add gratitude post for teammates
- Tag with hobbies, tennis, sports
- Include team photos and highlights

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 8: Create Initial Professional Blog Post from Resume

**Files:**
- Create: `blog/2026-02-26-20-years-platform-engineering.md`

**Step 1: Create blog post**

Create `blog/2026-02-26-20-years-platform-engineering.md`:
```markdown
---
title: "20 Years of Platform Engineering: Lessons from Building Cloud at Scale"
date: 2026-02-26
authors: [austin]
tags: [cloud-computing, kubernetes, career-development, leadership]
description: "Reflections on two decades building cloud platforms, from VMware to Kubernetes, and lessons learned along the way."
---

Over the past 20 years, I've had the privilege of building and operating some of the largest cloud platforms in the industry. From eBay's early VMware-based private cloud to today's massive Kubernetes infrastructure serving 5,000+ applications, the journey has been incredible.

<!--truncate-->

## The Early Days: 2000-2007

I started my career building web applications and RAD (Rapid Application Development) tools...

[Content about early career at Mainet System]

## Joining eBay: 2007-2012

Moving to eBay's China Center of Excellence was a turning point...

[Content about Platform DevEx Tools team]

## The Cloud Transformation: 2012-2017

Leading the cloud platform teams through three generations of infrastructure...

[Content about V1 (VMware), V2 (OpenStack), V3 (Kubernetes)]

## Kubernetes at Scale: 2017-2023

The migration from OpenStack to Kubernetes was one of the most ambitious projects...

[Content about app lifecycle, CI/CD, migration]

## Leading Cloud Fleet: 2023-Present

Today, I lead the Cloud Fleet Management team...

[Content about current role, global expansion, AI innovation]

## Key Lessons

Looking back, here are the most important lessons:

1. **Developer Experience is Everything**: The best platform is one developers love to use
2. **Start Simple, Scale Later**: Over-engineering kills momentum
3. **Automate Relentlessly**: Manual toil doesn't scale
4. **Embrace Change**: Technology evolves, platforms must too
5. **Build Teams, Not Just Systems**: People make platforms successful

## What's Next

The platform engineering field continues to evolve with AI, edge computing, and new paradigms...

[Content about future directions]

---

*This is the first in a series of posts about cloud platforms, Kubernetes, and engineering leadership. Follow along as I share deeper dives into specific technologies and lessons learned.*
```

**Step 2: Test blog post**

Run: `npm run start`
Expected: Blog post appears as first/featured post
Action: Verify tags work (cloud-computing, kubernetes, career-development, leadership)
Action: Stop server

**Step 3: Commit**

```bash
git add blog/2026-02-26-20-years-platform-engineering.md
git commit -m "feat: add initial professional blog post

- Reflections on 20 years of platform engineering
- Cover career journey from 2000 to present
- Share key lessons learned
- Tag with cloud-computing, kubernetes, leadership

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 9: Configure Authors

**Files:**
- Create: `blog/authors.yml`

**Step 1: Create authors configuration**

Create `blog/authors.yml`:
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

**Step 2: Test author profile**

Run: `npm run start`
Expected: Blog posts show author info with avatar
Action: Click author name, verify it links to GitHub
Action: Stop server

**Step 3: Commit**

```bash
git add blog/authors.yml
git commit -m "config: add blog authors configuration

- Configure Austin Xu as primary author
- Link to GitHub profile and avatar
- Add LinkedIn and email

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 10: Set Up GitHub Pages Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `docusaurus.config.ts`

**Step 1: Create GitHub Actions workflow**

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: write

jobs:
  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build website
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
          user_name: github-actions[bot]
          user_email: github-actions[bot]@users.noreply.github.com
```

**Step 2: Verify docusaurus.config.ts has correct settings**

Ensure these values in `docusaurus.config.ts`:
```typescript
url: 'https://austinxyz.github.io',
baseUrl: '/blogs/',
organizationName: 'austinxyz',
projectName: 'blogs',
deploymentBranch: 'gh-pages',
trailingSlash: false,
```

**Step 3: Test production build locally**

Run: `npm run build`
Expected: Build succeeds, outputs to `build/` directory

Run: `npm run serve`
Expected: Production build serves on http://localhost:3000
Action: Verify all pages work in production mode
Action: Stop server

**Step 4: Commit workflow**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Pages deployment workflow

- Deploy on push to main branch
- Use Node 18 and npm ci
- Deploy to gh-pages branch
- Auto-deploy with GitHub Actions

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

**Step 5: Push to GitHub and enable Pages**

```bash
git push origin main
```

Then manually in GitHub:
1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: gh-pages, /(root)
4. Save

**Step 6: Verify deployment**

After GitHub Actions completes:
- Visit https://austinxyz.github.io/blogs/
- Verify site loads correctly
- Check all pages (blog, collections, about, resume)
- Verify navigation works

---

## Task 11: Add Custom Styling

**Files:**
- Modify: `src/css/custom.css`

**Step 1: Enhance custom styles**

Edit `src/css/custom.css`:
```css
/**
 * Custom styles for Austin Xu's blog
 */

:root {
  --ifm-color-primary: #2e8555;
  --ifm-color-primary-dark: #29784c;
  --ifm-color-primary-darker: #277148;
  --ifm-color-primary-darkest: #205d3b;
  --ifm-color-primary-light: #33925d;
  --ifm-color-primary-lighter: #359962;
  --ifm-color-primary-lightest: #3cad6e;
  --ifm-code-font-size: 95%;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.1);
}

[data-theme='dark'] {
  --ifm-color-primary: #25c2a0;
  --ifm-color-primary-dark: #21af90;
  --ifm-color-primary-darker: #1fa588;
  --ifm-color-primary-darkest: #1a8870;
  --ifm-color-primary-light: #29d5b0;
  --ifm-color-primary-lighter: #32d8b4;
  --ifm-color-primary-lightest: #4fddbf;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.3);
}

/* Blog post styling */
article header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

article header p {
  font-size: 1.1rem;
  color: var(--ifm-color-emphasis-700);
}

/* Collection pages */
.container h1 {
  margin-bottom: 1rem;
}

.container > p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: var(--ifm-color-emphasis-700);
}

/* Responsive images */
article img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Code blocks */
pre {
  border-radius: 8px;
}

/* Tags */
.badge {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}
```

**Step 2: Test styling**

Run: `npm run start`
Expected: Enhanced styling on blog posts and pages
Action: Toggle dark mode, verify colors work
Action: Resize browser, verify responsive design
Action: Stop server

**Step 3: Commit**

```bash
git add src/css/custom.css
git commit -m "style: enhance custom styling

- Improve blog post typography
- Style collection pages
- Add responsive image styles
- Enhance code block appearance
- Polish dark mode colors

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 12: Create README Documentation

**Files:**
- Modify: `README.md`

**Step 1: Update README**

Edit `README.md`:
```markdown
# Austin Xu's Personal Blog

A blog-centric personal brand site built with [Docusaurus](https://docusaurus.io/), showcasing insights on platform engineering, cloud computing, leadership, and life.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Local Development

```bash
npm run start
```

This starts a local development server at http://localhost:3000. Most changes are reflected live without restarting the server.

### Build

```bash
npm run build
```

This generates static content into the `build` directory for production deployment.

### Serve Production Build

```bash
npm run serve
```

Serves the production build locally for testing before deployment.

## 📝 Writing Blog Posts

### Create a New Post

1. Create a new file in `blog/` directory: `YYYY-MM-DD-post-title.md`
2. Add frontmatter:

```markdown
---
title: "Post Title"
date: YYYY-MM-DD
authors: [austin]
tags: [tag1, tag2, tag3]
description: "Brief description for SEO and previews"
---

Introduction paragraph...

<!--truncate-->

Rest of post content...
```

3. Add images in `blog/YYYY-MM-DD-post-title/images/`
4. Reference images: `![Alt text](./images/image.jpg)`

### Available Tags

**Professional:**
- cloud-computing
- kubernetes
- ai
- leadership
- management
- pdlc
- devops
- sre

**Personal:**
- hobbies
- tennis
- pickleball
- travel
- wealth-management
- retirement-planning
- career-development
- family-friends

## 🏗️ Site Structure

```
/                       - Landing page
/blog                   - Blog posts (chronological)
/collections/[topic]    - Curated collections by tag
/about                  - About page
/resume                 - Resume page
```

## 🚢 Deployment

Site automatically deploys to GitHub Pages on push to `main` branch via GitHub Actions.

**Live site:** https://austinxyz.github.io/blogs/

## 📚 Content Sources

- `raw_docs/` - Original materials (not published directly)
- `blog/` - Published blog posts
- `src/pages/` - Static pages (About, Resume, Collections)

## 🛠️ Tech Stack

- **Framework:** Docusaurus 3.x
- **Language:** TypeScript
- **Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions
- **Content:** Markdown

## 📄 License

© 2026 Austin Xu. All rights reserved.

## 🤝 Connect

- **LinkedIn:** [austin-yanzhao-xu](https://www.linkedin.com/in/austin-yanzhao-xu-6301ab6)
- **GitHub:** [austinxyz](https://github.com/austinxyz)
- **Email:** austin.xyz@gmail.com
```

**Step 2: Commit README**

```bash
git add README.md
git commit -m "docs: update README with usage instructions

- Add quick start guide
- Document blog post creation process
- List available tags
- Explain site structure and deployment
- Add contact links

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 13: Final Testing and Launch

**Files:**
- None (testing only)

**Step 1: Run full production build**

Run: `npm run build`
Expected: Clean build with no errors or warnings

**Step 2: Test production build locally**

Run: `npm run serve`
Action: Visit http://localhost:3000/blogs/
Action: Test all navigation links
Action: Verify blog posts display correctly
Action: Check collection pages filter posts
Action: Test mobile responsive design
Action: Verify search functionality
Action: Check RSS feed at /blog/rss.xml
Action: Stop server

**Step 3: Verify git status**

Run: `git status`
Expected: Working tree clean, all changes committed

**Step 4: Push to GitHub**

Run: `git push origin main`
Expected: Push succeeds, GitHub Actions triggers

**Step 5: Monitor GitHub Actions**

Action: Go to https://github.com/austinxyz/blogs/actions
Action: Wait for deployment to complete
Expected: Green checkmark for deploy job

**Step 6: Verify live site**

Action: Visit https://austinxyz.github.io/blogs/
Action: Test all pages and functionality
Action: Verify analytics (if configured)
Expected: Site fully functional and accessible

**Step 7: Share with others**

Action: Share blog URL with friends/colleagues
Action: Post on LinkedIn/Twitter (optional)
Expected: Site accessible to public

---

## Success Criteria

✅ Docusaurus site initialized and configured
✅ Custom landing page with professional introduction
✅ Blog posts from raw materials (Claude Code guide, tennis journey, professional reflection)
✅ Collection pages filtering posts by tag
✅ About and Resume pages created
✅ Authors configured with avatar and links
✅ GitHub Pages deployment working
✅ Custom styling applied
✅ Documentation complete
✅ Site accessible at https://austinxyz.github.io/blogs/
✅ Mobile responsive design
✅ Search functionality working
✅ RSS feed generated

## Next Steps

After launch, consider:
1. Set up custom domain (optional)
2. Add Google Analytics (optional)
3. Enable comments with Giscus (optional)
4. Create more blog posts regularly (1-2 per month)
5. Add newsletter subscription (optional)
6. Implement dark mode toggle enhancement
7. Add social share buttons to posts
