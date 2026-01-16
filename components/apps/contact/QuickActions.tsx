
import React from 'react';
import { motion } from 'framer-motion';

interface QuickActionsProps {
  onCopyEmail: () => void;
  emailCopied: boolean;
}
//gon directly save them//
export const QuickActions: React.FC<QuickActionsProps> = ({ onCopyEmail, emailCopied }) => {
  const actions = [
    { label: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/durrani-adil-13/' },
    { label: 'GitHub', icon: '🐙', url: 'https://github.com/durraniadil13' },
    { label: 'Mailto', icon: '📫', url: 'mailto:durraniadil13@gmail.com' },
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {actions.map((action) => (
        <motion.a
          key={action.label}
          href={action.url}
          target={action.label === 'Mailto' ? '_self' : '_blank'}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/10 transition-all shadow-lg"
        >
          <span>{action.icon}</span>
          {action.label}
        </motion.a>
      ))}
      <motion.button
        onClick={onCopyEmail}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg ${emailCopied
          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
          : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
          }`}
      >
        <span>{emailCopied ? '✅' : '📋'}</span>
        {emailCopied ? 'Copied' : 'Copy Email'}
      </motion.button>
    </div>
  );
};
