import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'outline' | 'ghost';
  strength?: number;
}

/**
 * Button with magnetic cursor pull effect.
 * Shifts toward cursor on hover, snaps back on leave.
 */
export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  variant = 'outline',
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * (strength * 0.6);
      const y = (e.clientY - rect.top - rect.height / 2) * (strength * 0.6);
      setPosition({ x, y });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  const baseStyles = {
    primary:
      'bg-[var(--color-primary)] text-[var(--color-bg)] border-[var(--color-primary)] hover:shadow-[var(--shadow-red-lg)]',
    outline:
      'bg-transparent text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)]',
    ghost:
      'bg-transparent text-[var(--color-text-dim)] border-transparent hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]',
  };

  const Component = href ? 'a' : 'button';

  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 15, mass: 0.5 }}
    >
      <Component
        ref={ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>}
        className={cn(
          'magnetic-btn relative inline-flex items-center justify-center gap-2',
          'px-6 py-3 rounded-sm border font-mono text-sm font-semibold uppercase tracking-wider',
          'transition-all duration-300',
          baseStyles[variant],
          className
        )}
        onClick={onClick}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </Component>
    </motion.div>
  );
}
