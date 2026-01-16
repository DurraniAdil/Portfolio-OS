
export type ContactIntent = 'developer' | 'peopleops' | 'writer' | 'other';

export interface ContactFormData {
  name: string;
  email: string;
  intent: ContactIntent;
  message: string;
  // Dynamic fields
  roleType?: string;
  projectLink?: string;
  budget?: string;
  timeline?: string;
  teamSize?: string;
  opsScope?: string;
  contentType?: string;
  niche?: string;
  wordCount?: string;
  deadline?: string;
  // Honeypot
  website?: string; 
}

export type FormStatus = 'idle' | 'sending' | 'success' | 'error';
