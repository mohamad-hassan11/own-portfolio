import type { Metadata } from 'next'
import { ProjectList } from '@/components/projects/project-list'
import { EmptyState } from '@/components/ui/empty-state'
import { Section } from '@/components/ui/section'
import { getAllProjects, getSiteSettings } from '@/lib/data'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return buildMetadata({
    settings,
    path: '/projects',
    title: 'Projects',
    description:
      'Engineering case studies: problem, constraints, technical decisions and outcomes.',
  })
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <Section
      eyebrow="Work"
      title="Projects"
      description="Engineering case studies covering the problem, constraints, decisions and outcome."
      className="pt-12 sm:pt-20"
    >
      {projects.length > 0 ? (
        <ProjectList projects={projects} />
      ) : (
        <EmptyState
          title="No projects published yet"
          description="Projects appear here once they are published in the CMS."
        />
      )}
    </Section>
  )
}
