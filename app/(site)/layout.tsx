import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { getSiteSettings } from '@/lib/data'
import { getSiteUrl, SITE_FALLBACK } from '@/lib/site'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const name = settings.fullName ?? SITE_FALLBACK.name

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default:
        settings.siteTitle ??
        `${name} | ${settings.professionalTitle ?? SITE_FALLBACK.title}`,
      template: `%s | ${name}`,
    },
    description: settings.defaultMetaDescription ?? SITE_FALLBACK.description,
  }
}

export default async function SiteLayout({
  children,
}: {
  children: ReactNode
}) {
  const settings = await getSiteSettings()

  return (
    <ThemeProvider>
      <a
        href="#main"
        className="bg-accent text-accent-foreground sr-only z-50 rounded-lg px-4 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Navbar settings={settings} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer settings={settings} />
    </ThemeProvider>
  )
}
