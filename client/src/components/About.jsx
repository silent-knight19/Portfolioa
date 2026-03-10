/**
 * About.jsx
 * ==========
 * Role: The "About Me" section of the portfolio.
 *
 * How it works:
 * - Shows a short bio with some personality and humor
 * - Displays a grid of technology badges with floating animation
 * - Each tech badge has an icon, name, and its brand color
 * - The section uses framer-motion for scroll-triggered animations
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
  SiMongodb, SiExpress, SiReact, SiNodedotjs,
  SiTailwindcss, SiJavascript, SiFirebase, SiGit,
  SiVite, SiSocketdotio, SiCss3, SiHtml5
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

/**
 * TechBadge component
 * ====================
 * A single technology badge with:
 * - A floating animation (bobbing up and down)
 * - The tech's brand icon and color
 * - Hover glow effect
 *
 * @param {object} props
 * @param {component} props.icon - the react-icon component
 * @param {string} props.name - display name of the tech
 * @param {string} props.color - CSS color for the icon
 * @param {number} props.delay - animation delay so they don't all float in sync
 */
const TechBadge = ({ icon: Icon, name, color, delay }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-5, 5, -5] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
      className="flex flex-col items-center justify-center p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-neon-blue/50 transition-all group cursor-pointer hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(0,243,255,0.1)]"
    >
      {/* Tech icon with its brand color */}
      <Icon
        className="text-3xl mb-2 transition-all duration-300 group-hover:scale-110"
        style={{ color: color }}
      />
      {/* Tech name label */}
      <span className="text-gray-300 font-mono text-xs group-hover:text-white transition-colors">
        {name}
      </span>
    </motion.div>
  );
};

export default function About() {
  // Full list of technologies I work with, each with its brand icon and color
  const technologies = [
    { icon: SiMongodb, name: 'MongoDB', color: '#47A248', delay: 0 },
    { icon: SiExpress, name: 'Express', color: '#ffffff', delay: 0.5 },
    { icon: SiReact, name: 'React', color: '#61DAFB', delay: 1 },
    { icon: SiNodedotjs, name: 'Node.js', color: '#339933', delay: 1.5 },
    { icon: FaJava, name: 'Java', color: '#f89820', delay: 0.2 },
    { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E', delay: 0.7 },
    { icon: SiTailwindcss, name: 'Tailwind', color: '#38B2AC', delay: 1.2 },
    { icon: SiFirebase, name: 'Firebase', color: '#FFCA28', delay: 0.3 },
    { icon: SiGit, name: 'Git', color: '#F05032', delay: 0.8 },
    { icon: SiVite, name: 'Vite', color: '#646CFF', delay: 1.3 },
    { icon: SiSocketdotio, name: 'Socket.IO', color: '#ffffff', delay: 0.4 },
    { icon: SiHtml5, name: 'HTML5', color: '#E34F26', delay: 0.9 },
    { icon: SiCss3, name: 'CSS3', color: '#1572B6', delay: 1.4 },
  ];

  return (
    <section id="about" className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden py-20">
      {/* Background glow decorations (blurred circles in the background) */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-neon-blue/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-neon-purple/5 rounded-full blur-[100px] -z-10" />

      {/* Main content card with glass effect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full glass-card p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
      >
        {/* Section heading */}
        <h2 className="text-3xl md:text-5xl font-bold mb-10 text-center tracking-tight">
          <span className="text-neon-blue">01.</span> ABOUT <span className="text-neon-purple">ME</span>
        </h2>

        <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-light">
          {/* Bio paragraph 1: Background */}
          <p>
            I am <span className="text-white font-medium">Sachin</span>. I traded <span className="text-neon-blue font-medium">high-voltage circuits</span> for <span className="text-neon-purple font-medium">high-availability servers</span>. My background is Electrical Engineering, which means I know how hardware works, but I prefer the safety of <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-cyber-mint">Ctrl+Z</code>.
          </p>

          {/* Bio paragraph 2: What I do */}
          <p>
            I specialize in the <span className="text-white font-medium">MERN stack</span>, building full-stack applications that are clean, fast, and production-ready. I'm currently leveling up in <span className="text-neon-purple font-medium">React & TypeScript</span>, because apparently <code className="text-neon-green font-mono text-sm">any</code> is not a valid type (most of the time).
          </p>

          {/* Quote block about DSA */}
          <div className="border-l-4 border-neon-green pl-6 py-4 my-8 bg-white/5 rounded-r-lg border-y border-r border-white/5">
            <p className="italic text-gray-400">
              "For fun, I grind <span className="text-white font-bold">DSA</span> in <span className="text-neon-green not-italic font-mono font-bold">Java</span>. Because I like my code verbose and my memory managed. Tackling Striver's A2Z sheet to make sure my algorithms are faster than my internet connection."
            </p>
          </div>

          {/* Bio paragraph 3: Mission */}
          <p>
            My goal? To build software that is <span className="text-white font-bold tracking-wide">ELEGANT, EFFICIENT</span>, and doesn't make the user want to throw their computer out the window.
          </p>

          {/* ======= Tech Stack Grid ======= */}
          <div className="mt-12 pt-8 border-t border-white/5">
            <h3 className="text-xl font-bold mb-6 text-center text-gray-200">
              TECH <span className="text-neon-blue">ARSENAL</span>
            </h3>
            {/* Responsive grid: 3 columns on mobile, 4 on tablet, 5 on desktop */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {technologies.map((tech, index) => (
                <TechBadge key={index} {...tech} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
