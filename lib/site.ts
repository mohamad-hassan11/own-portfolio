import { existsSync } from 'node:fs'
import path from 'node:path'
import { siteConfig } from '@/content/site'

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(
    /\/$/,
    '',
  )
}

// The CV button only renders once the PDF exists in /public.
export function getCvHref(): string | undefined {
  const { cv } = siteConfig
  if (!cv) return undefined
  return existsSync(path.join(process.cwd(), 'public', cv)) ? cv : undefined
}
