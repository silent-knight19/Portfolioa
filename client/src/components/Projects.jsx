import React from 'react';
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';
import { featuredProjects, selectedProjects } from '../data/projectsData';

export default function Projects({ onOpenCaseStudy }) {
  return (
    <section id="work" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-xs text-[#f59e0b] block mb-2 uppercase tracking-wider">
            Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#f3f4f6]">
            Featured Projects
          </h2>
          <p className="text-[#9ca3af] text-base mt-2 max-w-2xl">
            Selected projects across developer tooling, systems programming, and real-time web applications.
          </p>
        </div>

        {/* Featured Projects List */}
        <div className="space-y-16">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="pt-10 border-t border-[#20242c]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                
                {/* Details Column */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-sm font-semibold text-[#f59e0b]">
                        {project.number}
                      </span>
                      <span className="text-[#3f4553] font-mono text-xs">•</span>
                      <span className="font-mono text-xs text-[#9ca3af]">
                        {project.domain}
                      </span>
                      <span className="text-xs text-[#71717a] font-mono ml-auto">
                        {project.year}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#f3f4f6] mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#f59e0b] mb-4">
                      {project.subtitle}
                    </p>

                    <p className="text-[#d1d5db] text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {project.highlights.map((item, hIdx) => (
                        <li key={hIdx} className="text-xs sm:text-sm text-[#9ca3af] flex items-start gap-2.5">
                          <span className="text-[#f59e0b] text-xs mt-0.5">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-mono px-2.5 py-1 rounded bg-[#14171d] border border-[#222732] text-[#9ca3af]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-[#181b22]">
                      <button
                        onClick={() => onOpenCaseStudy(project)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#171a21] hover:bg-[#202530] border border-[#282f3d] text-xs font-mono text-[#f3f4f6] hover:text-[#f59e0b] transition-all"
                      >
                        <span>Project Overview</span>
                        <FiArrowRight size={12} />
                      </button>

                      {project.caseStudy.links.github && (
                        <a
                          href={project.caseStudy.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#9ca3af] hover:text-[#f3f4f6] transition-colors"
                        >
                          <FiGithub size={13} />
                          <span>Source</span>
                        </a>
                      )}

                      {project.caseStudy.links.demo && (
                        <a
                          href={project.caseStudy.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#f59e0b] hover:text-[#fbbf24] transition-colors"
                        >
                          <FiExternalLink size={13} />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Visual Column */}
                <div className="lg:col-span-5 flex items-center justify-center">
                  <div className="w-full rounded-xl bg-[#101216] border border-[#20242c] p-6 flex flex-col items-center justify-center min-h-[220px]">
                    {project.image ? (
                      <div className="flex flex-col items-center">
                        <img
                          src={project.image}
                          alt={project.imageAlt}
                          className="w-24 h-24 object-contain rounded-xl mb-3"
                        />
                        <span className="text-xs font-mono text-[#71717a]">
                          {project.title} Asset
                        </span>
                      </div>
                    ) : (
                      <div className="w-full space-y-2 font-mono text-xs text-[#9ca3af]">
                        <div className="text-[11px] text-[#f59e0b] uppercase tracking-wider mb-2">
                          Key Modules
                        </div>
                        {project.id === 'codeorbit' ? (
                          <>
                            <div className="p-2.5 rounded bg-[#14171d] border border-[#20242c]">
                              Local CLI (.MyGit staging &amp; commit tree)
                            </div>
                            <div className="p-2.5 rounded bg-[#14171d] border border-[#20242c]">
                              Cloud Remote (AWS S3 snapshot sync)
                            </div>
                            <div className="p-2.5 rounded bg-[#14171d] border border-[#20242c]">
                              Web Dashboard (React repo explorer)
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="p-2.5 rounded bg-[#14171d] border border-[#20242c]">
                              WebRTC peer-to-peer audio &amp; video
                            </div>
                            <div className="p-2.5 rounded bg-[#14171d] border border-[#20242c]">
                              Socket.IO signaling &amp; room coordination
                            </div>
                            <div className="p-2.5 rounded bg-[#14171d] border border-[#20242c]">
                              Screen share &amp; in-call text chat
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </article>
          ))}
        </div>

        {/* Selected Secondary Work */}
        <div className="mt-20 pt-12 border-t border-[#20242c]">
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-[#f3f4f6]">
              Other Work
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedProjects.map((p) => (
              <div
                key={p.id}
                className="p-6 rounded-xl bg-[#111317] border border-[#20242c] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#71717a] mb-2">
                    <span className="text-[#f59e0b]">{p.category}</span>
                    <span>{p.year}</span>
                  </div>
                  <h4 className="text-xl font-bold text-[#f3f4f6] mb-2">
                    {p.title}
                  </h4>
                  <p className="text-[#9ca3af] text-xs sm:text-sm leading-relaxed mb-4">
                    {p.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono px-2 py-0.5 rounded bg-[#161920] border border-[#232833] text-[#a1a1aa]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-3 border-t border-[#1a1d25] text-xs font-mono">
                    {p.githubLink && (
                      <a
                        href={p.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#9ca3af] hover:text-[#f3f4f6] transition-colors"
                      >
                        <FiGithub size={13} />
                        <span>Source</span>
                      </a>
                    )}
                    {p.demoLink && (
                      <a
                        href={p.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#f59e0b] hover:text-[#fbbf24] transition-colors ml-auto"
                      >
                        <FiExternalLink size={13} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
