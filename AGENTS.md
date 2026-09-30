# Portfolio project instructions

This is Mohamad Hassan's professional Software Engineering portfolio.

## Architecture

- Next.js App Router
- TypeScript
- Tailwind CSS
- Sanity CMS
- Sanity Studio
- Vercel deployment
- Server Components by default

## CMS rule

Portfolio content belongs in Sanity.

Do not hardcode editable portfolio content inside React components.

Content such as projects, experience, education, skills, biography,
contact details, social links, CV and SEO configuration should be
CMS-controlled.

## Frontend rule

Components should receive data and focus on presentation.

Keep:
- CMS schemas
- GROQ queries
- TypeScript types
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

Never invent or expose confidential employer information.

DEVENTit-related projects should only contain information explicitly
approved for public presentation.

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