import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactFormData, FormStatus } from './contact/types';
import { QuickActions } from './contact/QuickActions';
import { IntentForm } from './contact/IntentForm';
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

    // Spam protection: Honeypot check
    if (formData.website) {
      console.warn("Spam detected via honeypot.");
      return;
    }

    // Spam protection: Time check (min 3 seconds)
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
          // Identity & Metadata
          name: formData.name,
          email: formData.email,
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.intent.charAt(0).toUpperCase() + formData.intent.slice(1) + ' Inquiry',
          message: formData.message,
          time: new Date().toLocaleString(),

          // Dynamic Fields
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

      // Fallback to mailto if EmailJS fails or keys aren't set
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
    <div className="h-full flex flex-col bg-zinc-950 text-white font-sans relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-zinc-950 to-black pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />

      {/* App Content */}
      <div className="flex-1 flex flex-col p-12 max-w-4xl mx-auto w-full relative z-10 overflow-y-auto custom-scrollbar">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">📡</span>
            <h1 className="text-4xl font-black tracking-tighter uppercase">Transmission Terminal</h1>
          </div>
          <p className="text-zinc-500 font-medium max-w-xl text-sm leading-relaxed">
            Synchronize communication across the Durrani ecosystem. Select your inquiry intent to optimize the data transmission.
          </p>
        </header>

        <QuickActions onCopyEmail={handleCopyEmail} emailCopied={emailCopied} />

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex-1 flex flex-col items-center justify-center text-center py-20"
            >
              <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-3xl mb-6 shadow-lg shadow-emerald-500/10">✨</div>
              <h2 className="text-3xl font-black mb-2 tracking-tighter uppercase">Signal Synchronized</h2>
              <p className="text-zinc-500 mb-8 max-w-xs text-sm">Transmission received. I will acknowledge the request via your coordinates soon.</p>
              <button
                onClick={resetForm}
                className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
              >
                Send Another Signal
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              <IntentForm formData={formData} updateForm={updateForm} />

              <div className="flex flex-col gap-4 pt-4">
                <button
                  disabled={status === 'sending'}
                  className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 shadow-xl ${status === 'sending'
                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/20'
                    }`}
                >
                  {status === 'sending' ? (
                    <>
                      <div className="w-3 h-3 border-2 border-zinc-500 border-t-white rounded-full animate-spin" />
                      Encrypting Transmission...
                    </>
                  ) : (
                    'Initiate Secure Uplink'
                  )}
                </button>
                <p className="text-[9px] text-zinc-600 text-center uppercase tracking-widest font-bold">
                  Encryption Mode: AES-256 • Spam filters active
                </p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Status Strip */}
      <footer className="h-10 bg-black/60 border-t border-white/5 px-6 flex items-center justify-between shrink-0 relative z-20">
        <div className="flex gap-6 text-[9px] font-black uppercase tracking-widest">
          <span className="flex items-center gap-1.5 text-zinc-600">
            <span className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            Secure Channel: ON
          </span>
          <span className="text-zinc-700">|</span>
          <span className="text-zinc-600">Availability: Open</span>
        </div>
        <div className="text-[9px] font-black text-zinc-700 uppercase tracking-widest italic">
          v2.0.8-alpha • system_time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </footer>
    </div>
  );
};
