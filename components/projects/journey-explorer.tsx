'use client'

import {
  Children,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ProjectEvidence } from '@/components/projects/project-evidence'
import { getStageEvidence } from '@/lib/project-composition'
import { cn } from '@/lib/utils'
import type {
  JourneyMedia,
  JourneySectionMetadata,
  JourneyStage,
} from '@/content/types'

interface JourneyExplorerProps {
  slug: string
  stages: JourneyStage[]
  sections: JourneySectionMetadata[]
  media: JourneyMedia[]
  initialStage: number
  children: ReactNode
}

export function JourneyExplorer({
  slug,
  stages,
  sections,
  media,
  initialStage,
  children,
}: JourneyExplorerProps) {
  const firstStage = stages[initialStage] ?? stages[0]
  const [selectedStageId, setSelectedStageId] = useState(firstStage.id)
  const [selectedSectionId, setSelectedSectionId] = useState(
    firstStage.sectionIds[0],
  )
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null)
  const panelId = useId()
  const sectionRef = useRef<HTMLDivElement>(null)
  const stageIndex = stages.findIndex((stage) => stage.id === selectedStageId)
  const stage = stages[stageIndex]
  const stageSections = stage.sectionIds.map((id) =>
    sections.find((s) => s.id === id)!,
  )
  const section = sections.find((item) => item.id === selectedSectionId)!
  const sectionIndex = sections.findIndex(
    (item) => item.id === selectedSectionId,
  )
  const content = Children.toArray(children)
  const availableMedia = getStageEvidence(media, stage, selectedSectionId)
  const artifact =
    availableMedia.find((item) => item.id === selectedMediaId) ??
    availableMedia.find((item) => item.sectionId === selectedSectionId) ??
    availableMedia[0]
  const artifactSection = sections.find(
    (item) => item.id === artifact?.sectionId,
  )
  const toneStyle = {
    '--journey-tone': `var(--tone-${stage.tone})`,
  } as CSSProperties
  const positionInStage = stage.sectionIds.indexOf(selectedSectionId)
  const flatOrder = stages.flatMap((item) => item.sectionIds)
  const position = flatOrder.indexOf(selectedSectionId)

  function selectStage(nextStage: JourneyStage) {
    setSelectedStageId(nextStage.id)
    setSelectedSectionId(nextStage.sectionIds[0])
    setSelectedMediaId(null)
  }

  function selectSection(id: string) {
    setSelectedSectionId(id)
    setSelectedMediaId(null)
  }

  function move(direction: -1 | 1) {
    const id = flatOrder[position + direction]
    if (!id) return
    const nextStage = stages.find((item) => item.sectionIds.includes(id))!
    setSelectedStageId(nextStage.id)
    selectSection(id)
    requestAnimationFrame(() => sectionRef.current?.focus())
  }

  return (
    <div className="journey-explorer" style={toneStyle} data-project={slug}>
      <aside className="journey-rail brutal">
        <div className="journey-rail-heading">
          <h2>Explore the project</h2>
          <p>
            {stages.length} stages · {sections.length} sections
          </p>
        </div>
        <nav aria-label="Project journey stages" className="journey-stages">
          {stages.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={item.id === stage.id}
              aria-controls={panelId}
              onClick={() => selectStage(item)}
              className="journey-stage"
            >
              <span className="journey-stage-meta">
                <span>Stage {String(index + 1).padStart(2, '0')}</span>
                <span>
                  {item.sectionIds.length}{' '}
                  {item.sectionIds.length === 1 ? 'section' : 'sections'}
                </span>
              </span>
              <strong>{item.title}</strong>
            </button>
          ))}
        </nav>
      </aside>

      <div
        className={cn(
          'journey-workspace',
          !artifact && 'journey-workspace-text',
        )}
      >
        <div className="journey-dossier brutal" id={panelId}>
          <div className="journey-panel-heading">
            <strong>{stage.title}</strong>
            <span>
              {positionInStage + 1} / {stage.sectionIds.length}
            </span>
          </div>
          {stageSections.length > 1 && (
            <nav
              className="journey-section-nav"
              aria-label="Sections in selected stage"
            >
              {stageSections.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={item.id === section.id}
                  aria-controls={panelId}
                  onClick={() => selectSection(item.id)}
                >
                  {item.title}
                </button>
              ))}
            </nav>
          )}
          <div
            key={section.id}
            ref={sectionRef}
            tabIndex={-1}
            className="journey-section-slot"
          >
            {content[sectionIndex]}
          </div>
          <nav
            className="journey-pagination"
            aria-label="Continue the project journey"
          >
            <button
              type="button"
              disabled={position === 0}
              onClick={() => move(-1)}
            >
              <ArrowLeft aria-hidden className="size-3.5" />
              Previous
            </button>
            <span>
              {position + 1} / {sections.length}
            </span>
            <button
              type="button"
              disabled={position === sections.length - 1}
              onClick={() => move(1)}
            >
              Next
              <ArrowRight aria-hidden className="size-3.5" />
            </button>
          </nav>
        </div>

        {artifact && (
          <div className="journey-evidence brutal">
            <ProjectEvidence
              key={artifact.id}
              media={artifact}
              context={`${artifact.sectionId === section.id ? 'Section evidence' : 'Stage reference'}${artifactSection ? ` · ${artifactSection.title}` : ''}`}
            />
            {availableMedia.length > 1 && (
              <div
                className="journey-media-nav"
                role="group"
                aria-label="Choose project evidence"
              >
                {availableMedia.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={item.id === artifact.id}
                    onClick={() => setSelectedMediaId(item.id)}
                    title={item.label}
                  >
                    <Image
                      src={item.src}
                      alt=""
                      width={84}
                      height={48}
                      className="journey-thumbnail"
                    />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {stage.title}: {section.title}. Section {position + 1} of{' '}
        {sections.length}.
      </p>
    </div>
  )
}
