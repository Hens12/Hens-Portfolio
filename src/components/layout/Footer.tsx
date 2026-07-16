import React from 'react';
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { SITE } from '../../utils/constants';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--color-border-red)] py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Terminal-style copyright */}
        <div className="font-mono text-xs text-[var(--color-text-muted)]">
          <span className="text-[var(--color-terminal)]">root@hens:~$</span>{' '}
          <span className="text-[var(--color-text-dim)]">
            echo "© {year} {SITE.name}. Made with ❤ by Hens"
          </span>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-5">
          {[
            { icon: FaGithub, href: `https://github.com/${SITE.github}`, label: 'GitHub' },
            { icon: FaLinkedinIn, href: SITE.linkedin, label: 'LinkedIn' },
            { icon: FaInstagram, href: SITE.instagram, label: 'Instagram' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)]
                         transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,26,26,0.5)]"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
