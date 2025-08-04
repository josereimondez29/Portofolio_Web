export interface Post {
  id: string;
  title: string;
  brief: string;
  content: {
    html: string;
    markdown: string;
  };
  slug: string;
  publishedAt: string;
  coverImage: {
    url: string;
  } | null;
  readTimeInMinutes: number;
  tags: Array<{
    name: string;
    slug: string;
  }>;
}

export interface HashnodeResponse {
  publication: {
    posts: {
      edges: Array<{
        node: Post;
      }>;
    };
  };
}
