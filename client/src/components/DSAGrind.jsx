import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const codeSnippet = `// Binary Tree Level Order Traversal
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> level = new ArrayList<>();
            
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                level.add(node.val);
                
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            result.add(level);
        }
        return result;
    }
}`;

const CodeBlock = () => {
  const [displayedCode, setDisplayedCode] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedCode(codeSnippet.substring(0, i));
      i++;
      if (i > codeSnippet.length) {
        clearInterval(interval);
      }
    }, 15); // Faster typing speed
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative group perspective-1000">
      {/* Radial Light Under Code Block */}
      <div className="absolute -inset-4 bg-cyber-mint/20 rounded-xl blur-3xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
      
      <div className="relative bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-xl p-6 font-mono text-sm md:text-base overflow-hidden shadow-2xl transform transition-transform duration-500 hover:rotate-x-2 hover:rotate-y-2">
        {/* Inner Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-mint/5 to-transparent pointer-events-none"></div>
        
        <div className="flex gap-2 mb-4 border-b border-white/5 pb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <div className="ml-auto text-xs text-gray-500 font-sans">Solution.java</div>
        </div>
        
        <pre className="text-gray-300 overflow-x-auto custom-scrollbar">
          <code>
            <span className="text-cyber-mint">{displayedCode}</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-5 bg-cyber-mint ml-1 align-middle"
            />
          </code>
        </pre>
      </div>
    </div>
  );
};

const SkillChip = ({ label, highlight = false }) => (
  <span className={`px-5 py-2.5 rounded-full text-base font-mono border ${highlight ? 'border-cyber-mint text-cyber-mint bg-cyber-mint/10' : 'border-white/10 text-gray-400 bg-white/5'}`}>
    {label}
  </span>
);

const StatusRow = ({ label, value, colorClass }) => (
  <div className="flex items-center justify-between text-sm border-b border-white/5 py-2 last:border-0">
    <span className="text-gray-500">{label}</span>
    <span className={`font-mono ${colorClass}`}>{value}</span>
  </div>
);

export default function DSAGrind() {
  return (
    <section id="dsa" className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden py-24">
      {/* Soft Nebula Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyber-mint/5 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[120px] -z-10 animate-pulse-slow delay-1000"></div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-10 relative"
        >
          {/* Vertical Divider Line */}
          <div className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyber-mint/30 to-transparent hidden lg:block"></div>

          <div>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
              DSA <span className="text-cyber-mint relative inline-block">
                GRIND
                <span className="absolute bottom-0 left-0 w-full h-1 bg-cyber-mint/50 rounded-full"></span>
              </span>
            </h2>
            <p className="text-3xl text-gray-400 font-light">
              Where I fight logic with logic.
            </p>
          </div>

          <div className="space-y-12">
            {/* Micro-Section: What I Practice */}
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                <span className="w-3 h-3 bg-cyber-mint rounded-full"></span>
                The Discipline
              </h3>
              <p className="text-gray-400 leading-relaxed text-xl">
                I practice Data Structures & Algorithms the same way some people hit the gym — <span className="text-white">regular reps, increasing difficulty, no skipping leg (tree) day.</span>
              </p>
            </div>

            {/* Micro-Section: My Mindset */}
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                <span className="w-3 h-3 bg-neon-purple rounded-full"></span>
                The Mindset
              </h3>
              <p className="text-gray-400 leading-relaxed text-xl">
                Solving problems in <span className="text-cyber-mint">Java</span> because pain builds character. Sharpening intuition for when a problem "smells like a binary search."
              </p>
            </div>

            {/* Skill Chips */}
            <div className="flex flex-wrap gap-3">
              <SkillChip label="Solving DSA(Java) Questions" highlight />
              <SkillChip label="Striver TUF+ platform" highlight />
              <SkillChip label="Mastering DSA Patterns" />
            </div>
          </div>
        </motion.div>

        {/* Right Column: Visuals */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <CodeBlock />

          {/* Status Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute -bottom-10 -right-4 md:-right-10 w-64 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-2xl"
          >
            <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest">Live Status</h4>
            <div className="flex flex-col">
              <StatusRow label="Current Grind" value="DP on Trees" colorClass="text-cyber-mint" />
              <StatusRow label="Current Enemy" value="Off-by-one" colorClass="text-red-400" />
              <StatusRow label="Mood" value="Fighting O(n!)" colorClass="text-neon-purple" />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
