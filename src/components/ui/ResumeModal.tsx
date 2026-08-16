import React, { useEffect, useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactDOM from 'react-dom';
import {
  FiX,
  FiMapPin,
  FiMail,
  FiLinkedin,
  FiPhone,
  FiGithub,
  FiGlobe,
  FiDownload,
  FiAward,
  FiBookOpen,
  FiCode,
  FiShield,
  FiCpu,
  FiTerminal,
  FiStar,
  FiFolder,
  FiHeart,
} from 'react-icons/fi';
import TypewriterText from './TypewriterText';
import { RESUME } from '../../data/resumeData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ─── icon map for contact entries ─── */
const contactIcons: Record<string, React.ReactNode> = {
  Location: <FiMapPin />,
  Email: <FiMail />,
  LinkedIn: <FiLinkedin />,
  Phone: <FiPhone />,
  GitHub: <FiGithub />,
  Website: <FiGlobe />,
};

/* ─── domain icons ─── */
const domainIcons: Record<string, React.ReactNode> = {
  'Full Stack Development': <FiCode />,
  'AI/ML & LLMs': <FiCpu />,
  'Cyber Security': <FiShield />,
  Networking: <FiGlobe />,
};

/* ═══════════════════════════════════════════
   RESUME MODAL COMPONENT
   ═══════════════════════════════════════════ */
export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showTyping, setShowTyping] = useState(false);

  /* ─── Trigger typing after modal open animation ─── */
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowTyping(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowTyping(false);
    }
  }, [isOpen]);

  /* ─── Lock body scroll ─── */
  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  /* ─── Escape key ─── */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  /* ─── Handle overlay click (close only when clicking backdrop) ─── */
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  /* ─── Handle wheel inside the modal scroll area ─── */
  const handleWheel = useCallback((e: React.WheelEvent) => {
    // Stop the event from reaching the overlay/body
    e.stopPropagation();
  }, []);

  /* ─── PDF Download ─── */
  const handleDownload = async () => {
    if (!contentRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const element = contentRef.current;
      const canvas = await html2canvas(element, {
        backgroundColor: '#050505',
        scale: 2,
        useCORS: true,
        logging: false,
        scrollY: -window.scrollY,
        windowHeight: element.scrollHeight,
        height: element.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save('Hens_Mangukiya_Resume.pdf');
    } catch (err) {
      console.error('PDF generation failed:', err);
    }
  };

  /* ─── Render via portal to avoid parent overflow issues ─── */
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        /* ─── Overlay ─── */
        <motion.div
          className="resume-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          onClick={handleOverlayClick}
        >
          {/* ─── Modal container ─── */}
          <motion.div
            className="resume-modal"
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 30,
              transition: { duration: 0.3 },
            }}
          >
            {/* Close button */}
            <button className="resume-modal-close" onClick={onClose} aria-label="Close resume">
              <FiX />
            </button>

            {/* Scrollable inner — this is the ONLY scrollable element */}
            <div
              className="resume-modal-scroll"
              ref={scrollRef}
              onWheel={handleWheel}
            >
              <div ref={contentRef}>
                {/* ═══ TWO-COLUMN LAYOUT ═══ */}
                <div className="resume-layout">

                  {/* ──────── LEFT SIDEBAR ──────── */}
                  <aside className="resume-sidebar">
                    {/* Avatar */}
                    <div className="resume-avatar-wrap">
                      <img
                        src={RESUME.avatar}
                        alt="Hens Mangukiya"
                        className="resume-avatar"
                      />
                      <div className="resume-avatar-glow" />
                    </div>

                    {/* Name & title */}
                    <h2 className="resume-name">
                      {showTyping ? (
                        <TypewriterText text={RESUME.name} speed={60} delay={0} showCursor={false} />
                      ) : null}
                    </h2>
                    <p className="resume-title">
                      {showTyping ? (
                        <TypewriterText text={RESUME.title} speed={30} delay={600} showCursor={false} />
                      ) : null}
                    </p>

                    {/* Experience badge */}
                    <div className="resume-exp-badge">
                      <span className="resume-exp-num">{RESUME.yearsExperience}</span>
                      <span className="resume-exp-label">Years Experience</span>
                    </div>

                    {/* Divider */}
                    <div className="resume-divider" />

                    {/* Contact info */}
                    <div className="resume-contact-list">
                      {RESUME.contact.map((c) => (
                        <div key={c.label} className="resume-contact-item">
                          <span className="resume-contact-icon">
                            {contactIcons[c.label] || c.icon}
                          </span>
                          {c.href ? (
                            <a
                              href={c.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="resume-contact-link"
                            >
                              {c.value}
                            </a>
                          ) : (
                            <span className="resume-contact-value">{c.value}</span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="resume-divider" />

                    {/* Languages */}
                    <div className="resume-sidebar-section">
                      <h4 className="resume-sidebar-heading">
                        <FiGlobe className="resume-heading-icon" /> Languages
                      </h4>
                      <div className="resume-lang-list">
                        {RESUME.languages.map((lang) => (
                          <span key={lang} className="resume-lang-tag">{lang}</span>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="resume-divider" />

                    {/* Interests */}
                    <div className="resume-sidebar-section">
                      <h4 className="resume-sidebar-heading">
                        <FiHeart className="resume-heading-icon" /> Interests
                      </h4>
                      <ul className="resume-interest-list">
                        {RESUME.interests.map((item, i) => (
                          <li key={i} className="resume-interest-item">
                            <span className="resume-bullet">▹</span>
                            {showTyping ? (
                              <TypewriterText text={item} speed={15} delay={1200 + i * 400} showCursor={false} />
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </aside>

                  {/* ──────── RIGHT CONTENT ──────── */}
                  <div className="resume-content">

                    {/* ─── Overview ─── */}
                    <section className="resume-section">
                      <h3 className="resume-section-title">
                        <FiTerminal className="resume-section-icon" />
                        <span className="resume-section-tag">&gt;</span> Professional Overview
                      </h3>
                      <div className="resume-terminal-block">
                        <div className="resume-terminal-header">
                          <span className="resume-dot resume-dot--red" />
                          <span className="resume-dot resume-dot--yellow" />
                          <span className="resume-dot resume-dot--green" />
                          <span className="resume-terminal-title">overview.sh</span>
                        </div>
                        <div className="resume-terminal-body">
                          <span className="resume-prompt">$</span> cat overview.txt
                          <p className="resume-overview-text">
                            {showTyping ? (
                              <TypewriterText text={RESUME.overview} speed={8} delay={300} showCursor={true} />
                            ) : null}
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* ─── Core Domains ─── */}
                    <section className="resume-section">
                      <h3 className="resume-section-title">
                        <FiShield className="resume-section-icon" />
                        Core Domains
                      </h3>
                      <div className="resume-domain-grid">
                        {RESUME.coreDomains.map((domain) => (
                          <div key={domain} className="resume-domain-card">
                            <span className="resume-domain-icon">
                              {domainIcons[domain] || <FiCode />}
                            </span>
                            <span className="resume-domain-label">{domain}</span>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* ─── Skills & Technologies ─── */}
                    <section className="resume-section">
                      <h3 className="resume-section-title">
                        <FiCode className="resume-section-icon" />
                        Skills & Technologies
                      </h3>
                      <div className="resume-skills-grid">
                        {RESUME.skillCategories.map((cat) => (
                          <div key={cat.category} className="resume-skill-category">
                            <h5 className="resume-skill-cat-title">{cat.category}</h5>
                            <div className="resume-skill-tags">
                              {cat.items.map((item) => (
                                <span key={item} className="resume-skill-tag">{item}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* ─── Key Projects ─── */}
                    <section className="resume-section">
                      <h3 className="resume-section-title">
                        <FiFolder className="resume-section-icon" />
                        Key Projects
                      </h3>
                      <div className="resume-projects-list">
                        {RESUME.keyProjects.map((proj, i) => (
                          <div key={i} className="resume-project-card">
                            <div className="resume-project-index">{String(i + 1).padStart(2, '0')}</div>
                            <div>
                              <h5 className="resume-project-name">{proj.name}</h5>
                              <p className="resume-project-desc">
                                {showTyping ? (
                                  <TypewriterText text={proj.description} speed={10} delay={800 + i * 500} showCursor={false} />
                                ) : null}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* ─── Certifications ─── */}
                    <section className="resume-section">
                      <h3 className="resume-section-title">
                        <FiAward className="resume-section-icon" />
                        Certifications
                      </h3>
                      <div className="resume-cert-grid">
                        {RESUME.certifications.map((cert, i) => (
                          <div key={i} className="resume-cert-card">
                            <FiAward className="resume-cert-icon" />
                            <div>
                              <div className="resume-cert-title">{cert.title}</div>
                              <div className="resume-cert-issuer">{cert.issuer}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* ─── Education ─── */}
                    <section className="resume-section">
                      <h3 className="resume-section-title">
                        <FiBookOpen className="resume-section-icon" />
                        Education
                      </h3>
                      <div className="resume-edu-list">
                        {RESUME.education.map((edu, i) => (
                          <div key={i} className="resume-edu-card">
                            <div className="resume-edu-dot" />
                            <div>
                              <h5 className="resume-edu-institution">{edu.institution}</h5>
                              <p className="resume-edu-detail">{edu.detail}</p>
                              <span className="resume-edu-status">{edu.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* ─── Achievements ─── */}
                    <section className="resume-section">
                      <h3 className="resume-section-title">
                        <FiStar className="resume-section-icon" />
                        Achievements
                      </h3>
                      <ul className="resume-achievements-list">
                        {RESUME.achievements.map((ach, i) => (
                          <li key={i} className="resume-achievement-item">
                            <span className="resume-achievement-bullet">⚡</span>
                            {showTyping ? (
                              <TypewriterText text={ach} speed={10} delay={500 + i * 600} showCursor={false} />
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </section>

                    {/* ─── Download Button ─── */}
                    <div className="resume-download-wrap">
                      <button className="resume-download-btn" onClick={handleDownload}>
                        <FiDownload />
                        Download Resume
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  /* Render as a portal directly on document.body to avoid stacking context issues */
  return ReactDOM.createPortal(modalContent, document.body);
}
