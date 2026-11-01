/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — edit this file to update the website.
 *  Source: Sijin's résumé (public/cv/Sijin-Prakasan-CV.pdf).
 * ─────────────────────────────────────────────────────────────
 */

// Resolves a file in public/ against the deploy base path (e.g. /repo-name/ on GitHub Pages).
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

// Whole years since a date — keeps the "years" figures current on their own.
const yearsSince = (date) => Math.floor((Date.now() - date) / (365.25 * 24 * 3600 * 1000));

// Career started November 2014.
export const yearsExperience = yearsSince(new Date(2014, 10, 1));

export const profile = {
  name: 'Sijin Prakasan',
  firstName: 'Sijin',
  lastName: 'Prakasan',
  initials: 'SP',
  title: 'Senior .NET Engineer & Technical Lead',
  subtitle: 'C# · .NET · SQL Server · Enterprise CRM & ERP',
  location: 'Ras Al Khaimah, UAE',
  status: 'Open to new opportunities', // set to '' to hide the hero pill
  summary: `Senior .NET Engineer and Technical Lead with ${yearsExperience}+ years building and modernising enterprise CRM and ERP applications in C#, .NET and SQL Server. I lead four developers, own the technical direction of core business systems, and have delivered across the UAE, Germany and Kuwait — working AI-first every day.`,
  cvUrl: asset('/cv/Sijin-Prakasan-CV.pdf'),
};

export const contact = {
  email: 'sijinprakasan@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sijin-prakasan/',
  // Shown on the site only if filled in. Your CV (downloadable) already includes it.
  phone: '',
  github: '',
};

export const stats = [
  { value: `${yearsExperience}+`, label: 'Years in .NET & enterprise software' },
  { value: '4', label: 'Developers led as Technical Lead' },
  { value: '3', label: 'Countries delivered for — UAE, Germany, Kuwait' },
  { value: '2×', label: 'First prize in debugging competitions' },
];

export const about = {
  paragraphs: [
    'I’m a .NET engineer who has spent over a decade inside enterprise systems. At Inoclad Middle East I grew from building the company’s in-house CRM to Technical Lead — leading four developers and owning how our core CRM and ERP applications are designed, modernised and delivered.',
    'My work sits where business processes meet data: turning stakeholder requirements into robust software, integrating systems that were never designed to talk to each other (Informix, SQL Server, Exchange, telephony), and modernising long-lived applications without disrupting the people who rely on them.',
    'I’ve also worked internationally. With Inoso GmbH in Germany I built the Work Place App for production, the Site Progress iOS app, a company-wide task management system and purchase-order REST APIs on .NET, SQL Server, React Native and iOS — and earlier I delivered a mobile app for a major telecom client in Kuwait.',
    'These days AI is in my workflow every day. I use Claude Code, ChatGPT and other models to explore designs, break work into plans, write and refactor code, and check the result — with a decade of engineering judgement deciding what ships.',
  ],
  facts: [
    { label: 'Based in', value: 'Ras Al Khaimah, UAE' },
    { label: 'Role', value: 'Senior .NET Engineer · Technical Lead' },
    { label: 'Domains', value: 'Enterprise CRM · ERP · Modernisation' },
    { label: 'International', value: 'UAE · Germany · Kuwait' },
    { label: 'Daily AI tools', value: 'Claude Code, ChatGPT' },
    { label: 'Languages', value: 'English, Malayalam, basic German' },
    { label: 'Education', value: 'MCA, Calicut University' },
  ],
};

/**
 * Experience — newest first. `roles` lets one employer hold several positions.
 * `focus` = keyword tags, `impact` = measurable facts shown as mini stat tiles,
 * `badge` on a role marks it out (e.g. international work).
 */
export const experience = [
  {
    company: 'Inoclad Middle East FZ LLC',
    location: 'Ras Al Khaimah, UAE',
    period: 'Nov 2015 — Present',
    current: true,
    focus: ['Enterprise CRM', 'ERP', 'Application modernisation', 'Technical leadership', 'System integration'],
    impact: [
      { value: '4', label: 'developers led' },
      { value: `${yearsSince(new Date(2015, 10, 1))}+ yrs`, label: 'owning the CRM platform' },
      { value: '3 → 1', label: 'contact sources unified' },
      { value: '2', label: 'channels automated — email & phone' },
    ],
    roles: [
      {
        title: 'Senior Software Engineer — Technical Lead',
        period: 'Jan 2022 — Present',
        points: [
          'Lead and mentor a team of four developers, owning technical direction, task planning and delivery for the company’s core CRM and ERP software.',
          'Drive application modernisation of long-running .NET systems — significantly improving UI/UX, performance and stability without disrupting daily users.',
          'Own Admito, the in-house CRM that tracks every employee activity — email with clients and suppliers, phone notes, visits and exhibitions, business-trip planning and cost estimation, sales forecasts, task scheduling, time tracking and attendance — with management reports on turnover and employee performance.',
          'Added AI-generated activity summaries to contact records, alongside related contacts, orders and projects and customer / supplier ranking by turnover.',
          'Built the Address Tool, a centralised contact management system that unifies Informix, MS SQL Server and Exchange sources, enriches contacts and detects and merges duplicates.',
          'Delivered an email-automation module that links incoming email to contacts by sender address, removing manual filing.',
          'Integrated the phone system with the database: incoming calls trigger an automatic contact lookup and call logs appear inside the contact record.',
        ],
      },
      {
        title: 'Senior Software Engineer',
        badge: 'International · Inoso GmbH, Germany',
        period: 'Jan 2021 — Oct 2021',
        points: [
          'Built the Work Place App for the production department (React Native, .NET Core Web APIs, SQL Server): production-order tasks by priority, PO details with vector images from the technical department, live progress updates and time tracking as employees punch in on each order.',
          'Built a task management system used by every department to assign, prioritise and track work, on the same .NET Core API and React Native stack.',
          'Built the Site Progress App, an iOS app with a .NET / C# backend: project sites split into sections, per-section progress updates, comments and photos, and problem reporting.',
          'Built RESTful APIs for purchase-order creation, making it available to both mobile and web platforms.',
          'Improved reliability and performance through targeted code optimisation and proactive bug resolution.',
        ],
      },
      {
        title: 'Software Engineer',
        period: 'Nov 2015 — Dec 2020',
        points: [
          'Developed Admito, the in-house enterprise CRM (Windows, C# / .NET), from stakeholder requirements to a robust, scalable solution.',
          'Built the Window Configurator, a C# / .NET web application where users design windows (size, colour, pattern, style, materials) in a vector / 3D interface and get an offer generated immediately.',
          'Built the Sales Analyser, a Windows application that estimates the sales budget from past sales data.',
          'Worked with cross-functional teams to refine features, improve customer interactions and streamline internal workflows.',
        ],
      },
    ],
  },
  {
    company: 'Appcoder Solutions Pvt. Ltd.',
    location: 'Kerala, India',
    period: 'Nov 2014 — Oct 2015',
    focus: ['Mobile development', 'Admin panels', 'Web development'],
    roles: [
      {
        title: 'Software Developer',
        badge: 'International client · Kuwait',
        period: 'Nov 2014 — Oct 2015',
        points: [
          'Delivered a mobile application end to end — from initial design to final deployment — for a major telecommunications client in Kuwait.',
          'Created an admin panel for user management and report generation.',
          'Delivered multiple client websites tailored to different industries.',
        ],
      },
    ],
  },
];

/**
 * "How I work" — the AI-assisted workflow, one card per stage. `icon` is mapped in components/AiWorkflow.jsx.
 */
export const aiWorkflow = {
  tools: ['Claude Code', 'ChatGPT', 'Claude', 'Other LLMs', 'MCP tools'],
  steps: [
    {
      icon: 'design',
      title: 'Design',
      text: 'Explore UI directions, data models and architecture options with AI — then pick the one that fits the business.',
    },
    {
      icon: 'plan',
      title: 'Plan',
      text: 'Turn requirements into clear, ordered tasks and edge cases before a line of code is written.',
    },
    {
      icon: 'build',
      title: 'Build',
      text: 'Pair with Claude Code to write, refactor and document code fast — reviewing every change like a team lead would.',
    },
    {
      icon: 'verify',
      title: 'Verify & ship',
      text: 'Test in a real browser, review the diff, and deploy — AI speeds it up, engineering judgement signs it off.',
    },
  ],
};

/**
 * Work highlights shown as a bento grid. `icon` is a lucide-react icon name
 * (mapped in components/Highlights.jsx). `size: 'lg'` spans two columns.
 */
export const highlights = [
  {
    icon: 'sparkles',
    title: 'This Portfolio — Built AI-First',
    org: 'Personal · 2026',
    size: 'full',
    text: 'Designed, planned, coded and deployed with Claude Code: React, Tailwind CSS and Motion, checked across screen sizes with Playwright, and shipped to GitHub Pages through CI.',
    tags: ['Claude Code', 'React', 'Tailwind CSS', 'Playwright MCP', 'GitHub Actions'],
  },
  {
    icon: 'users',
    title: 'Admito — Enterprise CRM for Every Activity',
    org: 'Inoclad',
    size: 'full',
    text: 'Admito is the company’s in-house Windows CRM, which I built from stakeholder requirements and now lead as Technical Lead of four developers. It tracks every employee activity with clients and suppliers and ties it to contacts, orders and projects — and gives management the reports to run the business.',
    modules: [
      'Email with clients & suppliers',
      'Phone notes & call logs',
      'Visits & exhibitions',
      'Business-trip planning & cost estimation',
      'Sales forecast',
      'Task scheduling & time tracking',
      'Attendance management',
      'Management reports — turnover, employee performance',
      'Contact 360° with AI activity summary',
      'Related contacts, orders & projects',
      'Customer / supplier ranking by turnover',
      'Purchase & production order tracking',
    ],
    tags: ['C#', '.NET', 'Windows app', 'WinForms', 'DevExpress', 'SQL Server', 'AI summaries'],
  },
  {
    icon: 'window',
    title: 'Window Configurator',
    org: 'Inoclad',
    size: 'lg',
    text: 'A web application where users design their own windows — size, colour, pattern, style and materials — in a graphical vector / 3D interface, and receive a generated offer immediately.',
    tags: ['C#', '.NET', 'Web app', 'Vector / 3D UI', 'Instant quotes'],
  },
  {
    icon: 'chart',
    title: 'Sales Analyser',
    org: 'Inoclad',
    text: 'A Windows application that efficiently estimates the sales budget based on past sales data.',
    tags: ['C#', '.NET', 'Windows app', 'Sales forecasting'],
  },
  {
    icon: 'database',
    title: 'Address Tool — Contact Management',
    org: 'Inoclad',
    text: 'A centralised system for all contacts: unifies sources like Informix, MS SQL and Exchange, enriches contact data, and detects and merges duplicates.',
    tags: ['C#', '.NET', 'Informix', 'MSSQL', 'Exchange', 'Deduplication'],
  },
  {
    icon: 'factory',
    title: 'Work Place App — Production',
    org: 'Inoso GmbH · Germany',
    size: 'lg',
    text: 'A React Native app for the production department: production-order tasks listed by priority, PO details with vector images from the technical department, live progress updates, and time tracking as employees punch in on each production order.',
    tags: ['International', 'React Native', '.NET Core Web API', 'SQL Server', 'Time tracking'],
  },
  {
    icon: 'site',
    title: 'Site Progress App',
    org: 'Inoso GmbH · Germany',
    size: 'lg',
    text: 'An iOS app for project sites, backed by .NET / C# APIs: each site is split into sections, and teams update the progress of every section, add comments and photos, and report problems straight from the site.',
    tags: ['International', 'iOS', 'C#', '.NET', 'Issue reporting'],
  },
  {
    icon: 'server',
    title: 'Purchase-Order REST APIs',
    org: 'Inoso GmbH · Germany',
    text: 'RESTful APIs that made purchase-order creation flexible and available to both mobile and web clients.',
    tags: ['International', 'REST', '.NET', 'API design'],
  },
  {
    icon: 'smartphone',
    title: 'Telecom Mobile App',
    org: 'Appcoder · Kuwait client',
    size: 'full',
    text: 'End-to-end delivery of a mobile app for a major telecommunications provider in Kuwait — plus the admin panel for user management and reporting behind it.',
    tags: ['Mobile', 'Admin panel', 'Reporting'],
  },
];

/** Skill groups. `icon` is mapped in components/Skills.jsx. */
// Grouped for recruiters and ATS keyword matching: full product names, common acronyms in brackets.
export const skillGroups = [
  {
    icon: 'code',
    label: '.NET & Backend',
    skills: ['C#', '.NET Framework', '.NET Core', '.NET Core Web API', 'ASP.NET Web Forms (ASPX)', 'RESTful APIs', 'WinForms', 'Windows desktop applications', 'Visual Basic (VB)', 'Java'],
  },
  {
    icon: 'database',
    label: 'Databases & Data',
    skills: ['Microsoft SQL Server (MSSQL)', 'T-SQL', 'Stored procedures', 'Query optimisation', 'MySQL', 'IBM Informix', 'Data integration'],
  },
  {
    icon: 'building',
    label: 'Enterprise Systems',
    skills: ['CRM development', 'ERP systems', 'Purchase-order processing', 'Application modernisation', 'Sales forecasting & budgeting', 'Management reporting', 'Time & attendance tracking', 'Task & workflow management', 'Production / shop-floor apps', 'Product configurators (vector / 3D)', 'Site progress & field apps', 'Contact deduplication & enrichment', 'Microsoft Exchange integration', 'Telephony / CTI integration', 'Workflow automation'],
  },
  {
    icon: 'users',
    label: 'Leadership & Delivery',
    skills: ['Technical leadership', 'Team lead (4 developers)', 'Full software development lifecycle (SDLC)', 'Requirements analysis', 'Stakeholder collaboration', 'Performance optimisation', 'Debugging & troubleshooting'],
  },
  {
    icon: 'layers',
    label: 'Frontend & Mobile',
    skills: ['ReactJS', 'React Native', 'iOS app development', 'JavaScript', 'jQuery', 'HTML5', 'CSS3', 'DevExpress', 'Kiosk UIs', 'UI/UX improvement'],
  },
  {
    icon: 'wrench',
    label: 'Tools & Platforms',
    skills: ['Visual Studio', 'Git', 'Fork', 'Microsoft Teams', 'Microsoft Office', 'Windows', 'macOS', 'Linux'],
  },
  {
    icon: 'sparkles',
    label: 'AI-Assisted Development',
    wide: true,
    skills: ['Claude Code', 'ChatGPT', 'Prompt & context design', 'AI-assisted design & planning', 'AI pair programming', 'AI summaries in business apps', 'MCP tool integrations'],
  },
];

export const education = [
  { degree: 'Master of Computer Applications', school: 'Calicut University', year: '2014', note: '70%' },
  { degree: 'B.Sc. Computer Science', school: 'Calicut University', year: '2011', note: '70%' },
];

export const awards = [
  { title: 'First Prize — Debugging', event: 'INSIGHT 2014', note: 'National-level IT competition' },
  { title: 'First Prize — Debugging', event: 'IT RENDITION 2014', note: 'University coding challenge' },
];

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'ai', label: 'AI' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

/**
 * Logos (files in src/assets/logos). `logoFor` maps a skill / tool name to its logo;
 * names without an entry simply show without one.
 */
export const logoFor = {
  'C#': 'csharp',
  '.NET Framework': 'dotnet',
  '.NET Core': 'dotnet',
  ReactJS: 'react',
  JavaScript: 'javascript',
  jQuery: 'jquery',
  Java: 'java',
  HTML: 'html5',
  CSS: 'css3',
  DevExpress: 'devexpress',
  'MS SQL Server': 'sqlserver',
  MySQL: 'mysql',
  'Visual Studio': 'visualstudio',
  'Git (Fork)': 'git',
  Windows: 'windows11',
  macOS: 'apple',
  Linux: 'linux',
  'Claude Code': 'claude',
  Claude: 'claude',
  ChatGPT: 'openai',
  'Microsoft SQL Server (MSSQL)': 'sqlserver',
  HTML5: 'html5',
  CSS3: 'css3',
  Git: 'git',
  // Tags used on the work cards
  '.NET': 'dotnet',
  'SQL Server': 'sqlserver',
  MSSQL: 'sqlserver',
  React: 'react',
  'React Native': 'react',
  'Windows app': 'windows11',
  iOS: 'apple',
  '.NET Core Web API': 'dotnet',
  'Tailwind CSS': 'tailwindcss',
  'Playwright MCP': 'playwright',
  'GitHub Actions': 'githubactions',
};

/** The scrolling logo strip under the hero — two rows that move in opposite directions. */
export const techStrip = [
  [
    { logo: 'csharp', label: 'C#' },
    { logo: 'dotnet', label: '.NET' },
    { logo: 'sqlserver', label: 'SQL Server' },
    { logo: 'devexpress', label: 'DevExpress' },
    { logo: 'visualstudio', label: 'Visual Studio' },
    { logo: 'mysql', label: 'MySQL' },
    { logo: 'java', label: 'Java' },
    { logo: 'git', label: 'Git' },
    { logo: 'windows11', label: 'Windows' },
  ],
  [
    { logo: 'claude', label: 'Claude Code' },
    { logo: 'openai', label: 'ChatGPT' },
    { logo: 'react', label: 'React' },
    { logo: 'javascript', label: 'JavaScript' },
    { logo: 'tailwindcss', label: 'Tailwind CSS' },
    { logo: 'playwright', label: 'Playwright' },
    { logo: 'githubactions', label: 'GitHub Actions' },
    { logo: 'html5', label: 'HTML5' },
    { logo: 'css3', label: 'CSS3' },
  ],
];
