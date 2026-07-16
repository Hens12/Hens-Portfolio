import React from 'react';

/** CRT Scanline overlay — subtle horizontal lines across the entire viewport */
export function ScanLines() {
  return <div className="scanlines" aria-hidden="true" />;
}

/** Film grain noise overlay */
export function NoiseOverlay() {
  return <div className="noise-overlay" aria-hidden="true" />;
}

/** Mouse-reactive red spotlight that follows cursor globally with zero React re-renders */
export function MouseSpotlight() {
  const spotlightRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let targetX = -1000;
    let targetY = -1000;
    let currX = -1000;
    let currY = -1000;
    let rafId: number;

    const handlePointerMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const loop = () => {
      currX += (targetX - currX) * 0.15;
      currY += (targetY - currY) * 0.15;

      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${Math.round(currX)}px ${Math.round(currY)}px, rgba(255, 26, 26, 0.06), transparent 40%)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-300"
      aria-hidden="true"
    />
  );
}
