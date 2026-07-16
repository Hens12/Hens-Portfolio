// ============================================
// EXPERIENCE DATA
// ============================================

export interface ExperienceEntry {
  id: string;
  type: 'job' | 'internship' | 'freelance' | 'certification';
  title: string;
  company: string;
  period: string;
  description: string;
  techStack: string[];
  highlights: string[];
}

export const experiences: ExperienceEntry[] = [
  {
    id: 'exp-1',
    type: 'job',
    title: 'Full Stack Developer',
    company: 'TechCorp Inc.',
    period: '2024 — Present',
    description:
      'Leading development of cloud-native microservices architecture serving 100K+ users. Building real-time data pipelines and AI-powered features.',
    techStack: ['React', 'Node.js', 'Python', 'AWS', 'Docker'],
    highlights: [
      'Reduced API latency by 40% through architecture optimization',
      'Led migration from monolith to microservices',
      'Implemented CI/CD pipeline reducing deploy time by 60%',
    ],
  },
  {
    id: 'exp-2',
    type: 'freelance',
    title: 'AI/ML Engineer',
    company: 'Freelance',
    period: '2023 — 2024',
    description:
      'Built custom AI solutions for startups — from recommendation engines to NLP pipelines. Delivered 10+ production-ready ML models.',
    techStack: ['Python', 'TensorFlow', 'FastAPI', 'PostgreSQL'],
    highlights: [
      'Built recommendation engine increasing user engagement by 35%',
      'Deployed NLP pipeline processing 1M+ documents daily',
      'Reduced model inference time by 70%',
    ],
  },
  {
    id: 'exp-3',
    type: 'internship',
    title: 'Cyber Security Intern',
    company: 'SecureNet Labs',
    period: '2023',
    description:
      'Conducted penetration testing and vulnerability assessments. Developed automated security scanning tools and incident response protocols.',
    techStack: ['Python', 'Linux', 'Burp Suite', 'Metasploit', 'Wireshark'],
    highlights: [
      'Identified 15+ critical vulnerabilities in client systems',
      'Built automated vulnerability scanner',
      'Created security training program for 50+ developers',
    ],
  },
  {
    id: 'exp-4',
    type: 'certification',
    title: 'AWS Solutions Architect',
    company: 'Amazon Web Services',
    period: '2023',
    description: 'Certified in designing distributed systems, cost optimization, and security best practices on AWS cloud infrastructure.',
    techStack: ['AWS', 'Cloud Architecture', 'Security'],
    highlights: [
      'Passed with 92% score',
      'Expertise in serverless, containers, and networking',
    ],
  },
];
