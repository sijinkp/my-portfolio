# Sijin Prakasan — Portfolio

Glassmorphism portfolio built with React 18, Vite, Tailwind CSS v4 and Motion. Deploys to GitHub Pages on every
push to `main` (see `.github/workflows/deploy.yml`).

```bash
npm install      # first time only
npm run dev      # dev server → http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```

## Updating content

All text lives in **`src/data/content.js`**:

| What | Export |
| --- | --- |
| Name, title, summary, status pill, CV link | `profile` |
| Email, LinkedIn, optional phone / GitHub | `contact` (empty values are hidden) |
| Hero stat cards | `stats` |
| About text and quick facts | `about` |
| Work history (one company can hold several roles) | `experience` |
| "Things I've built" bento cards | `highlights` (`size: 'lg'` spans two columns) |
| Skill groups | `skillGroups` |
| Education and awards | `education`, `awards` |

Years of experience are calculated from the career start date, so they stay current.

- **CV:** `public/cv/Sijin-Prakasan-CV.pdf` — replace it with a newer PDF of the same name.
- **Hero code window:** the C# snippet is the `code` array in `src/components/Hero.jsx`.
- **Colours, glass and themes:** tokens at the top of `src/styles.css` (dark and light).
- **SEO / page title:** `index.html`.
- **Logos:** SVGs in `src/assets/logos/` (sources and licences in `LICENSES.md`). Map a skill or tag name to a
  logo in `logoFor` in `content.js`; the scrolling strip under the hero is `techStrip`.
- **Work-card illustrations:** animated SVG/CSS scenes in `src/components/Illustration.jsx`, keyed by the card's `icon`.
