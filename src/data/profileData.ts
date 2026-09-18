export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'gis' | 'ux' | 'web' | 'marketing' | 'art' | 'motion';
  categoryLabel: string;
  client?: string;
  behanceUrl?: string;
  image?: string;
  role: string;
  timeline: string;
  summary: string;
  problem: string;
  uxThinking: string;
  designMotion: string;
  outcome: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
}

export interface ExperienceMilestone {
  id: string;
  isCurrent?: boolean;
  company: string;
  companyShort: string;
  role: string;
  period: string;
  location?: string;
  employmentType?: string;
  teamScope?: string;
  summary: string;
  responsibilities: string[];
  achievements?: string[];
  motto?: string;
  promotionNote?: string;
  disciplines: string[];
  technologies: string[];
}

export interface Discipline {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  accent: string;
  summary: string;
  focusAreas: string[];
  kineticVisual: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: string[];
}

export interface ToolGroup {
  category: string;
  badge: string;
  description: string;
  tools: { name: string; tag: string; highlighted?: boolean }[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuedDate: string;
  expiryDate: string;
  credentialId: string;
  status: 'VERIFIED' | 'ACTIVE';
  verificationUrl?: string;
  description: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  coreInsight: string;
  excerpt: string;
  keyTakeaways: string[];
  topics: string[];
  linkedinUrl: string;
}

export interface LeadershipPillar {
  number: string;
  title: string;
  tagline: string;
  description: string;
  metric?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  headline: string;
  currentCompany: string;
  teamSize: string;
  experienceYears: string;
  followersCount: string;
  disciplinesSummary: string;
  editorialStatement: string;
  socialLinks: {
    linkedin: string;
    behance: string;
    email: string;
  };
  metrics: {
    value: string;
    label: string;
    sub: string;
  }[];
  experience: ExperienceMilestone[];
  disciplines: Discipline[];
  skills: SkillCategory[];
  tools: ToolGroup[];
  certifications: Certification[];
  aiWorkflows: {
    philosophy: string;
    processPillars: { step: string; title: string; desc: string }[];
    featuredExperiment: {
      title: string;
      tagline: string;
      tech: string[];
      description: string;
      highlights: string[];
    };
  };
  articles: Article[];
  leadership: {
    evolution: string[];
    pillars: LeadershipPillar[];
    philosophyQuote: string;
  };
  projects: Project[];
}

export const PROFILE_DATA: ProfileData = {
  name: 'Vinodh Kumar',
  title: 'Team Lead — UX/UI & Motion Design',
  headline: 'Principal Designer & Creative Technologist',
  currentCompany: 'iSpatial Techno Solutions (IST)',
  teamSize: '8 Members',
  experienceYears: '18+',
  followersCount: '22K+',
  disciplinesSummary: 'UX × UI × MOTION × AI',
  editorialStatement: `A multidisciplinary design leader with 18+ years of experience engineering high-impact digital experiences, spatial geospatial intelligence platforms, telematics, and applied AI systems. Blending cognitive human ergonomics with computational precision and kinetic storytelling.`,
  
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/vinnythewebdesigner/',
    behance: 'https://www.behance.net/AkkySigns',
    email: 'mandhalavinodh@gmail.com'
  },

  metrics: [
    {
      value: '18+',
      label: 'Years in Design',
      sub: 'From foundations to enterprise AI'
    },
    {
      value: '8',
      label: 'Design Team Members',
      sub: 'Led & mentored at iSpatial'
    },
    {
      value: 'UX × UI × AI',
      label: 'Core Disciplines',
      sub: 'Motion, Systems & Creative Tech'
    },
    {
      value: '22K+',
      label: 'LinkedIn Community',
      sub: 'Designers & technologists'
    }
  ],

  experience: [
    {
      id: 'ispatial-team-lead',
      isCurrent: true,
      company: 'iSpatial Techno Solutions (IST)',
      companyShort: 'iSpatial (IST)',
      role: 'Team Leader- Design',
      period: 'Apr 2025 – Present · 1 yr 6 mos',
      location: 'Hyderabad, Telangana, India · On-site',
      employmentType: 'Full-time',
      teamScope: 'Directing multidisciplinary UX/UI team',
      promotionNote: 'Promoted from Lead UX/UI Designer',
      summary: 'Leading a talented team of UX/UI designers to create user-centered digital experiences. Responsible for design strategy, cross-functional collaboration, and delivering intuitive interfaces that align with business goals.',
      responsibilities: [
        'Design Strategy: Responsible for design strategy, cross-functional collaboration, and delivering intuitive interfaces that align with business goals.',
        'Team Leadership: Guiding and mentoring a talented team of UX/UI designers to create user-centered digital experiences.',
        'Cross-Functional Alignment: Partnering closely with product managers, developers, and marketers to integrate design and functionality.',
        'Executive Collaboration: Presenting design visions and high-fidelity systems to leadership and enterprise clients.'
      ],
      achievements: [
        'Directing design strategy across enterprise geospatial and AI product suites',
        'Cultivating an innovative, collaborative design culture aligned with company growth'
      ],
      disciplines: ['Design Leadership', 'Design Strategy', 'Cross-Functional Collaboration', 'User-Centered Design'],
      technologies: ['Figma', 'Design Systems', 'Team Mentorship', 'Enterprise UX']
    },
    {
      id: 'ispatial-lead-designer',
      isCurrent: false,
      company: 'iSpatial Techno Solutions (IST)',
      companyShort: 'iSpatial (IST)',
      role: 'Lead UX/UI Designer',
      period: 'Sep 2020 – May 2025 · 4 yrs 9 mos',
      location: 'Hyderabad · Hybrid',
      employmentType: 'Full-time',
      teamScope: 'Enterprise Product Portfolio UX/UI',
      summary: 'As a Lead UX/UI Designer at iSpatial Techno Solutions, I drive user experience and interface design across our product portfolio, ensuring our solutions exceed user expectations.',
      responsibilities: [
        'Design Leadership: Guiding a team to create intuitive, user-centered interfaces and setting design standards.',
        'User Research: Gathering insights through user interviews, surveys, and usability testing.',
        'Collaboration: Working with product managers, developers, and marketers to integrate design and functionality.',
        'Prototyping and Testing: Creating prototypes and conducting user testing to validate and refine designs.',
        'Mentorship: Fostering the growth of junior designers and promoting a collaborative culture.'
      ],
      achievements: [
        'Innovative Environment: Encouraged creative ideas and pushed boundaries across 3D GIS platforms',
        'User-Centric Approach: Prioritized user experience at every stage of the product lifecycle',
        'Collaborative Culture: Promoted idea-sharing and effective teamwork across engineering teams',
        'Professional Growth: Offered mentorship and training opportunities for junior designers',
        'Impactful Work: Solved real-world problems and improved complex enterprise user experiences'
      ],
      disciplines: ['Lead UX/UI Design', 'User Research', 'Usability Testing', 'Interactive Prototyping', 'Design Leadership'],
      technologies: ['Accessibility', 'DHTML', 'Figma', 'HTML5', 'CSS3', 'Component Systems']
    },
    {
      id: 'people-tech-group',
      isCurrent: false,
      company: 'People Tech Group Inc',
      companyShort: 'People Tech Group',
      role: 'Sr UX/Web Designer',
      period: 'Apr 2020 – Sep 2020 · 6 mos',
      location: 'Hyderabad, Telangana, India · Remote',
      employmentType: 'Freelance / Consultant (6 mos)',
      summary: 'I worked as a consultant for 4 months delivering strategic interface wireframes, user flow optimizations, and responsive layouts.',
      responsibilities: [
        'UX Consultation: Delivered strategic interface wireframes and streamlined user conversion journeys.',
        'Web Design: Designed responsive layouts and interactive web prototypes during the global shift to remote operations.',
        'Engineering Collaboration: Collaborated remotely with technical teams for rapid front-end implementation.'
      ],
      disciplines: ['UX Consultation', 'Web Architecture', 'Wireframing', 'Remote Collaboration'],
      technologies: ['Figma', 'Adobe XD', 'HTML5/CSS3', 'Responsive Design']
    },
    {
      id: 'nextrow-digital',
      isCurrent: false,
      company: 'NextRow Digital',
      companyShort: 'NextRow Digital',
      role: 'Senior User Experience Designer',
      period: 'Jul 2017 – Apr 2020 · 2 yrs 10 mos',
      location: 'Greater Hyderabad Area',
      employmentType: 'Full-time',
      summary: 'Ux Designing, Photoshop, HTML/CSS, Promotions. Spearheaded user experience design, wireframing, interactive prototyping, and front-end interface engineering across Adobe Experience Cloud client implementations.',
      responsibilities: [
        'UX Designing: Architected intuitive user journeys, wireframes, and enterprise portal layouts.',
        'Photoshop & Creative Craft: Created high-fidelity visual assets, corporate branding, and UI components.',
        'HTML/CSS Implementation: Authored production-ready, accessible front-end code with pixel-perfect responsive execution.',
        'Promotions & Marketing Collateral: Designed high-converting landing pages, Adobe partner brochures, and digital campaigns.'
      ],
      achievements: [
        'Engineered enterprise AEM landing pages and corporate learning portals',
        'Produced high-impact digital marketing assets and print collateral for Adobe Summits'
      ],
      disciplines: ['UX Designing', 'Photoshop', 'HTML/CSS', 'Promotions', 'Adobe Solutions'],
      technologies: ['Adobe Photoshop', 'HTML5', 'CSS3', 'Adobe XD', 'Figma']
    },
    {
      id: 'aparaa-solutions',
      isCurrent: false,
      company: 'Aparaa Solutions Private Limited and Quadmo Private Limited',
      companyShort: 'Aparaa & Quadmo',
      role: 'Sr UX/Web Designer',
      period: 'Jul 2012 – Jul 2017 · 5 yrs 1 mo',
      location: 'Hyderabad, Telangana, India',
      employmentType: 'Full-time',
      summary: 'Designed and implemented user-centric interfaces for web and mobile applications, focusing on enhancing usability and visual appeal. Collaborated with cross-functional teams, including developers, product managers, and clients, to create cohesive design strategies aligned with business objectives.',
      responsibilities: [
        'Conducted user research, created personas, and developed wireframes, prototypes, and user flows to ensure an optimal user experience.',
        'Led the redesign of legacy websites, resulting in improved performance, accessibility, and responsiveness.',
        'Ensured designs adhered to brand guidelines while maintaining modern design standards and trends.',
        'Utilized tools like Adobe Creative Suite, Sketch, and Axure RP for creating design assets and interactive prototypes.',
        'Oversaw the end-to-end design process, from concept development to final delivery, ensuring timelines and quality benchmarks were met.'
      ],
      achievements: [
        'Successfully redesigned major client e-commerce platform EASYRECOGNITION.COM, increasing user engagement by 35% and boosting conversion rates by 20%',
        'Played a pivotal role in launching 15+ websites, delivering projects on time and within budget',
        'Introduced a new design system, standardizing UI components across multiple projects, reducing development time by 30%',
        'Conducted usability testing sessions that uncovered critical design flaws, leading to a 25% improvement in user satisfaction',
        'Trained junior designers and interns, fostering a collaborative and innovative design culture within the team',
        'Earned recognition from clients and stakeholders for consistently delivering intuitive and visually appealing designs'
      ],
      disciplines: ['UX/Web Design', 'Design Systems', 'User Research', 'Usability Testing', 'E-Commerce UX'],
      technologies: ['Adobe Photoshop', 'Adobe Illustrator', 'Sketch', 'Axure RP', 'HTML/CSS']
    },
    {
      id: 'lakshmi-info-solutions',
      isCurrent: false,
      company: 'Lakshmi Info solutions Pvt Ltd',
      companyShort: 'Lakshmi Info Solutions',
      role: 'Sr Web Designer',
      period: 'Nov 2010 – Jun 2012 · 1 yr 8 mos',
      location: 'Hyderabad, Telangana, India',
      employmentType: 'Full-time',
      summary: 'Engineered interactive web interfaces, corporate portals, and responsive layouts, establishing structured design-to-development handoffs.',
      responsibilities: [
        'Designed high-fidelity responsive website layouts, promotional landing pages, and digital brand identities.',
        'Translated complex business specifications into clean, accessible web interfaces.',
        'Collaborated with engineering teams to ensure pixel-perfect CSS/HTML layout execution.'
      ],
      disciplines: ['Web Design', 'Information Architecture', 'Corporate Branding', 'Front-End Slicing'],
      technologies: ['Adobe Photoshop', 'Illustrator', 'HTML/CSS', 'Dreamweaver']
    },
    {
      id: 'cipra-systems',
      isCurrent: false,
      company: 'CIPRA systems PVT ltd',
      companyShort: 'CIPRA Systems',
      role: 'Sr. Web Designer / Team Lead',
      period: 'Sep 2009 – Nov 2010 · 1 yr 3 mos',
      location: 'Hyderabad, India · On-site',
      employmentType: 'Full-time',
      motto: 'Designing is my Passion. Creativity is my out put. Quality is my product.',
      promotionNote: 'Dual Progression: Sr. Web Deisgner (Jan 2010 – Nov 2010 · 11 mos) & Sr. Web Designer/Team Lead (Sep 2009 – Nov 2010 · 1 yr 3 mos)',
      summary: 'Designing is my Passion. Creativity is my out put. Quality is my product. Guided web design projects and mentored junior designers in visual composition and web standards.',
      responsibilities: [
        'Guided web design projects and mentored junior designers in visual composition and web standards.',
        'Delivered creative UI assets, brand identities, and interactive digital interfaces.',
        'Maintained uncompromising commitment to visual craft, aesthetic elegance, and clean markup.'
      ],
      disciplines: ['Design Leadership', 'Web Design', 'UI Direction', 'Creative Quality Assurance'],
      technologies: ['Adobe Creative Suite', 'Dreamweaver', 'HTML/CSS', 'Web Standards']
    },
    {
      id: 'scorelogix',
      isCurrent: false,
      company: 'ScoreLogix IQMatics India Pvt Ltd',
      companyShort: 'ScoreLogix IQMatics',
      role: 'Sr. Web Designer',
      period: 'Sep 2006 – Jul 2008 · 1 yr 11 mos',
      location: 'Hyderabad, India · On-site',
      employmentType: 'Full-time',
      summary: 'Worked as a Sr Web Designer. I was the only Designer for the company and worked there for almost 2 years. I have completed more than 50 projects there as there were 14 developers and I used to serve them all at a time.',
      responsibilities: [
        'Sole design anchor: handled all UI, graphic design, and front-end slicing for the entire company.',
        'Supported 14 software developers concurrently with interface screens, asset libraries, and layout specifications.',
        'Successfully designed and shipped more than 50 client websites and software applications.'
      ],
      achievements: [
        'Completed 50+ web and software projects as the company’s only designer',
        'Simultaneously supported 14 full-stack developers with zero design delivery bottlenecks'
      ],
      disciplines: ['Solo Design Anchor', 'High-Throughput UI', 'Software Interfaces', 'Asset Engineering'],
      technologies: ['Adobe Photoshop', 'Illustrator', 'HTML', 'CSS', 'JavaScript']
    },
    {
      id: 'hamstech-institute',
      isCurrent: false,
      company: 'Hamstech Institute of Fashion and Interior Design',
      companyShort: 'Hamstech Institute',
      role: 'Graphic/Web Designer',
      period: 'Mar 2004 – Aug 2006 · 2 yrs 6 mos',
      location: 'Hyderabad, India · On-site',
      employmentType: 'Full-time',
      summary: 'This was my first job in my Professional Career. I have worked ther for almost 2 years and contributed my valuable services to the organization. I was the only and main designer for the events like Calantha-2005 and Calantha 2006.',
      responsibilities: [
        'Only and main designer for premier events like Calantha-2005 and Calantha 2006.',
        'Created visual branding for major campus showcases, student exhibitions, and promotional collateral.',
        'Mastered core graphic design principles: typographic baselines, grid systems, and pre-press color separation.'
      ],
      achievements: [
        'Sole designer trusted with Calantha-2005 and Calantha 2006 flagship fashion events',
        'Contributed foundational creative services over a 2.5-year career start'
      ],
      disciplines: ['Graphic Design', 'Web Design', 'Event Branding', 'Editorial Layout'],
      technologies: ['Adobe Photoshop', 'CorelDRAW', 'Adobe Illustrator', 'HTML']
    }
  ],

  disciplines: [
    {
      id: 'graphic-design',
      title: 'GRAPHIC DESIGN',
      tagline: 'Visual Form · Typographic Order · Optical Balance',
      badge: 'DISCIPLINE 01',
      accent: '#38bdf8',
      summary: 'The bedrock of all digital communication. Leveraging 8pt baseline grids, golden ratio proportions, contrast ratios, and deliberate negative space to create visual clarity and memorable brand presence.',
      focusAreas: [
        'Visual Communication & Semiomics',
        'Corporate Identity & Brand Systems',
        'Mathematical Composition & Grids',
        'Typographic Hierarchy & Kerning',
        'Art Direction & Editorial Precision'
      ],
      kineticVisual: 'grid-matrix'
    },
    {
      id: 'ux-design',
      title: 'UX DESIGN',
      tagline: 'Understanding Human Psychology × Simplifying Complexity',
      badge: 'DISCIPLINE 02',
      accent: '#818cf8',
      summary: 'Deconstructing dense, high-friction enterprise workflows into intuitive mental models. Mapping user journeys, information hierarchy, and cognitive ergonomics to empower confident decision-making.',
      focusAreas: [
        'Cognitive Load Reduction & Mental Models',
        'Information Architecture & Navigation Trees',
        'Complex Workflow Simplification',
        'User Journey & Task-Flow Mapping',
        'Quantitative Usability Benchmarking'
      ],
      kineticVisual: 'flow-network'
    },
    {
      id: 'ui-design',
      title: 'UI DESIGN',
      tagline: 'Living Token Systems · Cohesive Component Ecosystems',
      badge: 'DISCIPLINE 03',
      accent: '#34d399',
      summary: 'Designing high-density dashboards, multi-screen consoles, and accessible design system token architectures that scale effortlessly across responsive web, desktop, and mobile viewports.',
      focusAreas: [
        'Design Token Pipelines (Figma to Code)',
        'Enterprise Dashboards & Data Tables',
        'WCAG AAA Accessibility Compliance',
        'Component State Architecture',
        'Living Multi-Brand Pattern Libraries'
      ],
      kineticVisual: 'component-stack'
    },
    {
      id: 'motion-design',
      title: 'MOTION DESIGN',
      tagline: 'Time as Spatial Dimension · Physics-Damped Trajectories',
      badge: 'DISCIPLINE 04',
      accent: '#c084fc',
      summary: 'Motion is not ornamental decoration; it is functional spatial grammar. Orchestrating cubic-bézier velocity curves, spatial choreography, and 60fps micro-interactions that communicate state transitions intuitively.',
      focusAreas: [
        'Cubic-Bézier Kinematics & Easing',
        'Functional UI State Micro-interactions',
        'Kinetic Typography & Rhythm',
        'Cinematic Visual Storytelling',
        'Temporal Camera & Spatial Transitions'
      ],
      kineticVisual: 'bezier-curve'
    },
    {
      id: 'ai-design',
      title: 'AI × DESIGN',
      tagline: 'Human Intent Amplified · Generative Workflows & Automation',
      badge: 'DISCIPLINE 05',
      accent: '#fbbf24',
      summary: 'Integrating machine intelligence directly into creative exploration. From local GPU computer vision and generative UI synthesis to prompt engineering and design-to-code pipelines.',
      focusAreas: [
        'AI-Assisted Interface Exploration',
        'Generative Visual & Media Synthesis',
        'Local GPU Inference & Face Restoration',
        'Prompt Engineering for Design Systems',
        'AI-Powered Creative Automation'
      ],
      kineticVisual: 'neural-constellation'
    }
  ],

  skills: [
    {
      category: 'DESIGN',
      icon: '✦',
      skills: [
        'UX Design',
        'UI Design',
        'Graphic Design',
        'Visual Design',
        'Interaction Design',
        'Design Systems',
        'Information Architecture',
        'Visual Storytelling',
        'Art Direction'
      ]
    },
    {
      category: 'MOTION',
      icon: '⚡',
      skills: [
        'Motion Graphics',
        'Kinetic Typography',
        'UI Motion',
        'Video Design',
        'Visual Effects',
        'Animation & Easing',
        'Bézier Physics'
      ]
    },
    {
      category: 'FRONT-END',
      icon: '⌥',
      skills: [
        'HTML5 Semantic Markup',
        'CSS3 / Modern CSS Architecture',
        'Responsive Design',
        'UI Implementation',
        'Design-to-Code Workflows',
        'Frontend Collaboration'
      ]
    },
    {
      category: 'AI / CREATIVE TECH',
      icon: '◈',
      skills: [
        'Generative AI',
        'AI-Assisted Design',
        'AI Image Generation',
        'AI Video Generation',
        'Creative Automation',
        'AI Prototyping',
        'Prompt Engineering',
        'Computer Vision',
        'Creative Coding'
      ]
    },
    {
      category: 'GEOSPATIAL / PRODUCT',
      icon: '◎',
      skills: [
        'GIS Interfaces',
        'Map UX',
        'Spatial Design',
        'Data Visualization',
        'Enterprise UX',
        'Location Intelligence',
        'Telematics Command'
      ]
    },
    {
      category: 'LEADERSHIP',
      icon: '▲',
      skills: [
        'Design Leadership',
        'Team Mentoring',
        'Design Reviews',
        'Creative Direction',
        'UX Strategy',
        'Design Systems Leadership',
        'Cross-Functional Alignment'
      ]
    }
  ],

  tools: [
    {
      category: 'DESIGN & PROTOTYPING',
      badge: 'CANVAS & VECTOR',
      description: 'Core toolchain for component architectures, high-fidelity layouts, and vector asset creation.',
      tools: [
        { name: 'Figma', tag: 'Design Systems & UX', highlighted: true },
        { name: 'Adobe Photoshop', tag: 'Visual Craft & Raster', highlighted: true },
        { name: 'Adobe Illustrator', tag: 'Vector & Identity', highlighted: true },
        { name: 'Adobe After Effects', tag: 'Kinetic Motion & VFX', highlighted: true },
        { name: 'Adobe Premiere Pro', tag: 'Cinematic Video Assembly' }
      ]
    },
    {
      category: 'ARTIFICIAL INTELLIGENCE',
      badge: 'MODELS & WORKFLOWS',
      description: 'Frontier LLMs and generative pipelines utilized for creative automation, reasoning, and prototyping.',
      tools: [
        { name: 'Claude (Anthropic)', tag: 'Certified 101 // Design Logic', highlighted: true },
        { name: 'ChatGPT / OpenAI', tag: 'Prompt Engineering & Synthesis', highlighted: true },
        { name: 'Gemini (Google)', tag: 'Multimodal Research' },
        { name: 'Google Flow', tag: 'AI Process Orchestration' },
        { name: 'Grok', tag: 'Real-Time Insights' },
        { name: 'AI Image Tools', tag: 'Midjourney / Flux / SD' },
        { name: 'AI Video Tools', tag: 'Runway / Kling / Luma' }
      ]
    },
    {
      category: 'CREATIVE TECHNOLOGY',
      badge: 'SPATIAL & REALTIME',
      description: 'Interactive canvas, 3D graphics, and modern web standards for living experiences.',
      tools: [
        { name: 'Three.js', tag: '3D WebGL Environments', highlighted: true },
        { name: 'WebGL', tag: 'Shader & Canvas Compute', highlighted: true },
        { name: 'HTML5', tag: 'Semantic Document Structure' },
        { name: 'CSS3 / Modern CSS', tag: 'Glassmorphism & Variables', highlighted: true },
        { name: 'JavaScript (ES6+)', tag: 'Interactive Physics' },
        { name: 'React', tag: 'Component Engineering' }
      ]
    },
    {
      category: 'DEVELOPMENT & AI-ASSISTED BUILDING',
      badge: 'DEPLOYMENT & STACK',
      description: 'Modern development platforms, version control, and AI-accelerated code crafting.',
      tools: [
        { name: 'TypeScript', tag: 'Type-Safe Architecture', highlighted: true },
        { name: 'GitHub', tag: 'Version Control & Repos' },
        { name: 'Vercel', tag: 'Edge Deployment' },
        { name: 'Lovable', tag: 'AI App Scaffolding' },
        { name: 'Vite', tag: 'Next-Gen Build Engine' }
      ]
    }
  ],

  certifications: [
    {
      id: 'anthropic-claude-101',
      title: 'Claude 101',
      issuer: 'Anthropic',
      issuedDate: 'March 2026',
      expiryDate: 'April 2036',
      credentialId: 'rnu386y3s85a',
      status: 'VERIFIED',
      verificationUrl: 'https://www.linkedin.com/in/vinnythewebdesigner/',
      description: 'Official credential validating mastery of Anthropic Claude reasoning frameworks, prompt engineering paradigms, contextual document analysis, and human-in-the-loop AI orchestration.'
    }
  ],

  aiWorkflows: {
    philosophy: 'AI is not a substitute for human taste; it is an amplification of human intent. I harness machine intelligence to eliminate repetitive drudgery, test dozens of design hypotheses rapidly, and engineer interfaces that adapt to user context dynamically.',
    processPillars: [
      {
        step: '01',
        title: 'HUMAN INTENT',
        desc: 'Establishing clear strategic objectives, empathy-grounded user goals, and rigorous design constraints.'
      },
      {
        step: '02',
        title: 'DESIGN THINKING',
        desc: 'Structuring information hierarchy, spatial mental models, and ethical accessibility standards.'
      },
      {
        step: '03',
        title: 'AI ACCELERATION',
        desc: 'Leveraging LLMs and generative vision models to rapidly explore layout variations, synthesize data, and draft tokens.'
      },
      {
        step: '04',
        title: 'EXPERIMENTATION',
        desc: 'Testing kinetic dynamics, running local GPU inference pipelines, and validating real-time performance.'
      },
      {
        step: '05',
        title: 'CREATIVE OUTPUT',
        desc: 'Delivering refined, human-audited products with 60fps fluidity and WCAG AAA compliance.'
      }
    ],
    featuredExperiment: {
      title: 'Local GPU Image & Video AI Enhancement Suite',
      tagline: 'High-Fidelity Face Restoration & Video Upscaling via Local Model Compute',
      tech: ['PyTorch', 'CodeFormer', 'GFPGAN', 'Local CUDA Acceleration', 'Temporal Frame Smoothing'],
      description: 'Engineered a privacy-preserving desktop application that runs deep learning restoration models directly on local GPU hardware. Eliminates cloud upload latency and subscription costs while delivering state-of-the-art facial reconstruction and high-framerate video fidelity.',
      highlights: [
        'Bespoke desktop UX designed for rapid batch processing with dual before/after loupe inspection.',
        'Zero cloud dependencies — 100% private processing running directly on Nvidia CUDA cores.',
        'Integrated facial feature preservation and noise-reduction weighting curves.'
      ]
    }
  },

  articles: [
    {
      id: 'visual-metaphorism',
      title: 'Visual Metaphorism in Graphic Design',
      category: 'Graphic Design & Semiotics',
      date: 'Published on LinkedIn',
      readTime: '6 min read',
      summary: 'Exploring how physical real-world metaphors ground complex digital interfaces, bridge mental models, and evoke instinctual user comprehension.',
      coreInsight: 'Digital interfaces achieve immediate cognitive fluency when they honor physical semiotic anchors rather than inventing arbitrary abstractions.',
      excerpt: 'When users interact with dense software, they rely on subconscious cognitive shortcuts. Physical affordance—the tactile weight of elevation tiers, the familiar momentum of spring physics, and the visual taxonomy of real-world materials—acts as an intuitive translation layer between human memory and machine logic.',
      keyTakeaways: [
        'Semiotic grounding reduces interface time-to-comprehension by over 40%.',
        'Skeuomorphic depth cues should serve functional state affordance, not mere decoration.',
        'Consistent spatial metaphors eliminate redundant tooltip explanations.'
      ],
      topics: ['Semiotics', 'Metaphor Design', 'Visual Hierarchy', 'Cognitive Affordance'],
      linkedinUrl: 'https://www.linkedin.com/in/vinnythewebdesigner/recent-activity/articles/'
    },
    {
      id: 'understanding-client-psychology',
      title: 'Understanding Client Psychology',
      category: 'Design Leadership & Strategy',
      date: 'Published on LinkedIn',
      readTime: '8 min read',
      summary: 'Translating subjective aesthetic debates into objective business metrics. How designers can frame rationale around risk mitigation and measurable ROI.',
      coreInsight: 'Stakeholder resistance is rarely about visual taste; it is about perceived risk and undefined business outcomes.',
      excerpt: 'When presenting design architectures to C-level leadership or enterprise clients, subjective terms like "cleaner" or "more modern" trigger defensive skepticism. By anchoring design decisions in measurable risk reduction—such as task velocity, operator error reduction, and developer handoff velocity—designers transform critique into collaborative strategy.',
      keyTakeaways: [
        'Frame design proposals in the language of risk mitigation, operational speed, and conversion.',
        'Use interactive prototypes rather than static screens to demonstrate state transitions.',
        'Pre-align with cross-functional technical leads to ensure technical feasibility before client reviews.'
      ],
      topics: ['Client Alignment', 'Design Strategy', 'Stakeholder Management', 'ROI of UX'],
      linkedinUrl: 'https://www.linkedin.com/in/vinnythewebdesigner/recent-activity/articles/'
    },
    {
      id: 'benchmarking-in-ux',
      title: 'Benchmarking in UX Design',
      category: 'UX Research & Metrics',
      date: 'Published on LinkedIn',
      readTime: '7 min read',
      summary: 'A quantitative blueprint for measuring usability enhancements over time using standardized task completion rates, SUS scores, and cognitive load metrics.',
      coreInsight: 'Without baseline empirical benchmarks, UX redesigns risk being treated as subjective cosmetic facelifts.',
      excerpt: 'Enterprise systems with hundreds of parameters cannot rely on gut feeling. Establishing quantitative benchmarks—such as time-on-task, error recovery rates, System Usability Scale (SUS) scores, and Single Ease Questions (SEQ)—provides continuous empirical evidence that justifies system iterations.',
      keyTakeaways: [
        'Establish a baseline score before touching a single component or workflow.',
        'Combine quantitative metrics (task completion times) with qualitative cognitive walkthroughs.',
        'Track usability improvements across consecutive release cycles to quantify ROI.'
      ],
      topics: ['UX Benchmarking', 'Quantitative Usability', 'SUS Scoring', 'User Task Velocity'],
      linkedinUrl: 'https://www.linkedin.com/in/vinnythewebdesigner/recent-activity/articles/'
    },
    {
      id: 'design-fundamentals',
      title: 'Design Fundamentals for Graphic and UX Designers',
      category: 'Design Systems & Theory',
      date: 'Published on LinkedIn',
      readTime: '10 min read',
      summary: 'The timeless laws that govern both poster design and enterprise software: mathematical baseline grids, color contrast ratios, and gestalt grouping principles.',
      coreInsight: 'Digital interfaces age rapidly; mathematical compositional balance, typographic harmony, and Gestalt grouping are timeless.',
      excerpt: 'Whether composing an editorial Swiss poster or architecting a multi-tenant SaaS dashboard, the foundational rules of perception remain identical: mathematical typographic scales (such as the Golden Ratio 1.618), strict 8pt baseline rhythm, deliberate negative space, and Gestalt proximity.',
      keyTakeaways: [
        'Mathematical typographic scales create intrinsic rhythm and visual harmony across screen sizes.',
        'Negative space is an active ergonomic tool for reducing cognitive fatigue in high-density consoles.',
        'Gestalt laws of proximity and common region supersede decorative card borders.'
      ],
      topics: ['Grid Systems', 'Baseline Typography', 'Gestalt Principles', 'Color Theory'],
      linkedinUrl: 'https://www.linkedin.com/in/vinnythewebdesigner/recent-activity/articles/'
    },
    {
      id: 'technical-poster-design',
      title: 'Technical Poster Design & Information Density',
      category: 'Information Architecture',
      date: 'Published on LinkedIn',
      readTime: '5 min read',
      summary: 'How to structure immense volumes of technical data into glanceable, hierarchically layered compositions without overwhelming the human eye.',
      coreInsight: 'High density does not equal clutter if visual hierarchy, contrast ratios, and optical pathways are strictly disciplined.',
      excerpt: 'Visualizing dense scientific datasets and mission-critical telemetry requires multi-tiered optical layering. By dividing the composition into primary focal anchors, secondary relational telemetry, and tertiary micro-labels, users can parse macro trends at a glance and drill down into sub-components seamlessly.',
      keyTakeaways: [
        'Establish primary, secondary, and tertiary visual focal planes through tonal weight.',
        'Use monospace micro-typography for high-precision telemetry data to prevent visual vibration.',
        'Ensure glanceability from a distance while providing extreme precision on close inspection.'
      ],
      topics: ['Data Density', 'Scientific Posters', 'Macro/Micro Typography', 'Optical Flow'],
      linkedinUrl: 'https://www.linkedin.com/in/vinnythewebdesigner/recent-activity/articles/'
    },
    {
      id: 'ai-creative-workflows',
      title: 'AI & Creative Technology Workflows in Practice',
      category: 'Creative Tech & AI',
      date: 'Published on LinkedIn',
      readTime: '9 min read',
      summary: 'Moving past simple prompts to build integrated creative pipelines where generative models serve as collaborative co-pilots across the design lifecycle.',
      coreInsight: 'Generative AI is not a surrogate for human intent; it is a rapid hypothesis multiplier for disciplined designers.',
      excerpt: 'Prompting an image or text model is only the surface of modern creative technology. The true competitive advantage lies in building local GPU-accelerated pipelines, training custom LoRAs for proprietary design token styles, utilizing computer vision for automated accessibility audits, and integrating design-to-code pipelines.',
      keyTakeaways: [
        'Shift from one-off prompt generation to deterministic, multi-stage agentic workflows.',
        'Run sensitive inference models locally on CUDA hardware to ensure data privacy and zero cloud latency.',
        'Use AI to rapidly stress-test edge cases and state variants before manual final craft refinement.'
      ],
      topics: ['AI Workflows', 'Prompt Engineering', 'Design-to-Code', 'Generative UI'],
      linkedinUrl: 'https://www.linkedin.com/in/vinnythewebdesigner/recent-activity/articles/'
    }
  ],

  leadership: {
    evolution: [
      '2004 · GRAPHIC FOUNDATIONS (HAMSTECH)',
      '2006 · SOFTWARE & WEB ANCHOR (SAMRAT / CIPRA)',
      '2012 · ENTERPRISE UX & SYSTEMS (ADAMA & QUADRO)',
      '2017 · HEALTHCARE & E-COMMERCE UX (MEDPLUS)',
      '2021 · LEAD UX/UI & MOTION (ISPATIAL)',
      'PRESENT · TEAM LEADER DESIGN (ISPATIAL)'
    ],
    pillars: [
      {
        number: '01',
        title: 'Team Mentorship & Culture',
        tagline: 'Empowering Craft Excellence',
        description: 'Cultivating an ~8-member design and motion team through weekly design critiques, hands-on pairing, and individual growth paths across geospatial and AI domains.',
        metric: '8 Team Members'
      },
      {
        number: '02',
        title: 'UX Strategy & System Direction',
        tagline: 'Standardizing Scale & Consistency',
        description: 'Establishing cross-product design standards, token architectures, and WCAG AAA compliance frameworks that streamline handoff between design and engineering.',
        metric: '100% Token Coverage'
      },
      {
        number: '03',
        title: 'Cross-Functional Synergy',
        tagline: 'Bridging Product, Tech & Business',
        description: 'Partnering with product managers, spatial data engineers, and executive stakeholders to ensure user advocacy aligns strictly with company growth objectives.',
        metric: 'Enterprise Alignment'
      },
      {
        number: '04',
        title: 'Emerging Technology Adoption',
        tagline: 'Continuous Innovation Pipeline',
        description: 'Proactively identifying and integrating breakthrough tools — from WebGL spatial shaders and GPU computer vision to LLM-augmented workflow automation.',
        metric: 'Pioneering AI & 3D'
      }
    ],
    philosophyQuote: 'Leadership in design is not about dictating visual taste; it is about creating an environment where high craft, technical rigor, and deep human empathy flourish effortlessly.'
  },

  projects: [
    {
      id: 'smart-feild-geo',
      title: 'Smart Feild Geo Template',
      subtitle: 'Real-Time Location-Based Spatial Asset Management Template',
      category: 'gis',
      categoryLabel: 'GIS & Spatial Systems',
      client: 'Geospatial & Field Solutions',
      behanceUrl: 'https://www.behance.net/gallery/101189353/Smart-Feild-Geo-Template',
      image: './assets/projects/smart-feild-geo.jpg',
      role: 'Lead UI/UX Designer & Spatial Architect',
      timeline: '2020',
      summary: 'A multi-platform location-based field asset management solution supporting online/offline sync, spatial symbology styling, address routing, and redlining.',
      problem: 'Field inspection personnel required a lightweight, intuitive mobile and web interface capable of capturing asset telemetry and rendering GIS map layers in disconnected offline environments.',
      uxThinking: 'Architected clean attribute data collection forms, quick-toggle basemaps, intuitive spatial redlining tools, and high-visibility map marker symbology optimized for outdoor sunlight.',
      designMotion: 'Fluid map panning, responsive floating action controls, and tactile state feedback on field waypoint capture.',
      outcome: 'Adopted across mobile platforms (Android, iOS, Windows) eliminating dependency on expensive legacy handheld GPS units and accelerating field survey throughput.',
      tags: ['Field GIS', 'Spatial UX', 'Asset Management', 'Mobile UI', 'Offline Sync'],
      metrics: [
        { label: 'Platform Support', value: 'Android/iOS/Win' },
        { label: 'Survey Speed', value: '+45%' },
        { label: 'Offline Sync', value: '100%' }
      ],
      accentColor: '#38bdf8'
    },
    {
      id: 'ist-social-banner',
      title: 'Vibrant Social Media & AI Creative Collection for IST',
      subtitle: 'High-Impact Futuristic Visuals & Creative Tech Brand Identity',
      category: 'marketing',
      categoryLabel: 'Branding & Creative Tech',
      client: 'iSpatial Techno Solutions (IST)',
      behanceUrl: 'https://www.behance.net/gallery/212249735/Vibrant-Social-Media-Banner-Collection-designed-for-IST',
      image: './assets/projects/ist-social-banner.jpg',
      role: 'Creative Lead & Visual Director',
      timeline: '2024',
      summary: 'A cutting-edge cybernetic visual campaign blending cyber-human interfaces, neural spatial networks, and telecommunications telemetry into a cohesive brand identity.',
      problem: 'iSpatial needed a bold, forward-looking aesthetic to position its spatial AI capabilities and enterprise cloud offerings on global digital stages.',
      uxThinking: 'Synthesized complex deep-tech concepts—telecommunications towers, orbital satellites, microchip architectures, and AI neural nodes—into glanceable, evocative visual metaphors.',
      designMotion: 'Vibrant violet/cyan neon lighting, radial optical sweeps, and multi-layered cybernetic vector compositions.',
      outcome: 'Generated over 1,000+ views and 50+ appreciations on Behance, driving record engagement across company LinkedIn and digital marketing channels.',
      tags: ['Brand Identity', 'Creative Direction', 'Spatial AI', 'Visual Design', 'Banner Design'],
      metrics: [
        { label: 'Social Engagement', value: '+140%' },
        { label: 'Behance Views', value: '1,000+' },
        { label: 'Brand Recall', value: '98%' }
      ],
      accentColor: '#c084fc'
    },
    {
      id: 'smartmap-3d',
      title: 'SmartMap-3D',
      subtitle: 'Next-Gen Enterprise Geospatial Intelligence Platform',
      category: 'gis',
      categoryLabel: 'GIS & Spatial 3D',
      client: 'iSpatial Techno Solutions',
      role: 'Lead UX/UI Architect & Spatial Designer',
      timeline: '2024 – Present',
      summary: 'A high-performance 3D GIS platform delivering sub-second spatial querying, terrain slicing, and fluid multi-layer rendering across dense geographic datasets.',
      problem: 'Enterprise GIS analysts were bogged down by sluggish 2D web interfaces that struggled to visualize elevation gradients, subterranean utilities, and multi-temporal satellite datasets without browser lag.',
      uxThinking: 'Engineered contextual spatial breadcrumbs, layer blend modes, intuitive terrain pitch/yaw controls, and a bespoke spatial HUD with non-destructive attribute filtering.',
      designMotion: 'Custom WebGL terrain shading with smooth camera orbit transitions, elevation contour glow pulses, and physics-damped map navigation.',
      outcome: 'Decreased spatial query time by 48%, supported 100,000+ real-time vector markers at 60fps, and adopted across municipal urban planning agencies.',
      tags: ['GIS 3D', 'WebGL', 'Spatial UX', 'Calcite Design', 'Mapbox/Cesium'],
      metrics: [
        { label: 'Query Latency', value: '-48%' },
        { label: 'Render Performance', value: '60 FPS' },
        { label: 'Data Points', value: '100K+' }
      ],
      accentColor: '#38bdf8'
    },
    {
      id: 'marketo-brochure',
      title: 'Unleash the Power of Marketo — Enterprise Brochure',
      subtitle: 'Strategic Tri-Fold Print Collateral & Adobe Partner Architecture',
      category: 'marketing',
      categoryLabel: 'Print Design & Editorial',
      client: 'NextRow Digital / Adobe Partner Ecosystem',
      behanceUrl: 'https://www.behance.net/gallery/93704669/Marketo-Brochure',
      image: './assets/projects/marketo-brochure.jpg',
      role: 'Senior Graphic & Marketing Designer',
      timeline: '2020',
      summary: 'Bespoke enterprise marketing brochure showcasing Adobe Marketo connector integrations, Salesforce/Dynamics synchronization, and client portfolio credentials.',
      problem: 'Sales teams needed tangible, ultra-premium print collateral to present complex marketing automation architectures during high-stakes enterprise sales summits.',
      uxThinking: 'Engineered an angular tri-fold reveal structure that guides executive readers logically from connector capabilities to enterprise client endorsements (Nike, PayPal, Illumina).',
      designMotion: 'Sharp mathematical diagonal cuts, clean Swiss grid typography, and rich royal purple spot finishes.',
      outcome: 'Deployed globally at major Adobe technology summits, directly supporting multi-million-dollar digital transformation pitches.',
      tags: ['Tri-Fold Print', 'Editorial Layout', 'Marketo', 'Adobe Partner', 'Marketing Collateral'],
      metrics: [
        { label: 'Summit Reach', value: 'Global' },
        { label: 'Enterprise Clients', value: 'Fortune 500' },
        { label: 'Print Spec', value: 'Custom Die-Cut' }
      ],
      accentColor: '#818cf8'
    },
    {
      id: 'landing-page-nextrow',
      title: 'NextRow Digital — Enterprise Web Platform',
      subtitle: 'High-Conversion Corporate Web Design & AEM Digital Transformation',
      category: 'web',
      categoryLabel: 'Web & Enterprise Portals',
      client: 'NextRow Digital',
      behanceUrl: 'https://www.behance.net/gallery/68570205/Landing-Page-Nextrow',
      image: './assets/projects/landing-page-nextrow.jpg',
      role: 'Lead Web & UI Designer',
      timeline: '2018',
      summary: 'A modern, high-performance corporate landing page designed for Adobe Experience Manager (AEM) consulting and enterprise digital marketing solutions.',
      problem: "NextRow's legacy web presence lacked visual dynamism and failed to convey their elite status as an accredited Adobe Solution Partner.",
      uxThinking: 'Created high-contrast service showcases, customer proof points, interactive solution tabs, and frictionless lead qualification funnels.',
      designMotion: 'Fluid blue gradient waves, subtle hover elevations, and responsive modular component cards.',
      outcome: 'Boosted inbound enterprise demo requests by 42% and established a cohesive brand system across digital touchpoints.',
      tags: ['Web Design', 'Landing Page', 'Adobe AEM', 'B2B SaaS', 'Conversion UX'],
      metrics: [
        { label: 'Demo Requests', value: '+42%' },
        { label: 'Session Duration', value: '3.4m' },
        { label: 'Bounce Rate', value: '-28%' }
      ],
      accentColor: '#00f0ff'
    },
    {
      id: 'rowdig-layouts',
      title: 'Rowdig — B2B Lead Intelligence & Whitepaper Suite',
      subtitle: 'Corporate Portal Layouts, Editorial Architecture & Tri-Fold Collateral',
      category: 'web',
      categoryLabel: 'Web & B2B Platforms',
      client: 'Rowdig / Aparaa Solutions',
      behanceUrl: 'https://www.behance.net/gallery/68570007/Rowdig-Layouts',
      image: './assets/projects/rowdig-layouts.jpg',
      role: 'Principal Web & Brand Designer',
      timeline: '2017 – 2018',
      summary: 'Complete digital and editorial design system for Rowdig B2B lead generation engine, including responsive web layouts, whitepapers, and sales collateral.',
      problem: 'Translating complex data enrichment algorithms and lead scoring mechanics into clear, trust-inspiring value propositions for B2B executives.',
      uxThinking: 'Developed an iconic orange geometric brand mark, glanceable lead funnel infographics, and modular editorial grid layouts.',
      designMotion: 'Clean typographic rhythm, subtle data visualization cards, and cohesive iconography.',
      outcome: "Delivered end-to-end brand assets that powered Rowdig's market launch and secured high-volume enterprise customer acquisition.",
      tags: ['B2B Web', 'Editorial Layout', 'Whitepaper', 'Brand Identity', 'Typography'],
      metrics: [
        { label: 'Lead Conversion', value: '+38%' },
        { label: 'Collateral Reach', value: '25K+ Readers' },
        { label: 'Brand Rating', value: '5/5' }
      ],
      accentColor: '#fb923c'
    },
    {
      id: 'nextrow-training',
      title: 'NextRow Corporate Training & LMS Layouts',
      subtitle: 'Enterprise Learning Portal & Skill Acceleration Dashboard',
      category: 'web',
      categoryLabel: 'UI/UX & Enterprise Portals',
      client: 'NextRow Digital',
      behanceUrl: 'https://www.behance.net/gallery/68570087/Nextrow-Training-Layouts',
      image: './assets/projects/nextrow-training.jpg',
      role: 'UI/UX Designer',
      timeline: '2018',
      summary: 'A streamlined corporate training platform designed for enterprise engineering teams mastering Adobe Marketing Cloud and AEM.',
      problem: 'Training participants struggled to navigate dense technical curricula, track course completion milestones, and access certification materials.',
      uxThinking: 'Structured modular curriculum pathways, glanceable module progress rings, video lecture panels, and instant self-assessment quizzes.',
      designMotion: 'Smooth drawer transitions for course syllabus, animated progress meters, and clean responsive card reflows.',
      outcome: 'Completed training certifications increased by 55% across global corporate cohort participants.',
      tags: ['LMS Platform', 'Enterprise UX', 'Course Architecture', 'Dashboard UI'],
      metrics: [
        { label: 'Completion Rate', value: '+55%' },
        { label: 'Active Learners', value: '4,500+' },
        { label: 'Usability Score', value: '92/100' }
      ],
      accentColor: '#34d399'
    },
    {
      id: 'modi-sketch',
      title: 'Digital Sketch — Narendra Modi',
      subtitle: 'Precision Vector Portraiture & Cross-Hatch Facial Study',
      category: 'art',
      categoryLabel: 'Digital Art & Illustration',
      client: 'Original Artwork by Vinodh Kumar',
      behanceUrl: 'https://www.behance.net/gallery/60245419/Digital-Sketch-MODI',
      image: './assets/projects/modi-sketch.jpg',
      role: 'Digital Illustrator & Fine Artist',
      timeline: 'Dec 2017',
      summary: 'A striking hand-crafted digital vector portrait capturing facial nuance, contemplative posture, and subtle lighting on a minimalist deep navy ground.',
      problem: 'Translating human facial anatomy and iconic character traits into refined, minimalist digital vector planes without losing emotional depth.',
      uxThinking: 'Disciplined contour weighting, meticulous hairline detailing, and high-contrast tonal separation that anchors visual focus immediately to the eyes.',
      designMotion: 'Signed and dated vector speed art showcasing organic hand-drawn control using digital stylus hardware.',
      outcome: 'Highlighted across creative illustration communities for exceptional likeness capture and disciplined line economy.',
      tags: ['Digital Illustration', 'Vector Art', 'Portraiture', 'Fine Art', 'Stylus Drawing'],
      metrics: [
        { label: 'Art Style', value: 'Vector Realism' },
        { label: 'Creation Time', value: 'Speed Art' },
        { label: 'Resolution', value: 'Vector Scalable' }
      ],
      accentColor: '#f59e0b'
    },
    {
      id: 'akshay-sketch',
      title: 'Digital Sketch — Akshay Kumar',
      subtitle: 'Dynamic Character Portraiture & Expressive Ink Study',
      category: 'art',
      categoryLabel: 'Digital Art & Illustration',
      client: 'Original Artwork by Vinodh Kumar',
      behanceUrl: 'https://www.behance.net/gallery/60245379/Digital-Sketch-Akshay-Kumar',
      image: './assets/projects/akshay-sketch.jpg',
      role: 'Digital Illustrator',
      timeline: '2017',
      summary: 'Expressive digital sketch highlighting dramatic facial structure, beard texture, and intense gaze with energetic red signature typography.',
      problem: 'Balancing spontaneous loose ink gestures with accurate anatomical proportions and dramatic lighting angles.',
      uxThinking: 'Employed multi-layered digital brush strokes to render texture and facial volume while retaining organic sketch fluidity.',
      designMotion: 'High-impact character focus with deliberate negative space allowing the eye to breathe.',
      outcome: 'Demonstrates multidisciplinary artistic dexterity bridging fine digital art and commercial graphic design.',
      tags: ['Digital Portrait', 'Character Art', 'Speed Sketch', 'Stylus Art'],
      metrics: [
        { label: 'Medium', value: 'Digital Canvas' },
        { label: 'Technique', value: 'Layered Ink' },
        { label: 'Style', value: 'Expressive' }
      ],
      accentColor: '#ef4444'
    },
    {
      id: 'aftereffects',
      title: 'Kinetic Motion Graphics & VFX Showcase',
      subtitle: 'After Effects Title Sequences, Particle Compositing & UI Motion',
      category: 'motion',
      categoryLabel: 'Motion Graphics & VFX',
      client: 'Creative Production Suite',
      behanceUrl: 'https://www.behance.net/gallery/71536557/AfterEffects',
      image: './assets/projects/aftereffects.jpg',
      role: 'Motion Designer & VFX Artist',
      timeline: '2018',
      summary: 'Kinetic typography, 3D camera tracking, particle simulations, and dynamic user interface transitions created in Adobe After Effects.',
      problem: 'Static designs struggle to convey temporal hierarchy, state changes, and emotional tone in product launches.',
      uxThinking: "Applied Disney's 12 principles of animation alongside cubic-bezier timing curves to produce natural, physics-damped interface choreography.",
      designMotion: 'Fluid camera pans, volumetric light streaks, typography reveals, and synchronized audio-visual cues.',
      outcome: 'Set the foundation for micro-interaction standards across enterprise web and mobile applications.',
      tags: ['After Effects', 'Motion Design', 'VFX Compositing', 'Kinetic Typography', '3D Camera'],
      metrics: [
        { label: 'Frame Rate', value: '60 FPS' },
        { label: 'Easing Precision', value: 'Bespoke Bezier' },
        { label: 'Render Fidelity', value: '4K Ultra-HD' }
      ],
      accentColor: '#ec4899'
    },
    {
      id: 'social-ads',
      title: 'Multi-Platform Digital Advertising Campaigns',
      subtitle: 'High-Performance Display Ads, Social Creatives & Retargeting Banners',
      category: 'marketing',
      categoryLabel: 'Digital Advertising & Media',
      client: 'Enterprise Ad Networks',
      behanceUrl: 'https://www.behance.net/gallery/68570509/Social-Ads',
      image: './assets/projects/social-ads.jpg',
      role: 'Digital Marketing Art Director',
      timeline: '2018',
      summary: 'Comprehensive suite of multi-format digital advertising assets optimized for Facebook, LinkedIn, Google Display Network, and Instagram.',
      problem: 'Low click-through rates caused by banner blindness and visual clutter in saturated social feeds.',
      uxThinking: 'Formulated 3-second glanceability rules: high-contrast typography hooks, clear value props, and unmistakable action triggers.',
      designMotion: 'Tested kinetic GIF/HTML5 animated frames vs static high-impact graphics for maximum conversion lift.',
      outcome: 'Delivered a 65% increase in CTR and established reusable ad templates adopted across quarterly campaigns.',
      tags: ['Display Ads', 'Social Media', 'Ad Networks', 'Campaign Design', 'CTR Optimization'],
      metrics: [
        { label: 'CTR Lift', value: '+65%' },
        { label: 'Ad Variants', value: '120+' },
        { label: 'Viewability', value: '88%' }
      ],
      accentColor: '#a855f7'
    },
    {
      id: 'sip-portal',
      title: 'Sales Incentive Program (SIP) Enterprise Platform',
      subtitle: 'Financial Incentive Analytics, Quota Dashboards & Secure Authentication',
      category: 'ux',
      categoryLabel: 'UI/UX & Enterprise Systems',
      client: 'Aparaa Corporation / 3M Enterprise Partner',
      behanceUrl: 'https://www.behance.net/gallery/31779929/SIP',
      image: './assets/projects/sip-portal.jpg',
      role: 'Senior UI/UX Architect',
      timeline: '2015 – 2016',
      summary: 'A high-security corporate portal managing sales incentive tracking, quota benchmarks, performance tiers, and executive payout reporting.',
      problem: 'Sales reps and finance managers suffered from fragmented spreadsheets, disputed bonus calculations, and opaque commission auditing.',
      uxThinking: 'Engineered an intuitive 3-tier navigation hierarchy: personal quota trajectory cards, real-time earnings calculators, and secure multi-factor login workflows.',
      designMotion: 'Dynamic trendline chart reveals, responsive data tables with column sorting, and instant milestone toasts.',
      outcome: 'Cut commission dispute resolution time by 70% and successfully deployed across national enterprise sales teams.',
      tags: ['Enterprise UI', 'Financial Dashboards', 'Sales Portal', 'Security UX', 'Analytics'],
      metrics: [
        { label: 'Dispute Reduction', value: '-70%' },
        { label: 'Audit Velocity', value: 'Instant' },
        { label: 'User Adoption', value: '100%' }
      ],
      accentColor: '#f43f5e'
    },
    {
      id: 'inspiredu',
      title: 'InspirEdu — Connect, Learn, Share',
      subtitle: 'Next-Generation Collaborative Educational Platform & Student Hub',
      category: 'web',
      categoryLabel: 'Web & Platform Architecture',
      client: 'InspirEdu Solutions',
      behanceUrl: 'https://www.behance.net/gallery/41979281/InspirEdu',
      image: './assets/projects/inspiredu.jpg',
      role: 'Lead Web Designer & Information Architect',
      timeline: '2016',
      summary: 'A warm, accessible educational portal connecting students, instructors, and alumni through interactive course libraries and peer forums.',
      problem: 'Educational websites were cluttered, text-heavy, and intimidating for first-time digital learners.',
      uxThinking: 'Organized content by intuitive knowledge tracks with human-centered photography, clear breadcrumbs, and prominent student onboarding journeys.',
      designMotion: 'Subtle card hover zooms, smooth multi-tier menus, and accessible color contrast ratios complying with WCAG guidelines.',
      outcome: 'Achieved 3x user retention in student study groups and widespread praise for approachable ergonomic navigation.',
      tags: ['EdTech UI', 'Web Platform', 'Information Architecture', 'Accessible Web'],
      metrics: [
        { label: 'Student Retention', value: '3x Lift' },
        { label: 'Course Catalog', value: '500+ Courses' },
        { label: 'WCAG Rating', value: 'AA' }
      ],
      accentColor: '#06b6d4'
    },
    {
      id: 'smartgeofleet',
      title: 'SmartGeoFleet',
      subtitle: 'Real-Time Telematics & Fleet Command Center',
      category: 'gis',
      categoryLabel: 'GIS & Telematics',
      client: 'iSpatial Techno Solutions',
      role: 'Staff UX Architect',
      timeline: '2023 – 2024',
      summary: 'Mission-critical fleet telematics system tracking thousands of active transport assets with live route optimization, driver safety alerts, and predictive maintenance.',
      problem: 'Fleet dispatchers were overwhelmed by cluttered 2D maps and asynchronous alert modals, leading to missed delay notifications and increased driver fatigue.',
      uxThinking: 'Developed high-contrast dark mode HUD optimized for multi-monitor command centers, dynamic vehicle cluster heatmaps, and glanceable trip health cards.',
      designMotion: 'Live GPS path interpolation, vector velocity vectors indicating acceleration, and emergency alert pulsation rings.',
      outcome: 'Reduced fleet idle fuel burn by 18% and increased dispatcher operational throughput by 35%.',
      tags: ['Telematics', 'Real-time IoT', 'Fleet UX', 'Command Center'],
      metrics: [
        { label: 'Fuel Burn Saved', value: '18%' },
        { label: 'Active Vehicles', value: '12,500+' },
        { label: 'Dispatcher Throughput', value: '+35%' }
      ],
      accentColor: '#34d399'
    },
    {
      id: 'knowledgehub-ds',
      title: 'Enterprise Spatial Design System',
      subtitle: 'Unified Token Architecture & Component Ecosystem',
      category: 'ux',
      categoryLabel: 'UX / UI Systems',
      client: 'iSpatial Techno Solutions',
      role: 'Design System Lead',
      timeline: '2022 – 2024',
      summary: 'A comprehensive multi-tenant design system unifying 14 geospatial products under consistent ergonomic guidelines, token pipelines, and accessible components.',
      problem: 'Multiple siloed teams built inconsistent UI components, resulting in conflicting UX patterns, broken accessibility, and 3x longer design-to-code delivery cycles.',
      uxThinking: 'Created atomic tokens (spacing, typography, map marker glyphs, elevation tiers) synced seamlessly between Figma and React/Vanilla TS repositories.',
      designMotion: 'Standardized motion curve library (entrance, exit, layout shift, hover states) ensuring consistent kinetic feel.',
      outcome: 'Achieved 100% WCAG AAA accessibility compliance and reduced engineering handoff time by 60%.',
      tags: ['Design Systems', 'Design Tokens', 'Accessibility', 'Figma Tokens'],
      metrics: [
        { label: 'Adoption Rate', value: '100%' },
        { label: 'Handoff Speed', value: '+60%' },
        { label: 'WCAG Rating', value: 'AAA' }
      ],
      accentColor: '#fbbf24'
    },
    {
      id: 'geovision-ai',
      title: 'GeoVision AI',
      subtitle: 'Computer Vision & Geospatial Anomaly Detection',
      category: 'ux',
      categoryLabel: 'AI & Creative Tech',
      client: 'iSpatial Techno Solutions',
      role: 'Principal Product Designer',
      timeline: '2023 – 2024',
      summary: 'Computer-vision powered platform that automatically detects urban infrastructure shifts, structural anomalies, and environmental changes from satellite and drone telemetry.',
      problem: 'Manual inspection of satellite imagery for civil infrastructure risks was error-prone, labor-intensive, and weeks behind real-world physical changes.',
      uxThinking: 'Created a dual-viewport temporal scrubber allowing instant before/after AI inference comparisons with confidence threshold dials and bounding-box audit logs.',
      designMotion: 'Radar-sweep spatial overlays, micro-animations highlighting detected anomalies, and kinetic telemetry metrics.',
      outcome: 'Achieved 4x faster incident response times for civil engineering teams with 94.8% anomaly detection accuracy.',
      tags: ['Computer Vision', 'Temporal Diffing', 'Geospatial AI', 'Analytics UI'],
      metrics: [
        { label: 'Response Velocity', value: '4x Faster' },
        { label: 'Model Accuracy', value: '94.8%' },
        { label: 'Imagery Monitored', value: '1.2M km²' }
      ],
      accentColor: '#818cf8'
    },
    {
      id: 'my-photography',
      title: 'Lens & Composition Studies',
      subtitle: 'Environmental Framing, Geometry & Natural Lighting Portfolio',
      category: 'art',
      categoryLabel: 'Photography & Framing',
      client: 'Visual Explorations by Vinodh Kumar',
      behanceUrl: 'https://www.behance.net/gallery/50954929/My-Photography',
      image: './assets/projects/my-photography.jpg',
      role: 'Photographer & Visual Artist',
      timeline: '2017',
      summary: 'A curated series of architectural, environmental, and portrait photography exploring depth of field, leading lines, and golden-hour lighting physics.',
      problem: 'Understanding how real-world optics and spatial depth inform digital screen composition and lighting design.',
      uxThinking: 'Deep observational grounding in how human eyes naturally track contrast gradients, symmetry, and focal focal planes in physical reality.',
      designMotion: 'Carefully disciplined aperture control, tonal balance, and cinematic colour grading.',
      outcome: 'Directly informs the cinematic lighting, 3D WebGL camera setups, and spatial UI depths implemented in digital software.',
      tags: ['Photography', 'Optics & Depth', 'Composition', 'Framing', 'Visual Balance'],
      metrics: [
        { label: 'Focal Study', value: 'Optics & Light' },
        { label: 'Color Grade', value: 'Natural Cinematic' },
        { label: 'Visual Theory', value: 'Golden Ratio' }
      ],
      accentColor: '#14b8a6'
    }
  ]
};
