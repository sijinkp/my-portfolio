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
  title: 'Senior Software Engineer',
  subtitle: 'Team Lead · .NET, C# & SQL · AI-first',
  location: 'Ras Al Khaimah, UAE',
  status: 'Open to new opportunities', // set to '' to hide the hero pill
  summary: `Senior Software Engineer with ${yearsExperience}+ years delivering software that drives business productivity — specialising in .NET, C# and SQL. Today I work AI-first: Claude Code, ChatGPT and other models are part of how I design, plan and ship every project.`,
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
  { value: `${yearsExperience}+`, label: 'Years building software' },
  { value: '4', label: 'Engineers led as Team Lead' },
  { value: '2×', label: 'First prize in debugging' },
  { value: `${yearsSince(new Date(2015, 10, 1))}`, label: 'Years at Inoclad' },
];

export const about = {
  paragraphs: [
    'I started out in 2014 building mobile apps, admin panels and client websites in Kerala. Since 2015 I’ve been at Inoclad Middle East in Ras Al Khaimah, where I grew from building the company’s in-house CRM to leading the team that evolves it.',
    'Most of my work sits where business processes meet data: turning stakeholder requirements into robust software, integrating systems that were never designed to talk to each other, and tuning applications until they feel fast and dependable.',
    'These days AI is in my workflow every day. I use Claude Code, ChatGPT and other models to explore designs, break work into plans, write and refactor code, and check the result — with a decade of engineering judgement deciding what ships.',
  ],
  facts: [
    { label: 'Based in', value: 'Ras Al Khaimah, UAE' },
    { label: 'Focus', value: '.NET · C# · SQL Server' },
    { label: 'Daily AI tools', value: 'Claude Code, ChatGPT' },
    { label: 'Languages', value: 'English, Malayalam, basic German' },
    { label: 'Education', value: 'MCA, Calicut University' },
  ],
};

/** Experience — newest first. `roles` lets one employer hold several positions. */
export const experience = [
  {
    company: 'Inoclad Middle East FZ LLC',
    location: 'Ras Al Khaimah, UAE',
    period: 'Nov 2015 — Present',
    current: true,
    roles: [
      {
        title: 'Senior Software Engineer, Team Lead',
        period: 'Jan 2022 — Present',
        points: [
          'Lead a team of four engineers upgrading and enhancing core company software — significantly improving UI/UX, performance and stability.',
          'Integrated contact data from Informix, MS SQL Server and Exchange to unify customer information in a single, efficient platform.',
          'Built an automation module that links incoming emails to contacts by sender address, improving data accessibility.',
          'Integrated the phone system with the database to look up callers automatically and show call logs inside contact details.',
        ],
      },
      {
        title: 'Senior Software Engineer — Inoso GmbH, Germany',
        period: 'Jan 2021 — Oct 2021',
        points: [
          'Developed RESTful APIs for purchase-order creation, enabling seamless integration with mobile and web platforms.',
          'Strengthened reliability and performance through code optimisation and proactive bug resolution.',
        ],
      },
      {
        title: 'Software Engineer',
        period: '2015 — 2020',
        points: [
          'Developed the in-house CRM application, translating stakeholder requirements into robust, scalable solutions.',
          'Worked with cross-functional teams to refine features, improve customer interactions and streamline internal workflows.',
        ],
      },
    ],
  },
  {
    company: 'Appcoder Solutions Pvt. Ltd.',
    location: 'Kerala, India',
    period: 'Nov 2014 — Oct 2015',
    roles: [
      {
        title: 'Software Developer',
        period: 'Nov 2014 — Oct 2015',
        points: [
          'Built a mobile application for a major telecommunications client in Kuwait, from initial design to final deployment.',
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
    title: 'Enterprise CRM Platform',
    org: 'Inoclad',
    size: 'lg',
    text: 'Built the company’s in-house CRM from stakeholder requirements, then led the four-person team that modernised its UI/UX, performance and stability.',
    tags: ['C#', '.NET', 'WinForms', 'DevExpress', 'SQL Server'],
  },
  {
    icon: 'database',
    title: 'Unified Contact Data',
    org: 'Inoclad',
    text: 'Merged contact sources from Informix, MS SQL and Exchange into one platform, so every team sees the same customer.',
    tags: ['Informix', 'MSSQL', 'Exchange'],
  },
  {
    icon: 'mail',
    title: 'Email-to-Contact Automation',
    org: 'Inoclad',
    text: 'A module that matches incoming email to contacts by sender address — no more manual filing.',
    tags: ['Automation', 'Exchange', 'C#'],
  },
  {
    icon: 'phone',
    title: 'Phone System Integration',
    org: 'Inoclad',
    size: 'lg',
    text: 'Incoming calls trigger an automatic contact lookup, and call logs appear right inside the contact record.',
    tags: ['Telephony', 'SQL Server', '.NET'],
  },
  {
    icon: 'server',
    title: 'Purchase-Order REST APIs',
    org: 'Inoso GmbH · Germany',
    text: 'RESTful APIs that made purchase-order creation flexible and available to both mobile and web clients.',
    tags: ['REST', '.NET', 'API design'],
  },
  {
    icon: 'smartphone',
    title: 'Telecom Mobile App',
    org: 'Appcoder · Kuwait client',
    size: 'lg',
    text: 'End-to-end delivery of a mobile app for a major telecommunications provider in Kuwait — plus the admin panel for user management and reporting behind it.',
    tags: ['Mobile', 'Admin panel', 'Reporting'],
  },
];

/** Skill groups. `icon` is mapped in components/Skills.jsx. */
export const skillGroups = [
  {
    icon: 'sparkles',
    label: 'AI-Assisted Development',
    wide: true,
    skills: ['Claude Code', 'ChatGPT', 'Prompt & context design', 'AI-assisted design & planning', 'AI pair programming', 'MCP tool integrations'],
  },
  {
    icon: 'code',
    label: 'Languages',
    skills: ['C#', 'VB', 'Java', 'SQL', 'JavaScript', 'jQuery', 'HTML', 'CSS', 'ASPX'],
  },
  {
    icon: 'layers',
    label: 'Frameworks & Tech',
    skills: ['.NET Framework', '.NET Core', 'WinForms', 'REST APIs', 'ReactJS', 'DevExpress'],
  },
  {
    icon: 'database',
    label: 'Databases',
    skills: ['MS SQL Server', 'MySQL', 'Informix'],
  },
  {
    icon: 'wrench',
    label: 'Tools & Platforms',
    skills: ['Visual Studio', 'Git (Fork)', 'Microsoft Teams', 'Windows', 'macOS', 'Linux'],
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
