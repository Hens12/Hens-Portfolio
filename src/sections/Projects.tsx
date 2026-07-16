import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import TerminalWindow from '../components/ui/TerminalWindow';
import { projects, Project } from '../data/projects';
import { sectionTitle, staggerContainer, staggerItem } from '../animations/variants';
import TypewriterText from '../components/ui/TypewriterText';

type TerminalState = 'idle' | 'listing' | 'viewing';

export default function Projects() {
  const [state, setState] = useState<TerminalState>('idle');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentTyping, setCurrentTyping] = useState('');
  const [hasAnimated, setHasAnimated] = useState(false);

  const startAnimation = useCallback(() => {
    if (hasAnimated) return;
    setHasAnimated(true);
    setState('listing');
  }, [hasAnimated]);

  useEffect(() => {
    if (state === 'listing') {
      const command = 'ls ./projects';
      let i = 0;
      const typeCmd = setInterval(() => {
        if (i <= command.length) {
          setCurrentTyping(command.slice(0, i));
          i++;
        } else {
          clearInterval(typeCmd);
          setTypedLines([command]);
          setCurrentTyping('');
          setState('idle');
        }
      }, 50);
      return () => clearInterval(typeCmd);
    }
  }, [state]);

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(projectId);
    setState('viewing');
  };

  const selectedProjectData = projects.find((p) => p.id === selectedProject);

  return (
    <section id="projects" className="section-container relative">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        onViewportEnter={startAnimation}
        className="w-full flex flex-col items-center"
      >
        {/* Section header */}
        <motion.div variants={sectionTitle} className="text-center mb-20 md:mb-24 w-full flex flex-col items-center">
          <span className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-[0.3em] block mb-2 text-center">
            // Projects
          </span>
          <h2 className="font-pixel text-3xl md:text-4xl text-[var(--color-text)] mt-3 text-glow text-center">
            MY WORK
          </h2>
          <p className="font-mono text-sm text-[var(--color-text-muted)] mt-3 text-center">
            Interactive command-line exploration of selected software projects.
          </p>
        </motion.div>

        {/* Main Terminal */}
        <motion.div variants={staggerItem} className="w-full flex justify-center">
          <TerminalWindow title="root@hens: ~/projects" className="w-full max-w-4xl mx-auto">
            {/* Previous commands */}
            {typedLines.length > 0 && (
              <div className="mb-4">
                <div className="flex items-start gap-2 mb-2">
                  <span className="prompt whitespace-nowrap">root@hens:~$</span>
                  <span className="prompt-text">{typedLines[0]}</span>
                </div>

                {/* Project listing */}
                <div className="ml-0 grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 mb-4">
                  {projects.map((project, i) => (
                    <motion.button
                      key={project.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => handleProjectClick(project.id)}
                      className={`flex items-center gap-2 p-2 rounded text-left font-mono text-sm
                                 transition-all duration-200 group border
                                 ${
                                   selectedProject === project.id
                                     ? 'bg-[rgba(255,26,26,0.15)] border-[var(--color-primary)] text-[var(--color-text)]'
                                     : 'border-transparent hover:bg-[rgba(255,26,26,0.05)] hover:border-[var(--color-border-red)] text-[var(--color-text-dim)]'
                                 }`}
                    >
                      <span className="text-[var(--color-primary)] opacity-70 group-hover:opacity-100">
                        📁
                      </span>
                      <span className="group-hover:text-[var(--color-primary)] transition-colors">
                        {project.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Currently typing prompt */}
            {state === 'listing' && (
              <div className="flex items-start gap-2">
                <span className="prompt whitespace-nowrap">root@hens:~$</span>
                <span className="prompt-text">
                  {currentTyping}
                  <span className="terminal-cursor" />
                </span>
              </div>
            )}

            {/* Idle prompt */}
            {state === 'idle' && (
              <div className="flex items-start gap-2">
                <span className="prompt whitespace-nowrap">root@hens:~$</span>
                <span className="text-[var(--color-text-muted)] text-sm animate-pulse">
                  Click a project to open...
                </span>
                <span className="terminal-cursor" />
              </div>
            )}
          </TerminalWindow>
        </motion.div>

        {/* Selected Project Detail Panel */}
        <AnimatePresence>
          {selectedProjectData && state === 'viewing' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 w-full max-w-4xl mx-auto border border-[var(--color-primary)] rounded-xl p-8 md:p-10
                         bg-[var(--color-bg-card)] shadow-[var(--shadow-red-lg)] relative overflow-hidden"
            >
              {/* Header with Title and Close Button */}
              <div className="flex items-start justify-between gap-6 mb-6 border-b border-[var(--color-border-red)]/50 pb-5">
                <div>
                  <span className="font-pixel text-[11px] text-[var(--color-primary)] tracking-widest uppercase block mb-2">
                    PROJECT DETAILS
                  </span>
                  <h3 className="font-pixel text-xl md:text-2xl text-[var(--color-text)] tracking-wide">
                    {selectedProjectData.name}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setState('idle');
                  }}
                  className="font-mono text-xs text-[var(--color-primary)] hover:text-white px-4 py-1.5 border border-[var(--color-border-red)] rounded-md hover:border-[var(--color-primary)] transition-all shrink-0 bg-[rgba(255,26,26,0.1)]"
                >
                  [ CLOSE ✕ ]
                </button>
              </div>

              {/* Typewriter Description */}
              <p className="font-mono text-sm text-[var(--color-text-dim)] leading-relaxed mb-8 min-h-[3.5rem]">
                <TypewriterText
                  key={selectedProjectData.id}
                  text={selectedProjectData.description}
                  speed={20}
                  delay={100}
                />
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                {selectedProjectData.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs font-mono rounded-md
                               bg-[rgba(255,26,26,0.08)] text-[var(--color-primary)]
                               border border-[var(--color-border-red)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap gap-4 pt-6 pb-1 border-t border-[var(--color-border-red)]/50">
                {selectedProjectData.github && (
                  <a
                    href={selectedProjectData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded font-mono text-xs uppercase
                               border border-[var(--color-border-red)] text-[var(--color-text-dim)]
                               hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all"
                  >
                    <FiGithub /> Source Code
                  </a>
                )}
                {selectedProjectData.liveDemo && (
                  <a
                    href={selectedProjectData.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded font-mono text-xs uppercase
                               bg-[var(--color-primary)] text-[var(--color-bg)] font-bold
                               hover:shadow-[var(--shadow-red)] transition-all"
                  >
                    <FiExternalLink /> Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
