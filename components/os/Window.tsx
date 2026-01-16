
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { WindowState, WindowBounds } from '../../types';

interface WindowProps {
  window: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  updateBounds: (bounds: Partial<WindowState>) => void;
  isFocused: boolean;
  children: React.ReactNode;
}

type SnapType = 'none' | 'maximize' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw' | null;

const MIN_WIDTH = 250;
const MIN_HEIGHT = 150;

export const Window: React.FC<WindowProps> = ({
  window,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  updateBounds,
  isFocused,
  children
}) => {
  const [bounds, setBounds] = useState<WindowBounds>({ x: window.x, y: window.y, width: window.width, height: window.height });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDir, setResizeDir] = useState<ResizeDirection>(null);
  const [snapType, setSnapType] = useState<SnapType>('none');

  const dragOffset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0, left: 0, top: 0 });

  // Sync state if external changes happen (like maximize or snapping from parent)
  useEffect(() => {
    if (!isDragging && !isResizing) {
      setBounds({ x: window.x, y: window.y, width: window.width, height: window.height });
    }
  }, [window.x, window.y, window.width, window.height, isDragging, isResizing]);

  // Global cursor handling to prevent flickering during fast mouse movements
  useEffect(() => {
    if (isResizing && resizeDir) {
      const cursorMap: Record<string, string> = {
        n: 'ns-resize', s: 'ns-resize', e: 'ew-resize', w: 'ew-resize',
        ne: 'nesw-resize', sw: 'nesw-resize', nw: 'nwse-resize', se: 'nwse-resize'
      };
      document.body.style.cursor = cursorMap[resizeDir] || 'default';
      // Disable text selection while resizing
      document.body.style.userSelect = 'none';
    } else if (isDragging) {
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, isDragging, resizeDir]);

  const handleDragStart = (e: React.PointerEvent) => {
    if (window.isMinimized) return;
    onFocus();
    if (window.isMaximized) return;
    setIsDragging(true);
    e.preventDefault(); // Prevent scrolling on touch
    dragOffset.current = {
      x: e.clientX - (typeof bounds.x === 'number' ? bounds.x : 0),
      y: e.clientY - (typeof bounds.y === 'number' ? bounds.y : 0)
    };
  };

  const handleResizeStart = (e: React.PointerEvent, dir: ResizeDirection) => {
    e.stopPropagation();
    if (window.isMinimized) return;
    onFocus();
    if (window.isMaximized) return;
    setIsResizing(true);
    setResizeDir(dir);
    e.preventDefault();
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      w: typeof bounds.width === 'number' ? bounds.width : 0,
      h: typeof bounds.height === 'number' ? bounds.height : 0,
      left: typeof bounds.x === 'number' ? bounds.x : 0,
      top: typeof bounds.y === 'number' ? bounds.y : 0
    };
  };

  const getSnapPreviewStyle = (type: SnapType): React.CSSProperties | null => {
    const taskbarHeight = 40;
    const w = innerWidth;
    const h = innerHeight - taskbarHeight;

    switch (type) {
      case 'maximize': return { top: 0, left: 0, width: '100%', height: h };
      case 'left': return { top: 0, left: 0, width: '50%', height: h };
      case 'right': return { top: 0, left: '50%', width: '50%', height: h };
      case 'top-left': return { top: 0, left: 0, width: '50%', height: h / 2 };
      case 'top-right': return { top: 0, left: '50%', width: '50%', height: h / 2 };
      case 'bottom-left': return { top: h / 2, left: 0, width: '50%', height: h / 2 };
      case 'bottom-right': return { top: h / 2, left: '50%', width: '50%', height: h / 2 };
      default: return null;
    }
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        e.preventDefault();
        const newX = e.clientX - dragOffset.current.x;
        const newY = e.clientY - dragOffset.current.y;
        setBounds(prev => ({ ...prev, x: newX, y: newY }));

        const threshold = 15;
        const cornerThreshold = 40;
        const { clientX: x, clientY: y } = e;
        const screenW = innerWidth;
        const screenH = innerHeight - 40;

        let type: SnapType = 'none';
        if (y < threshold) {
          if (x < cornerThreshold) type = 'top-left';
          else if (x > screenW - cornerThreshold) type = 'top-right';
          else type = 'maximize';
        } else if (y > screenH - threshold) {
          if (x < cornerThreshold) type = 'bottom-left';
          else if (x > screenW - cornerThreshold) type = 'bottom-right';
        } else if (x < threshold) {
          if (y < cornerThreshold) type = 'top-left';
          else if (y > screenH - cornerThreshold) type = 'bottom-left';
          else type = 'left';
        } else if (x > screenW - threshold) {
          if (y < cornerThreshold) type = 'top-right';
          else if (y > screenH - cornerThreshold) type = 'bottom-right';
          else type = 'right';
        }
        setSnapType(type);
      } else if (isResizing && resizeDir) {
        const dx = e.clientX - resizeStart.current.x;
        const dy = e.clientY - resizeStart.current.y;
        let newW = resizeStart.current.w;
        let newH = resizeStart.current.h;
        let newX = resizeStart.current.left;
        let newY = resizeStart.current.top;

        if (resizeDir.includes('e')) newW = Math.max(MIN_WIDTH, resizeStart.current.w + dx);
        if (resizeDir.includes('w')) {
          const requestedW = resizeStart.current.w - dx;
          newW = Math.max(MIN_WIDTH, requestedW);
          if (requestedW > MIN_WIDTH) newX = resizeStart.current.left + dx;
        }
        if (resizeDir.includes('s')) newH = Math.max(MIN_HEIGHT, resizeStart.current.h + dy);
        if (resizeDir.includes('n')) {
          const requestedH = resizeStart.current.h - dy;
          newH = Math.max(MIN_HEIGHT, requestedH);
          if (requestedH > MIN_HEIGHT) newY = resizeStart.current.top + dy;
        }
        setBounds({ x: newX, y: newY, width: newW, height: newH });
      }
    };

    const handlePointerUp = () => {
      if (isDragging) {
        setIsDragging(false);
        if (snapType !== 'none') {
          const style = getSnapPreviewStyle(snapType) as any;
          if (style) {
            const screenW = innerWidth;
            const screenH = innerHeight - 40;

            const parseMeasure = (val: any, total: number) => {
              if (typeof val === 'number') return val;
              if (typeof val === 'string' && val.endsWith('%')) return (parseFloat(val) / 100) * total;
              if (typeof val === 'string') return parseFloat(val);
              return 0;
            };

            updateBounds({
              x: parseMeasure(style.left, screenW),
              y: parseMeasure(style.top, screenH),
              width: parseMeasure(style.width, screenW),
              height: parseMeasure(style.height, screenH),
              isMaximized: snapType === 'maximize',
              restoreBounds: { x: window.x, y: window.y, width: window.width, height: window.height }
            });
          }
        } else {
          updateBounds({ x: bounds.x, y: bounds.y });
        }
        setSnapType('none');
      } else if (isResizing) {
        setIsResizing(false);
        setResizeDir(null);
        updateBounds({ x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height });
      }
    };

    if (isDragging || isResizing) {
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    }
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, isResizing, resizeDir, snapType, bounds, window, updateBounds]);

  const windowStyle: React.CSSProperties = window.isMaximized
    ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 40px)', zIndex: window.zIndex }
    : { top: bounds.y, left: bounds.x, width: bounds.width, height: bounds.height, zIndex: window.zIndex };

  const previewStyle = useMemo(() => getSnapPreviewStyle(snapType), [snapType]);

  return (
    <>
      {isDragging && snapType !== 'none' && previewStyle && (
        <div
          className="fixed bg-blue-500/20 border-2 border-blue-400/40 backdrop-blur-[2px] z-[9999] rounded-lg transition-all duration-300 ease-out pointer-events-none shadow-2xl"
          style={previewStyle}
        />
      )}

      <div
        className={`absolute glass rounded-xl flex flex-col overflow-visible win11-shadow transition-all ${isDragging || isResizing ? 'duration-0 scale-[0.99] opacity-90' : 'duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]'} ${isFocused ? 'ring-1 ring-white/30' : 'brightness-90'} ${window.isMinimized ? 'opacity-0 scale-75 translate-y-[100px] pointer-events-none' : 'opacity-100 scale-100 translate-y-0'}`}
        style={windowStyle}
        onClick={(e) => { e.stopPropagation(); onFocus(); }}
      >
        {!window.isMaximized && !window.isMinimized && (
          <>
            {/* Optimized Edge Hit Areas with Persisting Cursors */}
            <div onPointerDown={(e) => handleResizeStart(e, 'n')} className="absolute -top-1 left-1 right-1 h-3 cursor-ns-resize z-10 hover:bg-white/5" />
            <div onPointerDown={(e) => handleResizeStart(e, 's')} className="absolute -bottom-1 left-1 right-1 h-3 cursor-ns-resize z-10 hover:bg-white/5" />
            <div onPointerDown={(e) => handleResizeStart(e, 'w')} className="absolute top-1 bottom-1 -left-1 w-3 cursor-ew-resize z-10 hover:bg-white/5" />
            <div onPointerDown={(e) => handleResizeStart(e, 'e')} className="absolute top-1 bottom-1 -right-1 w-3 cursor-ew-resize z-10 hover:bg-white/5" />

            {/* Precise Corner Hit Areas */}
            <div onPointerDown={(e) => handleResizeStart(e, 'nw')} className="absolute -top-1 -left-1 w-5 h-5 cursor-nwse-resize z-20 hover:bg-blue-400/10" />
            <div onPointerDown={(e) => handleResizeStart(e, 'ne')} className="absolute -top-1 -right-1 w-5 h-5 cursor-nesw-resize z-20 hover:bg-blue-400/10" />
            <div onPointerDown={(e) => handleResizeStart(e, 'sw')} className="absolute -bottom-1 -left-1 w-5 h-5 cursor-nesw-resize z-20 hover:bg-blue-400/10" />
            <div onPointerDown={(e) => handleResizeStart(e, 'se')} className="absolute -bottom-1 -right-1 w-5 h-5 cursor-nwse-resize z-20 hover:bg-blue-400/10" />
          </>
        )}

        <div className="flex-1 flex flex-col overflow-hidden rounded-xl">
          <div
            className={`h-9 flex items-center justify-between px-3 cursor-default select-none bg-white/5 shrink-0 transition-colors ${isDragging ? 'bg-white/10' : ''}`}
            onPointerDown={handleDragStart}
            onDoubleClick={(e) => { e.stopPropagation(); onMaximize(); }}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">{window.icon}</span>
              <span className="text-xs font-medium text-white/80">{window.title}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} className="w-6 h-6 rounded-md hover:bg-white/10 flex items-center justify-center transition-colors">
                <span className="w-2 h-[1px] bg-white"></span>
              </button>
              <button onClick={(e) => { e.stopPropagation(); onMaximize(); }} className="w-6 h-6 rounded-md hover:bg-white/10 flex items-center justify-center transition-colors">
                <div className="w-2 h-2 border border-white rounded-sm"></div>
              </button>
              <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="w-6 h-6 rounded-md hover:bg-red-500 flex items-center justify-center transition-colors group/close">
                <span className="text-white text-sm group-hover/close:scale-110 transition-transform">×</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto bg-black/40 backdrop-blur-md relative">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
