import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ProjectLinks } from '@/components/projects/project-links'
import { TechMarquee } from '@/components/projects/tech-marquee'
import type { Project } from '@/content/projects'

export function CaseStudy({ project }: { project: Project }) {
  const { metadata, Content } = project
  const meta = [metadata.projectType, metadata.organisation, metadata.year]
    .filter(Boolean)
    .join(' · ')

  return (
    <article className="pb-6">
      <header className="py-10 sm:py-16">
        <Link
          href="/projects"
          className="text-metadata text-muted hover:text-foreground inline-flex items-center gap-2 font-semibold transition-colors duration-200"
        >
          <ArrowLeft aria-hidden className="size-4" />
          All projects
        </Link>

        <div className="mt-10 max-w-4xl">
          <p className="text-metadata text-accent-text mb-4">
            {`PROJECT NOTE${meta ? ` · ${meta}` : ''}`}
          </p>
          <h1 className="text-display">{metadata.title}</h1>
          <span aria-hidden className="bg-accent mt-5 block h-1 w-16" />
          <p className="text-body text-muted mt-6 max-w-2xl">
            {metadata.summary}
          </p>
          <ProjectLinks project={metadata} />
        </div>
      </header>

      {metadata.coverImage && (
        <div className="brutal bg-surface relative mb-14 aspect-[16/9] overflow-hidden">
          <Image
            src={metadata.coverImage}
            alt={`${metadata.title} cover`}
            fill
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="max-w-3xl [&>h2:nth-of-type(5n+1)]:border-(color:--tone-blue) [&>h2:nth-of-type(5n+2)]:border-(color:--tone-green) [&>h2:nth-of-type(5n+3)]:border-(color:--tone-amber) [&>h2:nth-of-type(5n+4)]:border-(color:--tone-red) [&>h2:nth-of-type(5n+5)]:border-(color:--tone-violet)">
        <Content />
      </div>

      <TechMarquee items={metadata.technologies} />
    </article>
  )
}
