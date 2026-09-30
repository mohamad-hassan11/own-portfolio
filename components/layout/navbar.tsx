import Link from 'next/link'
import { MobileNav } from '@/components/layout/mobile-nav'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { ButtonLink } from '@/components/ui/button'
import type { NavItem } from '@/content/types'

interface NavbarProps {
  name: string
  links: NavItem[]
  cvHref?: string
}

export function Navbar({ name, links, cvHref }: NavbarProps) {
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
          {cvHref && (
            <ButtonLink
              href={cvHref}
              download
              variant="secondary"
              size="sm"
              className="ml-2 hidden md:inline-flex"
            >
              Download CV
            </ButtonLink>
          )}
          <ThemeToggle />
          <MobileNav links={links} cvHref={cvHref} />
        </div>
      </div>
    </header>
  )
}
