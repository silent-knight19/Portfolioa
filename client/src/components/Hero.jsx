/**
 * Hero.jsx
 * =========
 * Role: The landing section — the first thing visitors see.
 *
 * How it works:
 * - Left side: A full-height edge-to-edge profile image (e.g., Ghibli portrait)
 * - Right side: Name/title with a glitch text effect, metrics, CTA buttons
 * - A scroll-down indicator arrow at the bottom
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import profileImg from '../assets/profile.jpg'; // We'll tell user to replace this file

// -- GlitchText: creates a text glitch effect with two colored ghost layers --
const GlitchText = ({ text }) => {
  return (
    <div className="relative inline-block">
      <span className="relative z-10">{text}</span>
      {/* Blue ghost layer */}
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
      {/* Purple ghost layer */}
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

/**
 * useCountUp hook
 * ================
 * Animates a number from 0 to a target value over a given duration.
 */
const useCountUp = (target, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const startTime = Date.now();
          const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOut * target));

            if (progress >= 1) clearInterval(timer);
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return { count, ref };
};

export default function Hero() {
  const linesCounter = useCountUp(30000, 2000);
  const projectsCounter = useCountUp(9, 1500);

  return (
    <section id="home" className="min-h-screen flex flex-col-reverse lg:flex-row relative bg-black/20">
      
      {/* ======= Left Side: Content Area ======= */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full lg:w-[65%] flex flex-col justify-center p-8 md:p-12 lg:px-20 lg:py-16 pt-12 md:pt-0 min-h-[50vh] md:min-h-screen z-10"
      >
        <div className="max-w-xl">
          {/* Main title with glitch effect */}
          <motion.h1
            className="text-5xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlitchText text="Full-Stack" />
            <br />
            <GlitchText text="Engineer" />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-400 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Building <span className="text-neon-blue font-bold tracking-wide">scalable systems</span> and crushing the <span className="text-neon-green font-bold tracking-wide">Big O</span>
          </motion.p>

          {/* Identity badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm xl:text-base font-mono text-gray-300 hover:border-neon-blue/50 hover:text-neon-blue transition-all cursor-default">Web Developer</span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm xl:text-base font-mono text-gray-300 hover:border-neon-purple/50 hover:text-neon-purple transition-all cursor-default">System Thinker</span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm xl:text-base font-mono text-gray-300 hover:border-cyber-mint/50 hover:text-cyber-mint transition-all cursor-default">DSA Practitioner</span>
          </div>

          {/* Power tagline */}
          <motion.p
            className="text-base md:text-lg text-gray-300 italic mb-8 leading-relaxed font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Crafting fast, resilient, battle-tested web experiences — one clean commit at a time.
          </motion.p>

          {/* Animated Metrics */}
          <div className="grid grid-cols-3 gap-4 xl:gap-8 mb-10 w-full">
            {/* eslint-disable-next-line react-hooks/refs */}
            <div className="text-center" ref={linesCounter.ref}>
              <div className="text-2xl xl:text-4xl font-bold text-neon-blue mb-2 text-glow-blue tracking-tighter">
                {/* eslint-disable-next-line react-hooks/refs */}
                {linesCounter.count.toLocaleString()}+
              </div>
              <div className="text-xs xl:text-sm text-gray-500 uppercase tracking-widest font-semibold">Lines Written</div>
            </div>
            {/* eslint-disable-next-line react-hooks/refs */}
            <div className="text-center border-x border-white/10 px-2" ref={projectsCounter.ref}>
              <div className="text-2xl xl:text-4xl font-bold text-neon-purple mb-2 text-glow-purple tracking-tighter">
                {/* eslint-disable-next-line react-hooks/refs */}
                {projectsCounter.count}+
              </div>
              <div className="text-xs xl:text-sm text-gray-500 uppercase tracking-widest font-semibold">Full-Stack Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl xl:text-4xl font-bold text-neon-green mb-2 text-glow-mint tracking-tight">A2Z</div>
              <div className="text-xs xl:text-sm text-gray-500 uppercase tracking-widest font-semibold">DSA Progress</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href="#projects"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-black font-bold text-base hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] transition-all hover:scale-105 active:scale-95"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-full border border-white/20 text-white font-bold text-base hover:border-neon-blue hover:text-neon-blue hover:bg-neon-blue/5 transition-all hover:scale-105 active:scale-95"
            >
              Get in Touch
            </a>
          </div>

          {/* Engineering philosophy quote */}
          <div className="border-l-4 border-cyber-mint pl-6 hidden md:block">
            <p className="text-sm xl:text-base text-gray-400/80 italic leading-relaxed">
              "Good engineering is timeless. I build solutions that are easy to reason about, easy to scale, and difficult to break."
            </p>
          </div>
        </div>
      </motion.div>

      {/* ======= Right Side: Full-Height Image ======= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full lg:w-[35%] h-[50vh] md:h-screen relative overflow-hidden"
      >
        {/* The actual profile image */}
        <img
          src={profileImg}
          alt="Sachin Singh - Full Stack Developer"
          className="w-full h-full object-cover object-top"
        />

        {/* Gradient overlays to smoothly blend the image into the dark background on the left */}
        {/* Mobile: bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark-bg to-transparent pointer-events-none lg:hidden"></div>
        {/* Desktop: left edge gradient fade */}
        <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-dark-bg to-transparent pointer-events-none hidden lg:block"></div>
      </motion.div>

      {/* Scroll Down Indicator (bottom right on desktop, bottom center on mobile) */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0 xl:left-12 flex flex-col items-center gap-2 z-20 hidden md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em] relative top-1">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(0,243,255,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
