/**
 * Projects.jsx
 * ==============
 * Role: Displays all portfolio projects in a responsive grid.
 *
 * How it works:
 * - Each project is a 3D-tilt card (tilts based on mouse position)
 * - Cards appear with staggered scroll animations (one after another)
 * - Shows project count in the section header
 * - GitHub and Live Demo links are displayed beside the project title
 * - Tags are shown as colored chips at the bottom of each card
 */

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * ProjectCard component
 * =====================
 * A single project card with 3D tilt effect on mouse hover.
 *
 * How the 3D tilt works:
 * 1. Track mouse position relative to the card
 * 2. Convert mouse position to a percentage (-0.5 to 0.5)
 * 3. Map that percentage to rotation degrees using framer-motion's useTransform
 * 4. Apply the rotation with CSS transform
 *
 * @param {number} index - position in the list (used for stagger delay)
 */
const ProjectCard = ({ title, description, tags, githubLink, demoLink, isUpcoming, index }) => {
  // Motion values for tracking mouse position on the card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Add spring physics so the tilt feels smooth and springy
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  // Convert mouse position to rotation angles
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  // Calculate mouse position as a fraction of card width/height
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  // Reset tilt when mouse leaves the card
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      // Staggered scroll-in animation: each card fades in 0.1s after the previous
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-[26rem] rounded-xl glass-card ${isUpcoming ? 'border-dashed !border-neon-purple/30' : ''} p-6 flex flex-col justify-between group cursor-pointer hover:shadow-[0_0_40px_rgba(0,243,255,0.1)] transition-shadow duration-500`}
    >
      {/* Top section: title, links, description */}
      <div style={{ transform: "translateZ(50px)" }}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col gap-2">
            {/* Project name */}
            <h3 className="text-2xl font-bold text-white group-hover:text-neon-blue transition-colors">
              {title}
            </h3>

            {/* GitHub and Live Demo links (only if not an upcoming project) */}
            {!isUpcoming && (
              <div className="flex gap-4 items-center">
                {githubLink && (
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>GitHub</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  </a>
                )}
                {demoLink && (
                  <a
                    href={demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neon-blue hover:text-neon-purple flex items-center gap-1.5 transition-colors z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Live Demo</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* "Coming Soon" badge for upcoming projects */}
          {isUpcoming && (
            <span className="px-2 py-1 text-[10px] whitespace-nowrap font-bold uppercase tracking-wider text-neon-purple border border-neon-purple rounded bg-neon-purple/10 animate-pulse">
              Coming Soon
            </span>
          )}
        </div>

        {/* Project description */}
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bottom section: tech stack tags */}
      <div style={{ transform: "translateZ(40px)" }} className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-neon-blue border border-neon-blue/20 hover:bg-neon-blue/10 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover gradient overlay for depth effect */}
      <div
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-blue/10 via-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ transform: "translateZ(0px)" }}
      />
    </motion.div>
  );
};

export default function Projects() {
  // All projects data
  const projects = [
    {
      title: "FocusLabs",
      description: "A clean and intelligent productivity dashboard that helps you track habits, manage time, and stay consistent. Features monthly habit grids, streak analytics, session timers, and real-time syncing — all wrapped in a smooth, distraction-free UI.",
      tags: ["React", "Productivity", "Habit Tracking", "Time Management", "Analytics"],
      githubLink: "https://github.com/silent-knight19/FocusLabs",
      demoLink: "https://collabedit-26531.web.app"
    },
    {
      title: "CodeOrbit",
      description: "A lightweight, modern version control system inspired by GitHub — built from scratch to manage repositories, track file versions, and handle uploads seamlessly. CodeOrbit stores project snapshots efficiently using Amazon S3, enabling reliable, scalable, cloud-backed version management.",
      tags: ["Node.js", "AWS S3", "Version Control", "Cloud Storage", "Dev Tools"],
      githubLink: "https://github.com/silent-knight19/CodeOrbit"
    },
    {
      title: "HeartToHeart",
      description: "A private, real-time video calling app built for couples who want a simple, secure, and uninterrupted way to stay connected. HeartToHeart uses WebRTC for peer-to-peer video/audio streaming and WebSockets for lightning-fast signaling and room coordination.",
      tags: ["Video Chat", "WebRTC", "Real-Time Apps", "Signaling", "Communication"],
      githubLink: "https://github.com/silent-knight19/HeartToHeart"
    },
    {
      title: "VerboAI",
      description: "An intelligent AI-driven interview preparation assistant that simulates real interview scenarios. VerboAI uses advanced language models to generate dynamic questions, evaluate responses, and provide detailed feedback to help users ace their interviews.",
      tags: ["AI", "JavaScript", "Interview Prep", "LLM", "Full Stack"],
      githubLink: "https://github.com/silent-knight19/VerboAI",
      demoLink: "https://verboai-7749.web.app"
    },
    {
      title: "Tuf-Tracker",
      description: "An AI-powered DSA learning companion that helps you track coding problems, get AI-generated hints using Gemini, and build a smart revision queue. Comes with streak analytics, monthly habit grids, and a premium UI.",
      tags: ["React", "Firebase", "Gemini AI", "Express", "DSA Tracker"],
      githubLink: "https://github.com/silent-knight19/Tuf-Tracker",
      demoLink: "https://tuf-tracker2.vercel.app"
    },
    {
      title: "PixlMeet",
      description: "A browser-based video conferencing web app with WebRTC for peer-to-peer media streaming. Supports room creation, JWT authentication, screen sharing, in-call chat messaging, and responsive controls.",
      tags: ["React", "WebRTC", "Socket.IO", "MongoDB", "Video Conferencing"],
      githubLink: "https://github.com/silent-knight19/PixlMeet"
    },
    {
      title: "Zerodhaa",
      description: "A full-stack stock trading platform clone inspired by Zerodha, featuring a modern React frontend, Express backend with REST APIs, and an admin dashboard. Includes user authentication, CRUD operations, and role-based access.",
      tags: ["React", "Express", "MongoDB", "Full Stack", "Trading Platform"],
      githubLink: "https://github.com/silent-knight19/zerodhaa"
    },
    {
      title: "Employee Management System",
      description: "A modern, responsive web application for managing employees, tasks, and workflows. Features role-based access for admins and employees, task assignment with priority tracking, performance metrics, and a clean UI.",
      tags: ["React", "Vite", "CSS Modules", "Context API", "Task Management"],
      githubLink: "https://github.com/silent-knight19/Employee-management-system"
    },
    {
      title: "RemoteCode",
      description: "A real-time collaborative coding environment that lets you write and run code on another device directly from your browser. RemoteCode uses WebSockets for live editor sync, secure tunnels for device control, and isolated execution sandboxes.",
      tags: ["Remote Coding", "Real-Time Collaboration", "WebSockets", "Execution Engine", "Developer Tools"],
      isUpcoming: true
    }
  ];

  // Count only non-upcoming projects for the header
  const activeProjectCount = projects.filter(p => !p.isUpcoming).length;

  return (
    <section id="projects" className="min-h-screen flex flex-col items-center justify-center p-8 py-24">
      {/* Section heading with project count */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          FEATURED <span className="text-neon-purple">PROJECTS</span>
        </h2>
        {/* Project count badge */}
        <p className="text-gray-500 font-mono text-sm">
          <span className="text-neon-blue">{activeProjectCount}</span> projects built • <span className="text-neon-purple">1</span> coming soon
        </p>
      </motion.div>

      {/* Project cards grid: 2 columns on desktop, 1 on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl w-full" style={{ perspective: '1000px' }}>
        {projects.map((project, index) => (
          <ProjectCard key={index} index={index} {...project} />
        ))}
      </div>
    </section>
  );
}
