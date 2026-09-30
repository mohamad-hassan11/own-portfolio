import RocketIcon from '@sanity/icons/Rocket'
import {
  defineArrayMember,
  defineField,
  defineType,
  type ConditionalPropertyCallback,
} from 'sanity'
import { imageFields } from './imageFields'

const hiddenWhenConfidential: ConditionalPropertyCallback = ({ document }) =>
  Boolean(document?.confidential)

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: RocketIcon,
  groups: [
    { name: 'overview', title: 'Overview', default: true },
    { name: 'media', title: 'Media' },
    { name: 'links', title: 'Links' },
    { name: 'caseStudy', title: 'Case study' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'overview',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'overview',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      type: 'text',
      rows: 3,
      group: 'overview',
      validation: (rule) => rule.required().max(240),
    }),
    defineField({ name: 'organisation', type: 'string', group: 'overview' }),
    defineField({
      name: 'projectType',
      type: 'string',
      group: 'overview',
      options: {
        list: [
          'Graduation project',
          'Professional',
          'University project',
          'Personal project',
        ],
      },
    }),
    defineField({ name: 'role', type: 'string', group: 'overview' }),
    defineField({ name: 'startDate', type: 'date', group: 'overview' }),
    defineField({ name: 'endDate', type: 'date', group: 'overview' }),
    defineField({
      name: 'year',
      type: 'number',
      group: 'overview',
      validation: (rule) => rule.integer().min(2000).max(2100),
    }),
    defineField({
      name: 'featured',
      description: 'Show on the homepage.',
      type: 'boolean',
      group: 'overview',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder',
      description:
        'Lower numbers appear first. Used on the homepage and projects page.',
      type: 'number',
      group: 'overview',
      initialValue: 100,
      validation: (rule) => rule.required().integer(),
    }),
    defineField({
      name: 'technologies',
      type: 'array',
      group: 'overview',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'confidential',
      description:
        'Hides source-code links. Do not publish confidential company details.',
      type: 'boolean',
      group: 'links',
      initialValue: false,
    }),
    defineField({
      name: 'projectUrl',
      title: 'Project URL',
      type: 'url',
      group: 'links',
      validation: (rule) => rule.uri({ scheme: ['https', 'http'] }),
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
      group: 'links',
      hidden: hiddenWhenConfidential,
      validation: (rule) => rule.uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'repositoryVisibility',
      type: 'string',
      group: 'links',
      hidden: hiddenWhenConfidential,
      options: {
        list: [
          { title: 'Public', value: 'public' },
          { title: 'Private', value: 'private' },
          { title: 'Not available', value: 'none' },
        ],
      },
    }),
    defineField({
      name: 'thumbnail',
      description: 'Used on cards.',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: imageFields,
    }),
    defineField({
      name: 'coverImage',
      description: 'Shown at the top of the case study.',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: imageFields,
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      group: 'media',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: imageFields,
        }),
      ],
    }),
    defineField({ name: 'context', type: 'blockContent', group: 'caseStudy' }),
    defineField({ name: 'problem', type: 'blockContent', group: 'caseStudy' }),
    defineField({
      name: 'constraints',
      type: 'array',
      group: 'caseStudy',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'responsibilities',
      type: 'array',
      group: 'caseStudy',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'approach', type: 'blockContent', group: 'caseStudy' }),
    defineField({
      name: 'architecture',
      type: 'blockContent',
      group: 'caseStudy',
    }),
    defineField({
      name: 'architectureImages',
      title: 'Architecture diagrams',
      type: 'array',
      group: 'caseStudy',
      of: [
        defineArrayMember({
          type: 'image',
          fields: imageFields,
        }),
      ],
    }),
    defineField({
      name: 'implementation',
      type: 'blockContent',
      group: 'caseStudy',
    }),
    defineField({
      name: 'challenges',
      type: 'blockContent',
      group: 'caseStudy',
    }),
    defineField({ name: 'solution', type: 'blockContent', group: 'caseStudy' }),
    defineField({ name: 'results', type: 'blockContent', group: 'caseStudy' }),
    defineField({
      name: 'lessonsLearned',
      type: 'blockContent',
      group: 'caseStudy',
    }),
    defineField({
      name: 'body',
      title: 'Additional content',
      type: 'blockContent',
      group: 'caseStudy',
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
    select: {
      title: 'title',
      subtitle: 'projectType',
      media: 'thumbnail',
    },
  },
})
