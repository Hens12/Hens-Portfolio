// ============================================
// PROJECT DATA
// ============================================

export interface Project {
  id: string;
  name: string;
  command: string;
  description: string;
  techStack: string[];
  github?: string;
  liveDemo?: string;
  status: 'deployed' | 'development' | 'archived';
}

export const projects: Project[] = [
  {
    id: 'ai-startup',
    name: 'AI Startup Platform',
    command: 'open ai-startup',
    description:
      'Full-stack AI-powered SaaS platform with real-time data processing, LLM integration, and automated workflows. Built for scale with microservices architecture.',
    techStack: ['React', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    github: 'https://github.com/hens/ai-startup',
    liveDemo: 'https://ai-startup.hens.dev',
    status: 'deployed',
  },
  {
    id: 'cyber-dashboard',
    name: 'Cyber Security Dashboard',
    command: 'open cyber-dashboard',
    description:
      'Real-time threat monitoring dashboard with network packet analysis, vulnerability scanning, and incident response automation. Features live threat map visualization.',
    techStack: ['Next.js', 'TypeScript', 'Three.js', 'WebSocket', 'Go', 'Kubernetes'],
    github: 'https://github.com/hens/cyber-dashboard',
    liveDemo: 'https://cyber.hens.dev',
    status: 'deployed',
  },
  {
    id: 'portfolio',
    name: 'Hacker Portfolio',
    command: 'open portfolio',
    description:
      'The very portfolio you are viewing right now. A cinematic, hacker-themed showcase built with React, Three.js, GSAP, and Framer Motion. Featuring terminal UI, particle systems, and glitch effects.',
    techStack: ['React', 'TypeScript', 'Three.js', 'GSAP', 'Framer Motion', 'Tailwind'],
    github: 'https://github.com/hens/portfolio',
    status: 'deployed',
  },
  {
    id: 'trading-bot',
    name: 'Algorithmic Trading Bot',
    command: 'open trading-bot',
    description:
      'Automated crypto trading bot with ML-driven strategy optimization, backtesting engine, and real-time market data analysis. Supports multiple exchanges via unified API.',
    techStack: ['Python', 'TensorFlow', 'FastAPI', 'Redis', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/hens/trading-bot',
    status: 'deployed',
  },
  {
    id: 'defi-protocol',
    name: 'DeFi Protocol',
    command: 'open defi-protocol',
    description:
      'Decentralized finance protocol with automated market making, yield optimization, and governance. Smart contracts audited and deployed on Ethereum mainnet.',
    techStack: ['Solidity', 'Hardhat', 'React', 'ethers.js', 'The Graph', 'IPFS'],
    github: 'https://github.com/hens/defi-protocol',
    liveDemo: 'https://defi.hens.dev',
    status: 'deployed',
  },
];

export interface UpcomingProject {
  name: string;
  status: 'loading' | 'compiling' | 'deploying' | 'coming-soon';
  progress: number;
  description: string;
}

export const upcomingProjects: UpcomingProject[] = [
  {
    name: 'lensfusion production',
    status: 'loading',
    progress: 25,
    description: 'lensfusion website production contact:- +91 9327348770, +91 95745 80058 ',
  },
  {
    name: 'Neural Code Editor',
    status: 'compiling',
    progress: 65,
    description: 'AI-powered code editor with real-time pair programming capabilities',
  },
  {
    name: 'Quantum Sim Engine',
    status: 'loading',
    progress: 30,
    description: 'WebGL-based quantum circuit simulator for education',
  },
  {
    name: 'SecureChat Protocol',
    status: 'deploying',
    progress: 85,
    description: 'End-to-end encrypted messaging with zero-knowledge proofs',
  },
  {
    name: 'AR Dev Toolkit',
    status: 'coming-soon',
    progress: 15,
    description: 'Augmented reality development framework for web applications',
  },
];
