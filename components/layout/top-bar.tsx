'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { SkinSwitcher } from '@/components/layout/skin-switcher'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import type { NavItem } from '@/content/types'
import { cn } from '@/lib/utils'

interface TopBarProps {
  name: string
  title: string
  links: NavItem[]
  cvHref?: string
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

export function TopBar({ name, title, links, cvHref }: TopBarProps) {
  const pathname = usePathname()
  // Open state is tied to the pathname, so navigating closes the menu.
  const [openPath, setOpenPath] = useState<string | null>(null)
  const open = openPath === pathname
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenPath(null)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  const isActive = (href: string) =>
    !href.includes('#') &&
    (pathname === href || pathname.startsWith(`${href}/`))

  return (
    <header className="border-border bg-background/85 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={`${name}, home`}
          className="flex items-center gap-3"
        >
          <span
            aria-hidden
            className="brutal-sm bg-accent text-accent-foreground font-display grid size-10 place-items-center text-lg font-extrabold"
          >
            {initials(name)}
          </span>
          <span className="text-metadata hidden font-bold tracking-[0.3em] sm:block">
            {title}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => {
              const active = isActive(link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'text-metadata border-b-2 px-3 py-2 font-semibold transition-colors duration-200',
                      active
                        ? 'text-foreground border-accent'
                        : 'text-muted hover:text-foreground border-transparent',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {cvHref && (
            <a
              href={cvHref}
              download
              className="brutal-sm brutal-lift bg-accent text-accent-foreground text-metadata hidden h-10 items-center px-4 font-bold sm:inline-flex"
            >
              Resume
            </a>
          )}
          <ThemeToggle />
          <SkinSwitcher className="hidden sm:flex" />
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpenPath(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="brutal-sm bg-surface inline-flex size-10 items-center justify-center md:hidden"
          >
            {open ? (
              <X aria-hidden className="size-5" />
            ) : (
              <Menu aria-hidden className="size-5" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="animate-menu-in border-border bg-background border-t md:hidden"
        >
          <ul className="container-page flex flex-col py-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpenPath(null)}
                  className="text-metadata hover:bg-surface-hover block px-3 py-3.5 text-sm font-semibold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {cvHref && (
              <li className="pt-2 pb-1">
                <a
                  href={cvHref}
                  download
                  className="brutal-sm bg-accent text-accent-foreground text-metadata block px-3 py-3 text-center font-bold"
                >
                  Resume
                </a>
              </li>
            )}
            <li className="pt-3 pb-1 sm:hidden">
              <p className="text-metadata text-muted mb-2 px-3">Site style</p>
              <div className="px-3">
                <SkinSwitcher />
              </div>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
