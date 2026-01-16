
import React, { useState, useRef, useEffect } from 'react';
import { AppId } from '../../types';
import { APP_METADATA } from '../../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface DesktopProps {
  onIconClick: (id: AppId) => void;
  children: React.ReactNode;
}

interface IconPos {
  x: number;
  y: number;
}

const GRID_SIZE = 70;
const PADDING = 15;

export const Desktop: React.FC<DesktopProps> = ({ onIconClick, children }) => {
  const iconsList: AppId[] = ['studio', 'bard', 'peopleops', 'projects', 'resume', 'contact', 'terminal', 'weather', 'tictactoe', 'calculator', 'editor'];

  // Group icons
  const profiles = iconsList.filter(id => APP_METADATA[id].category === 'profile');
  const utilities = iconsList.filter(id => APP_METADATA[id].category === 'utility');

  const [isSpotlightVisible, setIsSpotlightVisible] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [iconPositions, setIconPositions] = useState<Record<AppId, IconPos>>({});

  const calculateLayout = () => {
    const height = window.innerHeight;
    const maxRows = Math.floor((height - PADDING * 2) / GRID_SIZE) - 1; // buffer for taskbar
    const newPositions: Record<string, IconPos> = {};

    // Place Profiles
    profiles.forEach((id, index) => {
      const col = Math.floor(index / maxRows);
      const row = index % maxRows;
      newPositions[id] = {
        x: PADDING + (col * GRID_SIZE),
        y: PADDING + (row * GRID_SIZE)
      };
    });

    // Place Utilities (start after profiles columns)
    const profileCols = Math.ceil(profiles.length / maxRows);
    utilities.forEach((id, index) => {
      const col = profileCols + Math.floor(index / maxRows);
      const row = index % maxRows;
      newPositions[id] = {
        x: PADDING + (col * GRID_SIZE),
        y: PADDING + (row * GRID_SIZE)
      };
    });

    return newPositions;
  };

  // Initial Layout & Resize Listener
  useEffect(() => {
    setIconPositions(calculateLayout());

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      setIconPositions(calculateLayout());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [draggingIcon, setDraggingIcon] = useState<{ id: AppId; offset: IconPos } | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<'view' | 'sort' | null>(null);
  const [iconSize, setIconSize] = useState<'small' | 'large'>('small');
  const [funnyPopup, setFunnyPopup] = useState<'folder' | 'personalize' | null>(null);
  const [wallpaper, setWallpaper] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop');

  const handleMouseDown = (e: React.MouseEvent, id: AppId) => {
    if (e.button !== 0) return;
    const pos = iconPositions[id];
    setDraggingIcon({
      id,
      offset: { x: e.clientX - pos.x, y: e.clientY - pos.y }
    });
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
    setActiveSubmenu(null);
  };

  // Sort icons function
  const sortIcons = (type: 'alphabetical' | 'randomized') => {
    const height = window.innerHeight;
    const maxRows = Math.floor((height - PADDING * 2) / GRID_SIZE) - 1;
    const sortedList = type === 'alphabetical'
      ? [...iconsList].sort((a, b) => APP_METADATA[a].title.localeCompare(APP_METADATA[b].title))
      : [...iconsList].sort(() => Math.random() - 0.5);

    const newPositions: Record<string, IconPos> = {};
    sortedList.forEach((id, index) => {
      const col = Math.floor(index / maxRows);
      const row = index % maxRows;
      newPositions[id] = {
        x: PADDING + (col * GRID_SIZE),
        y: PADDING + (row * GRID_SIZE)
      };
    });
    setIconPositions(newPositions);
    setContextMenu(null);
  };

  // Refresh icons to original layout
  const refreshIcons = () => {
    setIconPositions(calculateLayout());
    setContextMenu(null);
  };

  useEffect(() => {
    const handleGlobalClick = () => setContextMenu(null);
    window.addEventListener('click', handleGlobalClick);

    const handleWallpaperUpdate = (e: any) => {
      if (e.detail) setWallpaper(e.detail);
    };
    window.addEventListener('setWallpaper', handleWallpaperUpdate);

    return () => {
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('setWallpaper', handleWallpaperUpdate);
    };
  }, []);

  // Helper to check if a spot is occupied by another icon
  const isSpotOccupied = (x: number, y: number, excludeId: AppId, positions: Record<AppId, IconPos>) => {
    return Object.entries(positions).some(([id, pos]) => {
      return id !== excludeId && pos.x === x && pos.y === y;
    });
  };

  // Helper to find the nearest empty slot in a grid fashion
  const findAvailableSpot = (targetX: number, targetY: number, currentId: AppId, positions: Record<AppId, IconPos>) => {
    if (!isSpotOccupied(targetX, targetY, currentId, positions)) {
      return { x: targetX, y: targetY };
    }
    // Search area
    for (let col = 0; col < 10; col++) {
      for (let row = 0; row < 10; row++) {
        const testX = PADDING + (col * GRID_SIZE);
        const testY = PADDING + (row * GRID_SIZE);
        if (!isSpotOccupied(testX, testY, currentId, positions)) {
          return { x: testX, y: testY };
        }
      }
    }
    return { x: targetX, y: targetY };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggingIcon) return;
      setIconPositions(prev => ({
        ...prev,
        [draggingIcon.id]: {
          x: e.clientX - draggingIcon.offset.x,
          y: e.clientY - draggingIcon.offset.y
        }
      }));
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (draggingIcon) {
        const snappedX = Math.round((e.clientX - draggingIcon.offset.x - PADDING) / GRID_SIZE) * GRID_SIZE + PADDING;
        const snappedY = Math.round((e.clientY - draggingIcon.offset.y - PADDING) / GRID_SIZE) * GRID_SIZE + PADDING;

        setIconPositions(prev => {
          const finalPos = findAvailableSpot(snappedX, snappedY, draggingIcon.id, prev);
          return { ...prev, [draggingIcon.id]: finalPos };
        });
        setDraggingIcon(null);
      }
    };

    if (draggingIcon) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingIcon]);

  return (
    <div
      onContextMenu={handleContextMenu}
      className="relative h-full w-full overflow-hidden select-none"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/media/bg-clip.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>

      {/* Category Labels - Dynamic Position */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 z-0">
        <div
          className="absolute text-[9px] font-black uppercase tracking-[0.4em] text-white transform -rotate-90 origin-top-left"
          style={{
            left: `${PADDING + 20}px`,
            top: `${PADDING + 100}px`
          }}
        >
          PROFILES
        </div>
        {/* Simple dynamic check: if utilities define a new column, place label there */}
        <div
          className="absolute text-[9px] font-black uppercase tracking-[0.4em] text-white transform -rotate-90 origin-top-left"
          style={{
            left: `${PADDING + 20 + GRID_SIZE}px`,
            top: `${PADDING + 100}px`
          }}
        >
          UTILITIES
        </div>
      </div>

      {/* Desktop Icons */}
      {iconsList.map((id) => {
        const pos = iconPositions[id];
        if (!pos) return null; // Wait for layout calc
        const isDragging = draggingIcon?.id === id;

        return (
          <button
            key={id}
            onMouseDown={(e) => handleMouseDown(e, id)}
            onDoubleClick={() => onIconClick(id)}
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px)`,
              zIndex: isDragging ? 100 : 1
            }}
            className={`absolute flex flex-col items-center justify-center gap-0.5 rounded hover:bg-white/10 hover:backdrop-blur-md group transition-all duration-75 ${isDragging ? 'opacity-70 scale-105 cursor-grabbing' : 'cursor-grab active:scale-95'} ${iconSize === 'large' ? 'w-24 h-24' : 'w-16 h-16'}`}
          >
            <div className="relative">
              <span className={`filter drop-shadow-lg pointer-events-none block group-hover:scale-110 transition-transform ${iconSize === 'large' ? 'text-4xl' : 'text-2xl'}`}>
                {APP_METADATA[id].icon}
              </span>
            </div>
            <span className={`text-white font-bold drop-shadow-md text-center px-1 pointer-events-none uppercase tracking-tighter opacity-80 group-hover:opacity-100 leading-tight ${iconSize === 'large' ? 'text-[10px]' : 'text-[8px]'}`}>
              {APP_METADATA[id].title}
            </span>
          </button>
        );
      })}

      <AnimatePresence>
        {isSpotlightVisible && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-1/4 right-[10%] w-[400px] z-20"
          >
            <div className="glass-dark p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative">
              <button
                onClick={() => setIsSpotlightVisible(false)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors text-white/40 hover:text-white"
              >
                ✕
              </button>
              <h1 className="text-5xl font-black text-white tracking-tighter mb-2 italic">DURRANI ADIL KHAN</h1>
              <p className="text-white/40 font-medium text-sm mb-8 leading-relaxed">
                Multi-faceted Architect of Digital Experiences. Weaving code, poetry, and strategy into seamless operational systems.
              </p>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'studio', label: 'Explore the Lab', icon: '💻', color: 'bg-cyan-600' },
                  { id: 'bard', label: 'Read the Bard', icon: '📜', color: 'bg-amber-600' },
                  { id: 'peopleops', label: 'Check Ops Console', icon: '📊', color: 'bg-emerald-600' },
                ].map(cta => (
                  <button
                    key={cta.id}
                    onClick={() => onIconClick(cta.id as AppId)}
                    className={`flex items-center justify-between p-4 ${cta.color} hover:brightness-110 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all transform active:scale-[0.98] shadow-lg`}
                  >
                    <span className="flex items-center gap-3"><span>{cta.icon}</span> {cta.label}</span>
                    <span className="opacity-50">→</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {contextMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{ top: contextMenu.y, left: contextMenu.x }}
            className="fixed glass-dark w-48 rounded-xl p-1 z-[9999] shadow-2xl border border-white/10"
          >
            <div className="space-y-0.5">
              {/* View with submenu */}
              <div
                className="relative"
                onMouseEnter={() => setActiveSubmenu('view')}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <button className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg text-xs font-medium text-white/80 transition-colors flex justify-between items-center">
                  <span>View</span> <span className="text-[10px] opacity-40">▶</span>
                </button>
                {activeSubmenu === 'view' && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute left-full top-0 ml-1 glass-dark w-40 rounded-xl p-1 shadow-2xl border border-white/10"
                  >
                    <button
                      onClick={() => { setIconSize('large'); setContextMenu(null); }}
                      className={`w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg text-xs font-medium text-white/80 transition-colors flex items-center gap-2 ${iconSize === 'large' ? 'bg-white/10' : ''}`}
                    >
                      <span>🔲</span> Large Icons
                    </button>
                    <button
                      onClick={() => { setIconSize('small'); setContextMenu(null); }}
                      className={`w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg text-xs font-medium text-white/80 transition-colors flex items-center gap-2 ${iconSize === 'small' ? 'bg-white/10' : ''}`}
                    >
                      <span>🔳</span> Small Icons
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Sort by with submenu */}
              <div
                className="relative"
                onMouseEnter={() => setActiveSubmenu('sort')}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <button className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg text-xs font-medium text-white/80 transition-colors flex justify-between items-center">
                  <span>Sort by</span> <span className="text-[10px] opacity-40">▶</span>
                </button>
                {activeSubmenu === 'sort' && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute left-full top-0 ml-1 glass-dark w-40 rounded-xl p-1 shadow-2xl border border-white/10"
                  >
                    <button
                      onClick={() => sortIcons('alphabetical')}
                      className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg text-xs font-medium text-white/80 transition-colors flex items-center gap-2"
                    >
                      <span>🔤</span> Alphabetical
                    </button>
                    <button
                      onClick={() => sortIcons('randomized')}
                      className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg text-xs font-medium text-white/80 transition-colors flex items-center gap-2"
                    >
                      <span>🎲</span> Randomized
                    </button>
                  </motion.div>
                )}
              </div>

              <button onClick={refreshIcons} className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg text-xs font-medium text-white/80 transition-colors flex items-center gap-2">
                <span>🔄</span> Refresh
              </button>
              <div className="h-[1px] bg-white/10 my-1 mx-2"></div>
              <button onClick={() => { setFunnyPopup('folder'); setContextMenu(null); }} className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg text-xs font-medium text-white/80 transition-colors flex items-center gap-2">
                <span>📁</span> New Folder
              </button>
              <div className="h-[1px] bg-white/10 my-1 mx-2"></div>
              <button onClick={() => onIconClick('terminal')} className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg text-xs font-medium text-white/80 transition-colors flex items-center gap-2">
                <span>⌨️</span> Open Terminal
              </button>
              <button onClick={() => { setFunnyPopup('personalize'); setContextMenu(null); }} className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg text-xs font-medium text-white/80 transition-colors flex items-center gap-2">
                <span>🎨</span> Personalize
              </button>
              <button
                onClick={() => { setIsSpotlightVisible(true); setContextMenu(null); }}
                className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-blue-400 transition-colors"
              >
                Restore Spotlight
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Funny Popup Modals */}
      <AnimatePresence>
        {funnyPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[10000]"
            onClick={() => setFunnyPopup(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-dark max-w-md p-8 rounded-3xl border border-white/10 shadow-2xl text-center"
            >
              {funnyPopup === 'folder' ? (
                <>
                  <div className="text-6xl mb-4">📁</div>
                  <h2 className="text-2xl font-black text-white mb-3">New Folder?</h2>
                  <p className="text-white/60 text-sm mb-6 leading-relaxed">
                    Why do you need a new folder?<br />
                    This is MY desktop, not a file manager!<br />
                    <span className="text-xs italic opacity-60">Just kidding... but still no.</span>
                  </p>
                </>
              ) : (
                <>
                  <div className="text-6xl mb-4">🎨</div>
                  <h2 className="text-2xl font-black text-white mb-3">Personalize?</h2>
                  <p className="text-white/60 text-sm mb-6 leading-relaxed">
                    Why do you think I'll let you personalize MY OS?<br />
                    I spent hours picking this wallpaper!<br />
                    <span className="text-xs italic opacity-60">Maybe in version 2.0... maybe.</span>
                  </p>
                </>
              )}
              <button
                onClick={() => setFunnyPopup(null)}
                className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold text-sm transition-colors"
              >
                Fair Enough
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </div>
  );
};
