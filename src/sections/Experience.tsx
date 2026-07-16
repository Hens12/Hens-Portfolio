import React from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../data/experience';
import TypewriterText from '../components/ui/TypewriterText';
import { sectionTitle, staggerContainer, staggerItem } from '../animations/variants';

const typeStyles = {
  job: { label: 'POSITION', color: '#ff1a1a' },
  internship: { label: 'INTERNSHIP', color: '#00ff66' },
  freelance: { label: 'FREELANCE', color: '#ffaa00' },
  certification: { label: 'CERTIFICATION', color: '#66ccff' },
};

export default function Experience() {
  return (
    <section id="experience" className="section-container relative py-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Section header */}
        <motion.div variants={sectionTitle} className="text-center mb-20 md:mb-24 flex flex-col items-center">
          <span className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-[0.3em] block mb-2 text-center">
            // Experience
          </span>
          <h2 className="font-pixel text-3xl md:text-4xl text-[var(--color-text)] tracking-wider mt-2 mb-4 text-glow text-center">
            CAREER TIMELINE
          </h2>
          <p className="font-mono text-sm text-[var(--color-text-muted)] max-w-xl mx-auto leading-relaxed text-center">
            Track record of roles, leadership, and technical achievements.
          </p>
        </motion.div>

        {/* Timeline container with explicit left padding gutter */}
        <div className="relative max-w-4xl mx-auto pl-10 sm:pl-14 pr-4">
          {/* Vertical line track centered at x=19px (sm: 27px) */}
          <div className="absolute left-[19px] sm:left-[27px] top-3 bottom-3 w-[2px] -translate-x-1/2 pointer-events-none">
            <motion.div
              className="w-full h-full bg-gradient-to-b from-transparent via-[var(--color-primary)] to-transparent"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              style={{ transformOrigin: 'top' }}
            />
          </div>

          {experiences.map((exp, expIdx) => {
            const style = typeStyles[exp.type];
            return (
              <motion.div
                key={exp.id}
                variants={staggerItem}
                className="relative mb-12 last:mb-0"
              >
                {/* Timeline dot centered directly on the left vertical track line outside card */}
                <motion.div
                  className="absolute -left-[29px] sm:-left-[35px] top-7 w-4 h-4 rounded-full
                             border-2 z-20 shrink-0"
                  style={{
                    borderColor: style.color,
                    backgroundColor: 'var(--color-bg)',
                  }}
                  whileInView={{
                    boxShadow: [
                      `0 0 0px ${style.color}00`,
                      `0 0 16px ${style.color}aa`,
                      `0 0 0px ${style.color}00`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: expIdx * 0.3 }}
                  viewport={{ once: false }}
                />

                {/* Timeline Card */}
                <div className="border border-[var(--color-border-red)] rounded-xl p-6 md:p-8
                                bg-[var(--color-bg-card)] card-glow relative">
                  {/* Badge & Period Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-[var(--color-border-red)]/40 pb-3">
                    <span
                      className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest rounded-sm border font-semibold"
                      style={{
                        color: style.color,
                        borderColor: `${style.color}44`,
                        backgroundColor: `${style.color}12`,
                      }}
                    >
                      {style.label}
                    </span>
                    <span className="font-mono text-xs text-[var(--color-text-muted)] tracking-wider">
                      {exp.period}
                    </span>
                  </div>

                  {/* Title & Company */}
                  <h3 className="font-pixel text-lg md:text-xl text-[var(--color-text)] mb-1 tracking-wide">
                    {exp.title}
                  </h3>
                  <p className="font-mono text-sm text-[var(--color-primary)] font-semibold mb-4 tracking-wide">
                    {exp.company}
                  </p>

                  {/* Overview description */}
                  <p className="font-mono text-sm text-[var(--color-text-dim)] leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  {/* Highlights Bullet List with Typewriter text animation */}
                  <div className="mb-6 space-y-3 bg-black/30 p-4 rounded-lg border border-[var(--color-border-red)]/50">
                    {exp.highlights.map((h, hi) => (
                      <div
                        key={hi}
                        className="font-mono text-xs text-[var(--color-text-dim)] leading-relaxed flex items-start gap-2.5"
                      >
                        <span className="text-[var(--color-terminal)] mt-0.5 shrink-0 font-bold">▹</span>
                        <span>
                          <TypewriterText
                            text={h}
                            speed={18}
                            delay={300 + hi * 250}
                          />
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--color-border-red)]/40">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[10px] font-mono rounded-sm
                                   bg-[rgba(255,26,26,0.06)] text-[var(--color-text-muted)]
                                   border border-[var(--color-border-red)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
