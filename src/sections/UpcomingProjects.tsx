import React from 'react';
import { motion } from 'framer-motion';
import TerminalWindow from '../components/ui/TerminalWindow';
import { upcomingProjects } from '../data/projects';
import { sectionTitle, staggerContainer, staggerItem } from '../animations/variants';

const statusConfig = {
  loading: { label: 'Loading...', color: '#ff1a1a', blink: true },
  compiling: { label: 'Compiling...', color: '#ffaa00', blink: true },
  deploying: { label: 'Deploying...', color: '#00ff66', blink: false },
  'coming-soon': { label: 'Coming Soon', color: '#555555', blink: false },
};

export default function UpcomingProjects() {
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
            // Pipeline
          </span>
          <h2 className="font-pixel text-3xl md:text-4xl text-[var(--color-text)] mt-3 text-glow text-center">
            UPCOMING
          </h2>
          <p className="font-mono text-sm text-[var(--color-text-muted)] mt-3 text-center">
            Active developments currently undergoing architecture & compilation.
          </p>
        </motion.div>

        <motion.div variants={staggerItem} className="w-full flex justify-center">
          <TerminalWindow title="root@hens: ~/pipeline" className="w-full max-w-4xl mx-auto">
            {/* Queue header */}
            <div className="flex items-start gap-2 mb-4">
              <span className="prompt whitespace-nowrap">root@hens:~$</span>
              <span className="prompt-text">cat queue.log</span>
            </div>

            <div className="space-y-4">
              {upcomingProjects.map((project, i) => {
                const status = statusConfig[project.status];
                return (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="p-3 border border-[var(--color-border-red)] rounded bg-[rgba(255,26,26,0.02)]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h4 className="font-pixel text-sm text-[var(--color-text)]">
                        {project.name}
                      </h4>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          status.blink ? 'animate-pulse' : ''
                        }`}
                        style={{
                          color: status.color,
                          borderColor: `${status.color}33`,
                          backgroundColor: `${status.color}0d`,
                        }}
                      >
                        ● {status.label}
                      </span>
                    </div>

                    <p className="font-mono text-xs text-[var(--color-text-muted)] mb-2">
                      {project.description}
                    </p>

                    {/* Progress bar */}
                    <div className="progress-bar">
                      <motion.div
                        className="progress-bar-fill"
                        initial={{ width: '0%' }}
                        whileInView={{ width: `${project.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: i * 0.2, ease: 'easeOut' }}
                      />
                    </div>
                    <div className="text-right font-mono text-[10px] text-[var(--color-text-muted)] mt-1">
                      {project.progress}%
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex items-start gap-2 mt-4 pt-2 border-t border-[var(--color-border-red)]">
              <span className="prompt whitespace-nowrap">root@hens:~$</span>
              <span className="terminal-cursor" />
            </div>
          </TerminalWindow>
        </motion.div>
      </motion.div>
    </section>
  );
}
