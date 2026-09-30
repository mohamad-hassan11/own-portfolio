import CaseIcon from '@sanity/icons/Case'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'jobTitle',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'organisation',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'employmentType',
      type: 'string',
      options: {
        list: [
          'Full-time',
          'Part-time',
          'Internship',
          'Graduation internship',
          'Contract',
          'Freelance',
        ],
      },
    }),
    defineField({ name: 'location', type: 'string' }),
    defineField({
      name: 'startDate',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'currentRole',
      title: 'Current role',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'endDate',
      type: 'date',
      hidden: ({ document }) => Boolean(document?.currentRole),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      description: 'Concise summary. Detail belongs in the CV.',
    }),
    defineField({
      name: 'responsibilities',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'technologies',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
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
  preview: {
    select: { title: 'jobTitle', subtitle: 'organisation' },
  },
})
