import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import {
  BulletList,
  CaseStudySection,
} from '@/components/projects/case-study-section'
import { FigureGrid } from '@/components/projects/figure-grid'
import { ProjectLinks } from '@/components/projects/project-links'
import { RichText } from '@/components/projects/rich-text'
import { CmsImageFill } from '@/components/ui/cms-image'
import { TagList } from '@/components/ui/tag-list'
import { formatDateRange } from '@/lib/utils'
import type { PortableTextValue, Project } from '@/types/cms'

const hasText = (value?: PortableTextValue) => Boolean(value?.length)

export function CaseStudy({ project }: { project: Project }) {
  const meta = [project.projectType, project.year].filter(Boolean).join(' · ')
  const facts = [
    { label: 'Organisation', value: project.organisation },
    {
      label: 'Timeline',
      value: formatDateRange(project.startDate, project.endDate),
    },
  ].filter((fact): fact is { label: string; value: string } =>
    Boolean(fact.value),
  )

  const narrative: { id: string; title: string; value?: PortableTextValue }[] =
    [
      { id: 'context', title: 'Context', value: project.context },
      { id: 'problem', title: 'Problem', value: project.problem },
    ]
  const afterRole: typeof narrative = [
    { id: 'approach', title: 'Approach', value: project.approach },
  ]
  const tail: typeof narrative = [
    {
      id: 'implementation',
      title: 'Implementation',
      value: project.implementation,
    },
    { id: 'challenges', title: 'Challenges', value: project.challenges },
    { id: 'solution', title: 'Solution', value: project.solution },
    { id: 'results', title: 'Results', value: project.results },
    { id: 'lessons', title: 'What I learned', value: project.lessonsLearned },
    { id: 'more', title: 'More detail', value: project.body },
  ]

  const renderNarrative = (items: typeof narrative) =>
    items
      .filter((item) => hasText(item.value))
      .map((item) => (
        <CaseStudySection key={item.id} id={item.id} title={item.title}>
          <RichText value={item.value} />
        </CaseStudySection>
      ))

  const showArchitecture =
    hasText(project.architecture) || Boolean(project.architectureImages?.length)
  const showRole = Boolean(project.role || project.responsibilities?.length)

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
          <h1 className="text-display">{project.title}</h1>
          {project.shortDescription && (
            <p className="text-h3 text-muted mt-5 font-normal">
              {project.shortDescription}
            </p>
          )}
          <ProjectLinks project={project} />
        </div>
      </header>

      {project.coverImage && (
        <div className="container-page">
          <div className="border-border bg-surface relative aspect-[16/9] overflow-hidden rounded-2xl border">
            <CmsImageFill
              image={project.coverImage}
              fallbackAlt={`${project.title} cover`}
              sizes="(min-width: 1152px) 1152px, 100vw"
              priority
            />
          </div>
        </div>
      )}

      <div className="container-page mt-10">
        {facts.length > 0 && (
          <CaseStudySection id="overview" title="Overview">
            <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-metadata text-muted">{fact.label}</dt>
                  <dd className="text-body mt-1">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </CaseStudySection>
        )}

        {renderNarrative(narrative)}

        {project.constraints && project.constraints.length > 0 && (
          <CaseStudySection id="constraints" title="Constraints">
            <BulletList items={project.constraints} />
          </CaseStudySection>
        )}

        {showRole && (
          <CaseStudySection id="role" title="My role">
            {project.role && <p className="text-body">{project.role}</p>}
            <BulletList items={project.responsibilities} />
          </CaseStudySection>
        )}

        {renderNarrative(afterRole)}

        {showArchitecture && (
          <CaseStudySection id="architecture" title="Architecture">
            <RichText value={project.architecture} />
            <FigureGrid
              images={project.architectureImages}
              label="Architecture diagrams"
              columns={1}
            />
          </CaseStudySection>
        )}

        {renderNarrative(tail)}

        {project.gallery && project.gallery.length > 0 && (
          <CaseStudySection id="gallery" title="Gallery">
            <FigureGrid images={project.gallery} label="Project gallery" />
          </CaseStudySection>
        )}

        {project.technologies && project.technologies.length > 0 && (
          <CaseStudySection id="technology" title="Technology">
            <TagList
              items={project.technologies}
              label="Technologies used"
              className="gap-2"
            />
          </CaseStudySection>
        )}
      </div>
    </article>
  )
}
