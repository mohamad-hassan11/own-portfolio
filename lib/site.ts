// Fallbacks used only when the CMS is empty or unreachable.
export const SITE_FALLBACK = {
  name: 'Mohamad Hassan',
  title: 'Software Engineer',
  description: 'Software engineering portfolio.',
} as const

// Navigation used when siteSettings.navigation is empty.
export const DEFAULT_NAV = [
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/#contact' },
] as const

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(
    /\/$/,
    '',
  )
}
