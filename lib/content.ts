import { education } from '@/content/education'
import { experience } from '@/content/experience'
import { getProjects } from '@/content/projects'
import { skills } from '@/content/skills'
import type { Education, Experience, SkillCategory } from '@/content/types'

const byOrder = <T extends { order: number }>(items: T[]): T[] =>
  [...items].sort((a, b) => a.order - b.order)

export const getExperience = (): Experience[] => byOrder(experience)
export const getEducation = (): Education[] => byOrder(education)
export const getSkills = (): SkillCategory[] => byOrder(skills)

export interface Stat {
  value: number
  label: string
}

// Counts derived from the content files, so they can never drift from the site.
export function getStats(): Stat[] {
  const technologies = new Set(
    getProjects().flatMap((project) =>
      project.metadata.technologies.map((tech) => tech.toLowerCase()),
    ),
  )

  return [
    { value: getProjects().length, label: 'Projects' },
    { value: technologies.size, label: 'Technologies used' },
    { value: skills.length, label: 'Skill areas' },
  ]
}
