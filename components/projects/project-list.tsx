import { ProjectCard } from '@/components/projects/project-card'
import { Reveal } from '@/components/ui/reveal'
import type { ProjectSummary } from '@/types/cms'

// The first featured project (by CMS displayOrder) gets flagship emphasis.
export function ProjectList({ projects }: { projects: ProjectSummary[] }) {
  const [first, ...rest] = projects
  if (!first) return null
  const hasFlagship = Boolean(first.featured)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Reveal className={hasFlagship ? 'md:col-span-2' : undefined}>
        <ProjectCard project={first} flagship={hasFlagship} priority />
      </Reveal>
      {rest.map((project, index) => (
        <Reveal key={project._id} delay={(index % 2) * 0.05}>
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  )
}
