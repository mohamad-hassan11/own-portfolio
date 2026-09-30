import { Code, ExternalLink, Lock } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button'
import type { ProjectMetadata } from '@/content/types'

export function ProjectLinks({ project }: { project: ProjectMetadata }) {
  const showRepo = !project.confidential && project.githubUrl

  if (!project.liveUrl && !showRepo && !project.confidential) return null

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
      {project.liveUrl && (
        <ButtonLink href={project.liveUrl}>
          <ExternalLink aria-hidden className="size-4" />
          Live demo
        </ButtonLink>
      )}
      {showRepo && project.githubUrl && (
        <ButtonLink href={project.githubUrl} variant="secondary">
          <Code aria-hidden className="size-4" />
          Source
        </ButtonLink>
      )}
      {project.confidential && (
        <p className="border-border text-small text-muted inline-flex items-center gap-2 border-2 border-dashed px-4 py-2.5">
          <Lock aria-hidden className="size-4 shrink-0" />
          Confidential project. Source code and some details are not public.
        </p>
      )}
    </div>
  )
}
