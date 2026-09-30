import type { MetadataRoute } from 'next'
import { getProjects } from '@/content/projects'
import { getSiteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()

  return [
    { url: `${base}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/projects`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/about`, changeFrequency: 'yearly', priority: 0.6 },
    ...getProjects().map(({ metadata }) => ({
      url: `${base}/projects/${metadata.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
