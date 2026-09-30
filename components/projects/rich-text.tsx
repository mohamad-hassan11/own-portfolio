import { PortableText, type PortableTextComponents } from 'next-sanity'
import { CmsImageFlow } from '@/components/ui/cms-image'
import type { CmsImage, PortableTextValue } from '@/types/cms'

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: CmsImage }) =>
      value?.url ? (
        <figure className="not-prose my-8">
          <CmsImageFlow
            image={value}
            sizes="(min-width: 1024px) 720px, 100vw"
            className="border-border rounded-xl border"
          />
          {value.caption && (
            <figcaption className="text-small text-muted mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      ) : null,
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? '#'
      const external = /^https?:\/\//.test(href)
      return (
        <a
          href={href}
          {...(external
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          {children}
        </a>
      )
    },
  },
}

export function RichText({ value }: { value?: PortableTextValue }) {
  if (!value?.length) return null

  return (
    <div className="prose prose-portfolio">
      <PortableText value={value} components={components} />
    </div>
  )
}
