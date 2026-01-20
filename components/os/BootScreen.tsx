
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
    <div className="fixed inset-0 bg-black text-white font-mono p-6 md:p-10 lg:p-16 flex flex-col items-center justify-center z-[9999]">
      <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
        <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 border-4 md:border-[6px] border-t-blue-500 border-white/20 rounded-full animate-spin"></div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-widest">DURRANI OS</h1>
        </div>

        <div className="space-y-1 md:space-y-1.5 mb-4 md:mb-6 h-48 md:h-56 lg:h-64 overflow-hidden">
          {logs.map((log, i) => (
            <div key={i} className="boot-item text-green-400 text-[11px] md:text-xs lg:text-sm leading-normal md:leading-relaxed">
              <span className="text-white/50 mr-2">[{new Date().toLocaleTimeString()}]</span>
              {log === "Secret Access Key: portfolio" ? <span className="text-yellow-400 font-bold">{log}</span> : log}
            </div>
          ))}
        </div>

        <div className="w-full bg-white/10 h-1 md:h-2 lg:h-3 rounded-full overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          onClick={onComplete}
          className="mt-8 md:mt-12 text-white/30 hover:text-white text-xs md:text-sm uppercase tracking-widest transition-colors"
        >
          [ Skip Boot ]
        </button>
      </div>
    </div>
  );
};

