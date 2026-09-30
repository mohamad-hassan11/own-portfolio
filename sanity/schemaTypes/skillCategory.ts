import TagsIcon from '@sanity/icons/Tags'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const skillCategory = defineType({
  name: 'skillCategory',
  title: 'Skill category',
  type: 'document',
  icon: TagsIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'e.g. Frontend, Backend, AI & Data.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'skills',
      description: 'Drag to reorder.',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.unique(),
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
    select: { title: 'title', skills: 'skills' },
    prepare: ({ title, skills }) => ({
      title,
      subtitle: Array.isArray(skills) ? skills.join(', ') : undefined,
    }),
  },
})
