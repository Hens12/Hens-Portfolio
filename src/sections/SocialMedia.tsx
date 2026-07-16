import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { SITE } from '../utils/constants';
import { staggerContainer, iconBounce } from '../animations/variants';

const socials = [
  {
    icon: FaGithub,
    href: `https://github.com/${SITE.github}`,
    label: 'GitHub',
  },
  {
    icon: FaLinkedinIn,
    href: SITE.linkedin,
    label: 'LinkedIn',
  },
  {
    icon: FaInstagram,
    href: SITE.instagram,
    label: 'Instagram',
  },
];

export default function SocialMedia() {
  return (
    <section className="py-16 relative">
      <motion.div
        className="flex items-center justify-center gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {socials.map(({ icon: Icon, href, label }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="relative p-4 rounded-full border border-[var(--color-border-red)]
                       bg-[var(--color-bg-card)] text-[var(--color-text-dim)]
                       hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]
                       transition-all duration-300 group"
            variants={iconBounce}
            initial="rest"
            whileHover="hover"
          >
            <Icon size={24} />
            {/* Glow ring on hover */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100
                            transition-opacity duration-300
                            shadow-[0_0_20px_rgba(255,26,26,0.3)]
                            pointer-events-none" />
            {/* Label tooltip */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px]
                             text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100
                             transition-opacity whitespace-nowrap">
              {label}
            </span>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
