import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AppId, WindowState } from '../../types';
import { APP_METADATA } from '../../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskbarProps {
  windows: WindowState[];
  pinnedApps: AppId[];
  onAppClick: (id: AppId) => void;
  onPinApp: (id: AppId) => void;
  onUnpinApp: (id: AppId) => void;
  onShowDesktop: () => void;
  onShutdown: () => void;
  onRestart: () => void;
  onClearTabs: () => void;
  activeAppId: AppId | null;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  pinnedApps,
  onAppClick,
  onPinApp,
  onUnpinApp,
  onShowDesktop,
  onShutdown,
  onRestart,
  onClearTabs,
  activeAppId
}) => {
  const [time, setTime] = useState(new Date());
  const [hoveredApp, setHoveredApp] = useState<AppId | null>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isActionCenterOpen, setIsActionCenterOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Quick Settings States
  const [volume, setVolume] = useState(80);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [btEnabled, setBtEnabled] = useState(true);
  const [airplaneMode, setAirplaneMode] = useState(false);

  // Context menu state
  const [contextMenu, setContextMenu] = useState<{ appId: AppId; x: number; y: number } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    if (contextMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [contextMenu]);

  // Compute which apps to show: open apps + pinned apps (deduplicated, preserve order)
  const openAppIds = windows.map(w => w.id);
  const displayedApps = useMemo(() => {
    const apps = new Set<AppId>();
    // First add pinned apps (in order)
    pinnedApps.forEach(id => apps.add(id));
    // Then add open apps that aren't already pinned
    openAppIds.forEach(id => apps.add(id));
    return Array.from(apps);
  }, [pinnedApps, openAppIds.join(',')]);

  // 🎨 CUSTOMIZE ICONS HERE

  const customIcons: Partial<Record<AppId, React.ReactNode>> = {

  };

  const handleStartOption = (action: () => void) => {
    setIsStartMenuOpen(false);
    action();
  };

  const handleContextMenu = (e: React.MouseEvent, appId: AppId) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ appId, x: e.clientX, y: e.clientY });
  };

  // Simple Calendar Generator
  const renderCalendar = () => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const currentYear = time.getFullYear();
    const currentMonth = time.getMonth();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = time.getDate();

    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) calendarDays.push(null);
    for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

    return (
      <div className="mt-4">
        <div className="flex justify-between items-center mb-4 px-2">
          <span className="text-xs font-black uppercase tracking-widest text-white/80">
            {time.toLocaleString('default', { month: 'long' })} {currentYear}
          </span>
          <div className="flex gap-4 opacity-40">
            <span className="cursor-pointer hover:opacity-100">↑</span>
            <span className="cursor-pointer hover:opacity-100">↓</span>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {days.map(d => <div key={d} className="text-[9px] font-black text-white/30 py-1">{d}</div>)}
          {calendarDays.map((d, i) => (
            <div
              key={i}
              className={`text-[10px] py-1.5 rounded-md transition-colors ${d === today ? 'bg-blue-600 text-white font-black shadow-lg shadow-blue-900/40' :
                d ? 'hover:bg-white/10 text-white/60' : ''
                }`}
            >
              {d}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-auto min-h-[2rem] py-0.5 glass flex items-center z-[9000] justify-between overflow-visible shadow-[0_-4px_24px_rgba(0,0,0,0.5)] transition-all border-t border-white/5">

      {/* --- START MENU AREA --- */}
      <div className="flex-none w-[30%] flex items-center h-full px-3 gap-2 relative">
        <button
          className={`w-7 h-7 flex items-center justify-center rounded-lg transition-all group relative active:scale-90 ${isStartMenuOpen ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'}`}
          onClick={() => {
            setIsStartMenuOpen(!isStartMenuOpen);
            setIsActionCenterOpen(false);
            setIsCalendarOpen(false);
          }}
        >
          <span className="text-xl filter drop-shadow-[0_0_8px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform">🪟</span>
        </button>

        <AnimatePresence>
          {isStartMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-14 left-4 w-56 glass-dark rounded-2xl border border-white/10 shadow-2xl p-2 overflow-hidden"
            >
              <div className="px-3 py-2 text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">System Control</div>
              <button onClick={() => handleStartOption(onShutdown)} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-red-500/20 rounded-xl transition-all group text-left">
                <span className="text-lg grayscale group-hover:grayscale-0">🛑</span>
                <span className="text-xs font-bold text-white/70 group-hover:text-white uppercase tracking-tighter">Shutdown System</span>
              </button>
              <button onClick={() => handleStartOption(onRestart)} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-blue-500/20 rounded-xl transition-all group text-left">
                <span className="text-lg grayscale group-hover:grayscale-0">🔄</span>
                <span className="text-xs font-bold text-white/70 group-hover:text-white uppercase tracking-tighter">Restart OS</span>
              </button>
              <div className="h-[1px] bg-white/5 my-1 mx-2"></div>
              <button onClick={() => handleStartOption(onClearTabs)} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/10 rounded-xl transition-all group text-left">
                <span className="text-lg grayscale group-hover:grayscale-0">🧹</span>
                <span className="text-xs font-bold text-white/70 group-hover:text-white uppercase tracking-tighter">Clear All Tabs</span>
              </button>
              <button onClick={() => handleStartOption(onShowDesktop)} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/10 rounded-xl transition-all group text-left">
                <span className="text-lg grayscale group-hover:grayscale-0">🖥️</span>
                <span className="text-xs font-bold text-white/70 group-hover:text-white uppercase tracking-tighter">Show Desktop</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button onClick={() => onAppClick('weather')} className="flex items-center gap-2 px-2 py-0.5 hover:bg-white/10 rounded-lg transition-colors border border-white/5">
          <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest flex items-center gap-2">🌤️ <span className="opacity-50">24°C</span></span>
        </button>
      </div>

      {/* --- CENTERED APP LIST --- */}
      <div className="flex-1 flex items-center justify-center h-full overflow-x-auto no-scrollbar scroll-smooth px-2">
        {displayedApps.length > 0 ? (
          <div className="flex items-center gap-2 bg-black/20 p-1 rounded-xl border border-white/5 min-w-max">
            {displayedApps.map((id) => {
              const isOpen = windows.some(w => w.id === id);
              const isActive = activeAppId === id;
              const isPinned = pinnedApps.includes(id);
              return (
                <div key={id} className="relative" onMouseEnter={() => setHoveredApp(id)} onMouseLeave={() => setHoveredApp(null)}>
                  <button
                    onClick={() => onAppClick(id)}
                    onContextMenu={(e) => handleContextMenu(e, id)}
                    className={`flex items-center justify-center rounded-lg transition-all h-7 w-7 px-1 relative group active:scale-[0.85] ${isActive ? 'bg-white/15' : 'hover:bg-white/10'}`}
                  >
                    <span className={`text-lg transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                      {customIcons[id] || APP_METADATA[id].icon}
                    </span>
                    {/* Indicator: wider line for open apps, dot for pinned-only */}
                    {isOpen && <div className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[1.5px] rounded-full transition-all ${isActive ? 'w-3 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'w-1 bg-white/40'}`}></div>}
                    {!isOpen && isPinned && <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/20"></div>}
                  </button>
                  <AnimatePresence>
                    {hoveredApp === id && (
                      <motion.div initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.9 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 glass-dark p-3 rounded-xl border border-white/10 min-w-[140px] shadow-2xl pointer-events-none">
                        <div className="text-[9px] font-black uppercase tracking-widest text-blue-400 mb-1">{APP_METADATA[id].title}</div>
                        <div className="text-[10px] text-white/60 font-medium leading-tight">{APP_METADATA[id].description}</div>
                        {isPinned && <div className="text-[8px] text-white/30 mt-2 uppercase tracking-widest">Pinned</div>}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
            Right-click apps to pin
          </div>
        )}
      </div>

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{ left: contextMenu.x - 80, bottom: 50 }}
            className="fixed glass-dark rounded-xl border border-white/10 shadow-2xl p-1 min-w-[160px] z-[9999]"
            onClick={(e) => e.stopPropagation()}
          >
            {pinnedApps.includes(contextMenu.appId) ? (
              <button
                onClick={() => { onUnpinApp(contextMenu.appId); setContextMenu(null); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/10 rounded-lg transition-all text-left"
              >
                <span className="text-sm">📌</span>
                <span className="text-xs font-bold text-white/80">Unpin from Taskbar</span>
              </button>
            ) : (
              <button
                onClick={() => { onPinApp(contextMenu.appId); setContextMenu(null); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/10 rounded-lg transition-all text-left"
              >
                <span className="text-sm">📌</span>
                <span className="text-xs font-bold text-white/80">Pin to Taskbar</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SYSTEM TRAY AREA (RIGHT) --- */}
      <div className="flex-none w-[30%] flex items-center justify-end h-full px-3 relative">

        {/* System Icons Button */}
        <button
          onClick={() => {
            setIsActionCenterOpen(!isActionCenterOpen);
            setIsCalendarOpen(false);
            setIsStartMenuOpen(false);
          }}
          className={`flex gap-2 px-1.5 py-0.5 rounded-lg transition-all border border-transparent ${isActionCenterOpen ? 'bg-white/20 border-white/10 shadow-lg' : 'hover:bg-white/10'}`}
        >
          <span className={`text-xs transition-opacity ${btEnabled ? 'opacity-100' : 'opacity-30'}`}>🌐</span>
          <span className={`text-xs transition-opacity ${volume > 0 ? 'opacity-100' : 'opacity-30'}`}>{volume === 0 ? '🔇' : '🔊'}</span>
          <span className="text-xs">🔋</span>
        </button>

        {/* Action Center Flyout */}
        <AnimatePresence>
          {isActionCenterOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-14 right-4 w-72 glass-dark rounded-[1.5rem] border border-white/10 shadow-2xl p-4 overflow-hidden"
            >
              <div className="grid grid-cols-3 gap-2 mb-6">
                {[
                  { label: 'Wi-Fi', icon: '🌐', active: wifiEnabled, toggle: () => setWifiEnabled(!wifiEnabled) },
                  { label: 'Bluetooth', icon: '🦷', active: btEnabled, toggle: () => setBtEnabled(!btEnabled) },
                  { label: 'Flight', icon: '✈️', active: airplaneMode, toggle: () => setAirplaneMode(!airplaneMode) },
                ].map(item => (
                  <button
                    key={item.label}
                    onClick={item.toggle}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all ${item.active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-white/5 text-white/40 border border-white/5 hover:bg-white/10'}`}>
                      {item.icon}
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors">{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Master Volume</span>
                    <span className="text-[9px] font-black text-blue-400">{volume}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs">🔊</span>
                    <input
                      type="range" min="0" max="100" value={volume}
                      onChange={(e) => setVolume(parseInt(e.target.value))}
                      className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[9px] font-black uppercase text-white/40 tracking-widest">Battery: 85%</span>
                </div>
                <button onClick={() => handleStartOption(onShutdown)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 flex items-center justify-center transition-all group">
                  <span className="text-sm grayscale group-hover:grayscale-0">🛑</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Clock Button */}
        <button
          onClick={() => {
            setIsCalendarOpen(!isCalendarOpen);
            setIsActionCenterOpen(false);
            setIsStartMenuOpen(false);
          }}
          className={`flex flex-col items-end px-2 py-0.5 rounded-lg transition-all ml-2 border border-transparent ${isCalendarOpen ? 'bg-white/20 border-white/10 shadow-lg' : 'hover:bg-white/10'}`}
        >
          <span className="text-[9px] font-black leading-tight text-white/90">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="text-[8px] font-bold leading-tight opacity-40 uppercase tracking-tighter text-white/80">
            {time.toLocaleDateString([], { day: '2-digit', month: '2-digit' })}
          </span>
        </button>

        {/* Calendar Flyout */}
        <AnimatePresence>
          {isCalendarOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-14 right-4 w-80 glass-dark rounded-[1.5rem] border border-white/10 shadow-2xl p-6 overflow-hidden"
            >
              <div className="border-b border-white/5 pb-6">
                <div className="text-4xl font-black text-white tracking-tighter mb-1">
                  {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-blue-400">
                  {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
              </div>

              {renderCalendar()}

              <div className="mt-8 pt-4 border-t border-white/5">
                <div className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-3">Recent Transmission</div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-3">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold text-white/80">System Hub</span>
                    <span className="text-[8px] text-white/30 uppercase">Just Now</span>
                  </div>
                  <p className="text-[10px] text-white/50 leading-relaxed font-medium">Welcome to DurraniOS. All systems are operational.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={onShowDesktop}
          className="w-1.5 h-full border-l border-white/5 hover:bg-white/10 transition-colors ml-2 active:bg-blue-500/50"
          title="Show Desktop"
        />
      </div>
    </div>
  );
};