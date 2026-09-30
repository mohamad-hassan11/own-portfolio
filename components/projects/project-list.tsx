import { ProjectCard } from '@/components/projects/project-card'
import { Reveal } from '@/components/ui/reveal'
import type { ProjectMetadata } from '@/content/types'
import { cn } from '@/lib/utils'

// The first project (lowest `order`) spans the full width when it is featured.
export function ProjectList({ projects }: { projects: ProjectMetadata[] }) {
  if (!projects.length) return null

  return (
    <ul className="grid gap-8 md:grid-cols-2">
      {projects.map((project, index) => {
        const flagship = index === 0 && project.featured
        return (
          <li key={project.slug} className={cn(flagship && 'md:col-span-2')}>
            <Reveal className="h-full">
              <ProjectCard
                project={project}
                index={index}
                flagship={flagship}
                priority={index === 0}
              />
            </Reveal>
          </li>
        )
      })}
    </ul>
  )
}
