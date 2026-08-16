import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGitBranch, FiStar, FiUsers, FiCode, FiRefreshCw, FiGrid, FiImage } from 'react-icons/fi';
import { useGitHubStats } from '../hooks/useGitHubStats';
import { SITE } from '../utils/constants';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { sectionTitle, staggerContainer, staggerItem } from '../animations/variants';

export default function GitHub() {
  const stats = useGitHubStats(SITE.github);
  const [viewMode, setViewMode] = useState<'interactive' | 'github-svg'>('interactive');
  const [svgKey, setSvgKey] = useState(Date.now());

  const statCards = [
    { icon: <FiGitBranch />, label: 'Repositories', value: stats.publicRepos },
    { icon: <FiStar />, label: 'Total Stars', value: stats.totalStars },
    { icon: <FiUsers />, label: 'Followers', value: stats.followers },
    { icon: <FiCode />, label: 'Following', value: stats.following },
  ];

  const levelColors = [
    'rgba(255, 26, 26, 0.08)',  // Level 0: None
    'rgba(255, 26, 26, 0.35)',  // Level 1: Low
    'rgba(255, 26, 26, 0.60)',  // Level 2: Medium
    'rgba(255, 26, 26, 0.85)',  // Level 3: High
    'rgba(255, 26, 26, 1.0)',   // Level 4: Max
  ];

  const hasRealContributions = stats.contributions.length > 0;

  // Calculate Month headers for the heatmap
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthHeaders: { label: string; weekIdx: number }[] = [];
  let lastMonth = -1;

  if (hasRealContributions) {
    stats.contributions.forEach((week, wIdx) => {
      const firstDay = week[0];
      if (firstDay && firstDay.date) {
        const dateObj = new Date(firstDay.date);
        const m = dateObj.getMonth();
        if (m !== lastMonth) {
          monthHeaders.push({ label: monthNames[m], weekIdx: wIdx });
          lastMonth = m;
        }
      }
    });
  }

  const handleRefresh = () => {
    stats.refetch?.();
    setSvgKey(Date.now());
  };

  return (
    <section id="github" className="section-container relative">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Section header */}
        <motion.div variants={sectionTitle} className="text-center mb-16 md:mb-20 flex flex-col items-center">
          <span className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-[0.3em] text-center block mb-2">
            // Open Source
          </span>
          <h2 className="font-pixel text-3xl md:text-4xl text-[var(--color-text)] mt-3 text-glow text-center">
            GITHUB PROFILE ({SITE.github})
          </h2>
          <p className="font-mono text-sm text-[var(--color-text-muted)] mt-3 text-center max-w-lg">
            Real-time open source statistics and contribution heat map directly from GitHub.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
          {statCards.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="p-5 border border-[var(--color-border-red)] rounded-xl
                         bg-[var(--color-bg-card)] card-glow text-center"
            >
              <div className="text-[var(--color-primary)] text-xl mb-2 flex justify-center">
                {stat.icon}
              </div>
              <div className="font-pixel text-2xl text-[var(--color-text)] text-glow">
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

        {/* Live Contribution Graph */}
        <motion.div
          variants={staggerItem}
          className="max-w-5xl mx-auto border border-[var(--color-border-red)] rounded-xl
                     p-6 md:p-8 bg-[var(--color-bg-card)] card-glow"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[var(--color-border-red)]/40 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-pixel text-sm text-[var(--color-text)] tracking-wider">
                  CONTRIBUTION ACTIVITY
                </h3>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono bg-[rgba(255,26,26,0.1)] text-[var(--color-primary)] border border-[var(--color-border-red)]/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  LIVE 30s
                </span>
              </div>
              <p className="font-mono text-xs text-[var(--color-text-muted)] mt-1">
                {stats.loading
                  ? 'Syncing live data from GitHub...'
                  : `${stats.totalContributions} contributions in the last year for @${SITE.github}`}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* View Switcher */}
              <div className="flex p-0.5 bg-black/40 border border-[var(--color-border-red)]/40 rounded-lg">
                <button
                  onClick={() => setViewMode('interactive')}
                  className={`px-2.5 py-1 font-mono text-[10px] rounded-md transition-all flex items-center gap-1.5 ${
                    viewMode === 'interactive'
                      ? 'bg-[var(--color-primary)] text-white font-bold'
                      : 'text-[var(--color-text-muted)] hover:text-white'
                  }`}
                >
                  <FiGrid size={12} /> Matrix
                </button>
                <button
                  onClick={() => setViewMode('github-svg')}
                  className={`px-2.5 py-1 font-mono text-[10px] rounded-md transition-all flex items-center gap-1.5 ${
                    viewMode === 'github-svg'
                      ? 'bg-[var(--color-primary)] text-white font-bold'
                      : 'text-[var(--color-text-muted)] hover:text-white'
                  }`}
                >
                  <FiImage size={12} /> Native SVG
                </button>
              </div>

              <button
                onClick={handleRefresh}
                disabled={stats.loading}
                title="Force refresh live stats"
                className="font-mono text-xs text-[var(--color-text-muted)] hover:text-white p-2 border border-[var(--color-border-red)]/50 rounded-lg hover:border-[var(--color-primary)] transition-all bg-[rgba(255,26,26,0.05)] disabled:opacity-50"
              >
                <FiRefreshCw className={stats.loading ? 'animate-spin' : ''} />
              </button>

              <a
                href={`https://github.com/${SITE.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[var(--color-primary)] hover:text-white px-3 py-1.5 border border-[var(--color-border-red)] rounded-lg hover:border-[var(--color-primary)] transition-all bg-[rgba(255,26,26,0.08)]"
              >
                @ {SITE.github} ↗
              </a>
            </div>
          </div>

          {/* View Mode 1: Interactive Heatmap Matrix */}
          {viewMode === 'interactive' && (
            <div className="overflow-x-auto pb-2">
              <div className="min-w-[720px]">
                {/* Month headers */}
                {hasRealContributions && monthHeaders.length > 0 && (
                  <div className="flex text-[10px] font-mono text-[var(--color-text-muted)] mb-2 pl-6">
                    {stats.contributions.map((_, wIdx) => {
                      const monthObj = monthHeaders.find((m) => m.weekIdx === wIdx);
                      return (
                        <div key={wIdx} className="w-[14.5px] text-left shrink-0">
                          {monthObj ? monthObj.label : ''}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="flex gap-[3.5px]">
                  {/* Day labels */}
                  <div className="flex flex-col justify-between text-[9px] font-mono text-[var(--color-text-muted)] pr-1 py-[1px] select-none">
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                  </div>

                  {/* Heatmap columns */}
                  <div className="flex gap-[3.5px] flex-1 justify-between">
                    {hasRealContributions
                      ? stats.contributions.map((week, weekIdx) => (
                          <div key={weekIdx} className="flex flex-col gap-[3.5px]">
                            {week.map((day, dayIdx) => (
                              <motion.div
                                key={day.date || dayIdx}
                                className="w-[11px] h-[11px] rounded-[2px] cursor-pointer relative group"
                                style={{ backgroundColor: levelColors[day.level] || levelColors[0] }}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                  delay: (weekIdx * 7 + dayIdx) * 0.0008,
                                  duration: 0.12,
                                }}
                                whileHover={{
                                  scale: 1.6,
                                  boxShadow: '0 0 10px rgba(255, 26, 26, 0.8)',
                                }}
                                title={`${day.date ? day.date : 'Day'}: ${day.count} contribution${day.count === 1 ? '' : 's'}`}
                              />
                            ))}
                          </div>
                        ))
                      : Array.from({ length: 52 }, (_, weekIdx) => (
                          <div key={weekIdx} className="flex flex-col gap-[3.5px]">
                            {Array.from({ length: 7 }, (_, dayIdx) => {
                              const isEven = (weekIdx + dayIdx) % 3 === 0;
                              const level = isEven ? 1 : 0;
                              return (
                                <div
                                  key={dayIdx}
                                  className="w-[11px] h-[11px] rounded-[2px]"
                                  style={{ backgroundColor: levelColors[level] }}
                                />
                              );
                            })}
                          </div>
                        ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* View Mode 2: Direct GitHub Native Live SVG */}
          {viewMode === 'github-svg' && (
            <div className="overflow-x-auto pb-2 flex justify-center items-center py-4 bg-black/30 rounded-lg border border-[var(--color-border-red)]/30">
              <img
                key={svgKey}
                src={`https://ghchart.rshah.org/ff1a1a/${SITE.github}?_t=${svgKey}`}
                alt={`${SITE.github} GitHub Contribution Graph`}
                className="min-w-[680px] h-auto filter drop-shadow-[0_0_8px_rgba(255,26,26,0.5)]"
              />
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center justify-between border-t border-[var(--color-border-red)]/40 pt-4 mt-4">
            <span className="font-mono text-[10px] text-[var(--color-text-muted)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {stats.loading ? 'Fetching live graph data...' : 'Live GitHub Sync Active (Auto-refresh 30s)'}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-[var(--color-text-muted)]">Less</span>
              {levelColors.map((color, i) => (
                <div
                  key={i}
                  className="w-[10px] h-[10px] rounded-[2px]"
                  style={{ backgroundColor: color }}
                />
              ))}
              <span className="font-mono text-[10px] text-[var(--color-text-muted)]">More</span>
            </div>
          </div>
        </motion.div>

        {/* Top languages */}
        {stats.topLanguages.length > 0 && (
          <motion.div
            variants={staggerItem}
            className="max-w-5xl mx-auto mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3"
          >
            {stats.topLanguages.map((lang) => (
              <div
                key={lang.name}
                className="p-3 border border-[var(--color-border-red)] rounded-lg
                           bg-[var(--color-bg-card)] text-center card-glow"
              >
                <div className="font-mono text-xs font-bold text-[var(--color-text)]">{lang.name}</div>
                <div className="font-mono text-[10px] text-[var(--color-primary)] mt-1">
                  {lang.count} {lang.count === 1 ? 'repo' : 'repos'}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
