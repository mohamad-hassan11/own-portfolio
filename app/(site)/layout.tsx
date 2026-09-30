import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { siteConfig } from '@/content/site'
import { getCvHref, getSiteUrl } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteConfig.seo.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seo.description,
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <a
        href="#main"
        className="bg-accent text-accent-foreground sr-only z-50 rounded-lg px-4 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Navbar
        name={siteConfig.name}
        links={siteConfig.navigation}
        cvHref={getCvHref()}
      />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer config={siteConfig} />
    </ThemeProvider>
  )
}
