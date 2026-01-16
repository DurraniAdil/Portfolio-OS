
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AssistantApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello! I am the DurraniOS Intelligence Layer. You can ask me anything about Durrani's technical skills, writing career, or professional background. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      // Create a new instance right before making the API call as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userText, // Simplified string input for text-only queries
        config: {
          systemInstruction: `You are the AI assistant for Durrani Adil Khan's portfolio OS. 
          Your goal is to help recruiters understand his qualifications. 
          
          Durrani's Profile:
          - Full-Stack Dev: React, TypeScript, Next.js, Node.js. 
          - Published Poet: 3x International Anthologies, 400+ works.
          - People Ops: Managed 8+ recruitment drives, ₹350k+ budgets.
          - Education: B.Tech CS (8.34 CGPA).
          
          Tone: Professional, helpful, slightly futuristic, and confident. 
          Keep answers concise and highlight specific projects like 'NotePad' or 'Nazm-e-Adil' when relevant.`
        }
      });

      // Directly access .text property as per SDK documentation (not a function call)
      const modelText = response.text || "I'm sorry, I'm having trouble accessing my core memory right now.";
      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Error: Neural link interrupted. Please check your connection." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#050505] text-white font-sans overflow-hidden">
      <header className="h-16 border-b border-white/5 bg-black/40 flex items-center justify-between px-8 shrink-0 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-lg animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]">🤖</div>
          <div>
            <h1 className="text-xs font-black uppercase tracking-widest text-zinc-400 leading-none">Intelligence Layer</h1>
            <span className="text-[8px] font-bold text-blue-500 uppercase tracking-tighter">Gemini 3.0 Real-time</span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar" ref={scrollRef}>
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white/5 border border-white/10 text-zinc-300 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="p-4 border-t border-white/5 bg-black/40">
        <form onSubmit={handleSubmit} className="relative group">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about my projects, experience, or skills..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm text-white outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all pr-16"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center justify-center transition-all disabled:opacity-50"
          >
            <span className="text-xl">↵</span>
          </button>
        </form>
        <div className="mt-2 text-center">
          <span className="text-[9px] font-black text-white/10 uppercase tracking-widest italic">AI may hallucinate. Use Terminal for raw data.</span>
        </div>
      </footer>
    </div>
  );
};
