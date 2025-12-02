import React from 'react';
import { motion } from 'framer-motion';

const NavLink = ({ text, href }) => {
  return (
    <motion.a
      href={href}
      className="text-white hover:text-neon-blue font-mono text-sm md:text-base transition-colors relative group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="opacity-50 group-hover:opacity-100 transition-opacity">.</span>
      {text}
      <span className="opacity-50 group-hover:opacity-100 transition-opacity">()</span>
    </motion.a>
  );
};

export default function Navbar() {
  const links = [
    { text: 'home', href: '#home' },
    { text: 'about', href: '#about' },
    { text: 'dsa', href: '#dsa' },
    { text: 'projects', href: '#projects' },
    { text: 'contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4"
    >
      <div className="bg-dark-bg/80 backdrop-blur-md border border-white/10 rounded-full px-8 py-4 flex gap-6 md:gap-12 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        {links.map((link) => (
          <NavLink key={link.text} {...link} />
        ))}
      </div>
    </motion.nav>
  );
}
