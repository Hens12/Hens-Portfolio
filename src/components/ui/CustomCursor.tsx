import React, { useEffect, useRef, useState } from 'react';

/**
 * Custom Cursor — 1:1 hardware-accurate red cursor with glowing ring.
 * Uses window pointermove and animation frame interpolation on top-level z-index layer.
 */
export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  const pos = useRef({ currX: -100, currY: -100, targetX: -100, targetY: -100 });

  // Handle direct window pointer move events for 100% precision
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      pos.current.targetX = e.clientX;
      pos.current.targetY = e.clientY;
      if (!hasMoved) setHasMoved(true);
    };

    const interactiveSelectors = 'a, button, [role="button"], input, textarea, select, .magnetic-btn, .card-glow';

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest && target.closest(interactiveSelectors)) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [hasMoved]);

  // GPU animation frame loop
  useEffect(() => {
    let rafId: number;

    const loop = () => {
      // Snappy outer ring lerp (0.35 factor)
      pos.current.currX += (pos.current.targetX - pos.current.currX) * 0.35;
      pos.current.currY += (pos.current.targetY - pos.current.currY) * 0.35;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${pos.current.currX - 18}px, ${pos.current.currY - 18}px, 0)`;
      }
      if (innerRef.current) {
        // Inner red dot matches exact cursor coordinate (1:1 precision)
        innerRef.current.style.transform = `translate3d(${pos.current.targetX - 4}px, ${pos.current.targetY - 4}px, 0)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      {/* Outer Glow Ring */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full z-[999999]"
        style={{
          width: isHovering ? '44px' : '36px',
          height: isHovering ? '44px' : '36px',
          border: `2px solid ${isHovering ? '#ff1a1a' : 'rgba(255, 26, 26, 0.85)'}`,
          backgroundColor: isHovering ? 'rgba(255, 26, 26, 0.12)' : 'transparent',
          boxShadow: isHovering
            ? '0 0 25px rgba(255, 26, 26, 0.7), inset 0 0 12px rgba(255, 26, 26, 0.3)'
            : '0 0 12px rgba(255, 26, 26, 0.4)',
          transition: 'width 0.15s ease-out, height 0.15s ease-out, border-color 0.15s ease-out, background-color 0.15s ease-out',
          opacity: hasMoved ? 1 : 0,
        }}
      />
      {/* Inner Red Dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full z-[999999]"
        style={{
          width: isHovering ? '10px' : '8px',
          height: isHovering ? '10px' : '8px',
          backgroundColor: '#ff1a1a',
          boxShadow: '0 0 15px #ff1a1a, 0 0 30px rgba(255, 26, 26, 0.9)',
          transition: 'width 0.1s ease-out, height 0.1s ease-out',
          opacity: hasMoved ? 1 : 0,
        }}
      />
    </>
  );
}
