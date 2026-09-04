import React, { useState } from 'react';
import { FiExternalLink, FiGithub, FiFolder } from 'react-icons/fi';
import { archiveProjects } from '../data/projectsData';

export default function ProjectArchive() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = archiveProjects.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.title.toLowerCase().includes(term) ||
      p.domain.toLowerCase().includes(term) ||
      p.technologies.some((t) => t.toLowerCase().includes(term))
    );
  });

  return (
    <section className="py-16 border-t border-[#1a1d24]">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-mono text-xs text-[#f59e0b] block mb-1 uppercase tracking-wider">
              Archive
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-[#f3f4f6]">
              All Projects &amp; Experiments
            </h3>
            <p className="text-xs md:text-sm text-[#71717a] mt-1">
              A list of other repositories, prototypes, and older work.
            </p>
          </div>

          {/* Quick Search */}
          <div className="w-full md:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or tech..."
              className="w-full bg-[#111317] border border-[#20242c] rounded-lg px-3 py-2 text-xs font-mono text-[#ededed] placeholder-[#52525b] focus:outline-none focus:border-[#f59e0b]/50 transition-colors"
            />
          </div>
        </div>

        {/* Tabular Archive */}
        <div className="overflow-x-auto rounded-xl border border-[#1e222a] bg-[#0f1115]">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="border-b border-[#1e222a] text-[#71717a] font-mono text-xs uppercase tracking-wider bg-[#13161c]">
                <th className="py-3 px-4 font-normal">Year</th>
                <th className="py-3 px-4 font-normal">Project</th>
                <th className="py-3 px-4 font-normal hidden sm:table-cell">Category</th>
                <th className="py-3 px-4 font-normal hidden md:table-cell">Stack</th>
                <th className="py-3 px-4 font-normal text-right">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181b22]">
              {filtered.map((item) => (
                <tr
                  key={item.title}
                  className="hover:bg-[#14171e] transition-colors group"
                >
                  <td className="py-3 px-4 font-mono text-[#71717a]">
                    {item.year}
                  </td>

                  <td className="py-3 px-4 font-medium text-[#f3f4f6] group-hover:text-[#f59e0b] transition-colors">
                    <div className="flex items-center gap-2">
                      <FiFolder className="text-[#71717a] group-hover:text-[#f59e0b] shrink-0" size={13} />
                      <span>{item.title}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-[#9ca3af] hidden sm:table-cell">
                    {item.domain}
                  </td>

                  <td className="py-3 px-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1.5">
                      {item.technologies.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#171a21] border border-[#232833] text-[#a1a1aa]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-3 px-4 text-right font-mono">
                    <div className="flex items-center justify-end gap-3">
                      {item.githubLink && (
                        <a
                          href={item.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#9ca3af] hover:text-[#f3f4f6] transition-colors inline-flex items-center gap-1"
                          aria-label={`GitHub for ${item.title}`}
                        >
                          <FiGithub size={13} />
                          <span className="hidden lg:inline text-xs">Code</span>
                        </a>
                      )}
                      {item.demoLink && (
                        <a
                          href={item.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#f59e0b] hover:text-[#fbbf24] transition-colors inline-flex items-center gap-1"
                          aria-label={`Demo for ${item.title}`}
                        >
                          <FiExternalLink size={13} />
                          <span className="hidden lg:inline text-xs">Demo</span>
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
