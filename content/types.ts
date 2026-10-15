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
  /** Optional concise title for the project page; metadata keeps the full title. */
  displayTitle?: string
  slug: string
  summary: string
  projectType?: string
  organisation?: string
  year?: number
  featured: boolean
  order: number
  /** Journey pages provide their own header and navigable engineering sections. */
  layout?: 'default' | 'collection' | 'research' | 'journey'
  /** Path under /public. Used on cards, the case-study header and social previews. */
  coverImage?: string
  /** Full screenshot dimensions. Opts into an uncropped, compact case-study cover. */
  coverImageDimensions?: { width: number; height: number }
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

/** Artifact and contextual explanation authored in the project's MDX file. */
export interface InspectorView {
  label: string
  category: string
  title: string
  description: string
  decision: string
  src: string
  alt: string
  width: number
  height: number
  caption: string
}

export interface JourneyStage {
  id: string
  title: string
  tone: 'blue' | 'green' | 'amber' | 'violet' | 'red'
  sectionIds: string[]
}

export interface JourneySectionMetadata {
  id: string
  title: string
}

export interface JourneyMedia {
  id: string
  src: string
  alt: string
  label: string
  caption: string
  width: number
  height: number
  sectionId?: string
  /** Optional recording; src remains its still poster for thumbnails. */
  videoSrc?: string
}

export type ProjectCompositionVariant =
  | 'evolution'
  | 'analytics'
  | 'research'
  | 'monitoring'
  | 'services'
  | 'connections'
  | 'desktop'
  | 'input'
  | 'learning'

/** Short, project-authored presentation copy; full narratives stay in MDX. */
export interface CompositionChoice {
  id: string
  label: string
  heading: string
  description: string
  mediaIds: string[]
}

export interface ProjectCompositionMetadata {
  variant: ProjectCompositionVariant
  heading: string
  description: string
  choices: CompositionChoice[]
  initialChoice?: number
  sequence?: string[]
  entities?: { parent: string; child: string; relationship: string }
  supporting?: {
    heading: string
    description: string
    choices: CompositionChoice[]
    initialChoice?: number
  }
  studioTitle: string
  /** Render this existing MDX section once, as a visible conclusion. */
  conclusionId: string
}
