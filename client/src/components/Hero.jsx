import React from 'react';
import { FiArrowDown, FiArrowRight, FiGithub, FiLinkedin, FiMail, FiFileText } from 'react-icons/fi';
import profileImg from '../assets/profile.jpg';

export default function Hero() {
  return (
    <section id="hero" className="min-h-[90vh] pt-28 pb-16 flex items-center relative">
      <div className="max-w-6xl mx-auto px-6 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs text-[#f59e0b]">FULL-STACK DEVELOPER</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#f3f4f6] leading-[1.15] mb-6">
              Hi, I'm Sachin Singh. <br />
              I build web apps &amp; developer tools.
            </h1>

            <p className="text-base sm:text-lg text-[#9ca3af] leading-relaxed mb-8 max-w-xl">
              I'm a software engineer with an electrical engineering background. I build full-stack web applications, developer tooling, and real-time systems using React, TypeScript, Node.js, and Java.
            </p>

            <div className="flex flex-wrap gap-2.5 mb-8 font-mono text-xs text-[#a1a1aa]">
              <span className="px-3 py-1 rounded-md bg-[#121418] border border-[#20242c]">
                Dhanbad, India
              </span>
              <span className="px-3 py-1 rounded-md bg-[#121418] border border-[#20242c]">
                React • TypeScript • Node.js
              </span>
              <span className="px-3 py-1 rounded-md bg-[#121418] border border-[#20242c]">
                Java DSA
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-black font-semibold text-sm transition-all"
              >
                <span>View Projects</span>
                <FiArrowDown size={14} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#14171d] hover:bg-[#1c2028] border border-[#262c37] hover:border-[#384252] text-[#ededed] font-medium text-sm transition-all"
              >
                <span>Get in Touch</span>
                <FiArrowRight size={14} />
              </a>
            </div>

            {/* Direct Links */}
            <div className="flex items-center gap-6 pt-6 border-t border-[#1c2028] text-xs font-mono text-[#71717a]">
              <a
                href="https://github.com/silent-knight19"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#f3f4f6] transition-colors"
              >
                <FiGithub size={14} />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/sachinsinghdev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#f3f4f6] transition-colors"
              >
                <FiLinkedin size={14} />
                <span>LinkedIn</span>
              </a>
              <a
                href="mailto:sachinsinghtomar7749@gmail.com"
                className="inline-flex items-center gap-1.5 hover:text-[#f3f4f6] transition-colors"
              >
                <FiMail size={14} />
                <span>Email</span>
              </a>
              <a
                href="https://drive.google.com/file/d/16Mb5gtcXYeXDg07_rwXUu-YhLQvvx4RH/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#f59e0b] hover:text-[#fbbf24] transition-colors"
              >
                <FiFileText size={14} />
                <span>Résumé</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-[#222731] bg-[#111317] p-2">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#161920]">
                <img
                  src={profileImg}
                  alt="Sachin Singh"
                  className="w-full h-full object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-500"
                  loading="eager"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
