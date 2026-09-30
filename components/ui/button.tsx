import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn, isExternalUrl } from '@/lib/utils'

const variants = {
  primary: 'bg-accent text-accent-foreground',
  secondary: 'bg-surface text-foreground',
  ghost: 'bg-transparent text-foreground',
} as const

const sizes = {
  md: 'h-11 px-5',
  sm: 'h-9 px-3.5',
} as const

interface ButtonLinkProps {
  href: string
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
  children: ReactNode
  cursorLabel?: string
  /** Same-origin file download (e.g. the CV PDF). */
  download?: boolean
  'aria-label'?: string
}

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  cursorLabel,
  download,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(
    'brutal-sm brutal-lift text-metadata inline-flex items-center justify-center gap-2 font-bold whitespace-nowrap',
    variants[variant],
    sizes[size],
    className,
  )

  if (isExternalUrl(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor-label={cursorLabel}
        className={classes}
        {...rest}
      >
        {children}
      </a>
    )
  }

  if (href.startsWith('mailto:') || href.startsWith('tel:') || download) {
    return (
      <a
        href={href}
        download={download ? true : undefined}
        data-cursor-label={cursorLabel}
        className={classes}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      data-cursor-label={cursorLabel}
      className={classes}
      {...rest}
    >
      {children}
    </Link>
  )
}
