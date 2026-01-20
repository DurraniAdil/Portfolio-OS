
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TabId = 'overview' | 'experience' | 'publications' | 'awards' | 'skills';

interface Publication {
  id: string;
  title: string;
  medium: string;
  year: string;
  excerpt: string;
  fullContent?: string;
}

const PUBLICATIONS: Publication[] = [
  {
    id: 'nazm',
    title: "Nazm-e-Adil Volume One & Two",
    medium: "Poetic Cycle",
    year: "2025",
    excerpt: "Sufi-inspired poetic cycle of 50 paradoxical and philosophical poems exploring love, loss, and annihilation of the self.",
    fullContent: "The soul is not a vessel to be filled, but a flame to be fanned. In the quiet intersections of 'Nazm-e-Adil', we find the architecture of silence. These poems were born in the transition between the physical world of engineering and the metaphysical realm of Sufi mysticism. \n\n'Volume One' focuses on the struggle of the self (Nafs), while 'Volume Two' moves towards the dissolution of boundaries (Fanaa). Each poem is a paradox, a binary instruction translated into a heartbeat."
  },
  {
    id: 'voices',
    title: "Voices Unbound: Volume Two",
    medium: "The Favourite Tales",
    year: "2025",
    excerpt: "Featured author in a distinct international anthology celebrating diverse voices in contemporary literature.",
    fullContent: "Being featured in 'Voices Unbound' was a pivotal moment in my career as a published author. This anthology brought together writers from across India, each contributing a unique perspective on the human condition. My contribution focused on the intersection of theology, modern existential dread and love, exploring how blasphemy and love can coexist in the same heart."
  },
  {
    id: 'fragments',
    title: "The Greek & Latin Fragments",
    medium: "Metaphysical Collection",
    year: "2023",
    excerpt: "Collection of 35 poems integrating myth with metaphysical reflection (13 inspired by Greek literary terms, 22 by Latin quotes).",
    fullContent: "This collection acts as a bridge between the classical and the contemporary. 13 poems are inspired directly by Greek literary terms (like Kairos and Aporia), while 22 are rooted in Latin maxims. The goal was to see if these ancient shells could still hold the weight of modern anxieties."
  },
  {
    id: 'stardust',
    title: "Stardust and Sentences: Vol 5",
    medium: "Thoughts and Hymn",
    year: "2025",
    excerpt: "Co-author in Volume 5 of the acclaimed series, exploring the intersection of the celestial and the mundane.",
    fullContent: "A collaboration that pushed the boundaries of sentence structure. In this volume, we experimented with the concept of 'Literary Entropy'—how meaning degrades or transforms as it passes through different cultural and linguistic filters."
  },
  {
    id: 'novel',
    title: "Philosophical Novel (Draft)",
    medium: "Work in Progress",
    year: "2024",
    excerpt: "Developing 80-page philosophical novel exploring the existence of God and existential themes.",
    fullContent: "A work in progress that attempts to reconcile the logical rigor of engineering with the fluid, often chaotic nature of faith. The novel follows a protagonist who attempts to build a 'logical proof' for God, only to find that the proof itself unravels his reality."
  }
];

import { AppId } from '../../types';

interface BardAppProps {
  onOpenApp?: (id: AppId) => void;
}

export const BardApp: React.FC<BardAppProps> = ({ onOpenApp }) => {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [readingSample, setReadingSample] = useState<Publication | null>(null);

  const handleOpenResume = () => {
    if (onOpenApp) {
      onOpenApp('resume');
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('openResumeSection', { detail: 'writer' }));
      }, 100);
    }
  };

  const containerVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3, ease: "easeOut" }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div key="overview" {...containerVariants} className="space-y-16">
            <header className="max-w-3xl">
              <h2 className="newspaper text-5xl font-bold mb-6 text-slate-900 italic tracking-tight">Writing a World in Logic</h2>
              <p className="text-xl text-slate-600 leading-relaxed font-light">
                Published poet and SEO content strategist with 2+ years of experience driving measurable traffic growth and engagement.
                I bridge the gap between technical complexity and human resonance, delivering high-performance content with proven results.
              </p>
            </header>

            <div className="grid grid-cols-3 gap-8">
              {[
                { label: 'Original Works', value: '400+' },
                { label: 'Gold Medals', value: '28' },
                { label: 'Anthologies', value: '03' }
              ].map(stat => (
                <motion.div
                  whileHover={{ y: -5 }}
                  key={stat.label}
                  className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] text-center relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-4xl font-black text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <section>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-6 px-1">Spotlight Work</h3>
              <motion.div
                layoutId="spotlight"
                onClick={() => setReadingSample(PUBLICATIONS[0])}
                className="group relative bg-slate-950 p-12 rounded-[2.5rem] shadow-2xl cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 text-[15rem] font-serif leading-none select-none italic">“</div>
                <div className="relative z-10">
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-4 block">Diwaan-e-Adil</span>
                  <h4 className="newspaper text-3xl font-bold mb-6 text-white italic">Nazm-e-Adil</h4>
                  <p className="text-slate-400 text-lg italic leading-relaxed max-w-2xl mb-8">
                    "Merging poems with philosophical reflection to explore the metaphysics of pain, illness, faith, and silence. 51 nazm's and counting"
                  </p>
                  <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider group-hover:gap-4 transition-all">
                    Open Sample Reader <span className="text-blue-400">→</span>
                  </div>
                </div>
              </motion.div>
            </section>
          </motion.div>
        );
      case 'experience':
        return (
          <motion.div key="experience" {...containerVariants} className="space-y-12">
            <h2 className="newspaper text-3xl font-bold text-slate-900 italic">Manuscript History</h2>
            <div className="space-y-12 pl-4 border-l border-slate-100">
              {[
                { role: 'Content Writer', org: 'TERN (Remote)', years: 'Aug 25’ – Oct 25’', desc: 'Authored 10+ research-intensive, SEO-optimized blogs on AI in recruitment and global nurse migration. Generated 13,000+ words of long-form content.' },
                { role: 'Academic Content Writer', org: 'MyMegaminds (Remote)', years: 'Nov 24’ – Mar 25’', desc: 'Delivered 40+ academic essays across 15+ disciplines maintaining 100% compliance with APA/MLA standards.' },
                { role: 'Content Writer', org: 'Nettv4u (Remote)', years: 'Apr 24’ – Sep 24’', desc: 'Increased organic search traffic by 15% through 40+ SEO-driven entertainment articles. Applied strategic keyword targeting to trending topics.' },
                { role: 'Creative Content Writer', org: 'Pawwz (Remote)', years: 'Oct 23’ – Feb 24’', desc: 'Boosted follower engagement by 10% through major social media campaigns and monthly newsletters.' },
                { role: 'Content Writer', org: 'NayePankh Foundation', years: 'Jun 23’ – Sep 23’', desc: 'Increased online community engagement by 15% through strategic content for social awareness campaigns. Drafted monthly newsletters.' }
              ].map((exp, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i}
                  className="relative pl-8"
                >
                  <div className="absolute left-[-21px] top-2 w-2.5 h-2.5 rounded-full bg-slate-900 ring-4 ring-white shadow-sm"></div>
                  <div className="mb-1 flex items-baseline justify-between">
                    <h4 className="text-xl font-bold text-slate-900">{exp.role}</h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{exp.years}</span>
                  </div>
                  <p className="text-sm font-bold text-blue-600 mb-3">{exp.org}</p>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-2xl bg-slate-50 p-4 rounded-xl border border-slate-100">{exp.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      case 'publications':
        return (
          <motion.div key="publications" {...containerVariants} className="grid grid-cols-2 gap-8">
            {PUBLICATIONS.map((pub, i) => (
              <motion.div
                layoutId={`pub-${pub.id}`}
                key={pub.id}
                onClick={() => setReadingSample(pub)}
                className="group bg-white border border-slate-100 p-8 rounded-[2rem] hover:shadow-2xl hover:border-blue-200 transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-slate-50 rounded-full text-slate-400 border border-slate-100">{pub.medium}</span>
                  <span className="text-xs font-bold text-slate-300">{pub.year}</span>
                </div>
                <h4 className="newspaper text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors leading-tight">{pub.title}</h4>
                <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed mb-6 italic">"{pub.excerpt}"</p>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read Sample →
                </div>
              </motion.div>
            ))}
          </motion.div>
        );
      case 'awards':
        return (
          <motion.div key="awards" {...containerVariants} className="grid grid-cols-2 gap-6">
            {[
              { title: "Consistent Gold Medalist", year: "7-Year Streak", org: "28 First-place honors in Essay, Poetry & Speech" },
              { title: "Award Recipient 'She Raises'", year: "2025", org: "Blue Cloud Publishers (International)" },
              { title: "Published Author (3x)", year: "Active", org: "Featured in 3 distinct international anthologies" },
              { title: "SEO Performance Milestone", year: "2024", org: "15% Organic Traffic Increase for Nettv4u" }
            ].map((award, i) => (
              <div key={i} className="p-8 border border-slate-100 rounded-[2rem] flex items-center gap-6 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all border-dashed">
                <div>
                  <h4 className="font-bold text-slate-900 text-base mb-1">{award.title}</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed uppercase tracking-wider">{award.org}</p>
                  <p className="text-[10px] text-blue-500 font-bold mt-2">{award.year}</p>
                </div>
              </div>
            ))}
          </motion.div>
        );
      case 'skills':
        return (
          <motion.div key="skills" {...containerVariants} className="space-y-12">
            {[
              { category: 'Content Expertise', skills: ['SEO Writing', 'Copywriting', 'Creative Writing', 'Academic Research', 'Blog Development', 'Social Media Content', 'Poetry & Storytelling', 'Proofreading & Editing'] },
              { category: 'Professional Skills', skills: ['Project Management', 'Research & Analysis', 'Stakeholder Engagement', 'Team Collaboration', 'Time Management', 'Campaign Strategy'] },
              { category: 'Technical Tools', skills: ['WordPress', 'Google Analytics', 'SEMrush/Ahrefs', 'MS Office Suite', 'Grammarly', 'Hemingway Editor', 'Social Media Platforms', 'Canva'] }
            ].map(cat => (
              <div key={cat.category}>
                <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-blue-500 mb-6 px-1">{cat.category}</h4>
                <div className="flex flex-wrap gap-3">
                  {cat.skills.map((skill, si) => (
                    <motion.span
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: si * 0.05 }}
                      key={skill}
                      className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 hover:border-blue-200 hover:text-blue-600 hover:shadow-sm transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        );
    }
  };

  return (
    <div className="flex h-full bg-white font-sans text-slate-900 overflow-hidden relative">
      {/* side reader */}
      <AnimatePresence>
        {readingSample && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReadingSample(null)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 w-[45%] h-full bg-white z-50 shadow-[-20px_0_50px_rgba(0,0,0,0.1)] border-l border-slate-100 overflow-y-auto custom-scrollbar"
            >
              <div className="p-16">
                <button
                  onClick={() => setReadingSample(null)}
                  className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors mb-12"
                >
                  <span className="text-slate-400">✕</span>
                </button>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500 mb-4 block">{readingSample.medium}</span>
                <h2 className="newspaper text-5xl font-bold mb-10 leading-tight italic">{readingSample.title}</h2>
                <div className="w-12 h-1 bg-slate-900 mb-10" />
                <div className="prose prose-slate max-w-none">
                  <p className="text-xl text-slate-800 leading-[2] font-light italic mb-12 border-l-4 border-slate-100 pl-8">
                    {readingSample.excerpt}
                  </p>
                  <p className="text-slate-600 leading-[1.8] text-lg whitespace-pre-wrap">
                    {readingSample.fullContent || "Full manuscript content is currently in archival. Please request access via terminal or contact form."}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* sidebar left side*/}
      <aside className="w-72 border-r border-slate-100 flex flex-col bg-slate-50/50 shrink-0 overflow-y-auto custom-scrollbar">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-2xl font-serif shadow-lg shadow-slate-200">D</div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-tighter">Durrani Studio</h1>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">Creative Systems v2.0</p>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'experience', label: 'Experience' },
              { id: 'publications', label: 'Publications' },
              { id: 'awards', label: 'Awards' },
              { id: 'skills', label: 'Skills' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TabId)}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all group ${activeTab === item.id
                  ? 'bg-white text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100/50'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                </div>
                {activeTab === item.id && (
                  <motion.div layoutId="active-dot" className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-6">
          <div className="p-6 bg-slate-900 rounded-[2rem] border border-white/5 shadow-xl relative overflow-hidden group">
            <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2">Availability</p>
            <p className="text-[11px] text-white/80 font-bold leading-relaxed">Accepting creative & strategic commissions for 2025.</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-white">
        <header className="h-24 border-b border-slate-50 flex items-center justify-between px-12 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-slate-200 font-light text-2xl">/</span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">{activeTab}</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://drive.google.com/file/d/11s9_CrIlTDhfqEskAWiurCk8dPt2Ls5A/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all border border-slate-100 shadow-sm active:scale-95"
            >
              Certifications
            </a>
            <a
              href="https://drive.google.com/file/d/11xE24WL8CzOfmG2IZjeQhEuSnBKXm76p/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-200 hover:translate-y-[-2px] active:translate-y-[1px] transition-all"
            >
              Portfolio
            </a>
            <a
              href="https://www.linkedin.com/in/durrani-adil-13/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all border border-slate-100 shadow-sm active:scale-95"
            >
              LinkedIn
            </a>
            <button
              onClick={handleOpenResume}
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-200 hover:translate-y-[-2px] active:translate-y-[1px] transition-all"
            >
              Full Resume
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-16 custom-scrollbar scroll-smooth">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </div>
          {/* space for footer */}
          <div className="h-24" />
        </div>
      </main>
    </div>
  );
};
