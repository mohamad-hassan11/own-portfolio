import type { Metadata } from 'next'
import { siteConfig } from '@/content/site'

interface PageMetadataInput {
  path: string
  title?: string
  description?: string
  /** Path under /public. Falls back to the site OpenGraph image. */
  image?: string
}

// Child `openGraph`/`twitter` replace the parent's, so every page builds them in full.
export function buildMetadata({
  path,
  title,
  description,
  image,
}: PageMetadataInput): Metadata {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.seo.title
  const desc = description ?? siteConfig.seo.description
  const ogImage = image ?? siteConfig.seo.ogImage

  return {
    title: title ?? { absolute: siteConfig.seo.title },
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      title: fullTitle,
      description: desc,
      url: path,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title: fullTitle,
      description: desc,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}
