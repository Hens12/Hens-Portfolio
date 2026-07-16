import React from 'react';
import { motion } from 'framer-motion';
import { FiGitBranch, FiStar, FiUsers, FiCode } from 'react-icons/fi';
import { useGitHubStats } from '../hooks/useGitHubStats';
import { SITE } from '../utils/constants';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { sectionTitle, staggerContainer, staggerItem } from '../animations/variants';

export default function GitHub() {
  const stats = useGitHubStats(SITE.github);

  const statCards = [
    { icon: <FiGitBranch />, label: 'Repositories', value: stats.publicRepos },
    { icon: <FiStar />, label: 'Total Stars', value: stats.totalStars },
    { icon: <FiUsers />, label: 'Followers', value: stats.followers },
    { icon: <FiCode />, label: 'Following', value: stats.following },
  ];

  return (
    <section className="section-container relative">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Section header */}
        <motion.div variants={sectionTitle} className="text-center mb-20 md:mb-24 flex flex-col items-center">
          <span className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-[0.3em] text-center block mb-2">
            // Open Source
          </span>
          <h2 className="font-pixel text-3xl md:text-4xl text-[var(--color-text)] mt-3 text-glow text-center">
            GITHUB
          </h2>
          <p className="font-mono text-sm text-[var(--color-text-muted)] mt-3 text-center">
            Real-time open source metrics and contribution activity.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="p-5 border border-[var(--color-border-red)] rounded-lg
                         bg-[var(--color-bg-card)] card-glow text-center"
            >
              <div className="text-[var(--color-primary)] text-xl mb-3 flex justify-center">
                {stat.icon}
              </div>
              <div className="font-pixel text-xl text-[var(--color-text)] text-glow">
                {stats.loading ? (
                  <span className="text-[var(--color-text-muted)]">...</span>
                ) : (
                  <AnimatedCounter target={stat.value} duration={2} />
                )}
              </div>
              <div className="font-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mt-2">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contribution graph simulation */}
        <motion.div
          variants={staggerItem}
          className="max-w-5xl mx-auto border border-[var(--color-border-red)] rounded-lg
                     p-6 bg-[var(--color-bg-card)] card-glow"
        >
          <h3 className="font-mono text-sm text-[var(--color-text-dim)] mb-4">
            Contribution Activity
          </h3>

          {/* Heatmap grid */}
          <div className="overflow-x-auto">
            <div className="flex gap-[3px] min-w-[700px]">
              {Array.from({ length: 52 }, (_, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-[3px]">
                  {Array.from({ length: 7 }, (_, dayIdx) => {
                    const seed = (weekIdx * 7 + dayIdx) * 2654435761;
                    const level = ((seed >>> 16) & 0xff) % 5;
                    const colors = [
                      'rgba(255, 26, 26, 0.04)',
                      'rgba(255, 26, 26, 0.15)',
                      'rgba(255, 26, 26, 0.3)',
                      'rgba(255, 26, 26, 0.55)',
                      'rgba(255, 26, 26, 0.85)',
                    ];
                    return (
                      <motion.div
                        key={dayIdx}
                        className="w-[10px] h-[10px] rounded-[2px]"
                        style={{ backgroundColor: colors[level] }}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: weekIdx * 0.01 + dayIdx * 0.005,
                          duration: 0.2,
                        }}
                        whileHover={{
                          scale: 1.8,
                          boxShadow: '0 0 8px rgba(255, 26, 26, 0.5)',
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-4">
            <span className="font-mono text-[10px] text-[var(--color-text-muted)]">Less</span>
            {[0.04, 0.15, 0.3, 0.55, 0.85].map((opacity, i) => (
              <div
                key={i}
                className="w-[10px] h-[10px] rounded-[2px]"
                style={{ backgroundColor: `rgba(255, 26, 26, ${opacity})` }}
              />
            ))}
            <span className="font-mono text-[10px] text-[var(--color-text-muted)]">More</span>
          </div>
        </motion.div>

        {/* Top languages */}
        {stats.topLanguages.length > 0 && (
          <motion.div
            variants={staggerItem}
            className="max-w-5xl mx-auto mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3"
          >
            {stats.topLanguages.map((lang, i) => (
              <div
                key={lang.name}
                className="p-3 border border-[var(--color-border-red)] rounded-md
                           bg-[var(--color-bg-card)] text-center card-glow"
              >
                <div className="font-mono text-xs text-[var(--color-text)]">{lang.name}</div>
                <div className="font-mono text-[10px] text-[var(--color-primary)] mt-1">
                  {lang.count} repos
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
