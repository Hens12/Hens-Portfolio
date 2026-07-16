import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem, sectionTitle } from '../animations/variants';
import AnimatedCounter from '../components/ui/AnimatedCounter';

const stats = [
  { label: 'Years Experience', value: 3, suffix: '+' },
  { label: 'Projects Completed', value: 25, suffix: '+' },
  { label: 'Technologies', value: 30, suffix: '+' },
  { label: 'Lines of Code', value: 500, suffix: 'K+' },
];

const aboutPoints = [
  'Passionate about building high-performance, scalable web applications',
  'Deep expertise in full-stack development, AI/ML, and cybersecurity',
  'Experience leading development teams and architecting complex systems',
  'Open source contributor and tech community advocate',
  'Constantly exploring emerging technologies — from WebAssembly to LLMs',
];

export default function About() {
  return (
    <section id="about" className="section-container relative">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Section header */}
        <motion.div variants={sectionTitle} className="text-center mb-20 md:mb-24">
          <span className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-[0.3em]">
            // About Me
          </span>
          <h2 className="font-pixel text-3xl md:text-4xl text-[var(--color-text)] mt-3 text-glow">
            WHO AM I
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — About text */}
          <motion.div variants={fadeInUp}>
            <div className="font-mono text-sm text-[var(--color-text-dim)] leading-relaxed space-y-4">
              <p>
                <span className="text-[var(--color-terminal)]">{'>'}</span>{' '}
                I am a{' '}
                <span className="text-[var(--color-primary)] font-semibold">
                  Full Stack Developer
                </span>{' '}
                and{' '}
                <span className="text-[var(--color-primary)] font-semibold">
                  AI Engineer
                </span>{' '}
                who thrives at the intersection of code, creativity, and security.
              </p>

              <ul className="space-y-3">
                {aboutPoints.map((point, i) => (
                  <motion.li
                    key={i}
                    variants={staggerItem}
                    className="flex items-start gap-3"
                  >
                    <span className="text-[var(--color-primary)] mt-1 text-xs">▹</span>
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right — Stats grid */}
          <motion.div variants={fadeInUp}>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  className="p-6 border border-[var(--color-border-red)] rounded-lg card-glow
                             bg-[var(--color-bg-card)] text-center"
                >
                  <div className="font-pixel text-2xl md:text-3xl text-[var(--color-primary)] text-glow">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      duration={2.5}
                    />
                  </div>
                  <div className="font-mono text-xs text-[var(--color-text-muted)] mt-2 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Terminal-style info */}
            <div className="mt-6 p-4 bg-[var(--color-bg-terminal)] border border-[var(--color-border-red)] rounded-md font-mono text-xs">
              <div className="text-[var(--color-text-muted)]">
                <span className="text-[var(--color-terminal)]">$</span> cat location.txt
              </div>
              <div className="text-[var(--color-text-dim)] mt-1">📍 Bangalore, India</div>
              <div className="text-[var(--color-text-muted)] mt-2">
                <span className="text-[var(--color-terminal)]">$</span> cat status.txt
              </div>
              <div className="text-[var(--color-primary)] mt-1">🟢 Open for opportunities</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
