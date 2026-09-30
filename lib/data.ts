import { cache } from 'react'
import { cmsFetch } from '@/lib/cms'
import {
  ALL_PROJECTS_QUERY,
  EDUCATION_QUERY,
  EXPERIENCE_QUERY,
  FEATURED_PROJECTS_QUERY,
  PROJECT_BY_SLUG_QUERY,
  PROJECT_SLUGS_QUERY,
  SITE_SETTINGS_QUERY,
  SKILL_CATEGORIES_QUERY,
} from '@/lib/queries'
import type {
  Education,
  Experience,
  Project,
  ProjectSummary,
  SiteSettings,
  SkillCategory,
} from '@/types/cms'

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const data = await cmsFetch<SiteSettings>({
    query: SITE_SETTINGS_QUERY,
    tag: 'siteSettings',
  })
  return data ?? {}
})

export async function getFeaturedProjects(): Promise<ProjectSummary[]> {
  return (
    (await cmsFetch<ProjectSummary[]>({
      query: FEATURED_PROJECTS_QUERY,
      tag: 'project',
    })) ?? []
  )
}

export async function getAllProjects(): Promise<ProjectSummary[]> {
  return (
    (await cmsFetch<ProjectSummary[]>({
      query: ALL_PROJECTS_QUERY,
      tag: 'project',
    })) ?? []
  )
}

export async function getProjectSlugs(): Promise<
  { slug: string; _updatedAt: string }[]
> {
  return (
    (await cmsFetch<{ slug: string; _updatedAt: string }[]>({
      query: PROJECT_SLUGS_QUERY,
      tag: 'project',
    })) ?? []
  )
}

export const getProjectBySlug = cache(
  async (slug: string): Promise<Project | null> =>
    cmsFetch<Project>({
      query: PROJECT_BY_SLUG_QUERY,
      tag: 'project',
      params: { slug },
    }),
)

export async function getExperience(): Promise<Experience[]> {
  return (
    (await cmsFetch<Experience[]>({
      query: EXPERIENCE_QUERY,
      tag: 'experience',
    })) ?? []
  )
}

export async function getEducation(): Promise<Education[]> {
  return (
    (await cmsFetch<Education[]>({
      query: EDUCATION_QUERY,
      tag: 'education',
    })) ?? []
  )
}

export async function getSkillCategories(): Promise<SkillCategory[]> {
  return (
    (await cmsFetch<SkillCategory[]>({
      query: SKILL_CATEGORIES_QUERY,
      tag: 'skillCategory',
    })) ?? []
  )
}
