import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../../utils/constants';
import { cn } from '../../utils/cn';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track scroll for background change
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track active section via Intersection Observer
  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.querySelector(link.href)
    ).filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-[1000] transition-all duration-500',
          scrolled
            ? 'glass py-3.5 shadow-[0_4px_30px_rgba(255,26,26,0.08)]'
            : 'bg-transparent py-5 md:py-6'
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 3.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-10 md:px-16 lg:px-24 flex items-center justify-between">
          {/* Logo with generous left padding & spacing */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-pixel text-lg md:text-xl text-[var(--color-primary)] tracking-widest hover:text-glow transition-all cursor-pointer pl-4 md:pl-8 lg:pl-10"
          >
            HENS
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10 pr-4 md:pr-8 lg:pr-10">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  'font-mono text-xs lg:text-sm uppercase tracking-wider transition-all duration-300 relative cursor-pointer',
                  activeSection === link.href
                    ? 'text-[var(--color-primary)] text-glow'
                    : 'text-[var(--color-text-dim)] hover:text-[var(--color-text)]'
                )}
              >
                {link.label}
                {activeSection === link.href && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--color-primary)]"
                    layoutId="activeNav"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}

            {/* Book a Call CTA */}
            <button
              onClick={() => handleNavClick('#contact')}
              className="relative px-5 py-2 rounded-sm font-mono text-xs uppercase tracking-wider
                         text-[var(--color-primary)] border border-[var(--color-primary)]
                         transition-all duration-300 hover:bg-[var(--color-primary)]
                         hover:text-[var(--color-bg)] hover:shadow-[var(--shadow-red)]
                         animate-[borderGlow_3s_ease-in-out_infinite] cursor-pointer"
            >
              Book a Call
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-[var(--color-primary)] text-2xl pr-4"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[999] glass flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            style={{ backgroundColor: 'rgba(5, 5, 5, 0.95)' }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  'font-mono text-xl uppercase tracking-widest transition-colors cursor-pointer',
                  activeSection === link.href
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-text-dim)]'
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                {link.label}
              </motion.button>
            ))}

            <motion.button
              onClick={() => handleNavClick('#contact')}
              className="mt-4 px-8 py-3 border border-[var(--color-primary)] text-[var(--color-primary)]
                         font-mono text-sm uppercase tracking-wider cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Book a Call
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
