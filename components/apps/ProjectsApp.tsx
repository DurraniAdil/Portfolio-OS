
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PersonalProjectsView } from './projects/PersonalProjectsView';
import { WritingProjectsView } from './projects/WritingProjectsView';
import {
  Code2,
  Feather,
  RotateCcw,
  Search,
  Briefcase,
  Zap,
  CheckCircle,
  Globe,
  Github,
  Layout,
  Terminal
} from 'lucide-react';

type ProjectMode = 'chooser' | 'dev' | 'writing';
type DevTab = 'resume' | 'personal';

interface DevProject {
  id: string;
  title: string;
  date: string;
  desc: string;
  features: string[];
  stack: string[];
  links: { live?: string; code?: string; caseStudy?: string };
}

const DEV_PROJECTS: DevProject[] = [
  {
    id: 'dekonstrt',
    title: 'DEKONSTRT',
    date: 'Dec 2024',
    desc: 'AI-Powered Code Analysis & Deconstruction Tool designed to turn complex source code into beginner-level understanding through semantic analysis.',
    features: ['Semantic Code Analysis', 'Beginner-Friendly Explanations', 'Real-time Deconstruction'],
    stack: ['React 19', 'TypeScript', 'Tailwind', 'API'],
    links: { code: 'https://github.com/durraniadil13' }
  },
  {
    id: 'thematic-translator',
    title: 'THEMATIC TRANSLATOR',
    date: 'Dec 2024',
    desc: 'Specialized AI Digitization & Linguistic Analysis Suite for digitizing and translating Urdu poetry archives into structured logical objects.',
    features: ['Urdu Poetry Archiving', 'Linguistic Analysis', 'Structured Object Generation'],
    stack: ['React', 'TypeScript', 'Tailwind', 'AI Integration'],
    links: { code: 'https://github.com/durraniadil13' }
  },
  {
    id: 'ibn-e-adil',
    title: 'IBN-E-ADIL',
    date: 'Dec 2024',
    desc: 'Personal Literary-Tech Identity Site serving as an interactive convergence of professional engineering and literary artistry.',
    features: ['Interactive Convergence', 'Themed Pages', 'Motion Animations'],
    stack: ['React', 'TypeScript', 'Framer Motion'],
    links: { live: 'https://durraniadil.com', code: 'https://github.com/durraniadil13' }
  },
  {
    id: 'notepad',
    title: 'NotePad',
    date: 'Nov 2024',
    desc: 'Feature-rich notepad with resizable workspace and real-time word count tracker.',
    features: ['Resizable Workspace', 'Real-time Word Count', 'Dark Mode Toggle', 'Save-as-Text'],
    stack: ['JavaScript', 'HTML5', 'CSS3'],
    links: { code: 'https://github.com/durraniadil13' }
  },
  {
    id: 'random-quote',
    title: 'Random Quote Machine',
    date: 'Nov 2024',
    desc: 'Dynamic quote generator with instant copy-to-clipboard functionality and API integration.',
    features: ['Fetch API Integration', 'Social Sharing', 'Dynamic Styling'],
    stack: ['JavaScript', 'Fetch API', 'Tailwind CSS'],
    links: { live: 'https://durraniadil13.github.io/random-quote-machine/', code: 'https://github.com/durraniadil13' }
  },
  {
    id: 'pokedex',
    title: 'Pokédex App',
    date: 'Nov 2024',
    desc: 'Interactive Pokémon encyclopedia powered by PokéAPI with search and filter functionality.',
    features: ['Detailed Stats & Evo Chains', 'Search & Filter', 'Responsive UI'],
    stack: ['JavaScript', 'REST API', 'CSS3'],
    links: { code: 'https://github.com/durraniadil13' }
  },
  {
    id: 'authapp',
    title: 'Authapp',
    date: 'Apr 2024',
    desc: 'Full-stack authentication system with Google Sign-in and Push Notifications.',
    features: ['Firebase Auth', 'Google Sign-in', 'Push Notifications (FCM)'],
    stack: ['Next.js', 'React Native', 'Firebase', 'Expo'],
    links: { code: 'https://github.com/durraniadil13' }
  },
  {
    id: 'employwise',
    title: 'EmployWise',
    date: 'Mar 2024',
    desc: 'Responsive employee management system frontend with protected routes.',
    features: ['User Auth Flow', 'Protected Routes', 'CRUD Operations'],
    stack: ['React', 'React Router', 'Bootstrap'],
    links: { code: 'https://github.com/durraniadil13' }
  }
];

interface ProjectsAppProps {
  updateTitle: (title: string) => void;
}

export const ProjectsApp: React.FC<ProjectsAppProps> = ({ updateTitle }) => {
  const [mode, setMode] = useState<ProjectMode>('chooser');
  const [devTab, setDevTab] = useState<DevTab>('resume');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('projects_app_mode') as ProjectMode;
    if (saved && saved !== 'chooser') {
      changeMode(saved);
    }
    const savedDevTab = localStorage.getItem('projects_app_dev_tab') as DevTab;
    if (savedDevTab) {
      setDevTab(savedDevTab);
    }
  }, []);

  const changeMode = (newMode: ProjectMode) => {
    setMode(newMode);
    localStorage.setItem('projects_app_mode', newMode);
    switch (newMode) {
      case 'dev': updateTitle('Projects.app — Developer'); break;
      case 'writing': updateTitle('Projects.app — Writing'); break;
      default: updateTitle('Projects.app'); break;
    }
  };

  const changeDevTab = (tab: DevTab) => {
    setDevTab(tab);
    localStorage.setItem('projects_app_dev_tab', tab);
  };

  const filteredDev = useMemo(() => {
    return DEV_PROJECTS.filter(p =>
      p.title.toLowerCase().includes(filter.toLowerCase()) ||
      p.stack.some(s => s.toLowerCase().includes(filter.toLowerCase()))
    );
  }, [filter]);

  const renderChooser = () => (
    <div className="h-full flex items-center justify-center p-12 bg-slate-950">
      <div className="grid grid-cols-2 gap-8 w-full max-w-5xl">
        <motion.button
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => changeMode('dev')}
          className="group relative h-[450px] bg-slate-900/50 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all shadow-2xl"
        >
          <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors" />
          <Code2 size={80} className="text-cyan-400 mb-8 filter drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-transform group-hover:scale-110" />
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Developer Projects</h2>
          <p className="text-cyan-100/60 text-sm font-medium leading-relaxed max-w-xs">
            Software architectures, web applications, and full-stack implementations.
          </p>
          <div className="mt-8 px-6 py-2 bg-cyan-600/20 text-cyan-300 border border-cyan-500/50 rounded-full text-[10px] font-black uppercase tracking-widest group-hover:bg-cyan-500 group-hover:text-white transition-all">
            Enter Lab
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => changeMode('writing')}
          className="group relative h-[450px] bg-stone-900/50 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center overflow-hidden border border-amber-500/20 hover:border-amber-500/50 transition-all shadow-2xl"
        >
          <div className="absolute inset-0 bg-amber-500/5 group-hover:bg-amber-500/10 transition-colors" />
          <Feather size={80} className="text-amber-400 mb-8 filter drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] transition-transform group-hover:scale-110" />
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Writing Publications</h2>
          <p className="text-amber-100/60 text-sm font-medium leading-relaxed max-w-xs">
            Published anthologies, metaphysical poetry, and literary manuscripts.
          </p>
          <div className="mt-8 px-6 py-2 bg-amber-600/20 text-amber-300 border border-amber-500/50 rounded-full text-[10px] font-black uppercase tracking-widest group-hover:bg-amber-500 group-hover:text-white transition-all">
            Open Library
          </div>
        </motion.button>
      </div>
    </div>
  );

  const renderDevView = () => (
    <div className="h-full flex flex-col bg-[#05070a]">
      {/* Sub Navigation */}
      <div className="h-16 shrink-0 flex items-center justify-between px-8 border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="flex gap-4">
          <button
            onClick={() => changeDevTab('resume')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${devTab === 'resume' ? 'bg-cyan-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Layout size={14} /> Resume Projects
          </button>
          <button
            onClick={() => changeDevTab('personal')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${devTab === 'personal' ? 'bg-cyan-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Terminal size={14} /> Personal Projects
          </button>
        </div>

        <div className="flex items-center gap-4">
          {devTab === 'resume' && (
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Search stack or title..."
                  className="pl-9 bg-white/5 border border-white/10 rounded-lg pr-4 py-1.5 text-xs text-white outline-none focus:border-cyan-500/50 w-48 transition-all"
                />
              </div>
            </div>
          )}
          <button onClick={() => changeMode('chooser')} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/40" title="Switch Mode">
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {devTab === 'personal' ? (
            <motion.div
              key="personal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <PersonalProjectsView />
            </motion.div>
          ) : (
            <motion.div
              key="resume"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full overflow-auto p-8 custom-scrollbar"
            >
              {/* Impact Strip */}
              <div className="mb-10 grid grid-cols-3 gap-6">
                {[
                  { label: 'Satisfaction Rate', value: '95%+', icon: CheckCircle, color: 'text-emerald-400' },
                  { label: 'Client Projects', value: '4+', icon: Briefcase, color: 'text-blue-400' },
                  { label: 'Pipeline Velocity', value: '+20%', icon: Zap, color: 'text-cyan-400' }
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/5 flex items-center gap-6 hover:border-white/10 transition-colors">
                      <div className="p-4 rounded-2xl bg-white/5">
                        <Icon size={32} className={`grayscale-0 ${stat.color.replace('text', 'stroke')}`} />
                      </div>
                      <div>
                        <div className={`text-3xl font-black ${stat.color} leading-none mb-1`}>{stat.value}</div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Project Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDev.map(p => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group bg-slate-900/50 border border-white/5 rounded-3xl p-8 hover:border-cyan-500/30 transition-all flex flex-col relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Code2 size={100} />
                    </div>

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{p.title}</h3>
                        <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md">{p.date}</span>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium">{p.desc}</p>

                      <div className="space-y-3 mb-8 flex-1">
                        {p.features.map((f, i) => (
                          <div key={i} className="flex gap-3 text-[11px] text-slate-500 font-bold uppercase tracking-wide">
                            <span className="text-cyan-500">◈</span> {f}
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {p.stack.map(s => (
                          <span key={s} className="px-2 py-1 bg-black/40 border border-white/10 rounded-md text-[9px] font-black text-slate-400 uppercase tracking-wider group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-colors">
                            {s}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-auto">
                        {p.links.live && (
                          <a href={p.links.live} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-cyan-900/20 transition-all hover:-translate-y-0.5">
                            <Globe size={14} /> Launch
                          </a>
                        )}
                        {p.links.code && (
                          <a href={p.links.code} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all hover:-translate-y-0.5 ${!p.links.live ? 'col-span-2' : ''}`}>
                            <Github size={14} /> Source
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  const renderWritingView = () => (
    <div className="h-full flex flex-col bg-[#fdfcf8] text-stone-900 overflow-hidden">
      <div className="h-16 shrink-0 flex items-center justify-between px-8 border-b border-stone-200 bg-white/60 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <h2 className="newspaper text-xl font-bold italic text-stone-900">Archive Navigator</h2>
        </div>
        <button onClick={() => changeMode('chooser')} className="p-2 hover:bg-stone-200 rounded-lg transition-colors text-stone-400" title="Switch Mode">
          🔄
        </button>
      </div>
      <div className="flex-1 overflow-hidden">
        <WritingProjectsView />
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-hidden select-none">
      <AnimatePresence mode="wait">
        {mode === 'chooser' && renderChooser()}
        {mode === 'dev' && renderDevView()}
        {mode === 'writing' && renderWritingView()}
      </AnimatePresence>
    </div>
  );
};
