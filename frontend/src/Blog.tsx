import React from 'react';
import { request, gql } from 'graphql-request';
import type { Post, HashnodeResponse } from './types/BlogTypes';

interface BlogProps {
  language: string;
}

const GET_USER_ARTICLES = gql`
  query GetUserArticles {
    user(username: "josereimondez") {
      publication {
        posts(first: 10) {
          nodes {
            _id
            title
            brief
            slug
            publishedAt
            coverImage {
              url
            }
            readTimeInMinutes
          }
        }
      }
    }
  }
`;

function Blog({ language }: BlogProps) {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await request<HashnodeResponse>(
          'https://gql.hashnode.com',
          GET_USER_ARTICLES
        );
        setPosts(data.user.publication.posts.nodes);
      } catch (error) {
        setError(language === 'es' ? 
          'Error al cargar los posts. Por favor, intenta de nuevo más tarde.' : 
          'Error loading posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [language]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-navy-50 to-navy-100">
        <div className="w-24 h-24 mb-8 relative">
          <div className="absolute inset-0 border-4 border-navy-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-navy-600 rounded-full animate-spin border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 border-b-2 border-navy-500 pb-3 mb-8">
              {language === 'es' ? 'Blog' : 'Blog'}
            </h1>
            
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">
                  {language === 'es' 
                    ? 'Próximamente nuevos posts...' 
                    : 'New posts coming soon...'}
                </p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <article 
                    key={post._id}
                    className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
                  >
                    {post.coverImage?.url && (
                      <div className="aspect-video w-full overflow-hidden">
                        <img 
                          src={post.coverImage.url} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-navy-800 mb-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.brief}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div>
                          <span>{new Date(post.publishedAt).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')}</span>
                          <span className="mx-2">·</span>
                          <span>{post.readTimeInMinutes} {language === 'es' ? 'min de lectura' : 'min read'}</span>
                        </div>
                        <a
                          href={`https://hashnode.com/@josereimondez/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-navy-600 hover:text-navy-800"
                        >
                          {language === 'es' ? 'Leer más →' : 'Read more →'}
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
