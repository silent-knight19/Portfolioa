import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiFileText } from 'react-icons/fi';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('work');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Projects', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'DSA', href: '#practice' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['hero', 'work', 'about', 'practice', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#0b0c0e]/90 backdrop-blur-md border-b border-[#20242c] py-3.5'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Left: Name */}
        <a
          href="#hero"
          className="text-base font-semibold tracking-tight text-[#f3f4f6] hover:text-[#f59e0b] transition-colors"
        >
          Sachin Singh
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm">
          {navLinks.map((link) => {
            const targetId = link.href.replace('#', '');
            const isActive = activeSection === targetId;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative py-1 text-sm font-medium transition-colors ${
                  isActive ? 'text-[#f3f4f6]' : 'text-[#9ca3af] hover:text-[#ededed]'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#f59e0b] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}

          <a
            href="https://drive.google.com/file/d/16Mb5gtcXYeXDg07_rwXUu-YhLQvvx4RH/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2e3542] hover:border-[#f59e0b]/50 bg-[#121418] hover:bg-[#181b22] text-xs font-mono text-[#ededed] hover:text-[#f59e0b] transition-all"
          >
            <FiFileText size={12} />
            <span>Résumé</span>
          </a>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-3">
          <a
            href="https://drive.google.com/file/d/16Mb5gtcXYeXDg07_rwXUu-YhLQvvx4RH/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-md border border-[#2e3542] bg-[#121418] text-[11px] font-mono text-[#ededed]"
          >
            CV
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-[#9ca3af] hover:text-[#ededed] border border-[#20242c] rounded-lg bg-[#111317]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0e1014] border-b border-[#20242c] px-6 py-4"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-sm font-medium text-[#9ca3af] hover:text-[#f3f4f6] border-b border-[#1b1f27] last:border-0"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
