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
  technologies?: string[]
  order: number
}

export interface Education {
  title: string
  institution: string
  startDate?: string
  endDate?: string
  specialization?: string
  description?: string
  order: number
}

export interface SkillCategory {
  name: string
  order: number
  skills: string[]
}
