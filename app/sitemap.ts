import type { MetadataRoute } from 'next'
import { getProjectSlugs } from '@/lib/data'
import { getSiteUrl } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl()
  const projects = await getProjectSlugs()

  return [
    { url: `${base}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/projects`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/about`, changeFrequency: 'yearly', priority: 0.6 },
    ...projects.map(({ slug, _updatedAt }) => ({
      url: `${base}/projects/${slug}`,
      lastModified: _updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
