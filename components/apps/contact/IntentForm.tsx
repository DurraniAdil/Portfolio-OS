
import React from 'react';
import { ContactIntent, ContactFormData } from './types';

interface IntentFormProps {
  formData: ContactFormData;
  updateForm: (updates: Partial<ContactFormData>) => void;
}

export const IntentForm: React.FC<IntentFormProps> = ({ formData, updateForm }) => {
  const renderDynamicFields = () => {
    switch (formData.intent) {
      case 'developer':
        return (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-cyan-500 ml-1">Role Type</label>
              <input
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-cyan-500/50 text-xs text-white"
                placeholder="Full-time / Contract / Freelance"
                value={formData.roleType || ''}
                onChange={e => updateForm({ roleType: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-cyan-500 ml-1">Project Link (if any)</label>
              <input
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-cyan-500/50 text-xs text-white"
                placeholder="https://github.com/..."
                value={formData.projectLink || ''}
                onChange={e => updateForm({ projectLink: e.target.value })}
              />
            </div>
          </div>
        );
      case 'peopleops':
        return (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-emerald-500 ml-1">Team Size</label>
              <select
                className="w-full p-3 bg-zinc-900 border border-white/10 rounded-xl outline-none focus:border-emerald-500/50 text-xs text-white"
                value={formData.teamSize || ''}
                onChange={e => updateForm({ teamSize: e.target.value })}
              >
                <option value="">Select Range</option>
                <option value="1-10">1-10 Members</option>
                <option value="11-50">11-50 Members</option>
                <option value="51-200">51-200 Members</option>
                <option value="200+">200+ Members</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-emerald-500 ml-1">Operations Scope</label>
              <input
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-emerald-500/50 text-xs text-white"
                placeholder="HR / PM / Strategy"
                value={formData.opsScope || ''}
                onChange={e => updateForm({ opsScope: e.target.value })}
              />
            </div>
          </div>
        );
      case 'writer':
        return (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-amber-500 ml-1">Content Type</label>
              <input
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-amber-500/50 text-xs text-white"
                placeholder="SEO Blog / Copy / Poetry"
                value={formData.contentType || ''}
                onChange={e => updateForm({ contentType: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-amber-500 ml-1">Approx. Word Count</label>
              <input
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-amber-500/50 text-xs text-white"
                placeholder="e.g. 1500 words"
                value={formData.wordCount || ''}
                onChange={e => updateForm({ wordCount: e.target.value })}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 ml-1">Primary Intent</label>
        <select
          required
          className="w-full p-4 bg-zinc-900 border border-white/10 rounded-2xl outline-none focus:border-white/30 text-xs text-white transition-all appearance-none"
          value={formData.intent}
          onChange={e => updateForm({ intent: e.target.value as ContactIntent })}
        >
          <option value="other">Select Inquiry Type</option>
          <option value="developer">Engineering / Full-Stack Dev Engagement</option>
          <option value="peopleops">People Operations / PM Consulting</option>
          <option value="writer">Content Strategy / Literary Commission</option>
          <option value="other">Collaboration / General Signal</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Identity</label>
          <input
            required
            className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-white/30 text-xs text-white transition-all"
            placeholder="Full Name"
            value={formData.name}
            onChange={e => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Coordinates</label>
          <input
            required
            type="email"
            className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-white/30 text-xs text-white transition-all"
            placeholder="Email Address"
            value={formData.email}
            onChange={e => updateForm({ email: e.target.value })}
          />
        </div>
      </div>

      {renderDynamicFields()}

      <div className="space-y-1">
        <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Transmission Data</label>
        <textarea
          required
          className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-white/30 text-xs text-white h-32 resize-none transition-all"
          placeholder="Briefly outline your request..."
          value={formData.message}
          onChange={e => updateForm({ message: e.target.value })}
        />
      </div>

      {/* To avoid spam */}
      <input
        type="text"
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        value={formData.website || ''}
        onChange={e => updateForm({ website: e.target.value })}
      />
    </div>
  );
};
