import type { Metadata } from 'next'
import { SITE_FALLBACK } from '@/lib/site'
import type { CmsImage, SiteSettings } from '@/types/cms'

function ogImageUrl(image?: CmsImage) {
  return image ? `${image.url}?w=1200&h=630&fit=crop&auto=format` : undefined
}

interface PageMetadataInput {
  settings: SiteSettings
  path: string
  title?: string
  description?: string
  image?: CmsImage
}

// Child `openGraph`/`twitter` replace the parent's, so every page builds them in full.
export function buildMetadata({
  settings,
  path,
  title,
  description,
  image,
}: PageMetadataInput): Metadata {
  const name = settings.fullName ?? SITE_FALLBACK.name
  const siteTitle =
    settings.siteTitle ??
    `${name} | ${settings.professionalTitle ?? SITE_FALLBACK.title}`
  const fullTitle = title ? `${title} | ${name}` : siteTitle
  const desc =
    description ?? settings.defaultMetaDescription ?? SITE_FALLBACK.description
  const ogImage = ogImageUrl(image ?? settings.ogImage)

  return {
    title: title ? title : { absolute: siteTitle },
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: name,
      title: fullTitle,
      description: desc,
      url: path,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}
