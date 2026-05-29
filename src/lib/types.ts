export type ID = string;

export interface ContactItem {
  id: ID;
  type: 'email' | 'phone' | 'website' | 'linkedin' | 'github' | 'custom';
  value: string;
  label?: string;
}

export interface ExperienceItem {
  id: ID;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  bullets: string[];
}

export interface EducationItem {
  id: ID;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  location: string;
  bullets: string[];
}

export interface CertificateItem {
  id: ID;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface SkillGroup {
  id: ID;
  category: string;
  skills: string[];
}

export interface ProjectItem {
  id: ID;
  name: string;
  description: string;
  techStack: string[];
  link: string;
}

export interface ResumeSchema {
  basics: {
    name: string;
    title: string;
    summary: string;
    contact: ContactItem[];
  };
  experience: ExperienceItem[];
  education: EducationItem[];
  certificates: CertificateItem[];
  skills: SkillGroup[];
  projects: ProjectItem[];
  metadata: {
    theme: 'classic-light' | 'dark-minimal' | 'midnight-obsidian';
    typography: {
      fontFamily: string;
      baseFontSize: number;
      headingScale: number;
    };
    layout: {
      margin: number;
      spacing: number;
    };
  };
}

export const generateId = (): ID => Math.random().toString(36).substring(2, 9);

export const defaultResumeState: ResumeSchema = {
  basics: {
    name: 'Jane Doe',
    title: 'Senior Software Engineer',
    summary: 'Experienced software engineer specializing in scalable front-end architectures and high-performance layout engines.',
    contact: [
      { id: generateId(), type: 'email', value: 'jane.doe@example.com' },
      { id: generateId(), type: 'phone', value: '+1 (555) 123-4567' },
      { id: generateId(), type: 'linkedin', value: 'linkedin.com/in/janedoe' },
    ],
  },
  experience: [
    {
      id: generateId(),
      company: 'Tech Solutions Inc.',
      role: 'Lead Frontend Engineer',
      startDate: '2022',
      endDate: 'Present',
      location: 'San Francisco, CA',
      bullets: [
        'Architected a high-fidelity rendering engine using **Next.js** and React Server Components.',
        'Improved Time to Interactive (TTI) by 40% through lazy loading and payload optimization.',
        'Mentored a team of 5 junior engineers in functional programming paradigms.'
      ],
    },
  ],
  education: [
    {
      id: generateId(),
      institution: 'University of Engineering',
      degree: 'B.S. Computer Science',
      startDate: '2016',
      endDate: '2020',
      location: 'Boston, MA',
      bullets: [
        'Graduated Summa Cum Laude.',
        'Specialized in Human-Computer Interaction.'
      ],
    },
  ],
  certificates: [
    {
      id: generateId(),
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      url: 'https://aws.amazon.com/certification/'
    }
  ],
  skills: [
    {
      id: generateId(),
      category: 'Languages & Frameworks',
      skills: ['TypeScript', 'React', 'Next.js', 'Node.js', 'GraphQL'],
    },
  ],
  projects: [
    {
      id: generateId(),
      name: 'Outbox Resume Builder',
      description: 'A schema-driven high-fidelity resume builder featuring an automated, page-constrained real-time canvas preview.',
      techStack: ['Next.js', 'React', 'TypeScript', 'Zustand'],
      link: 'github.com/shreyasvavley/outbox'
    }
  ],
  metadata: {
    theme: 'midnight-obsidian',
    typography: {
      fontFamily: 'Inter, sans-serif',
      baseFontSize: 10,
      headingScale: 1.2,
    },
    layout: {
      margin: 15,
      spacing: 1.0,
    },
  },
};
