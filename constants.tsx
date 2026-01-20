import React from 'react';
import { AppId, UserAccount } from './types';

export const USER_ACCOUNTS: UserAccount[] = [
  {
    id: 'technomancer',
    name: 'Technomancer',
    role: 'Full-Stack Developer',
    avatar: 'https://picsum.photos/seed/tech/200',
    defaultApp: 'studio'
  },
  {
    id: 'bard',
    name: 'The Bard',
    role: 'Poet & Writer',
    avatar: 'https://picsum.photos/seed/bard/200',
    defaultApp: 'bard'
  },
  {
    id: 'strategist',
    name: 'The Strategist',
    role: 'People Ops & HRPM',
    avatar: 'https://picsum.photos/seed/strat/200',
    defaultApp: 'peopleops'
  }
];

export const INITIAL_Z_INDEX = 100;

export interface AppMeta {
  title: string;
  icon: string;
  category: 'profile' | 'utility';
  description: string;
}

export const APP_METADATA: Record<AppId, AppMeta> = {
  studio: { title: 'Studio.app', icon: '💻', category: 'profile', description: 'Development Sandbox' },
  bard: { title: 'Bard.app', icon: '📜', category: 'profile', description: 'Creative Writing Studio' },
  peopleops: { title: 'PeopleOps.app', icon: '📊', category: 'profile', description: 'Operations Control Room' },
  projects: { title: 'Projects.app', icon: '📁', category: 'utility', description: 'Project Archive' },
  resume: { title: 'Resume.pdf', icon: '📄', category: 'utility', description: 'Curriculum Vitae' },
  contact: { title: 'Contact.app', icon: '✉️', category: 'utility', description: 'Communication Terminal' },
  terminal: { title: 'Terminal.app', icon: '⌨️', category: 'utility', description: 'Command Shell' },
  weather: { title: 'Weather.app', icon: '🌤️', category: 'utility', description: 'Atmospheric Data' },
  tictactoe: { title: 'TicTacToe', icon: '❌', category: 'utility', description: 'Casual Gaming' },
  calculator: { title: 'Calc-y.app', icon: '🧮', category: 'utility', description: 'Quick Calculations' },
  editor: { title: 'Notes.app', icon: '📝', category: 'utility', description: 'Pastel Notes Editor' },
  gallery: { title: 'Gallery', icon: 'media/login.png', category: 'utility', description: 'Photo Gallery' },
};