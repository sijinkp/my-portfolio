/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — edit this file to update the website.
 *  Anything marked TODO is a placeholder waiting for real details.
 * ─────────────────────────────────────────────────────────────
 */

// Resolves a file in public/ against the deploy base path (e.g. /repo-name/ on GitHub Pages).
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const profile = {
  name: 'Sijin Prakasan',
  firstName: 'Sijin',
  initials: 'SP',
  title: 'Senior Software Engineer',
  specialty: '.NET & API Specialist',
  experienceYears: '11+',

  // Small status pill in the hero. Set `show: false` to hide it.
  status: {
    show: true,
    label: 'Open to new opportunities', // TODO: confirm wording
  },

  headline: ['Building Intelligent Software.', 'Solving Real Problems.'],
  intro:
    "I'm Sijin Prakasan, a Senior Software Engineer with 11+ years of experience building enterprise applications, scalable APIs, and data-driven solutions. Exploring the next frontier of software through AI.",

  // Hero portrait (generated from the headshots in public/images). WebP is served first, PNG is the fallback.
  portrait: {
    webp: asset('/images/sijin-portfolio-hero.webp'),
    png: asset('/images/sijin-portfolio-hero.png'),
    width: 816,
    height: 1024,
  },

  // Replace public/cv/Sijin-Prakasan-CV.pdf with your real CV (keep the same name, or update this path).
  cvUrl: asset('/cv/Sijin-Prakasan-CV.pdf'),
};

export const contact = {
  // While empty, the site shows a placeholder and the contact form points to LinkedIn instead.
  email: 'sijinprakasan@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sijin-prakasan/',
  // TODO: add your GitHub URL, e.g. 'https://github.com/your-username'. While empty, it shows as "coming soon".
  github: '',
  location: '', // TODO (optional): e.g. 'City, Country'
};

export const about = {
  lead:
    'I like software that quietly does its job — systems people rely on every day without having to think about them.',
  paragraphs: [
    "For more than eleven years I've built that kind of software: desktop and web applications, the databases underneath them, and the APIs that let them talk to each other. Much of that work has been in enterprise environments — CRM systems, contact-management platforms, reporting tools and the integrations that hold them together.",
    "What I enjoy most is the translation step: sitting with a business requirement, understanding the real problem behind it, and turning it into something practical and maintainable. A lot of that has meant modernizing existing systems — carefully moving long-lived applications forward without breaking the workflows people depend on.",
    "I've also led a team of software engineers, which taught me that good engineering is as much about clarity and communication as it is about code.",
    "Lately I've been exploring AI-powered software — assistants, intelligent search, information extraction — and thinking about how these capabilities fit into real enterprise architecture rather than just demos.",
  ],
  principles: [
    { k: 'Understand first', v: 'Requirements before frameworks.' },
    { k: 'Modernize carefully', v: 'Evolve systems without breaking trust.' },
    { k: 'Keep it maintainable', v: 'Code the next engineer can own.' },
  ],
};

/**
 * Skills. `level: 'exploring'` marks areas of active learning (rendered differently).
 */
export const skillGroups = [
  {
    id: 'backend',
    label: 'Backend',
    blurb: 'Where most of my career has lived.',
    skills: ['C#', '.NET Framework', 'ASP.NET / Web APIs', 'REST API development', 'Enterprise application architecture'],
  },
  {
    id: 'database',
    label: 'Database',
    blurb: 'Data models that hold up over years.',
    skills: ['Microsoft SQL Server', 'SQL optimization', 'Stored procedures', 'Database design & data migration'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    blurb: 'Interfaces for the systems behind them.',
    skills: ['React', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    id: 'engineering',
    label: 'Engineering',
    blurb: 'The work between the code.',
    skills: ['System integration', 'Legacy modernization', 'Debugging & performance', 'Technical leadership'],
  },
  {
    id: 'ai',
    label: 'Emerging Focus',
    blurb: 'Actively exploring — not claiming mastery.',
    level: 'exploring',
    skills: ['Generative AI', 'AI application development', 'AI agents & tool integration', 'AI solution architecture'],
  },
];

/**
 * Projects. `kind`: 'professional' (generalized from real work, no confidential details)
 * or 'prototype' (personal experiments). `diagram` drives the architecture illustration.
 * TODO: add `image: '/projects/your-screenshot.png'` to any project to show a screenshot.
 */
export const projects = [
  {
    id: 'contacts',
    kind: 'professional',
    title: 'Enterprise Contact Management Platform',
    summary:
      'A centralized contact-management system that modernized legacy workflows — managing relationships, improving contact quality, and supporting permission-aware search and merging.',
    tags: ['C#', '.NET', 'SQL Server', 'REST APIs', 'Legacy modernization'],
    details: {
      problem:
        'Contact data spread across older workflows made it hard to keep records accurate, find the right people, and control who could see what.',
      approach: [
        'Centralized contact and relationship data behind a single service layer.',
        'Designed permission-aware search so results respect each user’s access.',
        'Built duplicate detection and merge workflows to improve contact quality.',
        'Modernized legacy flows incrementally to avoid disrupting daily users.',
      ],
      role: 'TODO: describe your specific role and contributions.',
    },
    diagram: {
      nodes: [
        { id: 'ui', label: 'Desktop / Web UI', x: 0, y: 1 },
        { id: 'api', label: 'Contact Service', x: 1, y: 1, accent: true },
        { id: 'perm', label: 'Permissions', x: 2, y: 0 },
        { id: 'merge', label: 'Search & Merge', x: 2, y: 2 },
        { id: 'db', label: 'SQL Server', x: 3, y: 1 },
      ],
      edges: [['ui', 'api'], ['api', 'perm'], ['api', 'merge'], ['perm', 'db'], ['merge', 'db']],
    },
  },
  {
    id: 'api',
    kind: 'professional',
    title: 'Enterprise API Integration',
    summary:
      'Backend APIs connecting desktop, web, and mobile applications to shared enterprise data and business processes.',
    tags: ['ASP.NET Web API', 'REST', 'C#', 'SQL Server', 'Integration'],
    details: {
      problem:
        'Several client applications needed consistent access to the same data and business rules without duplicating logic in each one.',
      approach: [
        'Exposed shared business processes through REST endpoints.',
        'Kept business rules on the server so every client behaves consistently.',
        'Designed contracts that desktop, web and mobile clients could all consume.',
        'Focused on reliability, clear error handling and maintainable versioning.',
      ],
      role: 'TODO: describe your specific role and contributions.',
    },
    diagram: {
      nodes: [
        { id: 'desk', label: 'Desktop', x: 0, y: 0 },
        { id: 'web', label: 'Web', x: 0, y: 1 },
        { id: 'mob', label: 'Mobile', x: 0, y: 2 },
        { id: 'gw', label: 'REST API Layer', x: 1.5, y: 1, accent: true },
        { id: 'biz', label: 'Business Logic', x: 2.6, y: 1 },
        { id: 'db', label: 'Enterprise Data', x: 3.6, y: 1 },
      ],
      edges: [['desk', 'gw'], ['web', 'gw'], ['mob', 'gw'], ['gw', 'biz'], ['biz', 'db']],
    },
  },
  {
    id: 'bi',
    kind: 'professional',
    title: 'Business Intelligence & Reporting',
    summary:
      'A CRM reporting solution that presents business reports, forecasts, and graphical insights to the people making decisions.',
    tags: ['SQL Server', 'Stored procedures', '.NET', 'Reporting', 'Data visualization'],
    details: {
      problem:
        'CRM data held valuable signals, but people needed clear reports and forecasts rather than raw tables.',
      approach: [
        'Built reporting queries and stored procedures over CRM data.',
        'Presented reports, forecasts and charts in a readable, filterable way.',
        'Tuned SQL so reports stayed responsive as data grew.',
      ],
      role: 'TODO: describe your specific role and contributions.',
    },
    diagram: {
      nodes: [
        { id: 'crm', label: 'CRM Data', x: 0, y: 1 },
        { id: 'sp', label: 'Stored Procs', x: 1, y: 1 },
        { id: 'svc', label: 'Report Engine', x: 2, y: 1, accent: true },
        { id: 'rep', label: 'Reports', x: 3, y: 0 },
        { id: 'fc', label: 'Forecasts', x: 3, y: 1 },
        { id: 'ch', label: 'Charts', x: 3, y: 2 },
      ],
      edges: [['crm', 'sp'], ['sp', 'svc'], ['svc', 'rep'], ['svc', 'fc'], ['svc', 'ch']],
    },
  },
  {
    id: 'ai-lab',
    kind: 'prototype',
    title: 'AI-Powered Developer Experiments',
    summary:
      'A personal lab for AI application prototypes — assistants, intelligent search, and automated information extraction.',
    tags: ['Generative AI', 'Semantic search', 'Agents', 'React', 'Prototype'],
    details: {
      problem:
        'Exploring where AI genuinely helps in business software — and where plain engineering is still the better answer.',
      approach: [
        'Prototyping assistants that answer questions from a known knowledge base.',
        'Experimenting with semantic search over documents.',
        'Extracting structured information from unstructured text.',
        'Try simplified, offline versions in the “Beyond Traditional Software” section below.',
      ],
      role: 'Personal exploration — ongoing.',
    },
    diagram: {
      nodes: [
        { id: 'in', label: 'User Input', x: 0, y: 1 },
        { id: 'emb', label: 'Embed / Parse', x: 1, y: 1 },
        { id: 'kb', label: 'Knowledge Base', x: 2, y: 0 },
        { id: 'llm', label: 'LLM', x: 2, y: 2, accent: true },
        { id: 'out', label: 'Answer', x: 3, y: 1 },
      ],
      edges: [['in', 'emb'], ['emb', 'kb'], ['emb', 'llm'], ['kb', 'llm'], ['llm', 'out']],
    },
  },
];

/**
 * Experience timeline — newest first. Replace every TODO with real details.
 * Remove or reorder entries freely.
 */
export const experience = [
  {
    role: 'Senior Software Engineer',
    company: 'Company name — TODO',
    period: 'Dates — TODO',
    focus: ['Technical leadership', 'Modernization', 'AI exploration'],
    points: [
      'Leading a team of software engineers. TODO: team context.',
      'Modernizing existing enterprise systems. TODO: specifics you can share.',
      'Exploring AI-powered features and solution architecture.',
      'TODO: add responsibilities.',
    ],
  },
  {
    role: 'Senior Software Developer',
    company: 'Company name — TODO',
    period: 'Dates — TODO',
    focus: ['Cross-application integration', 'API engineering'],
    points: [
      'Building APIs that connect desktop, web and mobile applications.',
      'Designing integrations across enterprise systems.',
      'TODO: add responsibilities.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Company name — TODO',
    period: 'Dates — TODO',
    focus: ['Enterprise software', 'Database engineering'],
    points: [
      'Developing enterprise desktop and web applications.',
      'SQL Server database design, stored procedures and reporting.',
      'TODO: add responsibilities.',
    ],
  },
];
