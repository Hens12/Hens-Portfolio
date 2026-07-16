import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LOADING SCREEN
 * 
 * Full-screen cinematic intro:
 * - Solid RED background
 * - "HENS" in BLACK, Public Pixel font, large
 * - Sequence: fade in → glitch → CRT scan → pixel distort → transition out
 * - After ~3.5s, transitions to main website
 */
export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'typing' | 'glitch' | 'exit'>('typing');
  const [displayText, setDisplayText] = useState('');
  const [showScanline, setShowScanline] = useState(false);
  const fullText = 'HENS';

  // Phase 1: Typing effect
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
        // Start scanline
        setShowScanline(true);
        // Move to glitch phase
        setTimeout(() => setPhase('glitch'), 800);
      }
    }, 200);

    return () => clearInterval(timer);
  }, []);

  // Phase 2: Glitch then exit
  useEffect(() => {
    if (phase === 'glitch') {
      setTimeout(() => setPhase('exit'), 1200);
    }
    if (phase === 'exit') {
      setTimeout(onComplete, 800);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          className="fixed inset-0 z-[100000] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#ff1a1a' }}
          exit={{
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* CRT Scanline sweep */}
          {showScanline && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(transparent 50%, rgba(0,0,0,0.1) 50%)',
                backgroundSize: '100% 4px',
                animation: 'scanline 2s linear infinite',
                zIndex: 2,
              }}
            />
          )}

          {/* Noise grain */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.08,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              animation: 'noise 0.3s steps(6) infinite',
              zIndex: 3,
            }}
          />

          {/* Main text — "HENS" */}
          <motion.div
            className="relative z-10 select-none"
            animate={
              phase === 'glitch'
                ? {
                    x: [0, -8, 12, -6, 10, -4, 0],
                    y: [0, 4, -6, 8, -4, 2, 0],
                    skewX: [0, -5, 8, -3, 5, -2, 0],
                    scale: [1, 1.05, 0.95, 1.08, 0.97, 1.02, 1],
                  }
                : {}
            }
            transition={
              phase === 'glitch'
                ? { duration: 0.8, repeat: 1, ease: 'easeInOut' }
                : {}
            }
          >
            <h1
              className="font-pixel text-[clamp(3rem,12vw,10rem)] font-bold tracking-widest leading-none"
              style={{
                color: '#050505',
                textShadow:
                  phase === 'glitch'
                    ? '3px 0 #00ff66, -3px 0 #ff1a1a, 0 3px rgba(0,0,0,0.3)'
                    : '0 4px 20px rgba(0,0,0,0.3)',
                transition: 'text-shadow 0.2s',
              }}
            >
              {displayText}
              {phase === 'typing' && (
                <span
                  className="inline-block w-[0.6em] h-[0.9em] ml-2 align-middle"
                  style={{
                    backgroundColor: '#050505',
                    animation: 'blink 0.7s step-end infinite',
                  }}
                />
              )}
            </h1>

            {/* Glitch layers */}
            {phase === 'glitch' && (
              <>
                <motion.h1
                  className="font-pixel text-[clamp(3rem,12vw,10rem)] font-bold tracking-widest leading-none absolute top-0 left-0"
                  style={{
                    color: '#050505',
                    clipPath: 'inset(15% 0 65% 0)',
                    opacity: 0.8,
                  }}
                  animate={{
                    x: [0, 5, -5, 3, -3, 0],
                  }}
                  transition={{ duration: 0.2, repeat: 5 }}
                  aria-hidden
                >
                  {fullText}
                </motion.h1>
                <motion.h1
                  className="font-pixel text-[clamp(3rem,12vw,10rem)] font-bold tracking-widest leading-none absolute top-0 left-0"
                  style={{
                    color: '#050505',
                    clipPath: 'inset(60% 0 10% 0)',
                    opacity: 0.8,
                  }}
                  animate={{
                    x: [0, -5, 5, -3, 3, 0],
                  }}
                  transition={{ duration: 0.15, repeat: 6 }}
                  aria-hidden
                >
                  {fullText}
                </motion.h1>
              </>
            )}
          </motion.div>

          {/* Decorative corner brackets */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-black/30" />
          <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-black/30" />
          <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-black/30" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-black/30" />

          {/* Bottom status text */}
          <motion.div
            className="absolute bottom-8 font-mono text-xs tracking-[0.3em] uppercase"
            style={{ color: 'rgba(5, 5, 5, 0.4)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            INITIALIZING SYSTEM...
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
