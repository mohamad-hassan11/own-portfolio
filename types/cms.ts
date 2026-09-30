import type { TypedObject } from '@portabletext/types'

export type PortableTextValue = TypedObject[]

export interface CmsImage {
  url: string
  alt?: string
  caption?: string
  width?: number
  height?: number
  lqip?: string
  hotspot?: { x: number; y: number }
}

export interface CmsFile {
  url: string
}

export interface NavItem {
  label: string
  href: string
}

export interface SiteSettings {
  fullName?: string
  professionalTitle?: string
  heroHeadline?: string
  heroDescription?: string
  heroTags?: string[]
  profileImage?: CmsImage
  aboutSummary?: string
  aboutHeadline?: string
  aboutText?: PortableTextValue
  email?: string
  location?: string
  githubUrl?: string
  linkedinUrl?: string
  cvUrl?: string
  contactHeadline?: string
  contactDescription?: string
  navigation?: NavItem[]
  footerText?: string
  siteTitle?: string
  defaultMetaDescription?: string
  ogImage?: CmsImage
}

export type RepositoryVisibility = 'public' | 'private' | 'none'

export interface ProjectSummary {
  _id: string
  title: string
  slug: string
  shortDescription?: string
  organisation?: string
  projectType?: string
  year?: number
  featured?: boolean
  technologies?: string[]
  thumbnail?: CmsImage
}

export interface Project extends ProjectSummary {
  role?: string
  startDate?: string
  endDate?: string
  confidential?: boolean
  projectUrl?: string
  githubUrl?: string
  repositoryVisibility?: RepositoryVisibility
  coverImage?: CmsImage
  gallery?: CmsImage[]
  context?: PortableTextValue
  problem?: PortableTextValue
  constraints?: string[]
  responsibilities?: string[]
  approach?: PortableTextValue
  architecture?: PortableTextValue
  architectureImages?: CmsImage[]
  implementation?: PortableTextValue
  challenges?: PortableTextValue
  solution?: PortableTextValue
  results?: PortableTextValue
  lessonsLearned?: PortableTextValue
  body?: PortableTextValue
}

export interface Experience {
  _id: string
  jobTitle: string
  organisation: string
  employmentType?: string
  location?: string
  startDate?: string
  endDate?: string
  currentRole?: boolean
  summary?: string
  responsibilities?: string[]
  technologies?: string[]
}

export interface Education {
  _id: string
  degree: string
  institution: string
  specialization?: string
  startDate?: string
  endDate?: string
  description?: string
}

export interface SkillCategory {
  _id: string
  title: string
  skills?: string[]
}
