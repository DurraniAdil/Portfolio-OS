import React, { useState, useEffect, useRef } from 'react';
import { BootScreen } from './components/os/BootScreen';
import { LoginScreen } from './components/os/LoginScreen';
import { Desktop } from './components/os/Desktop';
import { Taskbar } from './components/os/Taskbar';
import { Window } from './components/os/Window';
import { DeviceGuard } from './components/os/DeviceGuard';
import { useWindowManager } from './hooks/useWindowManager';
import { StudioApp } from './components/apps/StudioApp';
import { BardApp } from './components/apps/BardApp';
import { PeopleOpsApp } from './components/apps/PeopleOpsApp';
import { GalleryApp } from './components/apps/GalleryApp';
import { TerminalApp } from './components/apps/TerminalApp';
import { WeatherApp } from './components/apps/WeatherApp';
import { ProjectsApp } from './components/apps/ProjectsApp';
import { ResumeApp } from './components/apps/ResumeApp';
import { ContactApp } from './components/apps/ContactApp';
import { TicTacToeApp } from './components/apps/TicTacToeApp';
import { CalculatorApp } from './components/apps/Calc-y';
import { EditorApp } from './components/apps/Editor';
import { Persona, AppId } from './types';
import { USER_ACCOUNTS, APP_METADATA } from './constants';
import { motion, AnimatePresence } from 'framer-motion';

const MatrixRain = ({ onStop }: { onStop: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100000] cursor-pointer"
      onClick={onStop}
    >
      <canvas ref={canvasRef} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-500 font-mono text-xs uppercase tracking-[0.5em] bg-black/80 px-8 py-4 border border-green-500/50 rounded-lg pointer-events-none animate-pulse">
        Neural Link Active. Click to Disconnect.
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [bootStatus, setBootStatus] = useState<'booting' | 'login' | 'desktop' | 'shutdown'>('booting');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBootUpButton, setShowBootUpButton] = useState(false);

  // Pinned apps state with localStorage persistence
  const [pinnedApps, setPinnedApps] = useState<AppId[]>(() => {
    const saved = localStorage.getItem('durranios-pinned-apps');
    return saved ? JSON.parse(saved) : [];
  });

  // Save pinned apps to localStorage when changed
  useEffect(() => {
    localStorage.setItem('durranios-pinned-apps', JSON.stringify(pinnedApps));
  }, [pinnedApps]);

  const handlePinApp = (id: AppId) => {
    setPinnedApps(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  const handleUnpinApp = (id: AppId) => {
    setPinnedApps(prev => prev.filter(app => app !== id));
  };

  const {
    windows,
    focusedId,
    openApp,
    closeApp,
    closeAll,
    minimizeApp,
    minimizeAll,
    focusApp,
    toggleMaximize,
    updateWindowBounds,
  } = useWindowManager();

  const handleLogin = () => {
    setBootStatus('desktop');
    setTimeout(() => setOnboardingStep(1), 2000);
  };

  const handleShutdown = () => {
    setBootStatus('shutdown');
    setShowBootUpButton(false);
    closeAll();
    setTimeout(() => setShowBootUpButton(true), 3000);
  };

  const handleRestart = () => {
    closeAll();
    setBootStatus('booting');
  };

  useEffect(() => {
    const handleStartMatrix = () => setIsMatrixActive(true);
    const handleSystemReboot = () => {
      closeAll();
      setBootStatus('booting');
    };
    window.addEventListener('startMatrix', handleStartMatrix);
    window.addEventListener('systemReboot', handleSystemReboot);
    return () => {
      window.removeEventListener('startMatrix', handleStartMatrix);
      window.removeEventListener('systemReboot', handleSystemReboot);
    };
  }, [closeAll]);

  useEffect(() => {
    if (focusedId) {
      let wall = '';
      if (focusedId === 'studio') wall = `${import.meta.env.BASE_URL}media/studio-app-bg.png`;
      if (focusedId === 'bard') wall = `${import.meta.env.BASE_URL}media/bard-bg.png`;
      if (focusedId === 'peopleops') wall = `${import.meta.env.BASE_URL}media/people-ops-bg.png`;

      if (wall) {
        window.dispatchEvent(new CustomEvent('setWallpaper', { detail: wall }));
      }
    }
  }, [focusedId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderAppContent = (id: AppId) => {
    switch (id) {
      case 'studio': return <StudioApp />;
      case 'bard': return <BardApp onOpenApp={openApp} />;
      case 'peopleops': return <PeopleOpsApp />;
      case 'gallery': return <GalleryApp />;
      case 'terminal': return <TerminalApp onOpenApp={openApp} />;
      case 'weather': return <WeatherApp />;
      case 'projects': return <ProjectsApp updateTitle={(title) => updateWindowBounds('projects', { title })} />;
      case 'resume': return <ResumeApp />;
      case 'contact': return <ContactApp />;
      case 'tictactoe': return <TicTacToeApp />;
      case 'calculator': return <CalculatorApp />;
      case 'editor': return <EditorApp />;
      default: return <div className="p-4 text-white">Application Loading...</div>;
    }
  };

  const filteredApps = Object.entries(APP_METADATA).filter(([id, meta]) =>
    meta.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    meta.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Device Guard - redirects mobile users to mobile-optimized Portfolio-App */}
      <DeviceGuard
        redirectUrl="https://durraniadil.github.io/Portfolio-Portal/"
        breakpoint={768}
        waitForBoot={true}
      />

      <AnimatePresence>
        {isMatrixActive && <MatrixRain onStop={() => setIsMatrixActive(false)} />}
      </AnimatePresence>

      {bootStatus === 'booting' && <BootScreen onComplete={() => {
        window.dispatchEvent(new CustomEvent('bootComplete'));
        setBootStatus('login');
      }} />}

      {bootStatus === 'login' && <LoginScreen onLogin={handleLogin} onReboot={handleRestart} />}

      {bootStatus === 'shutdown' && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-[10000]">
          <AnimatePresence>
            {showBootUpButton && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setBootStatus('booting')}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white text-xs font-black uppercase tracking-[0.3em] transition-all"
              >
                Boot Up System
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}

      {bootStatus === 'desktop' && (
        <>
          <Desktop onIconClick={openApp}>
            {windows.map((win) => (
              <Window
                key={win.id}
                window={win}
                onClose={() => closeApp(win.id)}
                onMinimize={() => minimizeApp(win.id)}
                onMaximize={() => toggleMaximize(win.id)}
                onFocus={() => focusApp(win.id)}
                updateBounds={(bounds) => updateWindowBounds(win.id, bounds)}
                isFocused={focusedId === win.id}
              >
                {renderAppContent(win.id)}
              </Window>
            ))}
            <Taskbar
              windows={windows}
              pinnedApps={pinnedApps}
              onPinApp={handlePinApp}
              onUnpinApp={handleUnpinApp}
              onShowDesktop={minimizeAll}
              onShutdown={handleShutdown}
              onRestart={handleRestart}
              onClearTabs={closeAll}
              onAppClick={(id) => {
                const win = windows.find(w => w.id === id);
                if (!win) {
                  openApp(id);
                } else if (win.isMinimized) {
                  focusApp(id);
                } else if (focusedId === id) {
                  minimizeApp(id);
                } else {
                  focusApp(id);
                }
              }}
              activeAppId={focusedId}
            />
          </Desktop>

          {/* Onboarding Toast */}
          <AnimatePresence>
            {onboardingStep > 0 && onboardingStep < 4 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed bottom-20 left-10 glass-dark p-6 rounded-3xl border border-white/10 max-w-[280px] z-[10002] shadow-2xl"
              >
                <div className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2 italic">DurraniOS Help</div>
                <p className="text-xs font-medium text-white/80 leading-relaxed mb-4">
                  {onboardingStep === 1 && "Welcome! Use the Spotlight widget on the right to quickly switch between my core personas."}
                  {onboardingStep === 2 && "Press Ctrl+K to open the Command Palette and find anything instantly across my ecosystem."}
                  {onboardingStep === 3 && "Double-click the icons on the left to explore specific archives and utilities."}
                </p>
                <button
                  onClick={() => setOnboardingStep(prev => prev + 1)}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  {onboardingStep === 3 ? "Got it!" : "Next Tip"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Command Palette Modal */}
          <AnimatePresence>
            {isCommandPaletteOpen && (
              <div className="fixed inset-0 z-[10005] flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsCommandPaletteOpen(false)}
                  className="absolute inset-0 bg-black/60 backdrop-blur-md"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="relative w-full max-w-xl glass-dark rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden"
                >
                  <div className="p-8 border-b border-white/10">
                    <div className="flex items-center gap-4 text-white">
                      <span className="text-2xl opacity-50">🔍</span>
                      <input
                        autoFocus
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search apps, projects, or commands..."
                        className="bg-transparent border-none outline-none text-xl font-medium w-full placeholder:text-white/20"
                      />
                    </div>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto p-4 custom-scrollbar">
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-3 px-4">Available Applications</div>
                    <div className="grid grid-cols-1 gap-1">
                      {filteredApps.map(([id, meta]) => (
                        <button
                          key={id}
                          onClick={() => {
                            openApp(id as AppId);
                            setIsCommandPaletteOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl transition-all group"
                        >
                          {meta.icon.includes('/') || meta.icon.endsWith('.png') ? (
                            <img
                              src={meta.icon.startsWith('http') ? meta.icon : `${import.meta.env.BASE_URL}${meta.icon}`}
                              alt={meta.title}
                              className="w-10 h-10 object-contain grayscale group-hover:grayscale-0 transition-all"
                            />
                          ) : (
                            <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{meta.icon}</span>
                          )}
                          <div className="text-left">
                            <div className="text-sm font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-widest">{meta.title}</div>
                            <div className="text-[10px] text-white/40 font-medium">{meta.description}</div>
                          </div>
                        </button>
                      ))}
                      {filteredApps.length === 0 && (
                        <div className="p-10 text-center text-white/20 font-bold uppercase text-xs tracking-widest">No matching results found</div>
                      )}
                    </div>
                  </div>
                  <div className="p-4 bg-black/40 border-t border-white/5 flex justify-between items-center px-8">
                    <div className="flex gap-4">
                      <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">↑↓ Navigate</span>
                      <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">↵ Select</span>
                    </div>
                    <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">ESC to close</span>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default App;