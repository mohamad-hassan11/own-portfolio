# Mohamad Hassan – Portfolio

Personal software engineering portfolio. **The Git repository is the content-management system**: all content is stored in files in this repository and changed by editing, committing and pushing. There is no CMS, database, admin panel or content API.

## Stack

- Next.js 16 (App Router, Server Components by default), React 19, TypeScript (strict)
- Tailwind CSS 4 with semantic design tokens (dark default, light supported)
- MDX via the standard `@next/mdx` integration for project case studies
- Motion (subtle animation), Lucide icons, `next-themes`
- GitHub + Vercel Hobby (free tier only)
- Node.js 22.12+

## Architecture

```
GitHub repository
├── Code     app/, components/, lib/        Next.js / React (presentation)
└── Content  content/, public/              MDX + TypeScript files, images, CV
                 │
              Next.js build (everything is statically generated)
                 │
               Vercel  →  custom domain
```

```
content/
├── projects/
│   ├── index.ts                  project registry (single source of truth)
│   └── <slug>.mdx                one file per project
├── about.mdx                     About page body
├── site.ts                       name, hero, contact links, CV path, navigation, SEO
├── experience.ts
├── education.ts
├── skills.ts
├── types.ts                      TypeScript types for all content
└── mdx.d.ts                      types the `metadata` export of .mdx files

public/
├── projects/<slug>/              project images
├── profile/                      profile photo
└── cv/                           CV PDF

components/     ui/, layout/, sections/, projects/, mdx/ (MDX building blocks)
mdx-components.tsx                maps Markdown elements to styled components
```

The homepage, `/projects` and `/projects/[slug]` all read the same registry in `content/projects/index.ts`, so project data exists in exactly one place.

## Getting started

```bash
npm install
cp .env.example .env.local    # optional: only NEXT_PUBLIC_SITE_URL
npm run dev                   # http://localhost:3000
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve it |
| `npm run typecheck` | TypeScript |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

`NEXT_PUBLIC_SITE_URL` is the canonical URL used by the sitemap, canonical links and OpenGraph. Set it to your production domain in Vercel.

## Managing content

### Add a project

1. Create `content/projects/my-project.mdx`. Start with the metadata export, then write the case study:

   ```mdx
   export const metadata = {
     title: 'My Project',
     slug: 'my-project',
     summary: 'One or two sentences shown on cards and in search results.',
     projectType: 'University project', // optional
     organisation: 'Example Org', // optional
     year: 2026, // optional
     featured: true, // shown on the homepage
     order: 7, // lower numbers first
     coverImage: '/projects/my-project/cover.webp', // optional
     technologies: ['TypeScript', 'Next.js'],
     githubUrl: null,
     liveUrl: null,
     confidential: false, // true hides source links and shows a note
   }

   ## Overview

   ...

   ## Architecture

   <ArchitectureDiagram
     src="/projects/my-project/architecture.webp"
     alt="Describe the diagram"
     caption="Optional caption"
   />
   ```

2. Add images under `public/projects/my-project/`.
3. Register it in `content/projects/index.ts`: add one `import * as x from './my-project.mdx'` line and add `x` to the `modules` array.
4. Commit and push.

The body is free-form: use whichever headings suit the project (Context, Problem, Constraints, Architecture, Implementation, Challenges, Results, What I learned, …). Only publish details approved for public presentation.

### Edit or remove a project

Edit the `.mdx` file. To remove a project, delete its import and array entry in `content/projects/index.ts` and delete the file. Duplicate slugs fail the build.

### Project images

Use predictable paths, for example `public/projects/my-project/cover.webp`, `architecture.webp`, `screenshot-1.webp`. Reference them from `coverImage` or inside MDX:

```mdx
<ProjectImage src="/projects/my-project/screenshot-1.webp" alt="..." caption="..." />
![Alt text](/projects/my-project/screenshot-1.webp)
```

`ProjectImage` accepts `width` / `height` to set the aspect ratio (default 16:9). Prefer web-sized `.webp` files.

Available MDX components: `ProjectImage`, `ArchitectureDiagram`, `Callout`, plus standard Markdown (headings, lists, quotes, code blocks, links, images).

### Experience, education, skills

Edit the typed arrays in `content/experience.ts`, `content/education.ts` and `content/skills.ts`. `order` controls sorting. Dates are ISO strings (`'2025-09-01'`); set `current: true` for a running role. A section is hidden while its list is empty. Skills are plain categories: no percentages or bars.

### Hero, contact details, navigation, SEO

Edit `content/site.ts`. Optional fields (`email`, `github`, `linkedin`, `profileImage`, `seo.ogImage`) are simply omitted from the UI when not set. The About page text is in `content/about.mdx`.

### CV

Put the PDF at `public/cv/Mohamad-Hassan-CV.pdf` (or change `cv` in `content/site.ts`). The Download CV buttons appear automatically once the file exists; replacing the file updates every button.

## Deployment (Vercel Hobby)

1. Push the repository to GitHub and import it in Vercel (framework: Next.js, Node 22+).
2. Add `NEXT_PUBLIC_SITE_URL` (your custom domain) as an environment variable.
3. Add the custom domain under Settings → Domains and update DNS.
4. Every push to `main` builds and deploys; content changes go live the same way. Other branches get preview deployments.

Everything is statically generated at build time, so there are no runtime servers, API calls or cache settings to manage. The project uses only free-tier services (GitHub Free, Vercel Hobby) and open-source packages. Vercel Hobby is limited to non-commercial personal use, which covers a personal portfolio.

## Quality checks

```bash
npm run typecheck && npm run lint && npm run build
```

