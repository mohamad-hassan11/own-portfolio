import type { ComponentType } from 'react'
import type { ProjectMetadata } from '@/content/types'
import * as androidMad from './android-mad.mdx'
import * as arkive from './arkive-big-data.mdx'
import * as ewa from './ewa.mdx'
import * as festivals from './festivals.mdx'
import * as flyfriends from './flyfriends.mdx'
import * as keylingo from './keylingo.mdx'
import * as lexitype from './lexitype.mdx'
import * as mediagrab from './mediagrab.mdx'
import * as pad from './pad.mdx'
import * as rag from './secure-rag-integration.mdx'
import * as vliegreizen from './vliegreizen.mdx'

export interface Project {
  metadata: ProjectMetadata
  Content: ComponentType
}

// To add a project: create <slug>.mdx here, then import it above and list it below.
const modules = [
  rag,
  mediagrab,
  arkive,
  festivals,
  androidMad,
  ewa,
  pad,
  flyfriends,
  vliegreizen,
  keylingo,
  lexitype,
]

const projects: Project[] = modules
  .map((mod) => ({ metadata: mod.metadata, Content: mod.default }))
  .sort((a, b) => a.metadata.order - b.metadata.order)

const slugs = projects.map((project) => project.metadata.slug)
const duplicate = slugs.find((slug, index) => slugs.indexOf(slug) !== index)
if (duplicate) {
  throw new Error(`Duplicate project slug: "${duplicate}"`)
}

export function getProjects(): Project[] {
  return projects
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.metadata.featured)
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.metadata.slug === slug)
}
