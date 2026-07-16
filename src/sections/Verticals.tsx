import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiShield, FiCrosshair, FiCode } from 'react-icons/fi';
import { verticals } from '../data/verticals';
import TypewriterText from '../components/ui/TypewriterText';
import { sectionTitle, staggerContainer, staggerItem } from '../animations/variants';

const verticalIcons: Record<string, React.ReactNode> = {
  engineering: <FiCpu className="text-[var(--color-primary)] text-2xl drop-shadow-[0_0_10px_#ff1a1a]" />,
  web3: <FiShield className="text-[var(--color-primary)] text-2xl drop-shadow-[0_0_10px_#ff1a1a]" />,
  gaming: <FiCrosshair className="text-[var(--color-primary)] text-2xl drop-shadow-[0_0_10px_#ff1a1a]" />,
  development: <FiCode className="text-[var(--color-primary)] text-2xl drop-shadow-[0_0_10px_#ff1a1a]" />,
};

export default function Verticals() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="section-container relative py-24">
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
            // Expertise
          </span>
          <h2 className="font-pixel text-3xl md:text-4xl text-[var(--color-text)] tracking-wider mt-2 mb-4 text-glow text-center">
            SPECIALIZED VERTICALS
          </h2>
          <p className="font-mono text-sm text-[var(--color-text-muted)] max-w-xl text-center leading-relaxed">
            Four distinct pillars of expertise, each solving unique challenges in the digital landscape.
          </p>
        </motion.div>

        {/* Verticals grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
          {verticals.map((vertical, idx) => (
            <motion.div
              key={vertical.id}
              variants={staggerItem}
              className="relative border border-[var(--color-border-red)] rounded-xl overflow-hidden
                         bg-[var(--color-bg-card)] group"
              onMouseEnter={() => setHoveredId(vertical.id)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                boxShadow: hoveredId === vertical.id
                  ? '0 0 40px rgba(255, 26, 26, 0.25)'
                  : '0 0 20px rgba(255, 26, 26, 0.05)',
                transition: 'box-shadow 0.3s ease',
              }}
            >
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${vertical.gradient} opacity-40`}
              />

              {/* Glow orb */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-[var(--color-primary)] opacity-[0.05]
                              rounded-full blur-3xl group-hover:opacity-[0.12] transition-opacity duration-500" />

              {/* Card Content with generous spacing */}
              <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                <div>
                  {/* Icon + Title Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3.5 rounded-xl border border-[var(--color-border-red)] bg-black/60 shrink-0
                                    shadow-[0_0_15px_rgba(255,26,26,0.15)] group-hover:shadow-[0_0_20px_rgba(255,26,26,0.3)]
                                    group-hover:border-[var(--color-primary)] transition-all duration-300">
                      {verticalIcons[vertical.id] || verticalIcons.engineering}
                    </div>
                    <div>
                      <h3 className="font-pixel text-lg text-[var(--color-text)] tracking-wide mb-1">
                        {vertical.title}
                      </h3>
                      <p className="font-mono text-xs text-[var(--color-primary)] font-semibold tracking-wider uppercase">
                        {vertical.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description with typewriter effect */}
                  <p className="font-mono text-sm text-[var(--color-text-dim)] leading-relaxed mb-6 min-h-[3.6rem]">
                    <TypewriterText
                      text={vertical.description}
                      speed={20}
                      delay={200 + idx * 150}
                    />
                  </p>
                </div>

                <div>
                  {/* Technologies tags with clean spacing */}
                  <div className="flex flex-wrap gap-2 mb-6 pt-2">
                    {vertical.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[11px] font-mono rounded-sm
                                   bg-[rgba(255,26,26,0.08)] text-[var(--color-text-muted)]
                                   border border-[var(--color-border-red)]
                                   group-hover:text-[var(--color-primary)]
                                   group-hover:border-[rgba(255,26,26,0.35)]
                                   transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Explore action button */}
                  <button
                    className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-widest
                               flex items-center gap-2 pt-2 group/btn hover:gap-3 transition-all duration-300"
                  >
                    <span>EXPLORE</span>
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
