export interface CVData {
  name: string;
  title: string;
  contact: {
    phone: string;
    email: string;
    linkedin: string;
    github: string;
    credly: string;
    portfolio: string;
    location: string;
  };
  profile: string;
  skills: Record<string, string>;
  experience: {
    role: string;
    company: string;
    location: string;
    date: string;
    description: string[];
  }[];
  education: {
    title: string;
    institution: string;
    location: string;
    date: string;
  }[];
  languages: {
    language: string;
    level: string;
  }[];
  certifications: string[];
}
