# Mohamad Hassan – Portfolio

Professional software engineering portfolio. Content (projects, experience, education, skills, biography, contact details, CV, SEO) lives in Sanity CMS; the Next.js app only presents it.

## Stack

- Next.js 16 (App Router, Server Components by default), React 19, TypeScript (strict)
- Tailwind CSS 4 with semantic design tokens (dark default, light supported)
- Sanity CMS + embedded Sanity Studio at `/studio` (`next-sanity`)
- Motion for subtle transitions, Lucide icons, `next-themes`
- Playwright for end-to-end tests
- Node.js 22.12+ required

## Project structure

```
app/(site)/          public routes: /, /projects, /projects/[slug], /about
app/studio/          embedded Sanity Studio (/studio)
app/api/revalidate/  Sanity webhook endpoint for on-demand revalidation
components/          ui/, layout/, sections/, projects/
sanity/              env, client, schemaTypes/, structure
lib/                 queries.ts (GROQ), data.ts (typed fetchers), seo.ts, utils
types/               CMS TypeScript types
scripts/seed.ts      starter content for the CMS
tests/e2e/           Playwright specs
```

Schemas, GROQ queries, types and UI components are kept separate. Components receive data and only render it.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in the values
```

### Environment variables

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | public | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | public | Dataset name (`production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | public | Pinned Sanity API date |
| `NEXT_PUBLIC_SITE_URL` | public | Canonical URL (sitemap, OpenGraph, canonical links) |
| `SANITY_REVALIDATE_SECRET` | server only | Verifies the revalidation webhook |

No write token is used by the app. Never commit `.env.local`.

### Sanity project

1. `npx sanity login`
2. Create a project and a **public** dataset named `production` (`npx sanity datasets create production --visibility public`).
3. In [sanity.io/manage](https://sanity.io/manage) → API → CORS origins, add `http://localhost:3000` and the production domain, with credentials allowed.
4. Optional starter content: `npm run seed` (uses your Studio login, never overwrites existing documents).

## Running

```bash
npm run dev      # http://localhost:3000, Studio at /studio
```

## Using the CMS

Open `/studio` and sign in. Everything shown on the site is editable:

- **Site settings** (single document): name, title, hero, about, contact links, CV (PDF), navigation, footer, SEO defaults and OpenGraph image.
- **Projects**: case-study fields, images/gallery/architecture diagrams, `featured`, `displayOrder` (lower shows first). The first featured project is displayed as the flagship. Mark a project **confidential** to hide source-code links. Empty fields are omitted from the page.
- **Experience / Education / Skill categories**: ordered by `displayOrder`. Skills have no percentages; reorder items by dragging.
- Only **published** documents appear on the public site. Drafts stay private.

Replacing the CV in Site settings updates every "Download CV" button automatically.

### Content refresh

Pages are statically generated and revalidated:

- On-demand: a Sanity webhook calls `POST /api/revalidate`, which invalidates the cache tag for the changed document type (`siteSettings`, `project`, `experience`, `education`, `skillCategory`).
- Fallback: content is also revalidated hourly (`REVALIDATE_SECONDS` in `lib/cms.ts`).

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
npm run test:e2e      # starts the dev server if none is running
npm run format        # Prettier
```

E2E tests cover the homepage, navigation, theme toggle, projects list, project detail, 404, mobile menu and horizontal overflow at 375/768/1440/1920px. Project tests skip when the CMS has no projects.

## Deployment (Vercel + Sanity)

1. Push the repository and import it in Vercel (framework: Next.js, Node 22+).
2. Add the environment variables above in Vercel (Production and Preview). Set `NEXT_PUBLIC_SITE_URL` to the custom domain.
3. Add the custom domain in Vercel → Settings → Domains and update DNS.
4. In Sanity → API → CORS origins, add the production domain (credentials allowed) so `/studio` works there.
5. In Sanity → API → Webhooks, create a webhook:
   - URL: `https://<your-domain>/api/revalidate`
   - Trigger on: create, update, delete
   - Dataset: `production`, HTTP method: `POST`, secret: the value of `SANITY_REVALIDATE_SECRET`
6. Verify `/sitemap.xml`, `/robots.txt` and editing content in `/studio`.

## Confidentiality

Do not enter confidential employer information in the CMS. Only publish details approved for public presentation, and use the project's **confidential** flag where appropriate.
