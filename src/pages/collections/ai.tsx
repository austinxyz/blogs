import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useGlobalData from '@docusaurus/useGlobalData';

export default function AI(): JSX.Element {
  const globalData = useGlobalData();

  // Access blog data from global data
  const blogData = globalData?.['docusaurus-plugin-content-blog']?.['default'];
  const allPosts = blogData?.blogPosts || [];

  // Filter posts by tag
  const filteredPosts = allPosts.filter((post: any) =>
    post.metadata?.tags?.some((tag: any) =>
      tag.label?.toLowerCase() === 'ai'
    )
  );

  return (
    <Layout
      title="AI"
      description="Exploring AI tools, Claude Code workflows, and how AI is transforming software development and operations.">
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1>AI</h1>
            <p className="margin-bottom--lg">
              Exploring AI tools, Claude Code workflows, and how AI is transforming software development and operations.
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
