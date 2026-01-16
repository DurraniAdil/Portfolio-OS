
import { useState, useCallback } from 'react';
import { AppId, WindowState, WindowBounds } from '../types';
import { APP_METADATA, INITIAL_Z_INDEX } from '../constants';

export const useWindowManager = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [focusedId, setFocusedId] = useState<AppId | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(INITIAL_Z_INDEX);

  const openApp = useCallback((id: AppId) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      const newZ = maxZIndex + 1;
      setMaxZIndex(newZ);
      setFocusedId(id);

      if (existing) {
        return prev.map((w) =>
          w.id === id ? { ...w, isMinimized: false, zIndex: newZ } : w
        );
      }

      const screenW = window.innerWidth;
      const screenH = window.innerHeight;

      // App-specific window sizes
      const appSizes: Partial<Record<AppId, { w: number; h: number }>> = {
        calculator: { w: 360, h: 580 },
        tictactoe: { w: 450, h: 550 },
      };

      const defaultW = appSizes[id]?.w ?? 900;
      const defaultH = appSizes[id]?.h ?? 600;

      const centerX = (screenW - defaultW) / 2;
      const centerY = (screenH - defaultH) / 3;

      const offset = prev.length * 30;
      // Ensure we don't cascade off screen
      const safeX = (centerX + offset + defaultW > screenW) ? centerX : centerX + offset;
      const safeY = (centerY + offset + defaultH > screenH) ? centerY : centerY + offset;

      const newWindow: WindowState = {
        id,
        title: APP_METADATA[id].title,
        icon: APP_METADATA[id].icon,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: newZ,
        x: Math.max(10, safeX),
        y: Math.max(10, safeY),
        width: defaultW,
        height: defaultH,
      };

      return [...prev, newWindow];
    });
  }, [maxZIndex]);

  const closeApp = useCallback((id: AppId) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setFocusedId((current) => current === id ? null : current);
  }, []);

  const closeAll = useCallback(() => {
    setWindows([]);
    setFocusedId(null);
  }, []);

  const minimizeApp = useCallback((id: AppId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    setFocusedId((current) => current === id ? null : current);
  }, []);

  const minimizeAll = useCallback(() => {
    setWindows((prev) => prev.map((w) => ({ ...w, isMinimized: true })));
    setFocusedId(null);
  }, []);

  const focusApp = useCallback((id: AppId) => {
    const newZ = maxZIndex + 1;
    setMaxZIndex(newZ);
    setFocusedId(id);
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w))
    );
  }, [maxZIndex]);

  const updateWindowBounds = useCallback((id: AppId, bounds: Partial<WindowState>) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...bounds } : w))
    );
  }, []);

  const toggleMaximize = useCallback((id: AppId) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          if (!w.isMaximized) {
            return {
              ...w,
              isMaximized: true,
              restoreBounds: { x: w.x, y: w.y, width: w.width, height: w.height }
            };
          } else {
            return {
              ...w,
              isMaximized: false,
              ...(w.restoreBounds || {})
            };
          }
        }
        return w;
      })
    );
  }, []);

  return {
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
  };
};
