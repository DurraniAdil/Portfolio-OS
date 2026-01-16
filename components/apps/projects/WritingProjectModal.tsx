
import React from 'react';
import { motion } from 'framer-motion';
import { WritingProject } from './data/writingData';

interface WritingProjectModalProps {
  project: WritingProject;
  onClose: () => void;
}

export const WritingProjectModal: React.FC<WritingProjectModalProps> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/90 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        className="relative w-full max-w-5xl bg-[#fdfcf8] rounded-sm overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)] flex flex-col max-h-[90vh] text-stone-900 border-x-8 border-stone-800"
      >
        {/* Decorative Paper Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper.png')]" />

        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 text-stone-400 hover:text-stone-900 transition-all z-10 border border-stone-200"
        >
          ✕
        </button>

        <div className="overflow-y-auto p-20 custom-scrollbar relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="px-3 py-1 bg-amber-100 border border-amber-200 text-amber-900 text-[9px] font-black uppercase tracking-[0.2em] rounded-sm">
                {project.type === 'published' ? 'Archived Publication' : 'Active Manuscript'}
              </span>
              <span className="text-stone-300">|</span>
              <span className="text-stone-500 text-[10px] font-bold uppercase tracking-widest">{project.genre}</span>
              <span className="text-stone-300">|</span>
              <span className="text-amber-700 text-[10px] font-black uppercase tracking-widest italic">{project.status}</span>
            </div>

            <h2 className="newspaper text-7xl font-bold text-stone-900 leading-[1.1] mb-10 italic">
              {project.title}
            </h2>

            <div className="w-24 h-1.5 bg-stone-900 mb-12" />

            <div className="grid grid-cols-12 gap-16">
              <div className="col-span-8">
                <section className="prose prose-stone">
                  <p className="text-2xl text-stone-700 leading-relaxed font-serif italic mb-12 border-l-4 border-amber-200 pl-8">
                    "{project.description}"
                  </p>

                  <h4 className="text-stone-900 font-black text-xs uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                    <span className="w-2 h-2 bg-amber-600 rotate-45" />
                    Archive Highlights
                  </h4>
                  <ul className="space-y-6 list-none p-0">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="text-stone-600 text-base leading-relaxed font-medium pl-0">
                        <span className="text-amber-800 font-bold block text-[10px] uppercase tracking-widest mb-1 opacity-40">Entry {i + 1}</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="col-span-4 space-y-12">
                <div className="p-8 bg-stone-50 border border-stone-100 rounded-sm">
                  <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-6 border-b border-stone-200 pb-2">Artifact Metadata</h4>
                  <div className="space-y-4">
                    {project.publisher && (
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-stone-400 uppercase tracking-tighter">Publisher</span>
                        <span className="text-sm font-bold text-stone-800">{project.publisher}</span>
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-stone-400 uppercase tracking-tighter">Chronology</span>
                      <span className="text-sm font-bold text-stone-800">{project.year}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-stone-400 uppercase tracking-tighter">Authority</span>
                      <span className="text-sm font-bold text-stone-800 italic">{project.role}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-stone-400 uppercase tracking-tighter">Impact</span>
                      <span className="text-xs font-black text-amber-700 uppercase">{project.metrics}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4">Thematic Core</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.themes.map(t => (
                      <span key={t} className="px-3 py-1 bg-stone-200/50 text-[10px] font-bold text-stone-600 rounded-sm uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    disabled
                    className="w-full py-4 bg-stone-900 text-stone-100 rounded-sm font-black text-[10px] uppercase tracking-[0.2em] transition-all opacity-50 cursor-not-allowed"
                  >
                    Access Restricted Archive
                  </button>
                  <p className="text-[9px] text-stone-400 text-center mt-4 italic">Full manuscripts require literary clearance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
