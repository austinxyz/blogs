import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
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
        <Link to={link}>Learn more →</Link>
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
