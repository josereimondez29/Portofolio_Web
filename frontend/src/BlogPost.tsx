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
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-navy-600 hover:text-navy-800 flex items-center"
          >
            ← {language === 'es' ? 'Volver al blog' : 'Back to blog'}
          </button>
          
          <div className="flex space-x-4">
            <button
              onClick={() => {
                const postUrl = `https://josereimondez.com/blog/${post.slug}`;
                const title = post.title;
                const description = post.brief || '';
                
                window.open(
                  `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}&source=Portfolio José Reimondez`,
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
                const url = `https://josereimondez.com/blog/${post.slug}`;
                const title = post.title;
                const emailBody = `
${title}

${post.brief || ''}

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
              onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title} - https://josereimondez.com/blog/${post.slug}`)}`)}
              className="text-navy-600 hover:text-[#25D366] transition-colors duration-200"
              title="Compartir en WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(`https://josereimondez.com/blog/${post.slug}`).then(() => alert(language === 'es' ? 'Enlace copiado!' : 'Link copied!'))}
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
  );
}
