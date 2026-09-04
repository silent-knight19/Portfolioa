import React from 'react';
import { technicalSkills } from '../data/projectsData';

export default function About() {
  return (
    <section id="about" className="py-20 border-t border-[#1a1d24] relative">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="font-mono text-xs text-[#f59e0b] block mb-2 uppercase tracking-wider">
            Background
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#f3f4f6]">
            About Me
          </h2>
        </div>

        {/* Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-[#d1d5db] leading-relaxed">
            <p>
              I am a software engineer based in Dhanbad, India, with a background in Electrical Engineering from Government Engineering College Palamu. Studying electrical engineering gave me a strong foundation in problem solving and analytical thinking, which naturally transitioned into software engineering.
            </p>
            <p>
              I build web applications and developer tools from end to end. My recent projects focus on real-time systems (WebRTC and WebSockets), developer observability extensions for VS Code, and full-stack platforms using React, TypeScript, Node.js, and Java.
            </p>
            <p>
              I like building software that is practical, clean to read, and easy to maintain. When I'm not writing project code, I spend time practicing Data Structures and Algorithms in Java.
            </p>
          </div>

          <div className="lg:col-span-4 p-5 rounded-xl bg-[#101216] border border-[#20242c] text-xs font-mono space-y-3 h-fit">
            <div className="text-[#f59e0b] uppercase tracking-wider font-semibold">
              Quick Facts
            </div>
            <div className="text-[#9ca3af]">
              <span className="text-[#ededed] block font-medium">Location:</span>
              Dhanbad / Jharkhand, India
            </div>
            <div className="text-[#9ca3af]">
              <span className="text-[#ededed] block font-medium">Education:</span>
              B.Tech in Electrical Engineering
            </div>
            <div className="text-[#9ca3af]">
              <span className="text-[#ededed] block font-medium">Primary Focus:</span>
              Full-Stack Web Development &amp; Tools
            </div>
          </div>
        </div>

        {/* Technical Skills */}
        <div>
          <h3 className="text-xl font-bold text-[#f3f4f6] mb-6">
            Technologies &amp; Tools
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {technicalSkills.map((item) => (
              <div
                key={item.category}
                className="p-5 rounded-xl bg-[#111317] border border-[#20242c]"
              >
                <div className="text-xs font-mono text-[#f59e0b] uppercase tracking-wider mb-2">
                  {item.category}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-[#161920] border border-[#232833] text-[#d1d5db]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
