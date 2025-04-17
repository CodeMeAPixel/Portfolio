export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  images: string[];
  tags: string[];
  links: {
    demo?: string;
    github?: string;
    docs?: string;
    slug?: string;
  };
  featured?: boolean;
  technologies?: {
    name: string;
    description?: string;
  }[];
  challenges?: string[];
  solutions?: string[];
  keyFeatures?: string[];
  date?: string;
  role?: string;
  teamSize?: number;
  testimonials?: Testimonial[];
  testimonial?: Testimonial; // For backward compatibility
}

export interface Testimonial {
  quote: string;
  author: string;
  position?: string;
  company?: string;
  avatar?: string;
}