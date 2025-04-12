export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  links: {
    demo?: string;
    github?: string;
  };
  featured: boolean;
} 