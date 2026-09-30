import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import type { SkillCategory } from '@/types/cms'

export function Skills({ categories }: { categories: SkillCategory[] }) {
  const visible = categories.filter((category) => category.skills?.length)
  if (!visible.length) return null

  return (
    <Section id="skills" eyebrow="Skills" title="Technical toolbox">
      <Reveal>
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((category) => (
            <div key={category._id}>
              <h3 className="text-h3">{category.title}</h3>
              <ul className="text-small text-muted mt-3 flex flex-wrap gap-x-1 gap-y-1.5">
                {category.skills?.map((skill, index) => (
                  <li key={skill} className="flex items-center gap-1">
                    {skill}
                    {index < (category.skills?.length ?? 0) - 1 && (
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
