import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Briefcase,
  Wallet,
  Award,
  ShieldCheck,
  Activity,
  CheckCircle,
  Link,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

type ModuleId =
  | 'overview'
  | 'projects'
  | 'recruitment'
  | 'finance'
  | 'volunteers'
  | 'certs';

const KPI_DATA = [
  { label: 'Recruitment Drives', value: '8+' },
  { label: 'Students Placed', value: '150+' },
  { label: 'Budgets Managed', value: '₹350k+' },
  { label: 'CSAT', value: '95%+' },
  { label: 'Ops Velocity', value: '+20%' },
  { label: 'Volunteers', value: '30+' },
];

const IMPACT_METRICS = [
  { name: 'Efficiency', value: 85 },
  { name: 'Compliance', value: 100 },
  { name: 'Engagement', value: 92 },
  { name: 'Retention', value: 88 },
];

export const PeopleOpsApp: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleId>('overview');

  /* overview */

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl">
          <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">{label}</p>
          <p className="text-sm font-black text-cyan-400">
            {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  const renderOverview = () => (
    <motion.div
      key="overview"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-8 pb-8"
    >
      {/* kpi strip */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4">
        {KPI_DATA.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between group hover:border-slate-700 transition-colors"
          >
            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 group-hover:text-slate-400 transition-colors break-words">
              {kpi.label}
            </div>
            <div className="text-xl lg:text-2xl font-black text-white truncate" title={kpi.value}>
              {kpi.value}
            </div>
          </div>
        ))}
      </div>

      {/* metrics & summary */}
      <div className="flex flex-wrap gap-6">
        <div className="flex-[2] min-w-[300px] bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs uppercase tracking-widest text-slate-400">
              Operational Impact Metrics
            </h3>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <Activity size={14} className="text-slate-600" />
            </div>
          </div>

          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={IMPACT_METRICS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  fontSize={10}
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} animationDuration={1500}>
                  {IMPACT_METRICS.map((_, i) => (
                    <Cell
                      key={i}
                      fill={`url(#${i % 2 === 0 ? 'cyanGradient' : 'emeraldGradient'})`}
                      stroke={i % 2 === 0 ? '#22d3ee' : '#10b981'}
                      strokeWidth={1}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex-[1] min-w-[240px] bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between min-h-[200px]">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-800 pb-2">
              Executive Summary
            </h3>
            <p className="text-xs lg:text-sm text-slate-400 leading-relaxed font-medium">
              Project manager and operations coordinator with proven
              execution across recruitment, finance, stakeholder
              alignment, and cross-functional leadership in both
              corporate and campus environments.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                Verified
              </div>
              <div className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                Top 1%
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-[10px] uppercase tracking-widest">
              <CheckCircle size={12} className="text-emerald-500" />
              System Status: Stable
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  /* projects */

  const renderProjects = () => (
    <motion.div
      key="projects"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-2 gap-6"
    >
      {[
        {
          org: 'Western Electrical Work & Engineering',
          role: 'Internal Manager',
          points: [
            'End-to-end operations & tender execution',
            'Technical workforce scheduling & payroll',
            'Government & vendor liaison',
            'Inventory and resource optimization',
          ],
        },
        {
          org: 'Be Endless',
          role: 'Project Manager / Consultant',
          points: [
            'Sole client-facing lead for 4+ projects',
            '95%+ client satisfaction',
            'Pipeline standardization (-20% turnaround)',
            'C-suite advisory on operations & brand',
          ],
        },
      ].map((proj) => (
        <div
          key={proj.org}
          className="bg-slate-900 border border-slate-800 rounded-xl p-6"
        >
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">
            {proj.org}
          </div>
          <h3 className="text-lg font-bold text-white mb-4">
            {proj.role}
          </h3>
          <ul className="space-y-2 text-sm text-slate-400">
            {proj.points.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="text-cyan-400">—</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </motion.div>
  );

  /* recruitment */

  const renderRecruitment = () => (
    <motion.div
      key="recruitment"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-slate-900 border border-slate-800 rounded-xl p-8"
    >
      <h3 className="text-xl font-bold text-white mb-2">
        Placement Cell Operations
      </h3>
      <p className="text-sm text-slate-500 mb-6">
        P.E.S College of Engineering
      </p>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
            <div className="text-xs uppercase text-slate-500 mb-1">
              Recruitment Drives
            </div>
            <div className="text-lg font-bold text-white">
              8+ Drives | 150+ Students
            </div>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
            <div className="text-xs uppercase text-slate-500 mb-1">
              Skill Workshops
            </div>
            <div className="text-lg font-bold text-white">
              5+ Sessions | 200+ Participants
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border border-dashed border-slate-700 rounded-lg">
          <ShieldCheck size={36} className="text-emerald-400 mb-3" />
          <div className="text-xs uppercase tracking-widest text-slate-500">
            Pipeline Integrity
          </div>
          <div className="text-sm font-bold text-emerald-400 mt-1">
            Fully Verified
          </div>
        </div>
      </div>
    </motion.div>
  );

  /* finance */

  const renderFinance = () => (
    <motion.div
      key="finance"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-2 gap-6"
    >
      {[
        {
          title: 'Student Council Finance',
          amount: '₹200,000+',
          note: '100% policy compliance',
        },
        {
          title: 'Event Operations Fund',
          amount: '₹150,000+',
          note: '10+ vendors | 500+ attendees',
        },
      ].map((f) => (
        <div
          key={f.title}
          className="bg-slate-900 border border-slate-800 rounded-xl p-6"
        >
          <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-2">
            {f.title}
          </h3>
          <div className="text-2xl font-black text-white mb-2">
            {f.amount}
          </div>
          <p className="text-sm text-slate-400">{f.note}</p>
        </div>
      ))}
    </motion.div>
  );

  /* certifications */

  const renderCerts = () => (
    <motion.div
      key="certs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-3 gap-6"
    >
      {[
        { title: 'Human Resources', org: 'GE Aerospace', url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ay2tsYxaTif7Nt6z7/bAPubTkawzGexc6TT_ay2tsYxaTif7Nt6z7_a34c98gcDixQwcwR6_1746354049218_completion_certificate.pdf" },
        { title: 'Strategy Consulting', org: 'BCG', url: "https://www.theforage.com/completion-certificates/SKZxezskWgmFjRvj9/ntTvo6ru6Tq3A2JPq_SKZxezskWgmFjRvj9_a34c98gcDixQwcwR6_1763027098328_completion_certificate.pdf" },
        { title: 'ESG Consultant', org: 'TATA Consultancy', url: "https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/N8Muuhk6XsXgMTeu2_ifobHAoMjQs9s6bKS_a34c98gcDixQwcwR6_1763618164915_completion_certificate.pdf" },
      ].map((c) => (
        <a
          key={c.title}
          href={c.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all cursor-pointer group"
        >
          <Award className="mx-auto mb-3 text-cyan-400 group-hover:scale-110 transition-transform" size={28} />
          <div className="text-xs uppercase tracking-widest text-slate-500 group-hover:text-slate-400 transition-colors">
            {c.org}
          </div>
          <div className="text-sm font-bold text-white mt-1 group-hover:text-cyan-400 transition-colors">
            {c.title}
          </div>
          <div className="mt-3 flex items-center justify-center gap-1 text-[10px] uppercase tracking-widest text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">
            <Link size={10} /> View Certificate
          </div>
        </a>
      ))}
    </motion.div>
  );

  /* layout */

  return (
    <div className="flex h-full bg-[#020617] text-slate-300">
      {/* sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-950 p-6 space-y-4 overflow-y-auto custom-scrollbar">
        <div className="mb-6">
          <div className="text-xs uppercase tracking-widest text-slate-500">
            PeopleOps Console
          </div>
          <div className="text-sm font-black text-white">
            DURRANI-OPS-001
          </div>
        </div>

        {[
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'projects', label: 'Projects', icon: FolderKanban },
          { id: 'recruitment', label: 'Recruitment', icon: Users },
          { id: 'finance', label: 'Finance', icon: Wallet },
          { id: 'certs', label: 'Certifications', icon: Award },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id as ModuleId)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs uppercase tracking-widest font-bold transition ${activeModule === item.id
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-500 hover:text-slate-300'
                }`}
            >
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </aside>

      {/* main */}
      <main className="flex-1 p-10 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeModule === 'overview' && renderOverview()}
          {activeModule === 'projects' && renderProjects()}
          {activeModule === 'recruitment' && renderRecruitment()}
          {activeModule === 'finance' && renderFinance()}
          {activeModule === 'certs' && renderCerts()}
        </AnimatePresence>
      </main>
    </div>
  );
};
