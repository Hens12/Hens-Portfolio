// ============================================
// PORTFOLIO CONSTANTS
// ============================================

export const SITE = {
  name: 'Hens',
  title: 'Hens | Elite Developer Portfolio',
  description: 'Full Stack Developer · AI Engineer · Cyber Security Enthusiast · Startup Builder',
  github: 'Hens12',
  linkedin: 'https://www.linkedin.com/in/hens-mangukiya-253475273?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  instagram: 'https://www.instagram.com/hens__mangukiya__?igsh=MWQ4aGViOXZ1Z3VwMg%3D%3D&utm_source=qr',
  email: 'hensmangukiya71@gmail.com',
  phone: '+91 7863056702',
  phoneRaw: '7863056702',
  location: 'Bangalore, India',
  resume: '/resume.pdf',
  calendly: '#',
} as const;

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#technologies' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
] as const;

export const HERO_ROLES = [
  'Full Stack Developer',
  'AI Engineer',
  'Cyber Security Enthusiast',
  'Startup Builder',
  'Open Source Contributor',
] as const;

export const TERMINAL_USER = 'root@hens';
export const TERMINAL_DIR = '~';
export const TERMINAL_PROMPT = `${TERMINAL_USER}:${TERMINAL_DIR}$`;

export const EMAILJS = {
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey: 'YOUR_PUBLIC_KEY',
} as const;
