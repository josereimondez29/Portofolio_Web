import React, { useCallback } from 'react';
import { request, gql } from 'graphql-request';
import type { Post, HashnodeResponse } from './types/BlogTypes';
import BlogPost from './BlogPost';

interface PostModalProps {
  post: Post;
  language: string;
  onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ post, language, onClose }) => (
  <div className="fixed inset-0 z-50 overflow-y-auto">
    <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>
      <div className="relative inline-block w-full max-w-4xl transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:align-middle">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-navy-800 truncate">{post.title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2"
            aria-label="Cerrar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <BlogPost 
            post={post}
            language={language}
            onBack={onClose}
          />
        </div>
      </div>
    </div>
  </div>
);

interface BlogProps {
  language: string;
}

const GET_USER_ARTICLES = gql`
  query GetUserArticles {
    publication(host: "portofolio.hashnode.dev") {
      posts(first: 10) {
        edges {
          node {
            id
            title
            brief
            content {
              html
              markdown
            }
            slug
            publishedAt
            coverImage {
              url
            }
            readTimeInMinutes
            tags {
              name
              slug
            }
          }
        }
      }
    }
  }
`;

const Blog = ({ language }: BlogProps): React.ReactElement => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedPost, setSelectedPost] = React.useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedPost(null);
  }, []);

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await request<HashnodeResponse>(
          'https://gql.hashnode.com',
          GET_USER_ARTICLES
        );
        const posts = data.publication.posts.edges.map(edge => edge.node);
        setPosts(posts);
      } catch (err: unknown) {
        console.error('Error fetching blog posts:', err);
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

  const renderModal = () => {
    if (!isModalOpen || !selectedPost) return null;
    return (
      <PostModal
        post={selectedPost}
        language={language}
        onClose={handleCloseModal}
      />
    );
  };

  return (
    <>
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
                      key={post.id}
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
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div>
                              <span>{new Date(post.publishedAt).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')}</span>
                              <span className="mx-2">·</span>
                              <span>{post.readTimeInMinutes} {language === 'es' ? 'min de lectura' : 'min read'}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedPost(post);
                              setIsModalOpen(true);
                            }}
                            className="w-full py-2 mt-4 text-navy-600 hover:text-white hover:bg-navy-600 border border-navy-600 rounded-lg transition-all duration-200 text-center"
                          >
                            {language === 'es' ? 'Leer artículo' : 'Read article'}
                          </button>
                          <div className="flex items-center justify-start space-x-4 pt-2 border-t border-gray-200 mt-4">
                            <button
                              onClick={() => {
                                const url = `https://portofolio.hashnode.dev/${post.slug}`;
                                window.open(
                                  `https://www.linkedin.com/share/url?url=${encodeURIComponent(url)}`,
                                  '_blank',
                                  'width=600,height=600'
                                );
                              }}
                              className="text-navy-600 hover:text-[#0077b5] transition-colors duration-200"
                              title="Compartir en LinkedIn"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                              </svg>
                            </button>
                            <button
                              onClick={() => {
                                const url = `https://portofolio.hashnode.dev/${post.slug}`;
                                const title = post.title;
                                const excerpt = post.brief;
                                const emailBody = `
${title}

${excerpt}

Continuar leyendo en: ${url}
                                `;
                                window.open(
                                  `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(emailBody)}`,
                                  '_blank'
                                );
                              }}
                              className="text-navy-600 hover:text-gray-800 transition-colors duration-200"
                              title="Compartir por Email"
                            >
                              <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                              </svg>
                            </button>
                            <button
                              onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title} - https://portofolio.hashnode.dev/${post.slug}`)}`)}
                              className="text-navy-600 hover:text-[#25D366] transition-colors duration-200"
                              title="Compartir en WhatsApp"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                              </svg>
                            </button>
                            <button
                              onClick={() => navigator.clipboard.writeText(`https://portofolio.hashnode.dev/${post.slug}`).then(() => alert(language === 'es' ? 'Enlace copiado!' : 'Link copied!'))}
                              className="text-navy-600 hover:text-navy-800 transition-colors duration-200"
                              title={language === 'es' ? 'Copiar enlace' : 'Copy link'}
                            >
                              <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                              </svg>
                            </button>
                          </div>
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
      {renderModal()}
    </>
  );
};

export default Blog;
