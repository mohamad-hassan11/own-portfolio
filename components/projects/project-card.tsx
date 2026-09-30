import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { CmsImageFill } from '@/components/ui/cms-image'
import { TagList } from '@/components/ui/tag-list'
import { cn } from '@/lib/utils'
import type { ProjectSummary } from '@/types/cms'

interface ProjectCardProps {
  project: ProjectSummary
  flagship?: boolean
  priority?: boolean
}

export function ProjectCard({ project, flagship, priority }: ProjectCardProps) {
  const meta = [project.projectType, project.organisation, project.year]
    .filter(Boolean)
    .join(' · ')

  return (
    <article
      className={cn(
        'group border-border bg-surface hover:border-accent/60 relative flex flex-col overflow-hidden rounded-2xl border transition duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        flagship && 'border-accent/40 bg-accent-soft',
        flagship && project.thumbnail && 'md:grid md:grid-cols-2',
      )}
    >
      {project.thumbnail && (
        <div
          className={cn(
            'bg-surface-hover relative aspect-[16/9] w-full',
            flagship && 'md:aspect-auto md:min-h-80',
          )}
        >
          <CmsImageFill
            image={project.thumbnail}
            fallbackAlt={`${project.title} preview`}
            priority={priority}
            sizes="(min-width: 768px) 560px, 100vw"
          />
        </div>
      )}

      <div
        className={cn(
          'flex flex-1 flex-col gap-4 p-6',
          flagship && 'sm:p-8 md:justify-center',
        )}
      >
        {flagship && (
          <p className="text-metadata text-accent-text">Flagship project</p>
        )}
        {meta && <p className="text-metadata text-muted">{meta}</p>}

        <h3 className={flagship ? 'text-h1' : 'text-h3'}>
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </Link>
        </h3>

        {project.shortDescription && (
          <p className="text-body text-muted">{project.shortDescription}</p>
        )}

        <TagList
          items={project.technologies}
          max={flagship ? 8 : 5}
          label={`${project.title} technologies`}
          className="mt-auto pt-2"
        />

        <span className="text-accent-text inline-flex items-center gap-1 text-sm font-medium">
          View case study
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
          />
        </span>
      </div>
    </article>
  )
}
