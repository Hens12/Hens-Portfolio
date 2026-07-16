// ============================================
// SPECIALIZED VERTICALS DATA
// ============================================

export interface Vertical {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  icon: string;
  gradient: string;
}

export const verticals: Vertical[] = [
  {
    id: 'engineering',
    title: 'Engineering',
    subtitle: 'Advanced Web Tech',
    description:
      'Pushing the boundaries of what is possible on the web with cutting-edge technologies and high-performance architectures.',
    technologies: ['WebRTC', 'Rust', 'WASM', 'Three.js'],
    icon: '⚡',
    gradient: 'from-red-900/40 to-black',
  },
  {
    id: 'web3',
    title: 'Web3',
    subtitle: 'Blockchain Solutions',
    description:
      'Building decentralized applications and smart contracts that power the next generation of financial infrastructure.',
    technologies: ['Smart Contracts', 'DeFi', 'NFTs', 'DAOs'],
    icon: '🔗',
    gradient: 'from-red-800/30 to-black',
  },
  {
    id: 'gaming',
    title: 'Gaming',
    subtitle: 'Interactive Experiences',
    description:
      'Creating immersive gaming experiences with real-time 3D rendering, physics engines, and multiplayer networking.',
    technologies: ['Unity', 'WebGL', 'Mobile Games', 'VR/AR'],
    icon: '🎮',
    gradient: 'from-red-900/30 to-black',
  },
  {
    id: 'development',
    title: 'Development',
    subtitle: 'Enterprise Applications',
    description:
      'Architecting scalable enterprise solutions with modern frameworks, cloud-native patterns, and industry best practices.',
    technologies: ['React', 'Next.js', 'SvelteKit', 'Microservices'],
    icon: '🚀',
    gradient: 'from-red-800/40 to-black',
  },
];
