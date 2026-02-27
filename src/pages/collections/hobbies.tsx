import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {useAllPluginInstancesData} from '@docusaurus/useGlobalData';

export default function Hobbies(): JSX.Element {
  // Get blog data from all plugin instances
  const allData = useAllPluginInstancesData('docusaurus-plugin-content-blog');
  const blogData = allData?.default;
  const allPosts = blogData?.blogPosts || [];

  // Filter posts by tag (case-insensitive)
  const filteredPosts = allPosts.filter((post: any) =>
    post.metadata.tags.some((tag: any) =>
      tag.label.toLowerCase() === 'hobbies'
    )
  );

  return (
    <Layout
      title="Hobbies"
      description="Tennis championships, pickleball tournaments, and other passions beyond engineering.">
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1>Hobbies</h1>
            <p className="margin-bottom--lg">
              Tennis championships, pickleball tournaments, and other passions beyond engineering.
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
                      {post.metadata.tags && post.metadata.tags.length > 0 && (
                        <span style={{marginLeft: '1rem'}}>
                          {post.metadata.tags.map((tag: any) => (
                            <span key={tag.label} style={{
                              marginRight: '0.5rem',
                              padding: '0.2rem 0.5rem',
                              background: '#e0e0e0',
                              borderRadius: '4px',
                              fontSize: '0.85rem'
                            }}>
                              {tag.label}
                            </span>
                          ))}
                        </span>
                      )}
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
