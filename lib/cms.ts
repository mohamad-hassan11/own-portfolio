import { client } from '@/sanity/lib/client'
import { hasSanityConfig } from '@/sanity/env'

// Time-based fallback; the Sanity webhook (/api/revalidate) refreshes content immediately.
export const REVALIDATE_SECONDS = 3600

export type CmsTag =
  'siteSettings' | 'project' | 'experience' | 'education' | 'skillCategory'

interface FetchArgs {
  query: string
  tag: CmsTag
  params?: Record<string, string>
}

// Returns null when Sanity is unconfigured or unreachable so pages can render fallbacks.
export async function cmsFetch<T>({
  query,
  tag,
  params = {},
}: FetchArgs): Promise<T | null> {
  if (!hasSanityConfig) return null

  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: REVALIDATE_SECONDS, tags: [tag] },
    })
  } catch (error) {
    console.error(`[cms] Failed to fetch "${tag}"`, error)
    return null
  }
}
