'use client'

import { useId, useState } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowRightLeft,
  Minus,
} from 'lucide-react'
import { ProjectEvidence } from '@/components/projects/project-evidence'
import type {
  CompositionChoice,
  JourneyMedia,
  ProjectCompositionMetadata,
} from '@/content/types'

function Choices({
  choices,
  selected,
  onSelect,
  label,
  panelId,
  className = '',
}: {
  choices: CompositionChoice[]
  selected: number
  onSelect: (index: number) => void
  label: string
  panelId: string
  className?: string
}) {
  return (
    <nav className={`composition-choices ${className}`} aria-label={label}>
      {choices.map((choice, index) => (
        <button
          key={choice.id}
          type="button"
          aria-pressed={selected === index}
          aria-controls={panelId}
          onClick={() => onSelect(index)}
        >
          <span>{choice.label}</span>
        </button>
      ))}
    </nav>
  )
}

function Explanation({ choice }: { choice: CompositionChoice }) {
  return (
    <div className="composition-explanation">
      <h3>{choice.heading}</h3>
      <p>{choice.description}</p>
    </div>
  )
}

export function ProjectComposition({
  composition,
  media,
  studioId,
}: {
  composition: ProjectCompositionMetadata
  media: JourneyMedia[]
  studioId: string
}) {
  const [selected, setSelected] = useState(composition.initialChoice ?? 0)
  const [supportingIndex, setSupportingIndex] = useState(
    composition.supporting?.initialChoice ?? 0,
  )
  const panelId = useId()
  const supportingId = useId()
  const supportingHeadingId = useId()
  const headingId = useId()
  const choice = composition.choices[selected]
  const supporting = composition.supporting
  const supportingChoice = supporting?.choices[supportingIndex]
  const variant = composition.variant
  const controls = (
    <Choices
      choices={composition.choices}
      selected={selected}
      onSelect={setSelected}
      label={composition.heading}
      panelId={panelId}
      className={`composition-${variant}-choices`}
    />
  )
  const supportControls = supporting && (
    <Choices
      choices={supporting.choices}
      selected={supportingIndex}
      onSelect={setSupportingIndex}
      label={supporting.heading}
      panelId={supportingId}
    />
  )

  function evidence(item: CompositionChoice, priority = false) {
    return (
      <div className="composition-artifacts">
        {item.mediaIds.map((id, index) => (
          <ProjectEvidence
            key={id}
            media={media.find((artifact) => artifact.id === id)!}
            priority={priority && index === 0}
          />
        ))}
      </div>
    )
  }

  const intro = (
    <div className="composition-intro">
      <h2 id={headingId}>{composition.heading}</h2>
      <p>{composition.description}</p>
    </div>
  )
  const jump = (
    <a className="composition-jump" href={`#${studioId}`}>
      Explore the engineering <ArrowDown aria-hidden className="size-4" />
    </a>
  )
  const support = supporting && supportingChoice && (
    <section
      className="composition-support"
      aria-labelledby={supportingHeadingId}
    >
      <div className="composition-support-intro">
        <h2 id={supportingHeadingId}>{supporting.heading}</h2>
        <p>{supporting.description}</p>
      </div>
      <div>
        {supportControls}
        <div id={supportingId} className="composition-support-detail">
          <Explanation choice={supportingChoice} />
          {evidence(supportingChoice)}
        </div>
      </div>
    </section>
  )

  return (
    <section
      className={`project-composition composition-${variant}`}
      aria-labelledby={headingId}
    >
      {variant === 'evolution' && (
        <>
          {intro}
          {controls}
          <div id={panelId} className="composition-evolution-panel">
            {evidence(choice, true)}
            <Explanation choice={choice} />
          </div>
        </>
      )}
      {variant === 'analytics' && (
        <>
          {controls}
          <div id={panelId} className="composition-analytics-panel">
            {evidence(choice, true)}
            <aside>
              {intro}
              <Explanation choice={choice} />
              {jump}
            </aside>
          </div>
          {support}
        </>
      )}
      {variant === 'research' && (
        <>
          <div className="composition-research-opening">
            {intro}
            <div>
              {controls}
              <div id={panelId}>
                <Explanation choice={choice} />
              </div>
            </div>
          </div>
          {evidence(choice, true)}
          {support}
        </>
      )}
      {variant === 'monitoring' && (
        <div className="composition-monitoring-panel">
          <div id={panelId}>{evidence(choice, true)}</div>
          <aside>
            {intro}
            {controls}
            <Explanation choice={choice} />
            {jump}
          </aside>
        </div>
      )}
      {variant === 'services' && (
        <>
          {controls}
          <div id={panelId} className="composition-services-panel">
            {evidence(choice, true)}
            <div>
              {intro}
              <Explanation choice={choice} />
              {jump}
            </div>
          </div>
          {choice.id === 'reservations' && support}
        </>
      )}
      {variant === 'connections' && (
        <div className="composition-connections-panel">
          <div>
            {intro}
            <ol
              className="composition-onboarding"
              aria-label="Onboarding sequence"
            >
              {composition.sequence?.map((step, index) => (
                <li key={step}>
                  {index > 0 && <ArrowRight aria-hidden />}
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            {controls}
            <div id={panelId}>
              <div className="composition-relationship" aria-hidden="true">
                <span>User</span>
                {choice.id === 'friends' ? (
                  <ArrowRightLeft />
                ) : choice.id === 'outgoing' ? (
                  <ArrowRight />
                ) : choice.id === 'incoming' ? (
                  <ArrowLeft />
                ) : (
                  <Minus />
                )}
                <span>Candidate</span>
              </div>
              <Explanation choice={choice} />
            </div>
            {jump}
          </div>
          {evidence(choice, true)}
        </div>
      )}
      {variant === 'desktop' && (
        <>
          {intro}
          {composition.entities && (
            <div className="composition-entities">
              <strong>{composition.entities.parent}</strong>
              <span>
                {composition.entities.relationship}
                <ArrowRight aria-hidden />
              </span>
              <strong>{composition.entities.child}</strong>
            </div>
          )}
          {controls}
          <div id={panelId}>
            {evidence(choice, true)}
            <Explanation choice={choice} />
          </div>
          {support}
        </>
      )}
      {variant === 'input' && (
        <>
          {intro}
          <div className="composition-input-panel">
            <div>
              {controls}
              <div id={panelId}>
                <Explanation choice={choice} />
              </div>
              {jump}
            </div>
            <div>
              {supporting && (
                <header className="composition-capture-heading">
                  <h3>{supporting.heading}</h3>
                  <p>{supporting.description}</p>
                </header>
              )}
              {supportControls}
              <div id={supportingId}>
                {supportingChoice && evidence(supportingChoice, true)}
                {supportingChoice && <Explanation choice={supportingChoice} />}
              </div>
            </div>
          </div>
        </>
      )}
      {variant === 'learning' && (
        <>
          {intro}
          {controls}
          <div id={panelId} className="composition-learning-panel">
            {evidence(choice, true)}
            <Explanation choice={choice} />
          </div>
        </>
      )}
      {variant === 'experiment' && composition.experiment && (
        <>
          {intro}
          <div className="experiment-implementations">
            {composition.experiment.implementations.map((implementation) => (
              <article
                key={implementation.id}
                className="experiment-implementation"
              >
                <h3>{implementation.title}</h3>
                <p className="experiment-starting-tool">
                  Started with <strong>{implementation.startingTool}</strong>
                </p>
                <ProjectEvidence
                  media={media.find(
                    (item) => item.id === implementation.mediaId,
                  )!}
                  priority
                  actualSize
                />
                <p className="experiment-app-description">
                  {implementation.description}
                </p>
              </article>
            ))}
          </div>
          <section
            className="experiment-tools"
            aria-label={composition.experiment.tools.heading}
          >
            <h2>{composition.experiment.tools.heading}</h2>
            <div>
              <p>{composition.experiment.tools.description}</p>
              <dl>
                <div>
                  <dt>Model families</dt>
                  <dd>
                    {composition.experiment.tools.modelFamilies.join(' · ')}
                  </dd>
                </div>
                <div>
                  <dt>Coding tools</dt>
                  <dd>
                    {composition.experiment.tools.codingTools.join(' · ')}
                  </dd>
                </div>
              </dl>
            </div>
          </section>
          <section
            className="experiment-capabilities"
            aria-label="Explore the applications"
          >
            <h2>Explore what took shape.</h2>
            {controls}
            <div id={panelId}>
              <p className="experiment-capability-description">
                {choice.description}
              </p>
              <div className="experiment-evidence-pair">
                {choice.mediaIds.map((id) => (
                  <ProjectEvidence
                    key={id}
                    media={media.find((item) => item.id === id)!}
                    actualSize
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      )}
      {![
        'analytics',
        'monitoring',
        'services',
        'connections',
        'input',
      ].includes(variant) && jump}
      <p
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {choice.label}
        {supportingChoice &&
        (variant !== 'services' || choice.id === 'reservations')
          ? ` · ${supportingChoice.label}`
          : ''}
      </p>
    </section>
  )
}
