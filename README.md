# Aucxley Solutions — Portfolio

A single-page portfolio and services site for Aucxley Ben, a full-stack developer
and backend engineer based in Nairobi, Kenya.

Built with React 19, Vite 7, and Framer Motion. Styling uses CSS Modules backed by a
global CSS-variable design system with light/dark theme support.

## Sections

- Hero (canvas particle field + typewriter headline)
- Services (search + tag filter, cards, and a detail modal with optional DB-schema viewer)
- About (bio, resume download, contact info)
- Why Choose Us / Process / Skills / Pricing / Contact
- Legal pages (Privacy Policy, Terms of Service) rendered via in-app state

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Content

All site content lives in static data files — no backend required:

- `src/data/projects.js` — the services shown in the Services section
- `src/data/skills.js` — skill categories and personal info (name, bio, resume path, contact)

Update these files to change what visitors see.
### example##
