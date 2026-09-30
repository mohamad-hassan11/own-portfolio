import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CaseStudy } from '@/components/projects/case-study'
import { getProjectBySlug, getProjectSlugs, getSiteSettings } from '@/lib/data'
import { buildMetadata } from '@/lib/seo'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const [project, settings] = await Promise.all([
    getProjectBySlug(slug),
    getSiteSettings(),
  ])
  if (!project) return { title: 'Project not found' }

  return buildMetadata({
    settings,
    path: `/projects/${slug}`,
    title: project.title,
    description: project.shortDescription,
    image: project.coverImage ?? project.thumbnail,
  })
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  return <CaseStudy project={project} />
}
