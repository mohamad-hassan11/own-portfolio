import { Section } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { TagList } from '@/components/ui/tag-list'
import type { SkillCategory } from '@/content/types'

export function Skills({ categories }: { categories: SkillCategory[] }) {
  if (!categories.length) return null

  return (
    <Section id="skills" tag="03 / ENGINEERING TOOLKIT" title="Skills">
      <Reveal>
        <ul className="border-border bg-border grid gap-px overflow-hidden border md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <li key={category.name} className="bg-background p-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-h3">{category.name}</h3>
                <span className="text-metadata text-accent-text">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <TagList
                items={category.skills}
                label={`${category.name} skills`}
                className="mt-5"
              />
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
