// ============================================
// TECHNOLOGIES DATA
// ============================================

export interface Technology {
  name: string;
  icon: string; // react-icons identifier
}

export interface TechCategory {
  title: string;
  subtitle: string;
  technologies: Technology[];
}

export const techCategories: TechCategory[] = [
  {
    title: 'Frontend',
    subtitle: 'Crafting pixel-perfect interfaces',
    technologies: [
      { name: 'React', icon: 'SiReact' },
      { name: 'Next.js', icon: 'SiNextdotjs' },
      { name: 'Vue', icon: 'SiVuedotjs' },
      { name: 'TypeScript', icon: 'SiTypescript' },
      { name: 'Tailwind', icon: 'SiTailwindcss' },
    ],
  },
  {
    title: 'Backend',
    subtitle: 'Building bulletproof systems',
    technologies: [
      { name: 'Node.js', icon: 'SiNodedotjs' },
      { name: 'Express', icon: 'SiExpress' },
      { name: 'Python', icon: 'SiPython' },
      { name: 'FastAPI', icon: 'SiFastapi' },
      { name: 'Java', icon: 'FaJava' },
      { name: 'Go', icon: 'SiGo' },
    ],
  },
  {
    title: 'DevOps',
    subtitle: 'Automating everything',
    technologies: [
      { name: 'Docker', icon: 'SiDocker' },
      { name: 'Kubernetes', icon: 'SiKubernetes' },
      { name: 'GitHub Actions', icon: 'SiGithubactions' },
      { name: 'Linux', icon: 'SiLinux' },
      { name: 'AWS', icon: 'SiAmazonwebservices' },
      { name: 'NGINX', icon: 'SiNginx' },
    ],
  },
  {
    title: 'Immersive',
    subtitle: 'Pushing boundaries',
    technologies: [
      { name: 'Three.js', icon: 'SiThreedotjs' },
      { name: 'WebGL', icon: 'SiWebgl' },
      { name: 'Blender', icon: 'SiBlender' },
      { name: 'Unity', icon: 'SiUnity' },
      { name: 'AI/ML', icon: 'SiTensorflow' },
    ],
  },
];
