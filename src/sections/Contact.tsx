import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import TerminalWindow from '../components/ui/TerminalWindow';
import { SITE, EMAILJS } from '../utils/constants';
import { sectionTitle, staggerContainer, staggerItem } from '../animations/variants';
import emailjs from '@emailjs/browser';

type FormStatus = 'idle' | 'initializing' | 'connecting' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [history, setHistory] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('initializing');
    setHistory(['> Initializing secure channel to ' + SITE.email + '...']);

    await new Promise((r) => setTimeout(r, 600));
    setStatus('connecting');
    setHistory((prev) => [...prev, '> Connecting to mail gateway...']);

    await new Promise((r) => setTimeout(r, 600));
    setStatus('sending');
    setHistory((prev) => [...prev, '> Transmitting payload...']);

    try {
      let sentSuccess = false;

      // 1. Try EmailJS if configured
      if (
        EMAILJS.serviceId &&
        EMAILJS.serviceId !== 'YOUR_SERVICE_ID' &&
        EMAILJS.templateId &&
        EMAILJS.templateId !== 'YOUR_TEMPLATE_ID' &&
        formRef.current
      ) {
        try {
          await emailjs.sendForm(
            EMAILJS.serviceId,
            EMAILJS.templateId,
            formRef.current,
            EMAILJS.publicKey
          );
          sentSuccess = true;
        } catch (err) {
          console.warn('EmailJS attempt error, trying fallback endpoint...', err);
        }
      }

      // 2. FormSubmit live REST relay directly to user email
      if (!sentSuccess) {
        const response = await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            _subject: formData.subject || `New Portfolio Contact Message from ${formData.name}`,
            message: formData.message,
            _template: 'table',
            _captcha: 'false',
          }),
        });

        if (response.ok) {
          sentSuccess = true;
        }
      }

      if (sentSuccess) {
        setStatus('success');
        setHistory((prev) => [
          ...prev,
          `> ✓ Message Delivered Successfully to ${SITE.email}.`,
          '> Check your inbox for confirmation.',
        ]);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('All transmission relays failed');
      }
    } catch (error) {
      console.error('Email send error:', error);
      setStatus('error');
      setHistory((prev) => [
        ...prev,
        '> ✗ Network transmission issue detected.',
        `> Fallback: Click below to launch mail client directly to ${SITE.email}`,
      ]);
    }
  };

  const inputClass =
    'w-full bg-transparent border-b border-[var(--color-border-red)] py-2 px-1 ' +
    'font-mono text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] ' +
    'focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-300';

  return (
    <section id="contact" className="section-container relative">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="w-full flex flex-col items-center"
      >
        {/* Section header */}
        <motion.div variants={sectionTitle} className="text-center mb-16 md:mb-20 w-full flex flex-col items-center">
          <span className="font-mono text-xs text-[var(--color-primary)] uppercase tracking-[0.3em] block mb-2 text-center">
            // Contact
          </span>
          <h2 className="font-pixel text-3xl md:text-4xl text-[var(--color-text)] mt-3 text-glow text-center">
            GET IN TOUCH
          </h2>
          <p className="font-mono text-sm text-[var(--color-text-muted)] mt-3 text-center max-w-lg">
            Have a project in mind or want to collaborate? Send a message directly to my inbox.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto mb-10">
          <a
            href={`mailto:${SITE.email}`}
            className="p-5 border border-[var(--color-border-red)] rounded-xl bg-[var(--color-bg-card)]
                       hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-red)] transition-all duration-300
                       flex items-center gap-4 group"
          >
            <div className="p-3 rounded-lg bg-[rgba(255,26,26,0.1)] text-[var(--color-primary)] group-hover:scale-110 transition-transform">
              <FiMail size={22} />
            </div>
            <div className="overflow-hidden">
              <span className="font-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider block">
                Direct Email
              </span>
              <span className="font-mono text-xs text-[var(--color-text)] truncate block group-hover:text-[var(--color-primary)] transition-colors">
                {SITE.email}
              </span>
            </div>
          </a>

          <a
            href={`tel:${SITE.phoneRaw}`}
            className="p-5 border border-[var(--color-border-red)] rounded-xl bg-[var(--color-bg-card)]
                       hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-red)] transition-all duration-300
                       flex items-center gap-4 group"
          >
            <div className="p-3 rounded-lg bg-[rgba(255,26,26,0.1)] text-[var(--color-primary)] group-hover:scale-110 transition-transform">
              <FiPhone size={22} />
            </div>
            <div>
              <span className="font-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider block">
                Phone Number
              </span>
              <span className="font-mono text-xs text-[var(--color-text)] block group-hover:text-[var(--color-primary)] transition-colors">
                {SITE.phone}
              </span>
            </div>
          </a>

          <div className="p-5 border border-[var(--color-border-red)] rounded-xl bg-[var(--color-bg-card)]
                          flex items-center gap-4">
            <div className="p-3 rounded-lg bg-[rgba(255,26,26,0.1)] text-[var(--color-primary)]">
              <FiMapPin size={22} />
            </div>
            <div>
              <span className="font-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider block">
                Location
              </span>
              <span className="font-mono text-xs text-[var(--color-text)] block">
                {SITE.location}
              </span>
            </div>
          </div>
        </div>

        {/* Terminal Contact Form */}
        <motion.div variants={staggerItem} className="w-full flex justify-center">
          <TerminalWindow title="root@hens: ~/contact-relay" className="w-full max-w-4xl mx-auto">
            {/* Init command */}
            <div className="flex items-start gap-2 mb-4">
              <span className="prompt whitespace-nowrap">root@hens:~$</span>
              <span className="prompt-text">sendmail --to={SITE.email}</span>
            </div>

            <div className="text-[var(--color-text-muted)] text-sm mb-6">
              {'>'} Direct mail relay active. Messages are delivered straight to {SITE.email}.
            </div>

            {/* Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="font-mono text-xs text-[var(--color-terminal)] block mb-1">
                  {'>'} name:
                </label>
                <input
                  type="text"
                  name="user_name"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                  id="contact-name"
                  aria-label="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="font-mono text-xs text-[var(--color-terminal)] block mb-1">
                  {'>'} email:
                </label>
                <input
                  type="email"
                  name="user_email"
                  required
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                  id="contact-email"
                  aria-label="Your email"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="font-mono text-xs text-[var(--color-terminal)] block mb-1">
                  {'>'} subject:
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Enter subject (optional)"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className={inputClass}
                  id="contact-subject"
                  aria-label="Subject"
                />
              </div>

              {/* Message */}
              <div>
                <label className="font-mono text-xs text-[var(--color-terminal)] block mb-1">
                  {'>'} message:
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`${inputClass} resize-none border border-[var(--color-border-red)] rounded-md p-3`}
                  id="contact-message"
                  aria-label="Your message"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'initializing' || status === 'connecting' || status === 'sending'}
                className="w-full py-3.5 border border-[var(--color-primary)] text-[var(--color-primary)]
                           font-pixel text-sm uppercase tracking-widest flex items-center justify-center gap-2
                           hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)]
                           transition-all duration-300 hover:shadow-[var(--shadow-red)]
                           disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                id="contact-submit"
              >
                <FiSend />
                {status === 'idle' || status === 'success' || status === 'error'
                  ? '[ SEND EMAIL ]'
                  : '[ TRANSMITTING... ]'}
              </button>
            </form>

            {/* Status output */}
            <AnimatePresence>
              {history.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 border-t border-[var(--color-border-red)] pt-4 space-y-1.5"
                >
                  {history.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`font-mono text-xs ${
                        msg.includes('✓')
                          ? 'text-[var(--color-terminal)] font-bold'
                          : msg.includes('✗')
                          ? 'text-[var(--color-primary)] font-bold'
                          : 'text-[var(--color-text-muted)]'
                      }`}
                    >
                      {msg}
                    </motion.div>
                  ))}

                  {/* Fallback mailto button if needed */}
                  {status === 'error' && (
                    <div className="pt-3">
                      <a
                        href={`mailto:${SITE.email}?subject=${encodeURIComponent(
                          formData.subject || 'Portfolio Contact'
                        )}&body=${encodeURIComponent(
                          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-black font-bold font-mono text-xs rounded hover:opacity-90 transition-opacity"
                      >
                        <FiMail /> Launch Email Client Directly
                      </a>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Idle cursor */}
            {status === 'idle' && history.length === 0 && (
              <div className="flex items-start gap-2 mt-6 pt-4 border-t border-[var(--color-border-red)]">
                <span className="prompt whitespace-nowrap">root@hens:~$</span>
                <span className="terminal-cursor" />
              </div>
            )}
          </TerminalWindow>
        </motion.div>
      </motion.div>
    </section>
  );
}
