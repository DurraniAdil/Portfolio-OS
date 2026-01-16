
export interface WritingProject {
  id: string;
  title: string;
  type: 'published' | 'manuscript';
  role: string;
  publisher?: string;
  year: string;
  genre: string;
  status: 'In Press' | 'Published' | 'Drafting' | 'Editing';
  description: string;
  highlights: string[];
  themes: string[];
  metrics?: string;
}

export const WRITING_PROJECTS: WritingProject[] = [
  {
    id: 'voices-unbound',
    title: 'Voices Unbound: Volume Two',
    type: 'published',
    role: 'Featured Author',
    publisher: 'The Favourite Tales',
    year: '2023',
    genre: 'Contemporary Poetry',
    status: 'Published',
    description: 'A distinguished international anthology curated to showcase diverse literary voices. My contribution focused on the intersection of modern existentialism and traditional poetic forms.',
    highlights: [
      'Selected from a global pool of applicants for featured status.',
      'Explored themes of cultural identity and digital isolation.',
      'Contributed to a collection that reached international distribution channels.'
    ],
    themes: ['Identity', 'Modernity', 'Existentialism'],
    metrics: 'International Circulation'
  },
  {
    id: 'stardust-sentences',
    title: 'Stardust and Sentences: Vol 5',
    type: 'published',
    role: 'Lead Contributor',
    publisher: 'Acclaimed Series',
    year: '2022',
    genre: 'Prose Poetry',
    status: 'Published',
    description: 'An exploration of the celestial and the mundane. This volume experimented with "Literary Entropy"—the transformation of meaning across linguistic filters.',
    highlights: [
      'Experimented with unconventional sentence structures and rhythmic prose.',
      'Investigated the relationship between cosmic phenomena and human psychology.',
      'Collaborated with editors to refine the volume’s overarching thematic cohesion.'
    ],
    themes: ['Celestial', 'Linguistic Theory', 'Human Nature'],
    metrics: 'Top Rated in Series'
  },
  {
    id: 'she-raises',
    title: 'She Raises, India Shines',
    type: 'published',
    role: 'Awarded Author',
    publisher: 'Blue Cloud Publishers',
    year: '2023',
    genre: 'Anthology / Social Commentary',
    status: 'Published',
    description: 'An anthology honoring the strength and resilience of modern Indian women. This work merged socio-political observation with lyrical narrative.',
    highlights: [
      'Recipient of the contributor recognition award for excellence in storytelling.',
      'Focused on the narrative of female empowerment in semi-urban India.',
      'Bridged the gap between traditional storytelling and modern socio-economic reality.'
    ],
    themes: ['Empowerment', 'Socio-Political', 'Cultural Resilience'],
    metrics: 'Contributor Recognition Award'
  },
  {
    id: 'nazm-e-adil',
    title: 'Nazm-e-Adil (Vol 1 & 2)',
    type: 'manuscript',
    role: 'Author / Poet',
    year: '2024',
    genre: 'Sufi Metaphysical Poetry',
    status: 'Editing',
    description: 'A massive poetic cycle comprising 39 paradoxes. The work acts as a bridge between the physical world of engineering and the metaphysical realm of Sufi mysticism.',
    highlights: [
      'Vol 1: Focuses on the struggle of the self (Nafs) and ego dissolution.',
      'Vol 2: Explores the state of absolute annihilation (Fanaa) and divine unity.',
      'Utilizes binary logic metaphors to explain complex metaphysical concepts.'
    ],
    themes: ['Sufism', 'Paradox', 'Self-Annihilation', 'Logic'],
    metrics: '39 Poems Complete'
  },
  {
    id: 'greek-latin-fragments',
    title: 'Greek & Latin Fragments',
    type: 'manuscript',
    role: 'Author',
    year: '2023',
    genre: 'Classical Metaphysical Poetry',
    status: 'Drafting',
    description: 'A collection of 35 poems that integrate ancient mythological archetypes with modern metaphysical reflection, rooted in classical maxims.',
    highlights: [
      '13 poems inspired by Greek literary terms (Kairos, Aporia).',
      '22 poems developed from Latin maxims exploring time and mortality.',
      'Synthesized classical imagery with contemporary existential anxieties.'
    ],
    themes: ['Mythology', 'Classicism', 'Philosophy of Time'],
    metrics: '35 Poems Drafted'
  },
  {
    id: 'metaphysics-silence',
    title: 'The Metaphysics of Silence',
    type: 'manuscript',
    role: 'Author / Essayist',
    year: '2024',
    genre: 'Philosophical Non-Fiction',
    status: 'Drafting',
    description: 'An existential investigation into the nature of pain, faith, and quietude. A deep dive into the "architecture of silence" within the human experience.',
    highlights: [
      'Over 15,000 words of researched existential investigation.',
      'Analysis of the intersection between physical illness and spiritual growth.',
      'Exploration of silence as a medium for profound internal communication.'
    ],
    themes: ['Pain', 'Faith', 'Silence', 'Ontology'],
    metrics: '15,000+ Words'
  }
];
