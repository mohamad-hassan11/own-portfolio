/**
 * Shapes for every content file in `content/`. Two formats are used, by design:
 *
 * - Structured lists/config — `site.ts`, `experience.ts`, `education.ts`,
 *   `skills.ts` — are plain typed arrays or objects, sorted by `order` and
 *   rendered generically. No Markdown, no prose, just data.
 * - Narrative content — project case studies and the About page — needs
 *   headings, images and custom components, so it lives in `.mdx` files
 *   instead. `ProjectMetadata` below is only the structured header of a
 *   project; the story is the MDX body underneath that export.
 *
 * Keep it this way: don't move prose into a `.ts` string, and don't split a
 * short list entry (experience/education/skills) into its own `.mdx` file.
 */

// --- content/site.ts ---

export interface NavItem {
  label: string
  href: string
}

export interface Highlight {
  label: string
  href: string
}

export interface SiteConfig {
  name: string
  title: string
  heroHeadline: string
  heroDescription: string
  /** Optional status line in the hero, e.g. "Open to opportunities". Hidden when unset. */
  status?: string
  /** Focus links listed in the hero panel. */
  highlights: Highlight[]
  /** Path under /public, e.g. "/profile/portrait.webp". */
  profileImage?: string
  profileImageAlt?: string
  /** Short homepage teaser. The full narrative lives in content/about.mdx. */
  aboutSummary: string
  contactHeadline: string
  contactDescription: string
  email?: string
  location?: string
  github?: string
  linkedin?: string
  /** Path under /public. The button is hidden when the file does not exist. */
  cv?: string
  navigation: NavItem[]
  footerText?: string
  seo: {
    title: string
    description: string
    /** Path under /public, ideally 1200×630. */
    ogImage?: string
  }
}

// --- content/projects/*.mdx (the `metadata` export of each file) ---

export interface ProjectMetadata {
  title: string
  slug: string
  summary: string
  projectType?: string
  organisation?: string
  year?: number
  featured: boolean
  order: number
  /** Path under /public. Used on cards, the case-study header and social previews. */
  coverImage?: string
  technologies: string[]
  githubUrl?: string | null
  liveUrl?: string | null
  /** Hides source-code links and shows a confidentiality note. */
  confidential?: boolean
}

// --- content/experience.ts ---

export interface Experience {
  role: string
  organisation: string
  employmentType?: string
  location?: string
  /** ISO date, e.g. "2025-09-01". */
  startDate: string
  endDate?: string
  current?: boolean
  summary: string
  responsibilities?: string[]
  technologies?: string[]
  order: number
}

// --- content/education.ts ---

export interface Education {
  title: string
  institution: string
  startDate?: string
  endDate?: string
  specialization?: string
  description?: string
  order: number
}

// --- content/skills.ts ---

export interface SkillCategory {
  name: string
  order: number
  skills: string[]
}
