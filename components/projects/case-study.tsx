import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ProjectLinks } from '@/components/projects/project-links'
import { TagList } from '@/components/ui/tag-list'
import type { Project } from '@/content/projects'

export function CaseStudy({ project }: { project: Project }) {
  const { metadata, Content } = project
  const meta = [metadata.projectType, metadata.organisation, metadata.year]
    .filter(Boolean)
    .join(' · ')

  return (
    <article>
      <header className="container-page pt-12 pb-10 sm:pt-16">
        <Link
          href="/projects"
          className="text-small text-muted hover:text-foreground inline-flex items-center gap-1.5 transition-colors duration-200"
        >
          <ArrowLeft aria-hidden className="size-4" />
          All projects
        </Link>

        <div className="mt-8 max-w-3xl">
          {meta && (
            <p className="text-metadata text-accent-text mb-4">{meta}</p>
          )}
          <h1 className="text-display">{metadata.title}</h1>
          <p className="text-h3 text-muted mt-5 font-normal">
            {metadata.summary}
          </p>
          <ProjectLinks project={metadata} />
        </div>
      </header>

      {metadata.coverImage && (
        <div className="container-page">
          <div className="border-border bg-surface relative aspect-[16/9] overflow-hidden rounded-2xl border">
            <Image
              src={metadata.coverImage}
              alt={`${metadata.title} cover`}
              fill
              priority
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div className="container-page mt-12 pb-16 sm:pb-24">
        <div className="max-w-3xl">
          <Content />

          <section
            aria-labelledby="technology-heading"
            className="border-border mt-14 border-t pt-8"
          >
            <h2 id="technology-heading" className="text-h2">
              Technology
            </h2>
            <TagList
              items={metadata.technologies}
              label="Technologies used"
              className="mt-4 gap-2"
            />
          </section>
        </div>
      </div>
    </article>
  )
}
