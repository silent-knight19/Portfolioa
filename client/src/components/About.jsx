import React from 'react';
import { motion } from 'framer-motion';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiTailwindcss, SiJavascript } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

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
      className="flex flex-col items-center justify-center p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-neon-blue/50 transition-colors group cursor-pointer"
    >
      <Icon className={`text-3xl mb-2 transition-all duration-300 group-hover:drop-shadow-[0_0_10px_${color}]`} style={{ color: color }} />
      <span className="text-gray-300 font-mono text-xs group-hover:text-white transition-colors">{name}</span>
    </motion.div>
  );
};

export default function About() {
  const technologies = [
    { icon: SiMongodb, name: 'MongoDB', color: '#47A248', delay: 0 },
    { icon: SiExpress, name: 'Express', color: '#ffffff', delay: 0.5 },
    { icon: SiReact, name: 'React', color: '#61DAFB', delay: 1 },
    { icon: SiNodedotjs, name: 'Node.js', color: '#339933', delay: 1.5 },
    { icon: FaJava, name: 'Java', color: '#f89820', delay: 0.2 },
    { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E', delay: 0.7 },
    { icon: SiTailwindcss, name: 'Tailwind', color: '#38B2AC', delay: 1.2 },
  ];

  return (
    <section id="about" className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden py-20">
      {/* Background decoration */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-neon-blue/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-neon-purple/5 rounded-full blur-[100px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/5 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-10 text-center tracking-tight">
          <span className="text-neon-blue">01.</span> ABOUT <span className="text-neon-purple">ME</span>
        </h2>

        <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-light">
          <p>
            I am <span className="text-white font-medium">Sachin</span>. I traded <span className="text-neon-blue font-medium">high-voltage circuits</span> for <span className="text-neon-purple font-medium">high-availability servers</span>. My background is Electrical Engineering, which means I know how hardware works, but I prefer the safety of <code className="bg-white/10 px-1 rounded text-sm font-mono">Ctrl+Z</code>.
          </p>

          <p>
            I specialize in the <span className="text-white font-medium">MERN stack</span>, building systems that are cleaner than my room. I'm currently diving deep into <span className="text-neon-purple font-medium">React & TypeScript</span>, because apparently <code className="text-neon-green font-mono">any</code> is not a valid type (most of the time).
          </p>

          <div className="border-l-4 border-neon-green pl-6 py-4 my-8 bg-white/5 rounded-r-lg border-y border-r border-white/5">
            <p className="italic text-gray-400">
              "For fun, I grind <span className="text-white font-bold">DSA</span>. Yes, in <span className="text-neon-green not-italic font-mono font-bold">Java</span>. Because I like my code verbose and my memory managed. I'm tackling Striver's A2Z sheet to ensure my algorithms are faster than my internet connection."
            </p>
          </div>

          <p>
            My goal? To build software that is <span className="text-white font-bold tracking-wide">ELEGANT, EFFICIENT</span>, and doesn't make the user want to throw their computer out the window.
          </p>

          {/* Tech Stack Grid */}
          <div className="mt-12 pt-8 border-t border-white/5">
            <h3 className="text-xl font-bold mb-6 text-center text-gray-200">
              TECH <span className="text-neon-blue">ARSENAL</span>
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
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
