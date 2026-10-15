import { Children, isValidElement, type ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { JourneyExplorer } from '@/components/projects/journey-explorer'
import { ProjectLinks } from '@/components/projects/project-links'
import { TechMarquee } from '@/components/projects/tech-marquee'
import { ProjectComposition } from '@/components/projects/project-composition'
import { buildProjectPresentation } from '@/lib/project-composition'
import type {
  JourneyMedia,
  JourneySectionMetadata,
  JourneyStage,
  ProjectMetadata,
  ProjectCompositionMetadata,
} from '@/content/types'

interface ProjectJourneyProps {
  project: ProjectMetadata
  stages: JourneyStage[]
  sections: JourneySectionMetadata[]
  media: JourneyMedia[]
  initialStage?: number
  composition?: ProjectCompositionMetadata
  children: ReactNode
}

export function ProjectJourney({
  project,
  stages,
  sections,
  media,
  initialStage = 0,
  composition,
  children,
}: ProjectJourneyProps) {
  const sectionContent = Children.toArray(children).filter(isValidElement)
  const title = project.displayTitle ?? project.title.split(' — ')[0]
  const context = [project.organisation, project.year]
    .filter(Boolean)
    .join(' · ')

  if (sectionContent.length !== sections.length) {
    throw new Error(`Journey section count mismatch for ${project.slug}`)
  }
  const presentation = buildProjectPresentation({
    slug: project.slug,
    stages,
    sections,
    media,
    composition,
    initialStage,
  })
  const studioId = `studio-${project.slug}`

  return (
    <article
      className="project-journey"
      data-composition={composition?.variant}
    >
      <Link href="/projects" className="journey-back">
        <ArrowLeft aria-hidden className="size-4" />
        All projects
      </Link>
      <header className="journey-header">
        <div>
          <h1 className="journey-title text-display">{title}</h1>
          <p className="journey-summary">{project.summary}</p>
        </div>
        <div className="journey-meta">
          {project.projectType && <strong>{project.projectType}</strong>}
          {context && <p>{context}</p>}
          <ProjectLinks project={project} />
        </div>
      </header>
      {composition && (
        <ProjectComposition
          key={project.slug}
          composition={composition}
          media={media}
          studioId={studioId}
        />
      )}
      <section
        id={studioId}
        className="composition-studio"
        aria-label={composition?.studioTitle ?? 'Engineering studio'}
      >
        {composition && (
          <header className="composition-studio-heading">
            <h2>{composition.studioTitle}</h2>
            <p>
              Choose a stage to inspect the engineering decisions and their
              supporting evidence.
            </p>
          </header>
        )}
        <JourneyExplorer
          key={project.slug}
          slug={project.slug}
          stages={presentation.studioStages}
          sections={presentation.studioSections}
          media={media}
          initialStage={presentation.initialStudioStage}
        >
          {presentation.studioSectionIndices.map(
            (index) => sectionContent[index],
          )}
        </JourneyExplorer>
      </section>
      {presentation.conclusionIndex >= 0 && (
        <div className="composition-conclusion">
          {sectionContent[presentation.conclusionIndex]}
        </div>
      )}
      <TechMarquee items={project.technologies} />
      <div className="journey-end">
        <Link href="/projects" className="journey-back">
          <ArrowLeft aria-hidden className="size-4" />
          Explore more projects
        </Link>
      </div>
    </article>
  )
}

export function JourneySection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) {
  return (
    <section className="journey-section" aria-labelledby={`journey-${id}`}>
      <h2 id={`journey-${id}`}>{title}</h2>
      <div className="journey-prose">{children}</div>
    </section>
  )
}
