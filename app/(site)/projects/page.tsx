import type { Metadata } from 'next'
import { ProjectList } from '@/components/projects/project-list'
import { EmptyState } from '@/components/ui/empty-state'
import { Section } from '@/components/ui/section'
import { getProjects } from '@/content/projects'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  path: '/projects',
  title: 'Projects',
  description:
    'Engineering case studies: problem, constraints, technical decisions and outcomes.',
})

export default function ProjectsPage() {
  const projects = getProjects().map((project) => project.metadata)

  return (
    <Section
      headingLevel={1}
      tag="PORTFOLIO"
      title="Projects"
      description="Engineering case studies covering the problem, constraints, decisions and outcome."
      className="pt-10 sm:pt-16"
    >
      {projects.length > 0 ? (
        <ProjectList projects={projects} />
      ) : (
        <EmptyState title="No projects yet" />
      )}
    </Section>
  )
}
