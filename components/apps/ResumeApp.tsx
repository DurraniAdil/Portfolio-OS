import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ResumeType = 'developer' | 'writer' | 'operations';

export const ResumeApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ResumeType>('developer');
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenSection = (e: CustomEvent<ResumeType>) => {
      if (['developer', 'writer', 'operations'].includes(e.detail)) {
        setActiveTab(e.detail);
      }
    };
    window.addEventListener('openResumeSection', handleOpenSection as EventListener);
    return () => window.removeEventListener('openResumeSection', handleOpenSection as EventListener);
  }, []);

  const tabs: { id: ResumeType; label: string; icon: string }[] = [
    { id: 'developer', label: 'Frontend Developer', icon: '' },
    { id: 'writer', label: 'Content Writer', icon: '' },
    { id: 'operations', label: 'Project Manager', icon: '' },
  ];

  const handleDownloadPDF = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const renderDeveloperResume = () => (
    <div className="resume-container">
      {/* PAGE 1 */}
      <div className="resume-page">
        <div className="resume-paper font-sans">
          <header className="text-center mb-6">
            <h1 className="text-2xl font-bold tracking-[0.15em] mb-1 uppercase">DURRANI ADIL KHAN</h1>
            <div className="flex flex-wrap justify-center items-center gap-2 text-[9px] text-zinc-600 font-bold uppercase tracking-wider">
              <span>Maharashtra, Aurangabad</span> <span>◇</span>
              <span>7028512087</span> <span>◇</span>
              <a href="mailto:durraniadil13@gmail.com" className="hover:text-blue-600">durraniadil13@gmail.com</a> <span>◇</span>
              <a href="https://github.com/durraniadil13" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">GitHub</a>
            </div>
          </header>

          <section className="mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-zinc-800 pb-0.5 mb-2">Summary</h2>
            <p className="text-[10px] leading-relaxed text-zinc-700">
              Front-end developer with hands-on experience building responsive, user-centric web applications using React.js, TypeScript, and modern UI frameworks. Proven track record in creating interactive tools, authentication systems, and dynamic web experiences with clean, maintainable code. Passionate about pixel-perfect design and seamless user experiences.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-zinc-800 pb-0.5 mb-2">Technical Skills</h2>
            <div className="space-y-1 text-[10px]">
              <p><span className="font-black">Languages & Frameworks:</span> JavaScript (ES6+), TypeScript, React.js, Next.js, HTML5, CSS3, Node.js</p>
              <p><span className="font-black">Styling & Design:</span> Tailwind CSS, Sass, Bootstrap, Framer Motion, Responsive Design, UI/UX Principles</p>
              <p><span className="font-black">State & APIs:</span> Context API, Redux Toolkit, REST APIs, Fetch API, Firebase</p>
              <p><span className="font-black">Tools & Platforms:</span> Git, GitHub, Webpack, Vite, Vercel, Netlify, Postman, Figma</p>
            </div>
          </section>

          <section className="mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-zinc-800 pb-0.5 mb-2">Professional Experience</h2>
            <div>
              <div className="flex justify-between font-black text-[10px] mb-0.5">
                <h3>Project Manager - Be Endless, Aurangabad</h3>
                <span>Nov 25 - Present</span>
              </div>
              <ul className="list-disc ml-4 text-[10px] text-zinc-700 space-y-0.5">
                <li>Serve as sole client-facing lead for 4+ web development projects, translating business requirements into technical deliverables</li>
                <li>Maintain 95%+ client satisfaction rate through proactive communication and strategic problem-solving</li>
                <li>Designed and implemented standardized development pipeline workflow, reducing project turnaround time by 20%</li>
              </ul>
            </div>
          </section>

          <section className="mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-zinc-800 pb-0.5 mb-2">Projects (Page 1 of 2)</h2>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between font-black text-[10px] mb-0.5">
                  <h3>DEKONSTRT - AI Code Analysis Tool</h3>
                  <span>2025</span>
                </div>
                <ul className="list-disc ml-4 text-[10px] text-zinc-700 space-y-0.5">
                  <li>AI-Powered Code Analysis & Deconstruction Tool designed to turn complex source code into beginner-level understanding through semantic analysis</li>
                  <li>Tech Stack: React 19, TypeScript, Tailwind CSS, API Integration</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between font-black text-[10px] mb-0.5">
                  <h3>THEMATIC TRANSLATOR - Linguistic AI Suite</h3>
                  <span>2025</span>
                </div>
                <ul className="list-disc ml-4 text-[10px] text-zinc-700 space-y-0.5">
                  <li>Specialized AI Digitization & Linguistic Analysis Suite for digitizing and translating Urdu poetry archives into structured logical objects</li>
                  <li>Tech Stack: React, TypeScript, Tailwind CSS, AI Integration</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between font-black text-[10px] mb-0.5">
                  <h3>IBN-E-ADIL - Personal Portfolio Website</h3>
                  <span>2025</span>
                </div>
                <ul className="list-disc ml-4 text-[10px] text-zinc-700 space-y-0.5">
                  <li>Personal Website / Literary-Tech Identity Site serving as an interactive convergence of professional engineering and literary artistry</li>
                  <li>Tech Stack: React, TypeScript, Framer Motion, Themed Pages</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* PAGE 2 */}
      <div className="resume-page">
        <div className="resume-paper font-sans">
          <header className="text-center mb-6 pb-3 border-b border-zinc-200">
            <h1 className="text-xl font-bold tracking-[0.15em] uppercase">DURRANI ADIL KHAN</h1>
            <p className="text-[8px] text-zinc-500 uppercase tracking-wider">Frontend Developer - Page 2</p>
          </header>

          <section className="mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-zinc-800 pb-0.5 mb-2">Projects (Continued)</h2>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between font-black text-[10px] mb-0.5">
                  <h3>Authapp - Firebase Authentication System</h3>
                  <span>Apr 2024</span>
                </div>
                <ul className="list-disc ml-4 text-[10px] text-zinc-700 space-y-0.5">
                  <li>Built full-stack authentication application using Firebase Authentication with Google sign-in and push notification support via Firebase Cloud Messaging (FCM)</li>
                  <li>Tech Stack: Next.js, React Native, Firebase, Expo</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between font-black text-[10px] mb-0.5">
                  <h3>EmployWise - Employee Management Frontend</h3>
                  <span>Mar 2024</span>
                </div>
                <ul className="list-disc ml-4 text-[10px] text-zinc-700 space-y-0.5">
                  <li>Designed responsive frontend for employee management system with login/logout functionality and protected routes</li>
                  <li>Tech Stack: React, React Router, Bootstrap</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between font-black text-[10px] mb-0.5">
                  <h3>Random Quote Machine - Motivational Quote Generator</h3>
                  <span>Nov 2024</span>
                </div>
                <ul className="list-disc ml-4 text-[10px] text-zinc-700 space-y-0.5">
                  <li>Developed dynamic quote generator with instant copy-to-clipboard functionality and Fetch API integration</li>
                  <li>Tech Stack: JavaScript, Fetch API, Tailwind CSS</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between font-black text-[10px] mb-0.5">
                  <h3>Pokédex App - Pokemon Encyclopedia</h3>
                  <span>Nov 2024</span>
                </div>
                <ul className="list-disc ml-4 text-[10px] text-zinc-700 space-y-0.5">
                  <li>Created interactive Pokemon database using PokeAPI integration with search and filter functionality</li>
                  <li>Tech Stack: JavaScript, REST API, CSS3</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-zinc-800 pb-0.5 mb-2">Education</h2>
            <div className="flex justify-between text-[10px] mb-2">
              <div>
                <p className="font-black">Bachelor of Technology in Computer Science</p>
                <p className="text-zinc-600">Dr. BATU, Lonere, Maharashtra</p>
              </div>
              <div className="text-right">
                <p className="font-black">July 26</p>
                <p className="text-zinc-600">CGPA: 8.34</p>
              </div>
            </div>
            <div className="flex justify-between text-[10px]">
              <div>
                <p className="font-black">Higher Secondary Certificate</p>
                <p className="text-zinc-600">Sir Sayyed College, Aurangabad</p>
              </div>
              <div className="text-right">
                <p className="font-black">March 21</p>
                <p className="text-zinc-600">92.6%</p>
              </div>
            </div>
          </section>

          <section className="mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-zinc-800 pb-0.5 mb-2">Certifications</h2>
            <div className="flex flex-col gap-1 text-[10px]">
              <div className="flex justify-between"><p>Frontend Development</p> <p className="font-bold">FreeCodeCamp</p></div>
              <div className="flex justify-between"><p>React.js Course</p> <p className="font-bold">Udemy</p></div>
              <div className="flex justify-between"><p>JavaScript Algorithms and Data Structures</p> <p className="font-bold">FreeCodeCamp</p></div>
            </div>
          </section>

          <section>
            <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-zinc-800 pb-0.5 mb-2">Additional Information</h2>
            <ul className="list-disc ml-4 text-[10px] text-zinc-700 space-y-0.5">
              <li>10 repositories on GitHub showcasing diverse frontend and full-stack projects</li>
              <li>Strong problem-solving skills with focus on clean code architecture</li>
              <li>Available for remote, hybrid, and on-site frontend development roles</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );

  const renderWriterResume = () => (
    <div className="resume-container">
      {/* PAGE 1 */}
      <div className="resume-page">
        <div className="resume-paper font-serif">
          <header className="text-center mb-6">
            <h1 className="text-2xl font-bold tracking-[0.1em] mb-1 uppercase">DURRANI ADIL KHAN</h1>
            <div className="flex flex-wrap justify-center items-center gap-2 text-[9px] text-zinc-600 font-bold uppercase tracking-wider">
              <span>Maharashtra, India</span> <span>◇</span>
              <span>7028512087</span> <span>◇</span>
              <a href="mailto:durraniadil13@gmail.com" className="hover:text-blue-600">durraniadil13@gmail.com</a> <span>◇</span>
              <a href="https://www.linkedin.com/in/durrani-adil-13/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">LinkedIn</a>
            </div>
          </header>

          <section className="mb-5">
            <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-zinc-800 pb-0.5 mb-2">Summary</h2>
            <p className="text-[10px] leading-relaxed text-zinc-800">
              Published poet and SEO content strategist with 2+ years of experience driving measurable traffic growth and engagement across creative, academic, and commercial domains. Delivered 100+ high-performance articles with proven results including 15% organic traffic increases. Featured author in 3 international anthologies with extensive portfolio spanning philosophical poetry, mythological works, and existential prose.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-zinc-800 pb-0.5 mb-2">Core Skills</h2>
            <div className="space-y-1 text-[10px]">
              <p><span className="font-black">Content Expertise:</span> SEO Writing, Copywriting, Creative Writing, Academic Research, Blog Development, Social Media Content, Poetry & Storytelling</p>
              <p><span className="font-black">Professional Skills:</span> Project Management, Research & Analysis, Stakeholder Engagement, Team Collaboration, Time Management, Campaign Strategy</p>
              <p><span className="font-black">Technical Tools:</span> WordPress, Google Analytics, SEO Tools (SEMrush, Ahrefs), MS Office Suite, Grammarly, Hemingway Editor, Canva</p>
            </div>
          </section>

          <section className="mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-zinc-800 pb-0.5 mb-2">Professional Experience</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between font-black text-[10px] mb-0.5">
                  <h3>Content Writer - TERN, Remote</h3>
                  <span>Aug 25 - Oct 25</span>
                </div>
                <ul className="list-disc ml-4 text-[10px] text-zinc-800 space-y-0.5">
                  <li>Drove organic search visibility by authoring 10+ research-intensive, SEO-optimized blogs on niche topics including AI in recruitment and global nurse migration</li>
                  <li>Generated 13,000+ words of long-form content (1,100-1,500 words per article) while maintaining 100% adherence to brand guidelines</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between font-black text-[10px] mb-0.5">
                  <h3>Academic Content Writer - MyMegaminds, Remote</h3>
                  <span>Nov 24 - Mar 25</span>
                </div>
                <ul className="list-disc ml-4 text-[10px] text-zinc-800 space-y-0.5">
                  <li>Delivered 40+ academic essays and research summaries across 15+ disciplines including literature, science, and Indian history</li>
                  <li>Maintained 100% compliance with APA and MLA citation standards, ensuring academic integrity across all deliverables</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between font-black text-[10px] mb-0.5">
                  <h3>Content Writer - Nettv4u, Remote</h3>
                  <span>Apr 24 - Sep 24</span>
                </div>
                <ul className="list-disc ml-4 text-[10px] text-zinc-800 space-y-0.5">
                  <li>Increased organic search traffic by 15% through creation of 40+ SEO-driven entertainment articles, biographies, and synopses over 6-month engagement</li>
                  <li>Applied strategic keyword targeting (3-5 keywords per article) to trending entertainment topics</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-3">
            <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-zinc-800 pb-0.5 mb-2">Professional Experience (Continued)</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between font-black text-[10px] mb-0.5">
                  <h3>Creative Content Writer - Pawwz, Remote</h3>
                  <span>Oct 23 - Feb 24</span>
                </div>
                <ul className="list-disc ml-4 text-[10px] text-zinc-800 space-y-0.5">
                  <li>Boosted follower engagement by 10% through development of 3 major social media campaigns and 4 monthly newsletters</li>
                  <li>Collaborated with 5-person cross-functional team (design and marketing) to deliver cohesive brand messaging</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* PAGE 2 */}
      <div className="resume-page">
        <div className="resume-paper font-serif">
          <header className="text-center mb-6 pb-3 border-b border-zinc-200">
            <h1 className="text-xl font-bold tracking-[0.1em] uppercase">DURRANI ADIL KHAN</h1>
            <p className="text-[8px] text-zinc-500 uppercase tracking-wider">Content Writer - Page 2</p>
          </header>

          <section className="mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-zinc-800 pb-0.5 mb-2">Professional Experience (Continued)</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between font-black text-[10px] mb-0.5">
                  <h3>Content Writer - NayePankh Foundation, Remote</h3>
                  <span>Jun 23 - Sep 23</span>
                </div>
                <ul className="list-disc ml-4 text-[10px] text-zinc-800 space-y-0.5">
                  <li>Increased online community engagement by 15% through strategic content for 2 social awareness campaigns focused on education and mental health</li>
                  <li>Drafted 4 monthly newsletters and 10+ donor engagement stories that strengthened donor relationships</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between font-black text-[10px] mb-0.5">
                  <h3>Writer and Poet</h3>
                  <span>June 21 - Present</span>
                </div>
                <ul className="list-disc ml-4 text-[10px] text-zinc-800 space-y-0.5">
                  <li>Cultivated personal portfolio of 300+ original poems and story drafts, actively developing full-length poetry collection and philosophical novel</li>
                  <li>Established a diverse digital portfolio showcasing over 100+ original works across 5 platforms</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-zinc-800 pb-0.5 mb-2">Projects</h2>
            <div className="space-y-2">
              <div>
                <p className="font-black text-[10px] mb-1">Poetry Collection:</p>
                <ul className="list-disc ml-4 text-[10px] text-zinc-800 space-y-0.5">
                  <li>Nazm-e-Adil Volume One & Two - Sufi-inspired poetic cycle of 50 paradoxical and philosophical poems exploring love, loss, and annihilation of the self</li>
                  <li>The Greek & Latin Fragments - Collection of 35 poems integrating myth with metaphysical reflection</li>
                </ul>
              </div>
              <div>
                <p className="font-black text-[10px] mb-1">Novel Draft:</p>
                <ul className="list-disc ml-4 text-[10px] text-zinc-800 space-y-0.5">
                  <li>Developing 80-page philosophical novel exploring existence of God and existential themes</li>
                </ul>
              </div>
              <div>
                <p className="font-black text-[10px] mb-1">Creative Non-Fiction Project:</p>
                <ul className="list-disc ml-4 text-[10px] text-zinc-800 space-y-0.5">
                  <li>Collection of personal essays and letters (15,000+ words) merging poetic prose with philosophical reflection to explore the metaphysics of pain, illness, faith, and silence</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-zinc-800 pb-0.5 mb-2">Publication & Accomplishments</h2>
            <ul className="list-disc ml-4 text-[10px] text-zinc-800 space-y-1">
              <li>3x Published Author: Featured author in 3 distinct anthologies. Published author in Voices Unbound: Volume Two by The Favourite Tales, Co-author in Stardust and Sentences: Volume 5</li>
              <li>Consistent Gold Medalist: Awarded 28 first-place honors over 7 consecutive years in annual school-level competitions for excellence in Essay Writing, Poetry, Speech, and Elocution</li>
              <li>Authored personal portfolio of 300+ original poems and story drafts exploring themes of love, loss, and human emotion</li>
            </ul>
          </section>

          <section className="mb-3">
            <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-zinc-800 pb-0.5 mb-2">Education</h2>
            <div className="space-y-2 text-[10px]">
              <div className="flex justify-between">
                <div>
                  <p className="font-black">Bachelor of Technology in Computer Science</p>
                  <p className="text-zinc-600">Dr. BATU, Lonere, Maharashtra</p>
                </div>
                <div className="text-right">
                  <p className="font-black">July 26</p>
                  <p className="text-zinc-600">CGPA: 8.34</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="font-black">Higher Secondary Certificate</p>
                  <p className="text-zinc-600">Sir Sayyed College, Aurangabad</p>
                </div>
                <div className="text-right">
                  <p className="font-black">March 21</p>
                  <p className="text-zinc-600">92.6%</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  const renderOperationsResume = () => (
    <div className="resume-container">
      {/* PAGE 1 */}
      <div className="resume-page">
        <div className="resume-paper font-sans">
          <header className="text-center mb-6">
            <h1 className="text-2xl font-bold tracking-[0.2em] mb-1 uppercase">DURRANI ADIL KHAN</h1>
            <div className="flex flex-wrap justify-center items-center gap-2 text-[9px] text-zinc-600 font-bold uppercase tracking-wider">
              <span>Maharashtra, Aurangabad</span> <span>◇</span>
              <span>7028512087</span> <span>◇</span>
              <a href="mailto:durraniadil13@gmail.com" className="hover:text-blue-600">durraniadil13@gmail.com</a> <span>◇</span>
              <a href="https://www.linkedin.com/in/durrani-adil-13/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">LinkedIn</a>
            </div>
          </header>

          <section className="mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-zinc-800 pb-0.5 mb-2">Summary</h2>
            <p className="text-[10px] leading-relaxed text-zinc-700">
              Results-driven project manager and operations coordinator with 2+ years of experience leading cross-functional teams, optimizing workflows, and delivering projects on time and within budget. Proven track record in recruitment coordination, stakeholder management, and strategic planning across corporate and campus environments. Known for clear communication, decisive leadership, and ability to align teams toward common objectives.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-zinc-800 pb-0.5 mb-2">Core Competencies</h2>
            <div className="space-y-1 text-[10px]">
              <p><span className="font-black">Project & Operations:</span> Project Coordination, Workflow Optimization, Cross-functional Team Leadership, Stakeholder Management, Documentation & Reporting, Budget Management</p>
              <p><span className="font-black">HR & People Management:</span> Workshop Facilitation, Performance Tracking, Volunteer & Team Management, Onboarding</p>
              <p><span className="font-black">Execution & Tools:</span> MS Project, Trello, Slack, Google Workspace, Excel (Advanced), Event Planning, Vendor Management, Problem Solving</p>
            </div>
          </section>

          <section className="mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-zinc-800 pb-0.5 mb-2">Professional Experience</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between font-black text-[10px] mb-0.5">
                  <h3>Project Manager & Internal Consultant - Be Endless, Aurangabad</h3>
                  <span>Nov 25 - Present</span>
                </div>
                <ul className="list-disc ml-4 text-[10px] text-zinc-700 space-y-0.5">
                  <li>Serve as sole client-facing lead for 4+ web development projects, translating complex business requirements into actionable technical deliverables</li>
                  <li>Maintain 95%+ client satisfaction rate through proactive communication, expectation management, and strategic problem-solving</li>
                  <li>Designed and implemented standardized development pipeline workflow, reducing project turnaround time by 20%</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between font-black text-[10px] mb-0.5">
                  <h3>Internal Manager - Western Electrical Work & Engineering, Aurangabad</h3>
                  <span>Sept 25 - Nov 25</span>
                </div>
                <ul className="list-disc ml-4 text-[10px] text-zinc-700 space-y-0.5">
                  <li>Managed daily operations for government-licensed electrical contracting firm, overseeing end-to-end execution of public sector infrastructure and industrial projects</li>
                  <li>Coordinated technical workforce of electricians and contract laborers, handling shift scheduling, payroll processing, and ensuring strict compliance with government safety and labor regulations</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between font-black text-[10px] mb-0.5">
                  <h3>Placement Coordinator - P.E.S College of Engineering</h3>
                  <span>Nov 24 - July 25</span>
                </div>
                <ul className="list-disc ml-4 text-[10px] text-zinc-700 space-y-0.5">
                  <li>Orchestrated 8+ campus recruitment drives, facilitating placement opportunities for 150+ students across 4 engineering departments</li>
                  <li>Designed and delivered 5+ skill development workshops (resume building, interview prep, technical communication) for 200+ students</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* PAGE 2 */}
      <div className="resume-page">
        <div className="resume-paper font-sans">
          <header className="text-center mb-6 pb-3 border-b border-zinc-200">
            <h1 className="text-xl font-bold tracking-[0.15em] uppercase">DURRANI ADIL KHAN</h1>
            <p className="text-[8px] text-zinc-500 uppercase tracking-wider">Project Manager - Page 2</p>
          </header>

          <section className="mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-zinc-800 pb-0.5 mb-2">Professional Experience (Continued)</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between font-black text-[10px] mb-0.5">
                  <h3>Financial Lead - P.E.S College of Engineering (Student Council)</h3>
                  <span>Mar 24 - Oct 24</span>
                </div>
                <ul className="list-disc ml-4 text-[10px] text-zinc-700 space-y-0.5">
                  <li>Authored 5 comprehensive quarterly financial reports for college management, contributing to 15% improvement in budget allocation efficiency</li>
                  <li>Managed budgets totaling 200,000+ for student-led initiatives, maintaining 100% compliance with institutional financial policies</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between font-black text-[10px] mb-0.5">
                  <h3>Event Lead - P.E.S College of Engineering</h3>
                  <span>Nov 23 - Feb 24</span>
                </div>
                <ul className="list-disc ml-4 text-[10px] text-zinc-700 space-y-0.5">
                  <li>Managed event budgets totaling 150,000+, coordinating with 10+ external vendors to ensure seamless logistical execution for 3 major campus events</li>
                  <li>Led cross-functional teams of 15+ students to deliver events attracting 500+ attendees</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between font-black text-[10px] mb-0.5">
                  <h3>Volunteer Coordinator - P.E.S College of Engineering</h3>
                  <span>July 23 - Nov 24</span>
                </div>
                <ul className="list-disc ml-4 text-[10px] text-zinc-700 space-y-0.5">
                  <li>Led full-cycle recruitment, training, and management of 30+ volunteers for 5+ major social and campus initiatives</li>
                  <li>Designed and implemented volunteer recognition program, resulting in 25% increase in retention and 30% boost in engagement</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-zinc-800 pb-0.5 mb-2">Certifications</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[10px]">
              <div className="flex justify-between"><p className="font-bold">Human Resources</p> <p>GE Aerospace</p></div>
              <div className="flex justify-between"><p className="font-bold">Strategy Consulting</p> <p>BCG</p></div>
              <div className="flex justify-between col-span-2"><p className="font-bold">ESG Consultant</p> <p>TATA Consultancy</p></div>
            </div>
          </section>

          <section className="mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-zinc-800 pb-0.5 mb-2">Education</h2>
            <div className="space-y-2 text-[10px]">
              <div className="flex justify-between">
                <div>
                  <p className="font-black">Bachelor of Technology in Computer Science</p>
                  <p className="text-zinc-600">Dr. BATU, Lonere, Maharashtra</p>
                </div>
                <div className="text-right">
                  <p className="font-black">July 26</p>
                  <p className="text-zinc-600">CGPA: 8.34</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="font-black">Higher Secondary Certificate</p>
                  <p className="text-zinc-600">Sir Sayyed College, Aurangabad</p>
                </div>
                <div className="text-right">
                  <p className="font-black">March 21</p>
                  <p className="text-zinc-600">92.6%</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xs font-black uppercase tracking-widest border-b-2 border-zinc-800 pb-0.5 mb-2">Additional Information</h2>
            <ul className="list-disc ml-4 text-[10px] text-zinc-700 space-y-0.5">
              <li>Proven ability to manage multiple stakeholders, tight deadlines, and competing priorities</li>
              <li>Strong track record in both corporate and educational/non-profit environments</li>
              <li>Available for remote, hybrid, and on-site project management roles</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 flex flex-col overflow-hidden">
      {/* App Toolbar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="h-16 bg-white/90 backdrop-blur-xl border-b border-zinc-300 flex items-center justify-center px-8 shrink-0 z-10 shadow-sm print:hidden relative"
      >
        <div className="flex gap-2 bg-zinc-50 p-1.5 rounded-2xl border border-zinc-200 shadow-inner">
          {tabs.map(tab => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700'
                }`}
            >
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownloadPDF}
          className="absolute right-4 px-4 py-2 bg-gradient-to-r from-zinc-900 to-zinc-800 hover:from-zinc-800 hover:to-zinc-700 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-lg shadow-zinc-900/30"
        >
          DOWNLOAD PDF
        </motion.button>
      </motion.div>

      {/* PDF View Container */}
      <div className="flex-1 overflow-auto p-6 custom-scrollbar flex flex-col items-center print:p-0 print:overflow-visible">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ type: "spring", damping: 25 }}
            ref={resumeRef}
            className="w-full print:w-full"
          >
            {activeTab === 'developer' && renderDeveloperResume()}
            {activeTab === 'writer' && renderWriterResume()}
            {activeTab === 'operations' && renderOperationsResume()}
          </motion.div>
        </AnimatePresence>

        {/* Page metadata footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 mb-12 text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-4 print:hidden"
        >
          <span>2 Pages</span>
          <span className="opacity-20">|</span>
          <span>100% Zoom</span>
          <span className="opacity-20">|</span>
          <span className="text-zinc-400">Updated Jan 2026</span>
        </motion.div>
      </div>

      <style>{`
        .resume-container {
          display: contents;
        }

        .resume-page {
          width: 100%;
          max-width: 850px;
          margin: 0 auto 24px;
          background: white;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          page-break-after: always;
        }

        .resume-page:last-child {
          margin-bottom: 0;
        }

        .resume-paper {
          padding: 48px;
          font-size: 10px;
          line-height: 1.5;
          color: #3f3f46;
        }

        .resume-paper h1, 
        .resume-paper h2, 
        .resume-paper h3 {
          color: #18181b;
          margin: 0;
        }

        .resume-paper a {
          color: inherit;
          text-decoration: none;
        }

        .resume-paper a:hover {
          text-decoration: underline;
        }

        .resume-paper ul {
          margin: 0;
          padding: 0;
        }

        .resume-paper li {
          margin: 0;
          padding: 0;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #e4e4e7;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #a1a1aa;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #71717a;
        }

        @media print {
          @page {
            margin: 0.5in;
            size: letter;
          }

          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
            background: white;
          }

          .print\\:hidden {
            display: none !important;
          }

          .resume-page {
            max-width: 100%;
            margin: 0;
            box-shadow: none;
            page-break-after: always;
          }

          .resume-paper {
            padding: 0.5in;
          }
        }
      `}</style>
    </div>
  );
};
