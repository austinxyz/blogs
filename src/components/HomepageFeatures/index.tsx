import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  emoji: string;
  description: JSX.Element;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Cloud Platform Engineering',
    emoji: '☁️',
    description: (
      <>
        20+ years building and operating large-scale cloud platforms.
        Kubernetes, DevOps, SRE, and developer experience at eBay.
      </>
    ),
    link: '/collections/cloud-computing',
  },
  {
    title: 'AI & Development',
    emoji: '🤖',
    description: (
      <>
        Exploring AI-assisted development with Claude Code, building tools,
        and sharing practical insights on modern software engineering.
      </>
    ),
    link: '/collections/ai',
  },
  {
    title: 'Leadership & Growth',
    emoji: '🚀',
    description: (
      <>
        Leading global teams, driving organizational change, and
        mentoring engineers to build better systems and careers.
      </>
    ),
    link: '/collections/leadership',
  },
  {
    title: 'Tennis & Life',
    emoji: '🎾',
    description: (
      <>
        USTA national champion, competitive player, and team captain.
        Lessons from the court that apply to work and life.
      </>
    ),
    link: '/collections/hobbies',
  },
];

function Feature({title, emoji, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--6 col--md-3')}>
      <div className={styles.featureCard}>
        <div className={styles.featureEmoji}>{emoji}</div>
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDescription}>{description}</p>
        <Link className={styles.featureLink} to={link}>
          Explore →
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className={styles.featuresTitle}>What I Write About</h2>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
