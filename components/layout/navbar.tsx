import Link from 'next/link'
import { ButtonLink } from '@/components/ui/button'
import { MobileNav } from '@/components/layout/mobile-nav'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { DEFAULT_NAV, SITE_FALLBACK } from '@/lib/site'
import { withDownload } from '@/lib/utils'
import type { NavItem, SiteSettings } from '@/types/cms'

export function Navbar({ settings }: { settings: SiteSettings }) {
  const links: NavItem[] = settings.navigation?.length
    ? settings.navigation
    : [...DEFAULT_NAV]
  const cvUrl = settings.cvUrl ? withDownload(settings.cvUrl) : undefined
  const name = settings.fullName ?? SITE_FALLBACK.name

  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="container-page relative flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="text-foreground text-base font-semibold tracking-tight"
        >
          {name}
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-foreground hover:bg-surface-hover rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {cvUrl && (
            <ButtonLink
              href={cvUrl}
              variant="secondary"
              size="sm"
              className="ml-2 hidden md:inline-flex"
            >
              Download CV
            </ButtonLink>
          )}
          <ThemeToggle />
          <MobileNav links={links} cvUrl={cvUrl} />
        </div>
      </div>
    </header>
  )
}
