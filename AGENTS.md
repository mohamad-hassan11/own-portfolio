# Portfolio project instructions

This is Mohamad Hassan's professional Software Engineering portfolio.

## Architecture

- Next.js App Router
- TypeScript
- Tailwind CSS
- MDX (`@next/mdx`) for project case studies
- Content stored in the repository (`content/`), no external CMS
- Vercel deployment
- Server Components by default

## Content rule

The Git repository is the content-management system. There is no CMS,
database, admin panel or content API.

Portfolio content lives in `content/`:
- `content/projects/*.mdx` (metadata export + case-study body), registered in
  `content/projects/index.ts`
- `content/about.mdx`
- `content/site.ts`, `experience.ts`, `education.ts`, `skills.ts`

Do not hardcode editable portfolio content inside React components.
Images, the CV and profile photo live under `public/`.

## Frontend rule

Components should receive data and focus on presentation.

Keep:
- content files (`content/`)
- TypeScript types (`content/types.ts`)
- UI components

separated.

## TypeScript

Use strict TypeScript.

Avoid `any`.

## React / Next.js

Prefer Server Components.

Only add `"use client"` when the component actually requires:
- state
- browser APIs
- event handlers
- animations
- interactive UI

## Design

The portfolio should feel:

- professional
- minimal
- modern
- technical
- clean

Avoid:
- progress bars for skills
- excessive animation
- excessive gradients
- developer clichés
- giant technology-logo collections
- unnecessary visual effects

## Projects

Projects should be presented as engineering case studies.

Prioritize:
- problem
- constraints
- role
- technical decisions
- architecture
- implementation
- result
- lessons learned

over simple technology lists.

## Confidentiality

Never invent:
- source code
- screenshots
- client names
- metrics
- URLs
- architecture details

## Accessibility

Always consider:
- keyboard usage
- semantic HTML
- contrast
- focus states
- reduced motion
- responsive layouts

## Quality

Before considering work complete:

1. run TypeScript checks
2. run lint
3. run tests where applicable
4. run production build
5. fix errors rather than suppressing them

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
