import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { CustomCursor } from '@/components/layout/custom-cursor'
import { Footer } from '@/components/layout/footer'
import { ParticleField } from '@/components/layout/particle-field'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { TopBar } from '@/components/layout/top-bar'
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
      <ParticleField />
      <CustomCursor />
      <a
        href="#main"
        className="bg-accent text-accent-foreground sr-only z-[60] px-4 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <TopBar
        name={siteConfig.name}
        title={siteConfig.title}
        links={siteConfig.navigation}
        cvHref={getCvHref()}
      />
      <main
        id="main"
        tabIndex={-1}
        className="container-page relative z-10 pt-16 outline-none"
      >
        {children}
      </main>
      <div className="relative z-10">
        <Footer config={siteConfig} />
      </div>
    </ThemeProvider>
  )
}
