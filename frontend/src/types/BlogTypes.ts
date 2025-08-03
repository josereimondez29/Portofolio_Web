export interface BlogPost {
  id: string;
  title: string;
  content: string;
  summary: string;
  date: string;
  image?: string;
  tags: string[];
  readTime: number;
}
