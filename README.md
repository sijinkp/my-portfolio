# Sijin Prakasan — Portfolio

React + Vite (JavaScript). The only runtime dependency besides React is `lucide-react` (icons).

```bash
npm install      # first time only
npm run dev      # start the dev server → http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```

## Updating content

Almost everything lives in **`src/data/profile.js`**:

| What | Where |
| --- | --- |
| Name, title, headline, intro, status pill | `profile` |
| Email, LinkedIn, GitHub | `contact` (empty values show as “Coming soon”) |
| About text and principles | `about` |
| Skill groups | `skillGroups` (`level: 'exploring'` = learning area) |
| Projects, diagrams, details, screenshots | `projects` (add `image: '/projects/x.png'` to show a screenshot) |
| Experience timeline | `experience` (replace every `TODO`) |

- **CV:** replace `public/cv/Sijin-Prakasan-CV.pdf` with the real file (same name).
- **Screenshots:** put images in `public/projects/` and reference them as `/projects/name.png`.
- **SEO / page title:** `index.html`.
- **Colors and fonts:** the design tokens at the top of `src/styles/global.css`.

## AI assistant

`src/lib/assistant.js` runs a local, predefined-answer assistant. To connect a real model later, build a
server-side endpoint (e.g. a serverless `/api/chat`) that keeps the API key in a server environment variable,
then set `VITE_ASSISTANT_ENDPOINT=/api/chat` in `.env`. Never put API keys in frontend code.

The playground engines (summarizer and simulated semantic search) live in `src/lib/demos.js`.

## Contact form

No backend is connected. With `contact.email` set, the form opens the visitor’s email app with the message
pre-filled. Without it, the form copies the message and points to LinkedIn. To make it actually send, connect a
form service or serverless function in `src/components/Contact.jsx`.
