
import React, { useState, useEffect } from 'react';

interface LoginScreenProps {
  onLogin: () => void;
  onReboot: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onReboot }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'portfolio') {
      onLogin();
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-cover bg-center flex flex-col items-center justify-between z-[9998] overflow-hidden" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop)' }}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* Clock Display */}
      <div className="relative text-white text-center mt-16">
        <h1 className="text-7xl font-light tracking-tighter">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </h1>
        <p className="text-xl font-medium opacity-80 mb-2">
          {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="relative flex flex-col items-center w-full max-w-xs animate-in fade-in zoom-in duration-500">
        <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl mb-6 group ring-offset-4 ring-offset-transparent ring-white/10 ring-4">
          <img
            src="media/login.png"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-white text-3xl font-medium mb-6 tracking-tight">Durrani</h2>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="relative group">
            <input
              type="password"
              value={password}
              autoFocus
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={`w-full px-4 py-3 glass-dark rounded-md text-white outline-none focus:ring-2 ring-blue-500/50 transition-all placeholder:text-white/30 text-center tracking-[0.5em] text-base ${error ? 'ring-red-500/50 animate-shake border-red-500/50' : 'border-white/10'}`}
            />
            {error && <p className="absolute -bottom-6 left-0 right-0 text-center text-red-400 text-xs font-bold uppercase tracking-widest">Incorrect Password</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-md transition-all font-medium border border-white/10 hover:border-white/30 text-base"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">
          Hint: See boot sequence logs
        </div>
      </div>

      <div className="relative w-full px-10 pb-8 flex justify-between items-center text-base">
        <div className="flex gap-6">
          <button onClick={onReboot} className="text-white/60 hover:text-white flex items-center gap-2" title="Reboot System">
            <span className="text-xl">⚡</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
};
