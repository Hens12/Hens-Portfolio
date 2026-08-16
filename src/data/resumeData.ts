// ============================================
// RESUME DATA
// ============================================

export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  href?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Certification {
  title: string;
  issuer: string;
}

export interface Education {
  institution: string;
  detail: string;
  status: string;
}

export interface KeyProject {
  name: string;
  description: string;
}

export const RESUME = {
  name: 'Hens Mangukiya',
  title: 'Full Stack Developer & AI Engineer',
  avatar: '/profile-avatar.jpg',
  yearsExperience: '5+',

  contact: [
    {
      icon: '📍',
      label: 'Location',
      value: 'Surat, Gujarat',
    },
    {
      icon: '✉️',
      label: 'Email',
      value: 'hensmangukiya71@gmail.com',
      href: 'mailto:hensmangukiya71@gmail.com',
    },
    {
      icon: '🔗',
      label: 'LinkedIn',
      value: 'linkedin.com/in/hens-mangukiya',
      href: 'https://linkedin.com/in/hens-mangukiya',
    },
    {
      icon: '📞',
      label: 'Phone',
      value: '7863056702',
      href: 'tel:+917863056702',
    },
    {
      icon: '🐙',
      label: 'GitHub',
      value: 'github.com/Hens12',
      href: 'https://github.com/Hens12',
    },
    {
      icon: '🌐',
      label: 'Website',
      value: 'hensportfolio.netlify.app',
      href: 'https://hensportfolio.netlify.app',
    },
  ] satisfies ContactInfo[],

  coreDomains: [
    'Full Stack Development',
    'AI/ML & LLMs',
    'Cyber Security',
    'Networking',
  ],

  skillCategories: [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'HTML', 'CSS'],
    },
    {
      category: 'Backend & Database',
      items: ['Node.js', 'Python', 'FastAPI', 'Express', 'Go', 'PostgreSQL'],
    },
    {
      category: 'Cloud, AI & Immersive',
      items: ['AWS', 'Three.js', 'Docker'],
    },
  ] satisfies SkillCategory[],

  certifications: [
    { title: 'Networking', issuer: 'Cisco' },
    { title: 'Python Basics', issuer: 'IBM' },
    { title: 'Dronacharya (IoT)', issuer: 'College Event' },
    { title: 'Computer Hardware', issuer: 'Certificate' },
  ] satisfies Certification[],

  languages: ['English', 'Hindi', 'Gujarati', 'Kannada'],

  overview:
    'Full Stack Developer and AI Engineer who thrives at the intersection of code, creativity, and security. Passionate about building high-performance, scalable web applications with deep expertise in full-stack engineering, AI/ML pipelines, and cybersecurity. Proven track record leading development teams, architecting cloud-native microservices, and contributing to open-source software. Constantly exploring emerging technologies from WebAssembly to LLMs.',

  keyProjects: [
    {
      name: 'Quantum Sim Engine & Picasso\'s Studio',
      description:
        'WebGL-based quantum circuit simulator for education and high-performance interactive 3D studio.',
    },
    {
      name: 'College Timetable Management System',
      description: 'Upcoming project — intelligent timetable management solution for college scheduling.',
    },
    {
      name: 'Shinewell NGO',
      description: 'Web handling and website builder for the Shinewell NGO organization.',
    },
  ] satisfies KeyProject[],

  achievements: [
    'IBM India First Hackathon participant (Surat, Gujarat), Meta Hackathon participant, and multiple other hackathon experiences.',
    'Technical support lead for college events and tech fests.',
  ],

  education: [
    {
      institution: 'Sondariya Institution of Management & Science',
      detail: 'Bangalore University',
      status: 'Currently in Final Year',
    },
    {
      institution: 'Ashadeep International',
      detail: '12th Standard',
      status: 'Passed',
    },
  ] satisfies Education[],

  interests: [
    'Building side projects with emerging web technologies',
    'Exploring WebAssembly & cutting-edge browser APIs',
    'Competitive programming & CTF challenges',
    'Open-source contributions & community building',
    'Learning about distributed systems & cloud architecture',
  ],
} as const;
