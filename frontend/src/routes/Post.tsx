import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { request, gql } from 'graphql-request';
import type { Post as PostType } from '../types/BlogTypes';
import BlogPost from '../BlogPost';

const GET_POST = gql`
  query GetPost($slug: String!) {
    publication(host: "portofolio.hashnode.dev") {
      post(slug: $slug) {
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
`;

interface HashnodePostResponse {
  publication: {
    post: PostType | null;
  };
}

const Post = ({ language }: { language: string }): React.ReactElement => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = React.useState<PostType | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await request<HashnodePostResponse>(
          'https://gql.hashnode.com',
          GET_POST,
          { slug }
        );
        if (data.publication.post) {
          setPost(data.publication.post);
        } else {
          setError(language === 'es' ? 
            'Post no encontrado' : 
            'Post not found');
        }
      } catch (err: unknown) {
        console.error('Error fetching post:', err);
        setError(language === 'es' ? 
          'Error al cargar el post. Por favor, intenta de nuevo más tarde.' : 
          'Error loading post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug, language]);

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

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">{error}</p>
          <button
            onClick={() => navigate('/blog')}
            className="mt-4 text-navy-600 hover:text-navy-800"
          >
            {language === 'es' ? 'Volver al blog' : 'Back to blog'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <BlogPost 
              post={post}
              language={language}
              onBack={() => navigate('/blog')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
