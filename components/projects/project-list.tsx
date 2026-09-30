import { ProjectCard } from '@/components/projects/project-card'
import { Reveal } from '@/components/ui/reveal'
import type { ProjectMetadata } from '@/content/types'

// The first project (lowest `order`) gets flagship emphasis when it is featured.
export function ProjectList({ projects }: { projects: ProjectMetadata[] }) {
  const [first, ...rest] = projects
  if (!first) return null
  const hasFlagship = first.featured

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Reveal className={hasFlagship ? 'md:col-span-2' : undefined}>
        <ProjectCard project={first} flagship={hasFlagship} priority />
      </Reveal>
      {rest.map((project, index) => (
        <Reveal key={project.slug} delay={(index % 2) * 0.05}>
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  )
}
