export interface Trait {
  id: string;
  name: string;
  icon: string;
  color: string;
  percentage: number;
  description: string;
}

export interface Passion {
  title: string;
  icon: string;
  bgHex: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
  achievements: string[];
  image: string; // url or custom fallback
  demoUrl?: string;
  githubUrl?: string;
  category: 'code' | 'design' | 'creative';
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  skills: string[];
  achievements: string[];
}

export interface Hobby {
  id: string;
  title: string;
  icon: string;
  description: string;
  interactLabel: string;
  bgGrad: string;
}

export type PageId = 'about' | 'projects' | 'hobbies';
