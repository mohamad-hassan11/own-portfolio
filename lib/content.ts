import { education } from '@/content/education'
import { experience } from '@/content/experience'
import { skills } from '@/content/skills'
import type { Education, Experience, SkillCategory } from '@/content/types'

const byOrder = <T extends { order: number }>(items: T[]): T[] =>
  [...items].sort((a, b) => a.order - b.order)

export const getExperience = (): Experience[] => byOrder(experience)
export const getEducation = (): Education[] => byOrder(education)
export const getSkills = (): SkillCategory[] => byOrder(skills)
