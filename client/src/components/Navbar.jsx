/**
 * Navbar.jsx
 * ============
 * Role: Fixed top navigation bar for the portfolio.
 *
 * How it works:
 * - Shows a floating pill-shaped nav on desktop with function-style links
 * - On mobile, shows a hamburger icon that toggles a dropdown menu
 * - Uses scroll-spy to highlight which section the user is currently viewing
 * - Smooth scrolls to the target section when a link is clicked
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// -- NavLink: a single navigation link styled like a function call e.g. .home() --
const NavLink = ({ text, href, isActive, onClick }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`font-mono text-base md:text-lg transition-colors relative group ${
        isActive
          ? 'text-neon-blue text-glow-blue'   /* glow effect when this section is active */
          : 'text-white hover:text-neon-blue'
      }`}
    >
      {/* The dot and parentheses mimic a function call syntax */}
      <span className="opacity-50 group-hover:opacity-100 transition-opacity">.</span>
      {text}
      <span className="opacity-50 group-hover:opacity-100 transition-opacity">()</span>

      {/* Underline indicator that appears when this section is active */}
      {isActive && (
        <motion.div
          layoutId="activeSection"
          className="absolute -bottom-2 left-0 right-0 h-0.5 bg-neon-blue rounded-full"
        />
      )}
    </a>
  );
};

export default function Navbar() {
  // -- State: which section the user is currently viewing --
  const [activeSection, setActiveSection] = useState('home');

  // -- State: whether the mobile menu is open or closed --
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // All the nav links and which section they link to
  const links = [
    { text: 'home', href: '#home' },
    { text: 'about', href: '#about' },
    { text: 'dsa', href: '#dsa' },
    { text: 'projects', href: '#projects' },
    { text: 'contact', href: '#contact' },
  ];

  /**
   * Scroll-spy effect:
   * We use IntersectionObserver to watch each section.
   * When a section becomes at least 30% visible, we mark it as active.
   * This updates the highlighted link in the navbar.
   */
  useEffect(() => {
    const sectionIds = links.map(link => link.href.replace('#', ''));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When a section enters the viewport (30% visible), set it as active
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 } // trigger when 30% of section is visible
    );

    // Observe each section element on the page
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // Cleanup: stop observing when component unmounts
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu when a link is clicked
  const handleLinkClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4"
    >
      {/* ======= Desktop Navigation (hidden on small screens) ======= */}
      <div className="hidden md:flex bg-dark-bg/80 backdrop-blur-md border border-white/10 rounded-full px-9 py-5 gap-7 md:gap-14 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {links.map((link) => (
          <NavLink
            key={link.text}
            text={link.text}
            href={link.href}
            isActive={activeSection === link.href.replace('#', '')}
            onClick={handleLinkClick}
          />
        ))}
      </div>

      {/* ======= Mobile Hamburger Button (visible on small screens) ======= */}
      <div className="md:hidden w-full flex justify-end">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-dark-bg/80 backdrop-blur-md border border-white/10 rounded-full p-4 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          aria-label="Toggle mobile menu"
        >
          {/* Three-line hamburger icon that transforms into an X when open */}
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${isMobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${isMobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${isMobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* ======= Mobile Dropdown Menu (slides down with animation) ======= */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-20 right-4 bg-dark-bg/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-5 shadow-[0_0_40px_rgba(0,0,0,0.8)]"
          >
            {links.map((link) => (
              <NavLink
                key={link.text}
                text={link.text}
                href={link.href}
                isActive={activeSection === link.href.replace('#', '')}
                onClick={handleLinkClick}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
