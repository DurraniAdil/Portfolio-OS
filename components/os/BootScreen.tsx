
import React, { useState, useEffect } from 'react';

interface BootScreenProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "Initializing DurraniOS v1.0.4...",
  "Loading kernel modules...",
  "Mounting /dev/personas...",
  "Starting Window Manager...",
  "System Security: Enabled",
  "Secret Access Key: portfolio",
  "Loading Bard.app resources...",
  "Connecting to Studio.database...",
  "Establishing Strategist.context...",
  "Ready."
];

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < BOOT_LOGS.length) {
        setLogs(prev => [...prev, BOOT_LOGS[currentLog]]);
        setProgress(Math.min(((currentLog + 1) / BOOT_LOGS.length) * 100, 100));
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black text-white font-mono p-10 flex flex-col items-center justify-center z-[9999]">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-white/20 rounded-full animate-spin"></div>
          <h1 className="text-2xl font-bold tracking-widest">DURRANI OS</h1>
        </div>

        <div className="space-y-1 mb-6 h-64 overflow-hidden">
          {logs.map((log, i) => (
            <div key={i} className="boot-item text-green-400 text-xs leading-normal">
              <span className="text-white/50 mr-2">[{new Date().toLocaleTimeString()}]</span>
              {log === "Secret Access Key: portfolio" ? <span className="text-yellow-400 font-bold">{log}</span> : log}
            </div>
          ))}
        </div>

        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          onClick={onComplete}
          className="mt-8 text-white/30 hover:text-white text-xs uppercase tracking-widest transition-colors"
        >
          [ Skip Boot ]
        </button>
      </div>
    </div>
  );
};
