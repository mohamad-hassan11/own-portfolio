import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { TagList } from '@/components/ui/tag-list'
import type { ProjectMetadata } from '@/content/types'
import { cn } from '@/lib/utils'

const tones = [
  'var(--tone-blue)',
  'var(--tone-green)',
  'var(--tone-amber)',
  'var(--tone-red)',
  'var(--tone-violet)',
]

interface ProjectCardProps {
  project: ProjectMetadata
  /** Zero-based position in the list. */
  index: number
  flagship?: boolean
  priority?: boolean
}

export function ProjectCard({
  project,
  index,
  flagship,
  priority,
}: ProjectCardProps) {
  const meta = [project.projectType, project.organisation, project.year]
    .filter(Boolean)
    .join(' · ')
  const showRepo = !project.confidential && project.githubUrl

  const linkClass =
    'text-metadata text-muted hover:text-foreground relative z-10 font-semibold underline underline-offset-4'

  return (
    <article
      style={{ '--card-tone': tones[index % tones.length] } as CSSProperties}
      className={cn(
        'border-border bg-surface group hover:bg-surface-hover relative flex h-full flex-col gap-5 overflow-hidden border p-5 transition-colors duration-200 sm:p-6',
        'before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-[var(--card-tone)]',
        flagship && 'md:grid md:grid-cols-[1.15fr_0.85fr] md:gap-10',
      )}
    >
      <div
        className={cn(
          'border-ink pattern-dots relative aspect-[16/10] w-full overflow-hidden border-2',
          flagship &&
            'md:order-2 md:aspect-auto md:min-h-72 md:translate-x-6 md:translate-y-6',
        )}
      >
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt=""
            fill
            priority={priority}
            sizes={
              flagship
                ? '(min-width: 768px) 520px, 100vw'
                : '(min-width: 768px) 480px, 100vw'
            }
            className="object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="text-ghost font-display absolute inset-0 flex items-center justify-center text-8xl font-extrabold"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <p className="text-metadata text-[var(--card-tone)]">
            [{String(index + 1).padStart(2, '0')}]{flagship && ' · Flagship'}
          </p>
          <ArrowUpRight
            aria-hidden
            className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
          />
        </div>

        <h3 className={flagship ? 'text-h1' : 'text-h3'}>
          <Link
            href={`/projects/${project.slug}`}
            data-cursor-label="OPEN"
            className="after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </Link>
        </h3>

        {meta && <p className="text-metadata text-muted">{meta}</p>}
        <p className="text-body text-muted">{project.summary}</p>

        <TagList
          items={project.technologies}
          max={flagship ? 8 : 5}
          label={`${project.title} technologies`}
          className="mt-auto"
        />

        {(project.liveUrl || showRepo) && (
          <div className="flex gap-5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Live demo
              </a>
            )}
            {showRepo && project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Source
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
