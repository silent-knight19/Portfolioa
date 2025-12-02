import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ProjectCard = ({ title, description, tags, githubLink, demoLink, isUpcoming }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-[28rem] rounded-xl bg-dark-card backdrop-blur-md border ${isUpcoming ? 'border-dashed border-neon-purple/30' : 'border-white/10'} p-6 flex flex-col justify-between group cursor-pointer`}
    >
      <div style={{ transform: "translateZ(50px)" }}>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-white group-hover:text-neon-blue transition-colors">
            {title}
          </h3>
          {isUpcoming && (
            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-neon-purple border border-neon-purple rounded bg-neon-purple/10">
              Coming Soon
            </span>
          )}
        </div>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          {description}
        </p>
      </div>
      
      <div style={{ transform: "translateZ(40px)" }} className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 rounded bg-white/5 text-neon-blue border border-neon-blue/20">
              {tag}
            </span>
          ))}
        </div>

        {!isUpcoming && (
          <div className="flex gap-4 mt-2">
            {githubLink && (
              <a 
                href={githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white flex items-center gap-2 transition-colors z-20"
                onClick={(e) => e.stopPropagation()}
              >
                <span>GitHub</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            )}
            {demoLink && (
              <a 
                href={demoLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-neon-blue hover:text-neon-purple flex items-center gap-2 transition-colors z-20"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Live Demo</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            )}
          </div>
        )}
      </div>

      <div 
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
        style={{ transform: "translateZ(0px)" }}
      />
    </motion.div>
  );
};

export default function Projects() {
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
      description: "A private, real-time video calling app built for couples who want a simple, secure, and uninterrupted way to stay connected. HeartToHeart uses WebRTC for peer-to-peer video/audio streaming and WebSockets for lightning-fast signaling and room coordination — delivering a smooth, low-latency experience without unnecessary complexity.",
      tags: ["Video Chat", "WebRTC", "Real-Time Apps", "Signaling", "Communication"],
      githubLink: "https://github.com/silent-knight19/HeartToHeart"
    },
    {
      title: "RemoteCode",
      description: "A real-time collaborative coding environment that lets you write and run code on another device directly from your browser. RemoteCode uses WebSockets for live editor sync, secure tunnels for device control, and isolated execution sandboxes to run code safely on remote machines.",
      tags: ["Remote Coding", "Real-Time Collaboration", "WebSockets", "Execution Engine", "Developer Tools"],
      isUpcoming: true
    }
  ];

  return (
    <section id="projects" className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold mb-16 text-center"
      >
        FEATURED <span className="text-neon-purple">PROJECTS</span>
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl w-full perspective-1000">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
}
