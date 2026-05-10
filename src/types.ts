export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies?: string[];
  challenges?: string[];
  tags: string[];
  status: 'Completed' | 'In Progress' | 'On Hold';
  image: string;
  link?: string;
  demoVideo?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  achievements?: {
    icon: string;
    text: string;
  }[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  link?: string;
}
