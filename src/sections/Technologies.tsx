import React from 'react';
import { motion } from 'framer-motion';
import {
  SiReact, SiNextdotjs, SiVuedotjs, SiTypescript, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPython, SiFastapi, SiGo,
  SiDocker, SiKubernetes, SiGithubactions, SiLinux, SiNginx,
  SiThreedotjs, SiBlender, SiUnity, SiTensorflow,
} from 'react-icons/si';
import { FaJava, FaAws } from 'react-icons/fa';
import { sectionTitle, staggerContainer, staggerItem } from '../animations/variants';

interface TechItem {
  name: string;
  icon: React.ReactNode;
}

interface Category {
  title: string;
  subtitle: string;
  items: TechItem[];
}

const categories: Category[] = [
  {
    title: 'Frontend',
    subtitle: 'Crafting pixel-perfect interfaces',
    items: [
      { name: 'React', icon: <SiReact /> },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'Vue', icon: <SiVuedotjs /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Tailwind', icon: <SiTailwindcss /> },
    ],
  },
  {
    title: 'Backend',
    subtitle: 'Building bulletproof systems',
    items: [
      { name: 'Node.js', icon: <SiNodedotjs /> },
      { name: 'Express', icon: <SiExpress /> },
      { name: 'Python', icon: <SiPython /> },
      { name: 'FastAPI', icon: <SiFastapi /> },
      { name: 'Java', icon: <FaJava /> },
      { name: 'Go', icon: <SiGo /> },
    ],
  },
  {
    title: 'DevOps',
    subtitle: 'Automating everything',
    items: [
      { name: 'Docker', icon: <SiDocker /> },
      { name: 'Kubernetes', icon: <SiKubernetes /> },
      { name: 'GitHub Actions', icon: <SiGithubactions /> },
      { name: 'Linux', icon: <SiLinux /> },
      { name: 'AWS', icon: <FaAws /> },
      { name: 'NGINX', icon: <SiNginx /> },
    ],
  },
  {
    title: 'Immersive',
    subtitle: 'Pushing boundaries',
    items: [
      { name: 'Three.js', icon: <SiThreedotjs /> },
      { name: 'WebGL', icon: <SiThreedotjs /> },
      { name: 'Blender', icon: <SiBlender /> },
      { name: 'Unity', icon: <SiUnity /> },
      { name: 'AI/ML', icon: <SiTensorflow /> },
    ],
  },
];

export default function Technologies() {
  return (
    <section id="technologies" className="section-container relative">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="w-full flex flex-col items-center"
      >
        {/* Section header */}
        <motion.div variants={sectionTitle} className="text-center mb-20 md:mb-24 w-full flex flex-col items-center">
          <span className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-[0.3em] block mb-2 text-center">
            // Tech Stack
          </span>
          <h2 className="font-pixel text-3xl md:text-4xl text-[var(--color-text)] mt-3 text-glow text-center">
            TECHNOLOGIES WE MASTER
          </h2>
          <p className="font-mono text-sm text-[var(--color-text-muted)] mt-3 text-center">
            Battle-tested tools for building the future.
          </p>
        </motion.div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
          {categories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              variants={staggerItem}
              className="border border-[var(--color-border-red)] rounded-lg p-6
                         bg-[var(--color-bg-card)] card-glow relative overflow-hidden group"
            >
              {/* Glow corner */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--color-primary)] opacity-[0.03]
                              rounded-full blur-3xl group-hover:opacity-[0.08] transition-opacity duration-500" />

              {/* Header */}
              <div className="mb-5">
                <h3 className="font-pixel text-lg text-[var(--color-primary)] text-glow">
                  {category.title}
                </h3>
                <p className="font-mono text-xs text-[var(--color-text-muted)] mt-1">
                  {category.subtitle}
                </p>
              </div>

              {/* Tech items */}
              <div className="grid grid-cols-3 gap-3">
                {category.items.map((item, itemIdx) => (
                  <motion.div
                    key={item.name}
                    className="flex flex-col items-center gap-2 p-3 rounded-md
                               border border-transparent hover:border-[var(--color-border-red)]
                               hover:bg-[rgba(255,26,26,0.03)] transition-all duration-300 group/item"
                    whileHover={{ y: -4, scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    <span className="text-xl text-[var(--color-text-dim)] group-hover/item:text-[var(--color-primary)]
                                     transition-colors duration-300 group-hover/item:drop-shadow-[0_0_8px_rgba(255,26,26,0.5)]">
                      {item.icon}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--color-text-muted)] group-hover/item:text-[var(--color-text-dim)]
                                     transition-colors text-center">
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
