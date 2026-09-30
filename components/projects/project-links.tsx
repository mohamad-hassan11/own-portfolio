import { Code, ExternalLink, Lock } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button'
import type { Project } from '@/types/cms'

export function ProjectLinks({ project }: { project: Project }) {
  const showRepo = !project.confidential && project.githubUrl
  const privateRepo =
    !project.confidential &&
    !project.githubUrl &&
    project.repositoryVisibility === 'private'

  if (!project.projectUrl && !showRepo && !privateRepo && !project.confidential)
    return null

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      {project.projectUrl && (
        <ButtonLink href={project.projectUrl}>
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
      {(privateRepo || project.confidential) && (
        <p className="text-small text-muted inline-flex items-center gap-2">
          <Lock aria-hidden className="size-4 shrink-0" />
          {project.confidential
            ? 'Confidential project. Source code and some details are not public.'
            : 'Source code is in a private repository.'}
        </p>
      )}
    </div>
  )
}
