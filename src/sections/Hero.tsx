import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiDownload, FiCalendar } from 'react-icons/fi';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { HERO_ROLES, SITE } from '../utils/constants';
import GlitchText from '../components/ui/GlitchText';
import MagneticButton from '../components/ui/MagneticButton';
import { fadeInUp, staggerContainer, staggerItem } from '../animations/variants';

export default function Hero() {
  const { displayText } = useTypingEffect({
    texts: [...HERO_ROLES],
    typingSpeed: 70,
    deletingSpeed: 35,
    pauseDuration: 2500,
  });

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg)] z-[2]" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Decorative top tag */}
        <motion.div
          variants={staggerItem}
          className="font-mono text-xs text-[var(--color-text-muted)] tracking-[0.3em] uppercase mb-6"
        >
          {'<'}<span className="text-[var(--color-primary)]">portfolio</span>{'>'}
        </motion.div>

        {/* Name */}
        <motion.div variants={staggerItem}>
          <GlitchText
            text="HENS"
            className="font-pixel text-[clamp(3rem,14vw,9rem)] leading-none tracking-[0.1em] text-[var(--color-text)]"
            continuous
            intensity="low"
          />
        </motion.div>

        {/* Subtitle — typing animation */}
        <motion.div
          variants={staggerItem}
          className="mt-6 h-10 flex items-center justify-center"
        >
          <span className="font-mono text-lg md:text-xl text-[var(--color-primary)]">
            {displayText}
          </span>
          <span className="terminal-cursor-red" />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={staggerItem}
          className="mt-6 font-mono text-sm text-[var(--color-text-dim)] max-w-xl mx-auto leading-relaxed"
        >
          Building next-gen digital experiences at the intersection of
          <span className="text-[var(--color-primary)]"> code</span>,
          <span className="text-[var(--color-terminal)]"> security</span>, and
          <span className="text-[var(--color-primary)]"> innovation</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={staggerItem}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton variant="primary" onClick={scrollToAbout}>
            <FiArrowDown className="mr-2" />
            Explore
          </MagneticButton>
          <MagneticButton variant="outline" href={SITE.resume}>
            <FiDownload className="mr-2" />
            Resume
          </MagneticButton>
          <MagneticButton variant="ghost" href={SITE.calendly}>
            <FiCalendar className="mr-2" />
            Book a Call
          </MagneticButton>
        </motion.div>

        {/* Decorative bottom tag */}
        <motion.div
          variants={staggerItem}
          className="font-mono text-xs text-[var(--color-text-muted)] tracking-[0.3em] uppercase mt-12"
        >
          {'</'}<span className="text-[var(--color-primary)]">portfolio</span>{'>'}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="font-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-[var(--color-primary)] origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
