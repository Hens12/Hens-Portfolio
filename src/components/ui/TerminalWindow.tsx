import React from 'react';
import { cn } from '../../utils/cn';

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

/**
 * Reusable terminal window chrome.
 * MacBook-style title bar with dots, dark red border, and red glow shadow.
 */
export default function TerminalWindow({
  title = 'root@hens: ~',
  children,
  className = '',
  glow = true,
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        'terminal-window',
        glow && 'animate-[pulseGlow_4s_ease-in-out_infinite]',
        className
      )}
    >
      {/* Title bar */}
      <div className="terminal-titlebar">
        <div className="terminal-dot" style={{ background: '#ff5f57' }} />
        <div className="terminal-dot" style={{ background: '#febc2e' }} />
        <div className="terminal-dot" style={{ background: '#28c840' }} />
        <span
          className="ml-3 text-xs font-mono"
          style={{ color: 'rgba(255, 255, 255, 0.4)' }}
        >
          {title}
        </span>
      </div>

      {/* Body */}
      <div className="terminal-body">{children}</div>
    </div>
  );
}

/** Terminal prompt component */
export function TerminalPrompt({
  command,
  output,
  showCursor = false,
}: {
  command?: string;
  output?: React.ReactNode;
  showCursor?: boolean;
}) {
  return (
    <div className="mb-2">
      {command !== undefined && (
        <div className="flex items-start gap-2">
          <span className="prompt whitespace-nowrap">root@hens:~$</span>
          <span className="prompt-text">
            {command}
            {showCursor && <span className="terminal-cursor" />}
          </span>
        </div>
      )}
      {output && <div className="ml-0 mt-1 text-[color:var(--color-text-dim)]">{output}</div>}
    </div>
  );
}
