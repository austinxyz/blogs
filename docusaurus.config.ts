import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Austin Xu',
  tagline: 'Cloud Platform Engineering Leader | Tennis Enthusiast | Lifelong Learner',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

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
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
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
