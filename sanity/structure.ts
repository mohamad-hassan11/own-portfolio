import BookIcon from '@sanity/icons/Book'
import CaseIcon from '@sanity/icons/Case'
import CogIcon from '@sanity/icons/Cog'
import RocketIcon from '@sanity/icons/Rocket'
import TagsIcon from '@sanity/icons/Tags'
import type { StructureBuilder, StructureResolver } from 'sanity/structure'

export const SINGLETON_TYPES = ['siteSettings']

const orderedList = (
  S: StructureBuilder,
  type: string,
  title: string,
  icon: typeof CogIcon,
) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.documentTypeList(type)
        .title(title)
        .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }]),
    )

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Portfolio')
    .items([
      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .icon(CogIcon)
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings'),
        ),
      S.divider(),
      orderedList(S, 'project', 'Projects', RocketIcon),
      orderedList(S, 'experience', 'Experience', CaseIcon),
      orderedList(S, 'education', 'Education', BookIcon),
      orderedList(S, 'skillCategory', 'Skill categories', TagsIcon),
    ])
