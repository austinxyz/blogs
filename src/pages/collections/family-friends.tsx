import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useGlobalData from '@docusaurus/useGlobalData';

export default function Collection(): JSX.Element {
  const globalData = useGlobalData();
  const blogData = globalData?.['docusaurus-plugin-content-blog']?.['default'];
  const allPosts = blogData?.blogPosts || [];
  
  // Get collection name from filename
  const collectionName = 'COLLECTION_NAME';
  const filteredPosts = allPosts.filter((post: any) =>
    post.metadata?.tags?.some((tag: any) =>
      tag.label?.toLowerCase() === collectionName
    )
  );

  return (
    <Layout title="Collection" description="Collection description">
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1>Collection</h1>
            {filteredPosts.length === 0 ? (
              <div className="alert alert--info">
                <p>No posts yet in this collection.</p>
              </div>
            ) : (
              <div>
                {filteredPosts.map((post: any) => (
                  <article key={post.id} className="margin-bottom--xl">
                    <h2><Link to={post.metadata.permalink}>{post.metadata.title}</Link></h2>
                    <div className="margin-bottom--sm">
                      <time dateTime={post.metadata.date}>
                        {new Date(post.metadata.date).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'long', day: 'numeric'
                        })}
                      </time>
                    </div>
                    {post.metadata.description && <p>{post.metadata.description}</p>}
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
