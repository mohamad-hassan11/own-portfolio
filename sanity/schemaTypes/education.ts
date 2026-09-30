import BookIcon from '@sanity/icons/Book'
import { defineField, defineType } from 'sanity'

export const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'degree',
      title: 'Degree / title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'institution',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'specialization', type: 'string' }),
    defineField({ name: 'startDate', type: 'date' }),
    defineField({
      name: 'endDate',
      type: 'date',
      description: 'Leave empty if ongoing.',
    }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({
      name: 'displayOrder',
      description: 'Lower numbers appear first.',
      type: 'number',
      initialValue: 100,
      validation: (rule) => rule.required().integer(),
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
  ],
  preview: { select: { title: 'degree', subtitle: 'institution' } },
})
