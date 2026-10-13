import { existsSync } from 'node:fs'
import path from 'node:path'
import { siteConfig } from '@/content/site'

export function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  let url: URL
  try {
    url = new URL(configuredUrl)
  } catch {
    throw new Error('NEXT_PUBLIC_SITE_URL must be an absolute http(s) URL')
  }

  if (
    !['http:', 'https:'].includes(url.protocol) ||
    url.username ||
    url.password
  ) {
    throw new Error(
      'NEXT_PUBLIC_SITE_URL must use http(s) and must not contain credentials',
    )
  }

  url.hash = ''
  url.search = ''
  url.pathname = url.pathname.replace(/\/+$/, '') || '/'
  return url.toString().replace(/\/$/, '')
}

// The CV button only renders once the PDF exists in /public.
export function getCvHref(): string | undefined {
  const { cv } = siteConfig
  if (!cv) return undefined
  return existsSync(path.join(process.cwd(), 'public', cv)) ? cv : undefined
}
