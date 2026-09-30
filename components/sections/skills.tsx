import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import type { SkillCategory } from '@/content/types'

export function Skills({ categories }: { categories: SkillCategory[] }) {
  if (!categories.length) return null

  return (
    <Section id="skills" eyebrow="Skills" title="Technical toolbox">
      <Reveal>
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div key={category.name}>
              <h3 className="text-h3">{category.name}</h3>
              <ul className="text-small text-muted mt-3 flex flex-wrap gap-x-1 gap-y-1.5">
                {category.skills.map((skill, index) => (
                  <li key={skill} className="flex items-center gap-1">
                    {skill}
                    {index < category.skills.length - 1 && (
                      <span aria-hidden className="text-border">
                        /
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
