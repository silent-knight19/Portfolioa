import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiExternalLink, FiGithub } from 'react-icons/fi';

export default function CaseStudyModal({ project, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-xl h-full bg-[#101216] border-l border-[#20242c] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto z-10 text-[#ededed]"
            role="dialog"
            aria-modal="true"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#20242c]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#f59e0b]">
                    Project {project.number}
                  </span>
                  <span className="text-[#3f4553] font-mono text-xs">•</span>
                  <span className="text-xs text-[#71717a] font-mono">{project.year}</span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-[#9ca3af] hover:text-[#f3f4f6] hover:bg-[#1b1f28] transition-colors"
                  aria-label="Close modal"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Title */}
              <div className="mt-6 mb-6">
                <span className="text-xs font-mono text-[#9ca3af] block mb-1">
                  {project.domain}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f3f4f6]">
                  {project.title}
                </h2>
                <p className="text-sm text-[#f59e0b] mt-1">
                  {project.subtitle}
                </p>
                <p className="text-[#d1d5db] mt-3 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Content Sections */}
              <div className="space-y-6 mt-6">
                <section>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#71717a] mb-2">
                    The Problem
                  </h3>
                  <p className="text-[#9ca3af] text-sm leading-relaxed">
                    {project.caseStudy.problem}
                  </p>
                </section>

                <section>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#71717a] mb-2">
                    How it Works
                  </h3>
                  <p className="text-[#9ca3af] text-sm leading-relaxed">
                    {project.caseStudy.architecture}
                  </p>
                </section>

                <section>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#71717a] mb-2">
                    Key Features &amp; Implementation
                  </h3>
                  <ul className="space-y-2">
                    {project.caseStudy.engineeringHighlights.map((highlight, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-[#9ca3af] flex items-start gap-2 bg-[#14171d] p-3 rounded-lg border border-[#1e232c]">
                        <span className="text-[#f59e0b] font-mono text-xs mt-0.5">•</span>
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#71717a] mb-2">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2.5 py-1 rounded bg-[#161920] border border-[#232833] text-[#d1d5db]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Bottom Links */}
            <div className="pt-6 mt-8 border-t border-[#20242c] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {project.caseStudy.links.github && (
                  <a
                    href={project.caseStudy.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#181b22] hover:bg-[#222731] border border-[#262c37] text-xs font-medium text-[#f3f4f6] transition-all"
                  >
                    <FiGithub size={14} />
                    <span>View Repository</span>
                  </a>
                )}
                {project.caseStudy.links.demo && (
                  <a
                    href={project.caseStudy.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-black text-xs font-semibold transition-all"
                  >
                    <FiExternalLink size={14} />
                    <span>Open Live App</span>
                  </a>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-xs font-mono text-[#71717a] hover:text-[#ededed]"
              >
                Close (Esc)
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
