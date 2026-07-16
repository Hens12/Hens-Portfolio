import React from 'react';
import { motion } from 'framer-motion';
import { sectionTitle, staggerContainer, staggerItem } from '../animations/variants';

const phases = [
  { phase: '01', title: 'Analyze', subtitle: 'Discovery', stage: '1/5', progress: 20 },
  { phase: '02', title: 'Design', subtitle: 'Architect', stage: '2/5', progress: 40 },
  { phase: '03', title: 'Develop', subtitle: 'Build', stage: '3/5', progress: 60 },
  { phase: '04', title: 'Validate', subtitle: 'Test', stage: '4/5', progress: 80 },
  { phase: '05', title: 'Launch', subtitle: 'Deploy', stage: '5/5', progress: 100 },
];

export default function Process() {
  return (
    <section className="section-container relative">
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
            // Process
          </span>
          <h2 className="font-pixel text-3xl md:text-4xl text-[var(--color-text)] mt-3 text-glow text-center">
            HOW WE ENGINEER EXCELLENCE
          </h2>
          <p className="font-mono text-sm text-[var(--color-text-muted)] mt-3 text-center">
            Our battle-tested methodology delivers results, every time.
          </p>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="relative w-full max-w-3xl mx-auto">
          {/* Timeline connector line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5">
            <motion.div
              className="w-full h-full bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-primary)] to-[var(--color-accent)]"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{ transformOrigin: 'top' }}
            />
          </div>

          {phases.map((phase, i) => (
            <motion.div
              key={phase.phase}
              variants={staggerItem}
              className={`relative flex items-center gap-6 mb-12 ${
                i % 2 === 0
                  ? 'md:flex-row md:text-right'
                  : 'md:flex-row-reverse md:text-left'
              }`}
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full
                           bg-[var(--color-bg)] border-2 border-[var(--color-primary)] z-10"
                whileInView={{
                  boxShadow: [
                    '0 0 0px rgba(255,26,26,0)',
                    '0 0 20px rgba(255,26,26,0.5)',
                    '0 0 0px rgba(255,26,26,0)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                viewport={{ once: false }}
              />

              {/* Content card */}
              <div
                className={`ml-16 md:ml-0 md:w-[calc(50%-30px)] ${
                  i % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}
              >
                <div className="border border-[var(--color-border-red)] rounded-lg p-5
                                bg-[var(--color-bg-card)] card-glow">
                  {/* Phase number */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-pixel text-xs text-[var(--color-primary)] opacity-60">
                      PHASE {phase.phase}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
                      Stage {phase.stage}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-pixel text-lg text-[var(--color-text)] mb-1">
                    {phase.title}
                  </h3>
                  <p className="font-mono text-xs text-[var(--color-text-muted)] mb-4">
                    {phase.subtitle}
                  </p>

                  {/* Progress bar */}
                  <div className="progress-bar">
                    <motion.div
                      className="progress-bar-fill"
                      initial={{ width: '0%' }}
                      whileInView={{ width: `${phase.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.3 + i * 0.15, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="text-right font-mono text-[10px] text-[var(--color-text-muted)] mt-1">
                    {phase.progress}%
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
