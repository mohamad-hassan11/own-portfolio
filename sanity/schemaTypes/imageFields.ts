import { defineField } from 'sanity'

// Shared sub-fields for every uploaded image so alt text is always captured.
export const imageFields = [
  defineField({
    name: 'alt',
    type: 'string',
    title: 'Alternative text',
    description: 'Describe the image for screen readers.',
  }),
  defineField({ name: 'caption', type: 'string', title: 'Caption' }),
]
