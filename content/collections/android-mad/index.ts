import manifest from './manifest.json'
import type { ComponentType } from 'react'
import Applevel_1_example from './level-1-example.mdx'
import Applevel_1_task1 from './level-1-task1.mdx'
import Applevel_1_task2 from './level-1-task2.mdx'
import Applevel_2_example from './level-2-example.mdx'
import Applevel_2_task1 from './level-2-task1.mdx'
import Applevel_2_task2 from './level-2-task2.mdx'
import Applevel_3_example from './level-3-example.mdx'
import Applevel_3_task1 from './level-3-task1.mdx'
import Applevel_3_task2 from './level-3-task2.mdx'
import Applevel_4_example from './level-4-example.mdx'
import Applevel_4_task1 from './level-4-task1.mdx'
import Applevel_4_task2 from './level-4-task2.mdx'
import Applevel_5_example from './level-5-example.mdx'
import Applevel_5_task1 from './level-5-task1.mdx'
import Applevel_5_task2 from './level-5-task2.mdx'
import Applevel_6_example from './level-6-example.mdx'
import Applevel_6_task1 from './level-6-task1.mdx'
import Applevel_6_task2 from './level-6-task2.mdx'

export interface CollectionMedia {
  src: string
  alt: string
  caption: string
  width: number
  height: number
}
export interface ScenarioCapture {
  src: string
  label?: string
  stepName?: string
  runtime?: string
  width?: number
  height?: number
  alt?: string
}

export interface CollectionApp {
  id: string
  title: string
  role: 'Example' | 'Task 1' | 'Task 2'
  Content: ComponentType
  media: CollectionMedia[]
  evidenceFiles?: string[]
  limitations?: string[]
  scenarioCaptures?: ScenarioCapture[]
}
interface BaseCollectionLevel {
  number: number
  title: string
  concept: string
  apps: CollectionApp[]
}

export interface CollectionLevel extends BaseCollectionLevel {
  layer: string
  keyTech: string[]
}

const levels: BaseCollectionLevel[] = [
  {
    number: 1,
    title: 'Compose foundations',
    concept:
      'Build declarative screens, bind input, and render observable lists.',
    apps: [
      {
        id: 'level-1-example',
        title: 'Guess the Animal',
        role: 'Example',
        Content: Applevel_1_example,
        media: [],
      },
      {
        id: 'level-1-task1',
        title: 'Reminders',
        role: 'Task 1',
        Content: Applevel_1_task1,
        media: [],
      },
      {
        id: 'level-1-task2',
        title: 'Places Explorer',
        role: 'Task 2',
        Content: Applevel_1_task2,
        media: [],
      },
    ],
  },
  {
    number: 2,
    title: 'State & logic',
    concept:
      'Connect events to local state, feedback, and small domain models.',
    apps: [
      {
        id: 'level-2-example',
        title: 'Dice & Average',
        role: 'Example',
        Content: Applevel_2_example,
        media: [],
      },
      {
        id: 'level-2-task1',
        title: 'True/False Quiz',
        role: 'Task 1',
        Content: Applevel_2_task1,
        media: [],
      },
      {
        id: 'level-2-task2',
        title: 'AND Truth Table',
        role: 'Task 2',
        Content: Applevel_2_task2,
        media: [],
      },
    ],
  },
  {
    number: 3,
    title: 'Navigation & shared state',
    concept:
      'Move between screens while ViewModels own the shared application state.',
    apps: [
      {
        id: 'level-3-example',
        title: 'Reminders with Navigation',
        role: 'Example',
        Content: Applevel_3_example,
        media: [],
      },
      {
        id: 'level-3-task1',
        title: 'Game Rating',
        role: 'Task 1',
        Content: Applevel_3_task1,
        media: [],
      },
      {
        id: 'level-3-task2',
        title: 'Portal Manager',
        role: 'Task 2',
        Content: Applevel_3_task2,
        media: [],
      },
    ],
  },
  {
    number: 4,
    title: 'Remote APIs',
    concept:
      'Separate HTTP services, repositories, resource states, and presentation.',
    apps: [
      {
        id: 'level-4-example',
        title: 'Number Facts',
        role: 'Example',
        Content: Applevel_4_example,
        media: [],
      },
      {
        id: 'level-4-task1',
        title: 'Cats & Dogs',
        role: 'Task 1',
        Content: Applevel_4_task1,
        media: [],
      },
      {
        id: 'level-4-task2',
        title: 'Movie Search & Details',
        role: 'Task 2',
        Content: Applevel_4_task2,
        media: [],
      },
    ],
  },
  {
    number: 5,
    title: 'Cloud documents',
    concept:
      'Coordinate asynchronous Firestore reads and writes with user-facing flows.',
    apps: [
      {
        id: 'level-5-example',
        title: 'Create & Play Quiz',
        role: 'Example',
        Content: Applevel_5_example,
        media: [],
      },
      {
        id: 'level-5-task1',
        title: 'Profile Manager',
        role: 'Task 1',
        Content: Applevel_5_task1,
        media: [],
      },
      {
        id: 'level-5-task2',
        title: 'Question Quest',
        role: 'Task 2',
        Content: Applevel_5_task2,
        media: [],
      },
    ],
  },
  {
    number: 6,
    title: 'Local persistence',
    concept:
      'Model durable data with Room entities, DAO queries, and reactive observation.',
    apps: [
      {
        id: 'level-6-example',
        title: 'Shopping List',
        role: 'Example',
        Content: Applevel_6_example,
        media: [],
      },
      {
        id: 'level-6-task1',
        title: 'Game Backlog',
        role: 'Task 1',
        Content: Applevel_6_task1,
        media: [],
      },
      {
        id: 'level-6-task2',
        title: 'Rock, Paper, Scissors',
        role: 'Task 2',
        Content: Applevel_6_task2,
        media: [],
      },
    ],
  },
]

const levelsMeta: Record<number, { layer: string; keyTech: string[] }> = {
  1: {
    layer: 'UI & State Hoisting',
    keyTech: [
      'Jetpack Compose',
      'Material 3',
      'remember',
      'mutableStateListOf',
      'LazyColumn',
    ],
  },
  2: {
    layer: 'Domain Events & Reducers',
    keyTech: [
      'Composable State',
      'Domain Models',
      'Calculated State',
      'Event Callbacks',
    ],
  },
  3: {
    layer: 'Jetpack ViewModel & NavBackStack',
    keyTech: [
      'Navigation Compose',
      'ViewModel',
      'Backstack Arguments',
      'Single-Activity',
    ],
  },
  4: {
    layer: 'Retrofit & Asynchronous Coroutines',
    keyTech: [
      'Retrofit 2',
      'Kotlin Coroutines',
      'Resource State Wrapper',
      'LiveData',
    ],
  },
  5: {
    layer: 'Firebase Cloud Firestore',
    keyTech: [
      'Cloud Firestore',
      'Document Mappings',
      'Async Operations',
      'Draft Forms',
    ],
  },
  6: {
    layer: 'Room SQLite & Live Query Flows',
    keyTech: [
      'Room Database',
      'DAO Queries',
      'Type Converters',
      'Reactive Flow Observation',
    ],
  },
}

export const androidMadLevels: CollectionLevel[] = levels.map((level) => {
  const meta = levelsMeta[level.number] ?? { layer: '', keyTech: [] }
  return {
    ...level,
    layer: meta.layer,
    keyTech: meta.keyTech,
    apps: level.apps.map((app) => {
      const entry = manifest.apps.find((m) => m.id === app.id)
      const scenarioCaptures: ScenarioCapture[] = (
        entry?.scenarioCaptures ?? []
      ).map((sc, i) => {
        const stepName =
          sc.steps && sc.steps.length
            ? sc.steps[sc.steps.length - 1]
            : `Step ${i + 1}`
        return {
          src: sc.src,
          label: `Step ${i + 1}`,
          stepName,
          runtime: sc.runtimeVerification,
          width: 720,
          height: 1600,
          alt: `${app.title} - ${stepName}`,
        }
      })

      return {
        ...app,
        media: entry?.media ?? [],
        evidenceFiles: entry?.evidenceFiles ?? [],
        limitations: entry?.limitations ?? [],
        scenarioCaptures,
      }
    }),
  }
})
