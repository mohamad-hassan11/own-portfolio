import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from './sanity/env'
import { schemaTypes } from './sanity/schemaTypes'
import { SINGLETON_TYPES, structure } from './sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'Portfolio CMS',
  basePath: '/studio',
  projectId: projectId || 'unconfigured',
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global'
        ? prev.filter((option) => !SINGLETON_TYPES.includes(option.templateId))
        : prev,
    actions: (prev, { schemaType }) =>
      SINGLETON_TYPES.includes(schemaType)
        ? prev.filter(
            ({ action }) =>
              action && !['unpublish', 'delete', 'duplicate'].includes(action),
          )
        : prev,
  },
})
