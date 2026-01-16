export type AppId = 'studio' | 'bard' | 'peopleops' | 'projects' | 'resume' | 'contact' | 'terminal' | 'weather' | 'tictactoe' | 'calculator' | 'editor';

export interface WindowBounds {
  x: number;
  y: number;
  width: number | string;
  height: number | string;
}

export interface WindowState extends WindowBounds {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  icon: string;
  restoreBounds?: WindowBounds;
}

export type Persona = 'technomancer' | 'bard' | 'strategist';

export interface UserAccount {
  id: Persona;
  name: string;
  role: string;
  avatar: string;
  defaultApp: AppId;
}