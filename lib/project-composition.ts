import type {
  JourneyMedia,
  JourneySectionMetadata,
  JourneyStage,
  ProjectCompositionMetadata,
} from '@/content/types'

/** Preserve the original section slots while giving the result its own place. */
export function buildProjectPresentation({
  slug,
  stages,
  sections,
  media,
  composition,
  initialStage = 0,
}: {
  slug: string
  stages: JourneyStage[]
  sections: JourneySectionMetadata[]
  media: JourneyMedia[]
  composition?: ProjectCompositionMetadata
  initialStage?: number
}) {
  const orderedIds = stages.flatMap((stage) => stage.sectionIds)
  const ids = sections.map((section) => section.id)
  if (
    !stages.length ||
    !sections.length ||
    stages.some((stage) => !stage.sectionIds.length) ||
    new Set(stages.map((stage) => stage.id)).size !== stages.length ||
    new Set(ids).size !== ids.length ||
    orderedIds.length !== sections.length ||
    new Set(orderedIds).size !== sections.length ||
    orderedIds.some((id) => !ids.includes(id))
  ) {
    throw new Error(`Invalid journey navigation for ${slug}`)
  }

  const conclusionIndex = composition
    ? sections.findIndex((section) => section.id === composition.conclusionId)
    : -1
  if (composition) {
    const groups = [composition, composition.supporting].filter(
      (group) => group !== undefined,
    )
    const mediaIds = media.map((item) => item.id)
    if (
      ![
        'evolution',
        'analytics',
        'research',
        'monitoring',
        'services',
        'connections',
        'desktop',
        'input',
        'learning',
        'experiment',
      ].includes(composition.variant) ||
      new Set(mediaIds).size !== mediaIds.length ||
      media.some((item) => item.sectionId && !ids.includes(item.sectionId)) ||
      conclusionIndex < 0 ||
      sections.length < 2 ||
      (composition.variant === 'experiment' &&
        (!composition.experiment ||
          composition.experiment.implementations.length !== 2 ||
          new Set(composition.experiment.implementations.map((item) => item.id))
            .size !== 2 ||
          composition.experiment.implementations.some(
            (item) => !mediaIds.includes(item.mediaId),
          ) ||
          composition.choices.some(
            (choice) => choice.mediaIds.length !== 2,
          ))) ||
      groups.some(
        (group) =>
          !group.choices.length ||
          new Set(group.choices.map((choice) => choice.id)).size !==
            group.choices.length ||
          group.choices.some((choice) =>
            choice.mediaIds.some((id) => !mediaIds.includes(id)),
          ) ||
          (group.initialChoice !== undefined &&
            (!Number.isInteger(group.initialChoice) ||
              group.initialChoice < 0 ||
              group.initialChoice >= group.choices.length)),
      )
    ) {
      throw new Error(`Invalid project composition for ${slug}`)
    }
  }

  const studioSectionIndices = sections
    .map((_, index) => index)
    .filter((index) => index !== conclusionIndex)
  const studioSections = studioSectionIndices.map((index) => sections[index])
  const studioStages = stages
    .map((stage) => ({
      ...stage,
      sectionIds: stage.sectionIds.filter(
        (id) => id !== composition?.conclusionId,
      ),
    }))
    .filter((stage) => stage.sectionIds.length)
  const selectedStageId = (stages[initialStage] ?? stages[0]).id
  const initialStudioStage = Math.max(
    0,
    studioStages.findIndex((stage) => stage.id === selectedStageId),
  )

  return {
    conclusionIndex,
    studioSectionIndices,
    studioSections,
    studioStages,
    initialStudioStage,
  }
}

/** A stage without evidence must not borrow an unrelated project artifact. */
export function getStageEvidence(
  media: JourneyMedia[],
  stage: JourneyStage,
  selectedSectionId: string,
) {
  const sectionMedia = media.filter(
    (item) => item.sectionId === selectedSectionId,
  )
  return sectionMedia.length
    ? sectionMedia
    : media.filter((item) => stage.sectionIds.includes(item.sectionId ?? ''))
}
