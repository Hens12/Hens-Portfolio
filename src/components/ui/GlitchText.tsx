import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../utils/cn';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchOnHover?: boolean;
  continuous?: boolean;
  intensity?: 'low' | 'medium' | 'high';
}

export default function GlitchText({
  text,
  className = '',
  glitchOnHover = false,
  continuous = false,
  intensity = 'medium',
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(continuous);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!continuous) return;

    intervalRef.current = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200 + Math.random() * 300);
    }, 3000 + Math.random() * 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [continuous]);

  return (
    <div
      className={cn('relative inline-block select-none', className)}
      onMouseEnter={() => glitchOnHover && setIsGlitching(true)}
      onMouseLeave={() => glitchOnHover && !continuous && setIsGlitching(false)}
    >
      <span className={cn(isGlitching && 'glitch')} data-text={text}>
        {text}
      </span>
    </div>
  );
}
