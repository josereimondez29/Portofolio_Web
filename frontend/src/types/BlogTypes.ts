export interface Post {
  _id: string;
  title: string;
  brief: string;
  slug: string;
  publishedAt: string;
  coverImage: {
    url: string;
  };
  readTimeInMinutes: number;
}

export interface HashnodeResponse {
  user: {
    publication: {
      posts: {
        nodes: Post[];
      };
    };
  };
}
