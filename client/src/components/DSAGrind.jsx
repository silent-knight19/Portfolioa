/**
 * DSAGrind.jsx
 * ==============
 * Role: The "DSA Grind" section — shows my Data Structures & Algorithms journey.
 *
 * How it works:
 * - Left column: text content about DSA discipline, mindset, and skill chips
 * - Right column: animated code block with SYNTAX HIGHLIGHTING (colored keywords)
 *   and a floating "live status" card
 * - A progress bar shows Striver A2Z sheet progress
 * - The code block types itself out character by character (typing animation)
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// The Java code snippet that will be typed out character by character
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

// List of Java keywords to highlight in a different color
const JAVA_KEYWORDS = [
  'class', 'public', 'return', 'if', 'for', 'while', 'new', 'null', 'int', 'void'
];

// List of Java types to highlight in another color
const JAVA_TYPES = [
  'List', 'Integer', 'TreeNode', 'Queue', 'ArrayList', 'LinkedList', 'Solution'
];

/**
 * highlightCode
 * ==============
 * Takes a raw code string and returns an array of JSX spans
 * with different colors for keywords, types, comments, and strings.
 * This gives the code block a real-IDE feel.
 *
 * @param {string} code - the raw code to syntax-highlight
 * @returns {JSX.Element[]} - array of colored <span> elements
 */
const highlightCode = (code) => {
  if (!code) return null;

  // Split the code into individual words and non-word characters
  const parts = code.split(/(\b\w+\b|[^\w\s]|\s)/g);

  return parts.map((part, i) => {
    // Check if this line is a comment (starts with //)
    if (part.startsWith('//')) {
      return <span key={i} className="text-gray-500">{part}</span>;
    }
    // Check if this word is a Java keyword
    if (JAVA_KEYWORDS.includes(part)) {
      return <span key={i} className="text-neon-purple font-medium">{part}</span>;
    }
    // Check if this word is a Java type
    if (JAVA_TYPES.includes(part)) {
      return <span key={i} className="text-neon-blue">{part}</span>;
    }
    // Default: plain text color
    return <span key={i}>{part}</span>;
  });
};

/**
 * CodeBlock component
 * ====================
 * Renders a terminal-like code window with:
 * - macOS-style window dots (red, yellow, green)
 * - The filename label
 * - A typing animation that "types out" the code
 * - A blinking cursor at the end
 */
const CodeBlock = () => {
  const [displayedCode, setDisplayedCode] = useState('');

  useEffect(() => {
    let i = 0;
    // Type out the code one character at a time
    const interval = setInterval(() => {
      setDisplayedCode(codeSnippet.substring(0, i));
      i++;
      if (i > codeSnippet.length) {
        clearInterval(interval);
      }
    }, 15); // 15ms per character = fast typing effect
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative group">
      {/* Glow behind the code block */}
      <div className="absolute -inset-4 bg-cyber-mint/20 rounded-xl blur-3xl opacity-20 group-hover:opacity-40 transition duration-500"></div>

      {/* The code editor window */}
      <div className="relative glass-card p-6 font-mono text-sm md:text-base overflow-hidden shadow-2xl">
        {/* Inner gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-mint/5 to-transparent pointer-events-none"></div>

        {/* macOS-style window header with dots and filename */}
        <div className="flex gap-2 mb-4 border-b border-white/5 pb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <div className="ml-auto text-xs text-gray-500 font-sans">Solution.java</div>
        </div>

        {/* The code with syntax highlighting */}
        <pre className="text-gray-300 overflow-x-auto">
          <code>
            {highlightCode(displayedCode)}
            {/* Blinking cursor */}
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

// Skill chip — small pill label for skills
const SkillChip = ({ label, highlight = false }) => (
  <span className={`px-5 py-2.5 rounded-full text-base font-mono border transition-all hover:scale-105 ${
    highlight
      ? 'border-cyber-mint text-cyber-mint bg-cyber-mint/10 hover:bg-cyber-mint/20'
      : 'border-white/10 text-gray-400 bg-white/5 hover:border-white/30'
  }`}>
    {label}
  </span>
);

// Status row — single row in the "Live Status" card
const StatusRow = ({ label, value, colorClass }) => (
  <div className="flex items-center justify-between text-sm border-b border-white/5 py-2 last:border-0">
    <span className="text-gray-500">{label}</span>
    <span className={`font-mono ${colorClass}`}>{value}</span>
  </div>
);

/**
 * ProgressBar component
 * ======================
 * An animated progress bar showing A2Z sheet completion.
 * The bar animates from 0% to the target width when scrolled into view.
 */
const ProgressBar = ({ label, percentage, color }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      <span className={`font-mono ${color}`}>{percentage}%</span>
    </div>
    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, #00ff9d, #00f3ff)` }}
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>
  </div>
);

export default function DSAGrind() {
  return (
    <section id="dsa" className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden py-24">
      {/* Background nebula gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyber-mint/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* ======= Left Column: Text Content ======= */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-10 relative"
        >
          {/* Vertical accent line on the left (desktop only) */}
          <div className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyber-mint/30 to-transparent hidden lg:block"></div>

          {/* Section heading */}
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
            {/* The Discipline sub-section */}
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                <span className="w-3 h-3 bg-cyber-mint rounded-full"></span>
                The Discipline
              </h3>
              <p className="text-gray-400 leading-relaxed text-xl">
                I practice Data Structures & Algorithms the same way some people hit the gym — <span className="text-white">regular reps, increasing difficulty, no skipping leg (tree) day.</span>
              </p>
            </div>

            {/* The Mindset sub-section */}
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                <span className="w-3 h-3 bg-neon-purple rounded-full"></span>
                The Mindset
              </h3>
              <p className="text-gray-400 leading-relaxed text-xl">
                Solving problems in <span className="text-cyber-mint">Java</span> because pain builds character. Building intuition for when a problem "smells like a binary search."
              </p>
            </div>

            {/* Progress bar showing A2Z sheet completion */}
            <ProgressBar label="Striver A2Z Sheet" percentage={65} color="text-cyber-mint" />

            {/* Skill chips */}
            <div className="flex flex-wrap gap-3">
              <SkillChip label="Java DSA" highlight />
              <SkillChip label="Striver TUF+" highlight />
              <SkillChip label="Pattern Recognition" />
              <SkillChip label="Problem Solving" />
            </div>
          </div>
        </motion.div>

        {/* ======= Right Column: Code Block + Status Card ======= */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <CodeBlock />

          {/* Floating "Live Status" card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute -bottom-10 -right-4 md:-right-10 w-64 glass-card p-4 shadow-2xl"
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
