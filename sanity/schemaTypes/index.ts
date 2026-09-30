import type { SchemaTypeDefinition } from 'sanity'
import { blockContent } from './blockContent'
import { education } from './education'
import { experience } from './experience'
import { project } from './project'
import { siteSettings } from './siteSettings'
import { skillCategory } from './skillCategory'

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  project,
  experience,
  education,
  skillCategory,
  blockContent,
]
