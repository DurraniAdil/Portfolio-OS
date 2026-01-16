
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL_PROJECTS, PersonalProject } from './data/data';
import { ProjectModal } from './ProjectModal';

export const PersonalProjectsView: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [selectedProject, setSelectedProject] = useState<PersonalProject | null>(null);

  const tags = ['All', 'React', 'TypeScript', 'Gemini', 'Node', 'GitHub API', 'Firebase', 'Prompt engineering'];

  const filteredProjects = useMemo(() => {
    return PERSONAL_PROJECTS.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(filter.toLowerCase()) ||
        p.stack.some(s => s.toLowerCase().includes(filter.toLowerCase()));
      const matchesTag = activeTag === 'All' || p.stack.some(s => s.includes(activeTag) || s.includes(activeTag === 'Gemini' ? 'Gemini API' : activeTag));
      return matchesSearch && matchesTag;
    });
  }, [filter, activeTag]);

  return (
    <div className="h-full flex flex-col bg-zinc-950">
      <div className="h-20 shrink-0 flex items-center justify-between px-10 border-b border-white/5 bg-black/40 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-cyan-500 transition-colors">🔍</span>
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search by title or system stack..."
              className="bg-zinc-900 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white outline-none focus:border-cyan-500/50 w-80 transition-all placeholder:text-zinc-600"
            />
          </div>
          <div className="flex items-center gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all border ${activeTag === tag
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                  : 'bg-transparent border-white/5 text-zinc-500 hover:text-zinc-300 hover:border-white/20'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-10 custom-scrollbar">
        <div className="grid grid-cols-3 gap-8 max-w-[1600px] mx-auto">
          {filteredProjects.map((p, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={p.id}
              onClick={() => setSelectedProject(p)}
              className="group bg-zinc-900/50 border border-white/5 rounded-3xl p-8 hover:bg-zinc-900 hover:border-cyan-500/20 transition-all cursor-pointer flex flex-col relative overflow-hidden"
            >
              {/* Status Badgeee */}
              <div className="flex justify-between items-start mb-6">
                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${p.status === 'Public' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' :
                  p.status === 'Private' ? 'bg-zinc-800 border-zinc-700 text-zinc-500' :
                    'bg-amber-500/5 border-amber-500/20 text-amber-400'
                  }`}>
                  {p.status}
                </span>
                {p.isPrivate && <span className="text-zinc-700 text-xs">🔒</span>}
              </div>

              <h3 className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors tracking-tight mb-2 uppercase">{p.title}</h3>
              <p className="text-[10px] font-black text-cyan-500/60 uppercase tracking-widest mb-4 italic">{p.role}</p>

              <p className="text-sm text-zinc-400 leading-relaxed mb-8 line-clamp-3">
                {p.description}
              </p>

              <div className="mt-auto pt-6 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {p.stack.slice(0, 4).map(s => (
                    <span key={s} className="px-2 py-0.5 bg-black/40 border border-white/5 rounded text-[8px] font-bold text-zinc-500 uppercase">
                      {s}
                    </span>
                  ))}
                  {p.stack.length > 4 && <span className="text-[8px] font-black text-zinc-700">+{p.stack.length - 4} MORE</span>}
                </div>

                <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-cyan-500 opacity-60 group-hover:opacity-100 transition-all">
                  Analyze Details <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="h-96 flex flex-col items-center justify-center text-center">
            <span className="text-4xl mb-4 opacity-20">🚫</span>
            <div className="text-zinc-600 font-black text-xs uppercase tracking-widest">No matching artifacts found in dev_logs</div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};
