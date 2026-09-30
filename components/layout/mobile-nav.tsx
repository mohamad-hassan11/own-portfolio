'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import type { NavItem } from '@/content/types'

interface MobileNavProps {
  links: NavItem[]
  cvHref?: string
}

export function MobileNav({ links, cvHref }: MobileNavProps) {
  // Open state is tied to the pathname, so navigating closes the menu.
  const pathname = usePathname()
  const [openPath, setOpenPath] = useState<string | null>(null)
  const open = openPath === pathname
  const setOpen = (value: boolean) => setOpenPath(value ? pathname : null)
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

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="text-foreground hover:bg-surface-hover inline-flex size-9 items-center justify-center rounded-lg transition-colors duration-200"
      >
        {open ? (
          <X aria-hidden className="size-5" />
        ) : (
          <Menu aria-hidden className="size-5" />
        )}
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="menu-in border-border bg-background absolute inset-x-0 top-full border-b shadow-lg"
        >
          <ul className="container-page flex flex-col py-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="hover:bg-surface-hover block rounded-lg px-3 py-3 text-base font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {cvHref && (
              <li className="pt-2">
                <a
                  href={cvHref}
                  download
                  className="bg-accent text-accent-foreground hover:bg-accent-hover block rounded-lg px-3 py-3 text-center text-base font-medium"
                >
                  Download CV
                </a>
              </li>
            )}
          </ul>
        </nav>
      )}
    </div>
  )
}
