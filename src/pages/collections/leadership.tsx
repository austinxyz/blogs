import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';

export default function Leadership(): JSX.Element {
  const blogData = usePluginData('docusaurus-plugin-content-blog', 'default') as any;
  const allPosts = blogData?.blogPosts || [];

  // Filter posts by tag
  const filteredPosts = allPosts.filter((post: any) =>
    post.metadata.tags.some((tag: any) => tag.label === 'leadership')
  );

  return (
    <Layout
      title="Leadership"
      description="Lessons from leading global teams, building engineering culture, and driving organizational transformation.">
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1>Leadership</h1>
            <p className="margin-bottom--lg">
              Lessons from leading global teams, building engineering culture, and driving organizational transformation.
            </p>

            {filteredPosts.length === 0 ? (
              <div className="alert alert--info">
                <p>No posts yet in this collection. Check back soon!</p>
              </div>
            ) : (
              <div>
                {filteredPosts.map((post: any) => (
                  <article key={post.id} className="margin-bottom--xl">
                    <h2>
                      <Link to={post.metadata.permalink}>
                        {post.metadata.title}
                      </Link>
                    </h2>
                    <div className="margin-bottom--sm">
                      <time dateTime={post.metadata.date}>
                        {new Date(post.metadata.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                    {post.metadata.description && (
                      <p>{post.metadata.description}</p>
                    )}
                    <Link to={post.metadata.permalink}>Read more →</Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}
