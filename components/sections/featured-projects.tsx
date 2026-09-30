import { ArrowRight } from 'lucide-react'
import { ProjectList } from '@/components/projects/project-list'
import { ButtonLink } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import type { ProjectMetadata } from '@/content/types'

export function FeaturedProjects({
  projects,
}: {
  projects: ProjectMetadata[]
}) {
  if (!projects.length) return null

  return (
    <Section
      id="projects"
      tag="02 / SELECTED SYSTEMS"
      title="Featured projects"
      action={
        <ButtonLink href="/projects" variant="secondary" size="sm">
          All projects
          <ArrowRight aria-hidden className="size-4" />
        </ButtonLink>
      }
    >
      <ProjectList projects={projects} />
    </Section>
  )
}
