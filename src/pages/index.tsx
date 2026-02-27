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
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Hi, I'm <span className={styles.highlight}>Austin Xu</span>
            </h1>
            <p className={styles.heroTagline}>{siteConfig.tagline}</p>
            <p className={styles.heroDescription}>
              Building cloud platforms at eBay by day, competing in tennis championships by evening.
              Sharing insights on engineering, leadership, AI, and the pursuit of excellence.
            </p>
            <div className={styles.buttons}>
              <Link
                className="button button--primary button--lg"
                to="/blog">
                Read My Blog
              </Link>
              <Link
                className="button button--outline button--primary button--lg"
                to="/about">
                About Me
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img
              src="/blogs/img/tennis-action.jpg"
              alt="Austin Xu playing tennis at USTA National Campus"
              className={styles.profileImage}
            />
            <div className={styles.imageCaption}>
              🏆 USTA National Champion
            </div>
          </div>
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
      description="Cloud Platform Engineering Leader, Tennis Enthusiast, and Lifelong Learner">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
