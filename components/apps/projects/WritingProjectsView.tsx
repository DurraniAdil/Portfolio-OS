
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WRITING_PROJECTS, WritingProject } from './data/writingData';
import { WritingProjectModal } from './WritingProjectModal';

export const WritingProjectsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'published' | 'manuscript'>('published');
  const [selectedProject, setSelectedProject] = useState<WritingProject | null>(null);

  const filtered = useMemo(() =>
    WRITING_PROJECTS.filter(p => p.type === activeTab),
    [activeTab]);

  return (
    <div className="h-full flex flex-col bg-[#fdfcf8] text-stone-900 relative">
      {/* overlay*/}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper.png')]" />

      <div className="h-20 shrink-0 flex items-center justify-between px-10 border-b border-stone-200 bg-white/40 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-8">
          <h2 className="newspaper text-2xl font-bold italic text-stone-900">The Scribe's Archive</h2>
          <div className="flex items-center gap-1 bg-stone-200/50 p-1 rounded-sm">
            {[
              { id: 'published', label: 'Published Archives' },
              { id: 'manuscript', label: 'Active Manuscripts' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                  ? 'bg-stone-900 text-stone-100 shadow-lg'
                  : 'text-stone-400 hover:text-stone-600'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-12 custom-scrollbar relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-12">
            {filtered.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedProject(p)}
                className="group cursor-pointer flex flex-col"
              >
                <div className="aspect-[3/4] mb-6 relative overflow-hidden bg-stone-900 shadow-2xl transition-all group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] border-r-4 border-stone-800">
                  {/* spine texture */}
                  <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/40 to-transparent" />

                  <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-500 opacity-60">
                        {p.genre}
                      </span>
                    </div>
                    <div>
                      <h3 className="newspaper text-3xl font-bold italic leading-tight mb-2">
                        {p.title}
                      </h3>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-[9px] font-black uppercase tracking-widest text-white/40">{p.year}</span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-amber-500">{p.status}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">{p.role}</span>
                    {p.publisher && (
                      <>
                        <span className="text-stone-300">•</span>
                        <span className="text-[10px] font-bold text-stone-400">{p.publisher}</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-stone-500 leading-relaxed italic line-clamp-2">
                    "{p.description}"
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-stone-900 opacity-0 group-hover:opacity-100 transition-opacity">
                    Open Archive <span className="text-amber-700">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="h-64 flex flex-col items-center justify-center text-center opacity-30">
              <span className="text-4xl mb-4">📇</span>
              <div className="newspaper text-xl italic font-bold">The shelves are currently empty.</div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <WritingProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};
