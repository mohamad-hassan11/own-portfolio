import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { test } from 'node:test'
import vm from 'node:vm'
import ts from 'typescript'

// Exercise the real helper on every supported Next.js Node version.
const compiled = ts.transpileModule(
  readFileSync(
    new URL('../lib/project-composition.ts', import.meta.url),
    'utf8',
  ),
  {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  },
).outputText
const { buildProjectPresentation, getStageEvidence } = await import(
  'data:text/javascript;base64,' + Buffer.from(compiled).toString('base64')
)
const registry = readFileSync(
  new URL('../content/projects/index.ts', import.meta.url),
  'utf8',
)
const slugs = [...registry.matchAll(/from '\.\/([^']+)\.mdx'/g)]
  .map((match) => match[1])
  .filter((slug) =>
    readFileSync(
      new URL(`../content/projects/${slug}.mdx`, import.meta.url),
      'utf8',
    ).includes('export const composition'),
  )
function readProject(slug) {
  const source = readFileSync(
    new URL(`../content/projects/${slug}.mdx`, import.meta.url),
    'utf8',
  )
  const value = (name) => {
    const match = source.match(
      new RegExp(`export const ${name} = ([\\s\\S]*?)\\n[}\\]]\\n`),
    )
    assert(match, `${slug}: missing ${name}`)
    return JSON.parse(
      JSON.stringify(
        vm.runInNewContext(
          '(' +
            match[1] +
            (match[1].trimStart().startsWith('{') ? '}' : ']') +
            ')',
          Object.create(null),
        ),
      ),
    )
  }
  return {
    slug,
    source,
    metadata: value('metadata'),
    stages: value('journeyStages'),
    sections: value('journeySections'),
    media: value('journeyMedia'),
    composition: value('composition'),
    initialStage: Number(source.match(/initialStage=\{(\d+)\}/)?.[1] ?? 0),
  }
}
const projects = slugs.map(readProject)
for (const project of projects) {
  test(`${project.slug}: every narrative section appears once across Studio and conclusion`, () => {
    const result = buildProjectPresentation(project)
    const originalIds = [
      ...project.source.matchAll(/<JourneySection id="([^"]+)"/g),
    ].map((m) => m[1])
    assert.deepEqual(
      originalIds,
      project.sections.map((section) => section.id),
    )
    assert.equal(
      project.sections[result.conclusionIndex].id,
      project.composition.conclusionId,
    )
    assert.deepEqual(
      [...result.studioSectionIndices, result.conclusionIndex].sort(
        (a, b) => a - b,
      ),
      project.sections.map((_, i) => i),
    )
    assert.deepEqual(
      result.studioStages.flatMap((stage) => stage.sectionIds),
      project.stages
        .flatMap((stage) => stage.sectionIds)
        .filter((id) => id !== project.composition.conclusionId),
    )
    assert(result.studioStages.every((stage) => stage.sectionIds.length > 0))
    for (const media of project.media) {
      assert(
        existsSync(new URL('../public' + media.src, import.meta.url)),
        media.src,
      )
      if (media.videoSrc)
        assert(
          existsSync(new URL('../public' + media.videoSrc, import.meta.url)),
          media.videoSrc,
        )
    }
  })
}
test('registered composed projects retain their own supported presentation', () => {
  assert(slugs.includes('ai-coding-experiments'))
  assert(!slugs.includes('keylingo'))
  assert(!slugs.includes('lexitype'))
  for (const project of projects)
    assert.doesNotThrow(() => buildProjectPresentation(project))
  for (const slug of ['festivals', 'android-mad']) {
    const source = readFileSync(
      new URL(`../content/projects/${slug}.mdx`, import.meta.url),
      'utf8',
    )
    assert(!source.includes('composition={composition}'))
  }
})
test('a conclusion-only stage is removed and the initial selection falls back safely', () => {
  const p = structuredClone(projects[0])
  p.composition.conclusionId = p.sections.at(-1).id
  p.stages = [
    {
      id: 'reading',
      title: 'Reading',
      tone: 'blue',
      sectionIds: p.sections.slice(0, -1).map((s) => s.id),
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      tone: 'green',
      sectionIds: [p.sections.at(-1).id],
    },
  ]
  p.initialStage = 1
  const result = buildProjectPresentation(p)
  assert.equal(result.studioStages.length, 1)
  assert.equal(result.initialStudioStage, 0)
})
test('a journey without composition retains all sections', () => {
  const result = buildProjectPresentation({
    ...projects[0],
    composition: undefined,
  })
  assert.equal(result.conclusionIndex, -1)
  assert.equal(result.studioSections.length, projects[0].sections.length)
})
test('invalid section maps, media references and composition choices fail before rendering', () => {
  const cases = [
    (p) => {
      p.stages[0].sectionIds.push(p.stages[0].sectionIds[0])
    },
    (p) => {
      p.composition.conclusionId = 'missing'
    },
    (p) => {
      p.composition.choices[0].mediaIds = ['missing']
    },
    (p) => {
      p.composition.choices = []
    },
    (p) => {
      p.composition.initialChoice = -1
    },
    (p) => {
      p.composition.variant = 'unknown'
    },
    (p) => {
      p.media[0].sectionId = 'missing'
    },
  ]
  for (const mutate of cases) {
    const p = structuredClone(projects[0])
    mutate(p)
    assert.throws(() => buildProjectPresentation(p))
  }
})
test('evidence selection prefers the section and never borrows from unrelated stages', () => {
  const media = [
    { id: 'a', sectionId: 'alpha' },
    { id: 'b', sectionId: 'beta' },
    { id: 'c', sectionId: 'gamma' },
  ]
  const stage = { id: 'one', sectionIds: ['alpha', 'beta', 'empty'] }
  assert.deepEqual(
    getStageEvidence(media, stage, 'alpha').map((m) => m.id),
    ['a'],
  )
  assert.deepEqual(
    getStageEvidence(media, stage, 'empty').map((m) => m.id),
    ['a', 'b'],
  )
  assert.deepEqual(
    getStageEvidence(media, { id: 'two', sectionIds: ['delta'] }, 'delta'),
    [],
  )
})
test('production components consume repository data, not review snapshots', () => {
  for (const file of [
    'project-composition.tsx',
    'project-evidence.tsx',
    'project-journey.tsx',
  ]) {
    assert(
      !readFileSync(
        new URL('../components/projects/' + file, import.meta.url),
        'utf8',
      ).includes('/reviews/'),
    )
  }
})

test('the experiment replaces both listings and pairs evidence from both applications', () => {
  const experiment = projects.find(
    (project) => project.slug === 'ai-coding-experiments',
  )
  assert(experiment)
  assert.equal(experiment.metadata.featured, true)
  assert.equal(experiment.metadata.order, 8)
  assert.equal(experiment.composition.variant, 'experiment')
  assert.deepEqual(
    experiment.composition.experiment.implementations.map(
      (item) => item.startingTool,
    ),
    ['Antigravity + Gemini Flash', 'Codex Sol'],
  )
  assert.deepEqual(
    experiment.composition.choices.map((choice) => choice.id),
    ['guided', 'vocabulary', 'arabic', 'progress'],
  )
  for (const choice of experiment.composition.choices) {
    assert.deepEqual(
      choice.mediaIds.map(
        (id) =>
          experiment.media.find((media) => media.id === id).src.split('/')[2],
      ),
      ['keylingo', 'lexitype'],
    )
  }
  assert(
    existsSync(
      new URL('../public' + experiment.metadata.coverImage, import.meta.url),
    ),
  )
  for (const mutate of [
    (p) => {
      p.composition.experiment = undefined
    },
    (p) => {
      p.composition.experiment.implementations[0].mediaId = 'missing'
    },
    (p) => {
      p.composition.experiment.implementations[1].id =
        p.composition.experiment.implementations[0].id
    },
    (p) => {
      p.composition.choices[0].mediaIds.pop()
    },
  ]) {
    const invalid = structuredClone(experiment)
    mutate(invalid)
    assert.throws(() => buildProjectPresentation(invalid))
  }
})
