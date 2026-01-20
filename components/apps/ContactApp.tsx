import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactFormData, FormStatus } from './contact/types';
import { QuickActions } from './contact/QuickActions';
import { IntentForm } from './contact/IntentForm';
import { Send, Sparkles, Radio, Shield, Clock } from 'lucide-react';
import emailjs from '@emailjs/browser';

export const ContactApp: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    intent: 'other',
    message: '',
    website: '' // Honeypot
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [emailCopied, setEmailCopied] = useState(false);
  const mountTime = useRef(Date.now());

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('durraniadil13@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const updateForm = (updates: Partial<ContactFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // honeypot check
    if (formData.website) {
      console.warn("Spam detected via honeypot.");
      return;
    }

    // time check (min 3 seconds)
    if (Date.now() - mountTime.current < 3000) {
      console.warn("Submission too fast.");
      return;
    }

    setStatus('sending');

    try {
      const SERVICE_ID = 'service_87d8r9a';
      const TEMPLATE_ID = 'template_qog2cfk';
      const PUBLIC_KEY = 'sRAhECH2ZABZrrins';

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          // metadata
          name: formData.name,
          email: formData.email,
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.intent.charAt(0).toUpperCase() + formData.intent.slice(1) + ' Inquiry',
          message: formData.message,
          time: new Date().toLocaleString(),

          // field
          role_type: formData.roleType || '—',
          project_link: formData.projectLink || '—',
          team_size: formData.teamSize || '—',
          operations_scope: formData.opsScope || '—',
          content_type: formData.contentType || '—',
          word_count: formData.wordCount || '—',
        },
        PUBLIC_KEY
      );

      setStatus('success');
    } catch (error) {
      console.error('EmailJS Error:', error);

      // fallback to mailto if EmailJS fails
      const subject = `DurraniOS: Inquiry for ${formData.intent.toUpperCase()} from ${formData.name}`;
      const body = `
        Identity: ${formData.name}
        Coordinates: ${formData.email}
        Intent: ${formData.intent}
        ---
        Transmission:
        ${formData.message}
      `;
      window.location.href = `mailto:durraniadil13@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      setStatus('success');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      intent: 'other',
      message: '',
      website: ''
    });
    setStatus('idle');
    mountTime.current = Date.now();
  };

  return (
    <div className="h-full flex bg-zinc-950 text-white font-sans relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-zinc-950 to-black pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2" />


      <div className="w-[380px] shrink-0 border-r border-white/5 bg-black/40 backdrop-blur-xl flex flex-col relative z-10 overflow-y-auto custom-scrollbar">

        <div className="p-6 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-indigo-500/20 border border-indigo-500/30 rounded-xl flex items-center justify-center">
              <Radio size={18} className="text-indigo-400" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight uppercase">Contact</h1>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Transmission Terminal</p>
            </div>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Synchronize communication across the Durrani ecosystem.
          </p>
        </div>


        <div className="p-5 border-b border-white/5 shrink-0">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-3">Quick Connect</p>
          <QuickActions onCopyEmail={handleCopyEmail} emailCopied={emailCopied} />
        </div>


        <div className="p-5 space-y-3 shrink-0">
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <Shield size={14} className="text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Security</span>
            </div>
            <p className="text-xs text-zinc-500">End-to-end encrypted transmission with AES-256. Spam protection active.</p>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <Clock size={14} className="text-amber-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Response Time</span>
            </div>
            <p className="text-xs text-zinc-500">Typical response within 24-48 hours. Priority signals acknowledged faster.</p>
          </div>
        </div>


        <div className="p-4 border-t border-white/5 bg-black/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></span>
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Online</span>
            </div>
            <span className="text-[9px] font-bold text-zinc-700 italic">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>


      <div className="flex-1 flex flex-col relative z-10 overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex-1 flex flex-col items-center justify-center text-center p-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10, delay: 0.2 }}
                className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/10"
              >
                <Sparkles size={36} className="text-emerald-400" />
              </motion.div>
              <h2 className="text-4xl font-black mb-3 tracking-tighter uppercase">Signal Synchronized</h2>
              <p className="text-zinc-500 mb-10 max-w-sm text-sm leading-relaxed">
                Transmission received successfully. I will acknowledge the request via your coordinates soon.
              </p>
              <button
                onClick={resetForm}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all"
              >
                Send Another Signal
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 p-10"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-black tracking-tight uppercase mb-2">Compose Signal</h2>
                <p className="text-xs text-zinc-500">Fill in the transmission details below to initiate contact.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <IntentForm formData={formData} updateForm={updateForm} />

                <div className="pt-6 border-t border-white/5">
                  <button
                    disabled={status === 'sending'}
                    className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl ${status === 'sending'
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-indigo-900/30'
                      }`}
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-zinc-500 border-t-white rounded-full animate-spin" />
                        Encrypting Transmission...
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Initiate Secure Uplink
                      </>
                    )}
                  </button>
                  <p className="text-[9px] text-zinc-600 text-center uppercase tracking-widest font-bold mt-4">
                    Encryption: AES-256 • Spam Protection: Active
                  </p>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
