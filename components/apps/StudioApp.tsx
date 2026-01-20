import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ViewId = 'workbench' | 'skills' | 'missions' | 'achievements';

interface Project {
  id: string;
  title: string;
  date: string;
  desc: string;
  bullets: string[];
  tech: string[];
  links: { live?: string; code?: string };
}

const PROJECTS: Project[] = [
  {
    id: 'muse',
    title: 'Muse',
    date: '2025',
    desc: 'Digital Atelier for Modern Poets',
    bullets: [
      'Aesthetic web app for poetry and quote card creation',
      'Rich text editor with curated historical & artistic themes',
      'High-res image export (3x/4x) and local archive storage'
    ],
    tech: ['React 19', 'Vite', 'Tailwind CSS', 'html-to-image'],
    links: { live: 'https://durraniadil.github.io/Muse/', code: 'https://github.com/DurraniAdil/Muse' }
  },
  {
    id: 'be-endless',
    title: 'BE Endless 3D Studio',
    date: '2026',
    desc: 'Premium 3D Printing E-Commerce Platform',
    bullets: [
      'Full e-commerce experience with catalog, cart, checkout & wishlist',
      'Advanced customization for .stl/.obj file uploads & design submissions',
      'Scroll-triggered animations with fade-in, slide-up & zoom effects'
    ],
    tech: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Slick'],
    links: { live: 'https://www.endless3dprinting.com/', code: 'https://github.com/shahidsk0403/be-endless-3d-studio' }
  },
  {
    id: 'dekonstrt',
    title: 'DEKONSTRT',
    date: '2025',
    desc: 'AI Code Analysis Tool',
    bullets: [
      'AI-Powered Code Analysis & Deconstruction Tool',
      'Turns complex source code into beginner-level understanding through semantic analysis',
      'Built with modern React 19 architecture'
    ],
    tech: ['React 19', 'TypeScript', 'Tailwind CSS', 'API Integration'],
    links: { code: 'https://github.com/durraniadil13' }
  },
  {
    id: 'thematic',
    title: 'Thematic Translator',
    date: '2025',
    desc: 'Linguistic AI Suite',
    bullets: [
      'Specialized AI Digitization & Linguistic Analysis Suite',
      'Digitizes and translates Urdu poetry archives into structured logical objects',
      'Integrates Gemini API for intelligent translations'
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Gemini API'],
    links: { code: 'https://github.com/durraniadil13' }
  },
  {
    id: 'ibneadil',
    title: 'IBN-E-ADIL',
    date: '2025',
    desc: 'Personal Portfolio Website',
    bullets: [
      'Literary-Tech Identity Site with interactive convergence',
      'Professional engineering meets literary artistry',
      'Custom themed pages with smooth animations'
    ],
    tech: ['React', 'TypeScript', 'Framer Motion', 'Themed Pages'],
    links: { code: 'https://github.com/durraniadil13' }
  },
  {
    id: 'notepad',
    title: 'NotePad',
    date: 'Nov 2024',
    desc: 'Personal Note-Taking Application',
    bullets: [
      'Feature-rich notepad with resizable workspace',
      'Real-time word count tracker and dark mode',
      'Copy, delete, and save-as-text functionality'
    ],
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    links: { code: 'https://github.com/DurraniAdil/NotePad' }
  },
  {
    id: 'quotemachine',
    title: 'Random Quote Machine',
    date: 'Nov 2024',
    desc: 'Motivational Quote Generator',
    bullets: [
      'Dynamic quote generator with copy-to-clipboard',
      'Real-time quote retrieval via Fetch API',
      'Modern responsive UI with Tailwind CSS'
    ],
    tech: ['JavaScript', 'Fetch API', 'Tailwind CSS'],
    links: { code: 'https://github.com/DurraniAdil/Random-Quote-Machine' }
  },
  {
    id: 'employwise',
    title: 'EmployWise',
    date: 'Mar 2024',
    desc: 'Employee Management Frontend',
    bullets: [
      'Responsive frontend with login/logout flow',
      'Protected routes and user authentication',
      'Clean professional interface'
    ],
    tech: ['React', 'React Router', 'Bootstrap'],
    links: { code: 'https://github.com/DurraniAdil/Employ-Wise' }
  },
];

const CompileAnimation = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const steps = [
    "vite v5.4.1 building for production...",
    "transforming...",
    "✓ 42 modules transformed.",
    "rendering chunks...",
    "computing hashes...",
    "✓ build complete in 842ms"
  ];

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < steps.length) {
        setLogs(prev => [...prev, steps[current]]);
        current++;
      } else {
        clearInterval(interval);
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-center items-center font-mono space-y-4 px-4">
      <div className="w-full max-w-md space-y-1">
        {logs.map((log, i) => (
          <motion.div
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            key={i}
            className="text-[10px] flex gap-2"
          >
            <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span>
            <span className={log && log.startsWith('✓') ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]' : 'text-cyan-400'}>{log}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1 }}
        className="w-full max-w-md h-1 bg-cyan-500/20 rounded-full overflow-hidden"
      >
        <motion.div
          className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>
    </div>
  );
};

export const StudioApp: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewId>('workbench');
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [systemMessage, setSystemMessage] = useState<string | null>(null);

  const showSystemMessage = (msg: string) => {
    setSystemMessage(msg);
    setTimeout(() => setSystemMessage(null), 4000);
  };

  const handleProjectSelect = (p: Project) => {
    if (p.id === selectedProject.id) return;
    setIsCompiling(true);
    setSelectedProject(p);
    setTimeout(() => setIsCompiling(false), 1200);
  };

  const viewVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
    transition: { duration: 0.2 }
  };

  const renderWorkbench = () => (
    <motion.div key="workbench" {...viewVariants} className="flex flex-row h-full gap-6">
      {/* explorer */}
      <div className="w-1/3 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Project Artifacts</h3>
        {PROJECTS.map((p) => (
          <button
            key={p.id}
            onClick={() => handleProjectSelect(p)}
            className={`p-4 rounded-xl text-left transition-all border transform active:scale-95 ${selectedProject.id === p.id
              ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
              : 'bg-white/5 border-white/5 hover:bg-white/10 hover:scale-[1.02] hover:border-cyan-500/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]'
              }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className={`text-xs font-bold transition-colors ${selectedProject.id === p.id ? 'text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]' : 'text-slate-300'}`}>{p.title}</span>
              <span className="text-[9px] text-slate-500">{p.date}</span>
            </div>
            <p className="text-[10px] text-slate-500 truncate">{p.desc}</p>
          </button>
        ))}
      </div>

      {/* preview monitor */}
      <div className="flex-1 glass border-white/10 p-6 flex flex-col relative overflow-hidden rounded-2xl">
        <div className="absolute top-0 right-0 p-3 z-20">
          <div className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500/50"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/50"></div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isCompiling ? (
            <motion.div
              key="compiling"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex"
            >
              <CompileAnimation />
            </motion.div>
          ) : (
            <motion.div
              key="project-details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col"
            >
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-cyan-500 text-lg font-mono drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">{'>'}</span>
                  <h2 className="text-xl font-black tracking-tight text-white uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">{selectedProject.title}</h2>
                </div>
                <p className="text-slate-400 text-xs font-medium">{selectedProject.desc}</p>
              </div>

              <div className="flex-1 space-y-4">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 font-mono backdrop-blur-md">
                  <h4 className="text-[9px] text-cyan-500/70 uppercase mb-3 tracking-widest">Build Log</h4>
                  <ul className="space-y-2">
                    {selectedProject.bullets.map((b, i) => (
                      <li key={i} className="text-[10px] text-slate-300 flex items-start gap-2">
                        <span className="text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]">◈</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[9px] text-slate-500 uppercase mb-2 tracking-widest">Stack Manifest</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tech.map(t => (
                      <span key={t} className="px-2 py-0.5 bg-cyan-500/5 border border-cyan-500/20 rounded text-[9px] font-bold text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-row gap-3">
                <a href={selectedProject.links.code} target="_blank" rel="noopener noreferrer" className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-bold text-center transition-all flex items-center justify-center gap-2">
                  <span></span> Source Code
                </a>
                {selectedProject.links.live && (
                  <a href={selectedProject.links.live} target="_blank" rel="noopener noreferrer" className="flex-1 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-[10px] font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all active:scale-95 flex items-center justify-center">
                    Launch Deployment
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  const renderSkills = () => (
    <motion.div key="skills" {...viewVariants} className="grid grid-cols-2 gap-6 h-full overflow-y-auto pr-2 custom-scrollbar">
      {[
        { title: 'Languages & Frameworks', items: ['JavaScript (ES6+)', 'TypeScript', 'React.js', 'Next.js', 'Node.js', 'HTML5', 'CSS3'] },
        { title: 'Styling & Motion', items: ['Tailwind CSS', 'Sass', 'Framer Motion', 'Bootstrap', 'Responsive Design', 'UI/UX Principles'] },
        { title: 'State & API Architecture', items: ['Context API', 'Redux Toolkit', 'REST APIs', 'Fetch API', 'Firebase'] },
        { title: 'Tools & Ecosystem', items: ['Git', 'GitHub', 'Vite', 'Vercel', 'Netlify', 'Postman', 'Figma'] }
      ].map((cat, i) => (
        <div key={i} className="glass border-white/5 p-6 rounded-2xl group hover:border-cyan-500/30 transition-all">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 mb-4 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">{cat.title}</h4>
          <div className="flex flex-wrap gap-2">
            {cat.items.map(item => (
              <span key={item} className="px-3 py-1.5 bg-black/30 rounded-lg text-xs font-medium text-slate-300 border border-white/5 group-hover:border-cyan-500/10 transition-colors">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );

  const renderMissions = () => (
    <motion.div key="missions" {...viewVariants} className="space-y-8">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-black p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#06b6d4 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        <div className="relative z-10">
          <div className="flex flex-row justify-between items-start gap-3 mb-6">
            <div>
              <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-1 block drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]">Active Engagement</span>
              <h3 className="text-2xl font-black text-white">Project Manager & Consultant</h3>
              <p className="text-slate-400 font-bold text-sm">Be Endless, Aurangabad</p>
            </div>
            <span className="px-4 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold rounded-full whitespace-nowrap">Nov 2025 — Present</span>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Client Projects', value: '4+', color: 'text-blue-400' },
              { label: 'Satisfaction Rate', value: '95%+', color: 'text-emerald-400' },
              { label: 'Pipeline Velocity', value: '+20%', color: 'text-cyan-400' }
            ].map(stat => (
              <div key={stat.label} className="bg-black/40 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
                <div className={`text-2xl font-black ${stat.color} drop-shadow-[0_0_5px_rgba(255,255,255,0.1)]`}>{stat.value}</div>
                <div className="text-[9px] uppercase font-bold text-slate-500 tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>

          <ul className="space-y-4">
            {[
              'Sole client-facing lead for 4+ web development projects',
              'Translating business requirements into high-fidelity technical deliverables',
              'Designed and implemented standardized development pipeline workflows'
            ].map((item, i) => (
              <li key={i} className="flex gap-4 items-start text-sm text-slate-300">
                <span className="text-emerald-500 font-bold drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="p-6 glass border-white/5 rounded-2xl">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Education</h4>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-black text-white">B.Tech in Computer Science</p>
              <p className="text-[10px] text-slate-500">Dr. BATU, Lonere • CGPA: 8.34</p>
            </div>
            <div>
              <p className="text-xs font-black text-white">Higher Secondary Certificate</p>
              <p className="text-[10px] text-slate-500">Sir Sayyed College • 92.6%</p>
            </div>
          </div>
        </div>
        <div className="p-6 glass border-white/5 rounded-2xl">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Certifications</h4>
          <div className="flex flex-wrap gap-2">
            {['Frontend Dev', 'React.js', 'JS Algorithms', 'Clean Code Architecture'].map(cert => (
              <span key={cert} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-bold text-slate-400">{cert}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-row h-full bg-[#0a0c10] text-slate-300 font-sans overflow-hidden relative">
      {/* grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{ backgroundImage: `linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
      />

      {/* sidebar nav - bottom on mobile, side on desktop */}
      <aside className="w-20 border-r border-white/5 flex flex-col items-center justify-start py-8 gap-8 shrink-0 bg-black/40 backdrop-blur-xl relative z-10">
        <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-white font-black shadow-[0_0_20px_rgba(6,182,212,0.5)] text-base">D</div>
        <nav className="flex flex-col gap-4">
          {[
            { id: 'workbench', icon: '💻', label: 'Console' },
            { id: 'skills', icon: '🧬', label: 'Modules' },
            { id: 'missions', icon: '🚀', label: 'History' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setActiveView(btn.id as ViewId)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all group relative ${activeView === btn.id ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                }`}
            >
              <span className="text-xl drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]">{btn.icon}</span>
              <div className={`absolute left-0 w-1 h-4 bg-cyan-500 rounded-r-full transition-all shadow-[0_0_10px_rgba(6,182,212,0.8)] ${activeView === btn.id ? 'opacity-100' : 'opacity-0'}`} />
              <span className="absolute left-14 px-2 py-1 bg-slate-800 text-[9px] font-black uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl border border-white/5">
                {btn.label}
              </span>
            </button>
          ))}
        </nav>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => showSystemMessage("If you want anything changed contact the author of this app.")}
            className="text-lg text-slate-500 hover:text-cyan-400 transition-colors"
          >
            ⚙️
          </button>
          <button
            onClick={() => showSystemMessage("Why would you rung it?")}
            className="text-lg text-slate-500 hover:text-cyan-400 transition-colors"
          >
            🔔
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 relative z-10">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 shrink-0 bg-black/20 backdrop-blur-md">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-slate-700 font-mono text-xl">~/</span>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 truncate">
              Technomancer_Studio_OS /
              <span className="text-cyan-400">{activeView}</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 min-w-0">
            <AnimatePresence>
              {systemMessage && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[9px] font-black uppercase tracking-widest rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                >
                  {systemMessage}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></div>
              <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Online</span>
            </div>
            <button
              onClick={() => showSystemMessage("Access Denied: Insufficient Privileges")}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all hover:border-cyan-500/30 active:scale-95"
            >
              Terminal
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-10 custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeView === 'workbench' && renderWorkbench()}
            {activeView === 'skills' && renderSkills()}
            {activeView === 'missions' && renderMissions()}
          </AnimatePresence>
        </div>

        <footer className="h-10 border-t border-white/5 px-10 flex items-center justify-between shrink-0 bg-black/40 backdrop-blur-sm">
          <div className="flex gap-6 text-[9px] font-bold text-slate-600 uppercase tracking-widest">
            <span>Latency: 12ms</span>
            <span>Uptime: 99.9%</span>
            <span className="text-cyan-500/50">Node: v20.10.0</span>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/DurraniAdil" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-cyan-400 transition-colors font-black text-[10px] tracking-widest">GITHUB</a>
          </div>
        </footer>
      </main>
    </div>
  );
};
