import { Section } from '@/components/ui/section'
import { SkillsExplorer } from '@/components/sections/skills-explorer'
import type { SkillCategory } from '@/content/types'

export function Skills({ categories }: { categories: SkillCategory[] }) {
  if (!categories.length) return null

  return (
    <Section id="skills" tag="CAPABILITIES" title="Skills">
      <SkillsExplorer categories={categories} />
    </Section>
  )
}
