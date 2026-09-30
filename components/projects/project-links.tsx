import { Code, ExternalLink, Lock } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button'
import type { ProjectMetadata } from '@/content/types'

export function ProjectLinks({ project }: { project: ProjectMetadata }) {
  const showRepo = !project.confidential && project.githubUrl

  if (!project.liveUrl && !showRepo && !project.confidential) return null

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      {project.liveUrl && (
        <ButtonLink href={project.liveUrl}>
          <ExternalLink aria-hidden className="size-4" />
          Visit project
        </ButtonLink>
      )}
      {showRepo && project.githubUrl && (
        <ButtonLink href={project.githubUrl} variant="secondary">
          <Code aria-hidden className="size-4" />
          View source
        </ButtonLink>
      )}
      {project.confidential && (
        <p className="text-small text-muted inline-flex items-center gap-2">
          <Lock aria-hidden className="size-4 shrink-0" />
          Confidential project. Source code and some details are not public.
        </p>
      )}
    </div>
  )
}
