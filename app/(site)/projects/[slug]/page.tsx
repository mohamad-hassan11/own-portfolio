import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CaseStudy } from '@/components/projects/case-study'
import { getProject, getProjects } from '@/content/projects'
import { buildMetadata } from '@/lib/seo'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getProjects().map(({ metadata }) => ({ slug: metadata.slug }))
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: 'Project not found' }

  const { metadata } = project
  return buildMetadata({
    path: `/projects/${slug}`,
    title: metadata.title,
    description: metadata.summary,
    image: metadata.coverImage,
  })
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  return <CaseStudy project={project} />
}
