import React from 'react';
import { motion } from 'framer-motion';
import profileImg from '../assets/profile.jpg';

const GlitchText = ({ text }) => {
  return (
    <div className="relative inline-block">
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute top-0 left-0 -z-10 text-neon-blue opacity-70"
        animate={{
          x: [-2, 2, -1, 0],
          y: [1, -1, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          repeatType: "mirror",
          ease: "linear",
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 -z-10 text-neon-purple opacity-70"
        animate={{
          x: [2, -2, 1, 0],
          y: [-1, 1, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          repeatType: "mirror",
          ease: "linear",
        }}
      >
        {text}
      </motion.span>
    </div>
  );
};

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex flex-col md:flex-row justify-center items-center text-center md:text-left p-8 gap-12 pt-24">
      {/* Photo - Hologram Card Style */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative flex flex-col items-center"
      >
        <div className="relative group">
          {/* Ambient particle aura */}
          <div className="absolute -inset-4 bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-neon-blue/20 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition duration-1000 animate-pulse-fast"></div>
          
          {/* Hologram card container */}
          <div className="relative">
            {/* Dual-tone border effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full opacity-75"></div>
            
            {/* Glassy card - Fixed size to maintain circular shape */}
            <div className="relative w-64 h-64 rounded-full overflow-hidden bg-white/5 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,243,255,0.2)]">
              <img 
                src={profileImg} 
                alt="Profile" 
                className="w-full h-full object-cover object-[center_20%] scale-110"
              />
            </div>
          </div>
        </div>

        {/* Status line - Separated from photo */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-6 text-base md:text-lg text-gray-400 italic text-center max-w-xs"
        >
          Practicing DSA so Google doesn't practice on me.
        </motion.p>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-2xl space-y-6"
      >
          {/* Main Title */}
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlitchText text="Full-Stack Engineer" />
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-2xl md:text-3xl text-gray-400 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Who Doesn't Fear the <span className="text-neon-blue font-bold">Backend</span> or the <span className="text-neon-green font-bold">Big O</span>
          </motion.p>

          {/* Identity Badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-base font-mono text-gray-300">Web Developer</span>
            <span className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-base font-mono text-gray-300">System Thinker</span>
            <span className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-base font-mono text-gray-300">DSA Practitioner</span>
          </div>

          {/* Power Tagline */}
          <motion.p 
            className="text-lg md:text-xl text-gray-300 italic mb-6 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Crafting fast, resilient, battle-tested web experiences — one clean commit at a time.
          </motion.p>

          {/* Hero Metrics */}
          <div className="grid grid-cols-3 gap-8 mb-10 max-w-2xl">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-neon-blue mb-2">25k+</div>
              <div className="text-sm text-gray-500">Lines Written</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-neon-purple mb-2">4+</div>
              <div className="text-sm text-gray-500">Full-Stack Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-neon-green mb-2">A2Z</div>
              <div className="text-sm text-gray-500">DSA Sheet Progress</div>
            </div>
          </div>

          {/* Engineering Philosophy */}
          <div className="border-l-4 border-cyber-mint pl-6 mb-8 max-w-2xl">
            <p className="text-base md:text-lg text-gray-400 italic leading-relaxed">
              "Good engineering is timeless. I build solutions that are easy to reason about, easy to scale, and difficult to break."
            </p>
          </div>

          {/* Personal Motto */}
          <p className="text-base text-gray-500 font-mono">
            Build with intention. Break with curiosity. Learn relentlessly.
          </p>
      </motion.div>
    </section>
  );
}
