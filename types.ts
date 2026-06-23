
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  longDescription?: string;
  technicalSpecs?: {
    label: string;
    value: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  fullDescription?: string;
  problemStatement?: string;
  technicalApproach?: string;
  results?: string;
  technologies?: string[];
  link?: string;
  caseStudyUrl?: string;
  demoVideoUrl?: string;
  captionsUrl?: string;
  duration?: string;
  status?: 'Completed' | 'In Progress' | 'Maintenance';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface TechDomain {
  id: string;
  label: string;
  skills: string[];
}

export enum SectionId {
  HOME = 'home',
  SERVICES = 'services',
  PROCESS = 'process',
  ABOUT = 'about',
  PORTFOLIO = 'portfolio',
  INSIGHTS = 'insights',
  CONTACT = 'contact',
}