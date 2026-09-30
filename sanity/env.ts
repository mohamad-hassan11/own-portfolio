export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2025-01-01'

// Lets the app build and render fallback states before a Sanity project exists.
export const hasSanityConfig = projectId.length > 0
