/**
 * Digital-representative assistant.
 *
 * Architecture:
 *   UI  ──>  askAssistant(messages)  ──>  provider.reply(messages)
 *
 * Today the provider is `localProvider`: keyword/intent matching over a small
 * knowledge base built from src/data/profile.js. Nothing leaves the browser.
 *
 * To connect a real model later:
 *   1. Create a server-side endpoint (e.g. a serverless function at /api/chat)
 *      that holds the API key in an environment variable and calls the model.
 *   2. Set VITE_ASSISTANT_ENDPOINT=/api/chat in a .env file.
 *   3. `remoteProvider` below will then be used automatically, falling back to
 *      the local provider if the request fails.
 * Never put API keys in frontend code or VITE_* variables — they ship to the browser.
 */
import { profile, contact, skillGroups, projects } from '../data/profile.js';

const list = (items) => items.join(', ');

const intents = [
  {
    id: 'greeting',
    match: /\b(hi|hello|hey|good (morning|afternoon|evening)|yo)\b/,
    reply: () =>
      `Hi! I'm ${profile.firstName}'s digital representative. Ask me about Sijin's experience, skills, projects, or how to get in touch.`,
  },
  {
    id: 'experience',
    match: /\b(experience|years|career|background|worked|work history|senior)\b/,
    reply: () =>
      `${profile.firstName} has ${profile.experienceYears} years in software development — enterprise desktop and web applications, SQL Server databases, and REST APIs. The work spans CRM systems, contact-management platforms, reporting tools and integrations — including leading a team of software engineers.`,
  },
  {
    id: 'ai',
    match: /\b(ai|artificial|llm|gpt|machine learning|ml|agent|agents|genai|generative)\b/,
    reply: () =>
      `AI is ${profile.firstName}'s current area of exploration — AI-powered applications, assistants, semantic search, information extraction and AI solution architecture. It's framed honestly as active learning, built on a long foundation in enterprise engineering. Try the demos in “Beyond Traditional Software”.`,
  },
  {
    id: 'skills',
    match: /\b(skills?|stack|tech|technolog\w*|languages?|tools?|know|c#|\.net|dotnet|sql|react|javascript)\b/,
    reply: () => {
      const pick = (id, n) => skillGroups.find((g) => g.id === id).skills.slice(0, n);
      return `Core stack: ${list([...pick('backend', 3), ...pick('database', 1)])}, plus REST API design. On the frontend: ${list(
        skillGroups.find((g) => g.id === 'frontend').skills
      )}.`;
    },
  },
  {
    id: 'projects',
    match: /\b(projects?|built|portfolio|crm|contact management|reporting|integration|api)\b/,
    reply: () =>
      `Highlights: ${list(projects.map((p) => p.title))}. The first three are generalized from professional work (no confidential details); the last is a personal prototype space. Scroll to “Selected Work” to expand each one.`,
  },
  {
    id: 'leadership',
    match: /\b(lead|leader|leadership|team|manage|mentor)\b/,
    reply: () =>
      `${profile.firstName} has led a team of software engineers, with a focus on clear requirements, maintainable code and turning business needs into practical solutions.`,
  },
  {
    id: 'modernization',
    match: /\b(legacy|moderni[sz]\w*|migrat\w*|refactor\w*)\b/,
    reply: () =>
      `Modernizing existing enterprise systems is a recurring theme in ${profile.firstName}'s work — evolving long-lived applications and databases incrementally so the people relying on them aren't disrupted.`,
  },
  {
    id: 'contact',
    match: /\b(contact|email|reach|hire|linkedin|connect|talk|message|available|availability)\b/,
    reply: () =>
      `The best way to reach ${profile.firstName} is LinkedIn (${contact.linkedin})${
        contact.email ? ` or email at ${contact.email}` : ''
      }. There's also a contact section at the bottom of the page.`,
  },
  {
    id: 'cv',
    match: /\b(cv|resume|résumé)\b/,
    reply: () => `You can download the CV from the button in the top section of the page.`,
  },
  {
    id: 'thanks',
    match: /\b(thanks|thank you|cheers|great|awesome)\b/,
    reply: () => `You're welcome! Anything else you'd like to know?`,
  },
];

const fallback = () =>
  `I'm a local demo, so I only know what's on this site. Try asking about experience, skills, projects, leadership, AI, or how to get in touch.`;

export const suggestedPrompts = [
  'What is your experience?',
  'What tech do you work with?',
  'Tell me about your projects',
  'What are you exploring in AI?',
  'How can I contact you?',
];

export const localProvider = {
  name: 'local',
  async reply(messages) {
    const last = messages[messages.length - 1]?.content.toLowerCase() ?? '';
    const intent = intents.find((i) => i.match.test(last));
    // Small delay so the "thinking" state is visible.
    await new Promise((r) => setTimeout(r, 450 + Math.random() * 400));
    return intent ? intent.reply() : fallback();
  },
};

const endpoint = import.meta.env.VITE_ASSISTANT_ENDPOINT;

export const remoteProvider = {
  name: 'remote',
  async reply(messages) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
    if (!res.ok) throw new Error(`Assistant endpoint returned ${res.status}`);
    const data = await res.json();
    return data.reply;
  },
};

export const isLiveAssistant = Boolean(endpoint);

export async function askAssistant(messages) {
  if (endpoint) {
    try {
      return await remoteProvider.reply(messages);
    } catch {
      return localProvider.reply(messages);
    }
  }
  return localProvider.reply(messages);
}
