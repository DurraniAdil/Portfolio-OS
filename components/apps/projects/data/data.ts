
export interface PersonalProject {
  id: string;
  title: string;
  role: string;
  description: string;
  bullets: string[];
  stack: string[];
  status: 'Public' | 'Private' | 'WIP';
  links?: { live?: string; github?: string; caseStudy?: string };
  isPrivate?: boolean;
}

export const PERSONAL_PROJECTS: PersonalProject[] = [
  {
    id: 'dekonstrt',
    title: 'dekonstrt',
    role: 'Lead Frontend Engineer',
    status: 'Public',
    description: 'AI-Powered Code Analysis & Deconstruction Tool designed to turn complex source code into beginner-level understanding through semantic AI analysis.',
    bullets: [
      'Built SPA using React 19 + TypeScript for high-performance code deconstruction.',
      'Integrated Advanced LLM Model to generate structured JSON-schema explanations including line-by-line walkthroughs and architectural breakdowns.',
      'Implemented GitHub REST API integration for repository browsing and source code fetching.',
      'Developed Local project browsing using Directory Upload API (webkitdirectory) for client-side privacy.',
      'Designed interactive multi-tab workspace with synced scroll between code and explanation.'
    ],
    stack: ['React 19', 'TypeScript', 'Tailwind', 'AI API', 'GitHub REST API', 'Browser Directory Upload', 'Markdown export'],
    links: { github: '#', live: '#' }
  },
  {
    id: 'thematic-translator',
    title: 'Thematic Translator',
    role: 'Linguistic AI Engineer',
    status: 'Public',
    description: 'Specialized AI Digitization & Linguistic Analysis Suite for digitizing and translating Urdu poetry archives into structured logical objects.',
    bullets: [
      'Leveraged Advanced LLM API for high-fidelity digitization of poetic manuscripts.',
      'Enforced persona-based system instructions ("Aref" vs "Seeker") to maintain philosophical nuances.',
      'Built ETL-style multi-modal synthesis to merge disparate PDFs and text files into a unified database.',
      'Implemented automated one-line thematic context generation for cross-lingual analysis.',
      'Engineered an "architectural interface" using React + Tailwind for complex drag-drop processing.'
    ],
    stack: ['React', 'TypeScript', 'Tailwind', 'AI API', 'Prompt engineering', 'Multi-PDF synthesis', 'jsPDF', 'JSON serialization'],
    links: { github: '#' }
  },
  {
    id: 'repo-to-prompt',
    title: 'Repo-to-Prompt',
    role: 'Lead Developer',
    status: 'Public',
    description: 'Context-Aware AI Prompt Engineering Platform that reverse-engineers GitHub repositories to generate optimized prompts for LLM modernization.',
    bullets: [
      'Engineered repository parsing logic using GitHub REST API to identify critical architectural files.',
      'Implemented automated tech-stack detection based on manifests and file extensions.',
      'Designed persona-based prompt generators (Recreation vs Revamp) for targeted LLM outputs.',
      'Optimized token usage by prioritizing core files and filtering binary/non-essential data.',
      'Enhanced UX with glassmorphism, staggered animations, and copy-to-clipboard functionality.'
    ],
    stack: ['React 19', 'TypeScript', 'Tailwind', 'GitHub REST API', 'Prompt engineering', 'Base64/UTF-8', 'Optimization'],
    links: { github: '#', live: '#' }
  },
  {
    id: 'ibn-e-adil',
    title: 'ibn-e-adil',
    role: 'Creator & Architect',
    status: 'WIP',
    description: 'Personal Website / Literary-Tech Identity Site serving as an interactive convergence of professional engineering and literary artistry.',
    bullets: [
      'Created a multi-modal interactive web experience with highly themed literary and dev pages.',
      'Utilized advanced Framer Motion sequences for fluid navigation and storytelling.',
      'Designed custom typography-driven layouts for poetical archival.',
      'Implemented responsive design systems tailored for high-resolution desktop OS simulation.'
    ],
    stack: ['React', 'TypeScript', 'Motion/Animations', 'Themed pages', 'Portfolio'],
    links: { live: '#' }
  },
  {
    id: 'medical-quiz',
    title: 'Medical Quiz App',
    role: 'Full-stack Developer',
    status: 'Private',
    isPrivate: true,
    description: 'Full-stack medical training system with dynamic question seeding and performance tracking.',
    bullets: [
      'Developed Node/Express backend to manage a robust medical question database.',
      'Implemented JSON-driven question datasets with automated seed scripts.',
      'Built custom database layer for session persistence and scoring logic.',
      'Designed secure administrative interface for question management.'
    ],
    stack: ['Node.js', 'Express', 'JavaScript', 'JSON dataset', 'Seed scripts', 'Backend'],
    links: {}
  }
];
