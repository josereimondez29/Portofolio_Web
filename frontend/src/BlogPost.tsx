import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import type { Post } from './types/BlogTypes';

interface BlogPostProps {
  post: Post;
  language: string;
  onBack: () => void;
}

export default function BlogPost({ post, language, onBack }: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-8 text-navy-600 hover:text-navy-800 flex items-center"
      >
        ← {language === 'es' ? 'Volver al blog' : 'Back to blog'}
      </button>
      
      {post.coverImage?.url && (
        <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
          <img 
            src={post.coverImage.url} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <h1 className="text-4xl font-bold text-navy-800 mb-4">
        {post.title}
      </h1>
      
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <span>{new Date(post.publishedAt).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')}</span>
        <span className="mx-2">·</span>
        <span>{post.readTimeInMinutes} {language === 'es' ? 'min de lectura' : 'min read'}</span>
        {post.tags.length > 0 && (
          <>
            <span className="mx-2">·</span>
            <div className="flex gap-2">
              {post.tags.map(tag => (
                <span 
                  key={tag.slug}
                  className="bg-navy-50 text-navy-600 px-2 py-1 rounded-full text-sm"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="prose prose-lg max-w-none">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
        >
          {post.content.markdown}
        </ReactMarkdown>
      </div>
      
      <div className="mt-8 pt-8 border-t border-gray-200">
        <button
          onClick={onBack}
          className="text-navy-600 hover:text-navy-800 flex items-center"
        >
          ← {language === 'es' ? 'Volver al blog' : 'Back to blog'}
        </button>
      </div>
    </article>
  );
}
