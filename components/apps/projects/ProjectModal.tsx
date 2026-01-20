
import React from 'react';
import { motion } from 'framer-motion';
import { PersonalProject } from './data/data';

interface ProjectModalProps {
  project: PersonalProject;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl bg-zinc-950 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all z-10"
        >
          ✕
        </button>

        <div className="overflow-y-auto p-16 custom-scrollbar">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${project.status === 'Public' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
              project.status === 'Private' ? 'bg-zinc-800 border-zinc-700 text-zinc-400' :
                'bg-amber-500/10 border-amber-500/30 text-amber-400'
              }`}>
              {project.status}
            </span>
            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">/</span>
            <span className="text-cyan-400 text-[10px] font-black uppercase tracking-widest italic">{project.role}</span>
          </div>

          <h2 className="text-6xl font-black text-white tracking-tighter mb-8">{project.title}</h2>

          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-7">
              <div className="prose prose-invert mb-10">
                <p className="text-xl text-zinc-400 leading-relaxed font-medium mb-8">
                  {project.description}
                </p>
                <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-4 text-cyan-500">Key Contributions & Architecture</h4>
                <ul className="space-y-4">
                  {project.bullets.map((b, i) => (
                    <li key={i} className="flex gap-4 text-zinc-300 text-sm leading-relaxed">
                      <span className="text-cyan-500 mt-1 font-bold">◈</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-span-5 space-y-10">
              <div>
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">System Manifest</h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map(s => (
                    <span key={s} className="px-3 py-1.5 bg-zinc-900 border border-white/5 rounded-lg text-[10px] font-bold text-zinc-300 uppercase">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {project.isPrivate ? (
                  <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-2xl flex items-center gap-4">
                    {/* <span className="text-2xl">🔒</span> long way to do this but i can basically do anything tbh using this*/}
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-zinc-700"
                    >
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <div>
                      <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Restricted Access</div>
                      <div className="text-[11px] font-medium text-zinc-500">Source code protected via NDAs / Enterprise security protocols.</div>
                    </div>
                  </div>
                ) : (
                  <>
                    {project.links?.live && (
                      <a href={project.links.live} target="_blank" className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-center transition-all shadow-lg shadow-cyan-900/20">Launch Instance</a>
                    )}
                    {project.links?.github && (
                      <a href={project.links.github} target="_blank" className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-center border border-white/10 transition-all">View Repository</a>
                    )}
                    {project.links?.caseStudy && (
                      <a href={project.links.caseStudy} target="_blank" className="w-full py-4 bg-transparent hover:bg-white/5 text-zinc-400 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-center transition-all underline decoration-zinc-700 underline-offset-8">Read Case Study</a>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
