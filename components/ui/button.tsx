import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn, isExternalUrl } from '@/lib/utils'

const variants = {
  primary:
    'bg-accent text-accent-foreground hover:bg-accent-hover border-transparent',
  secondary: 'bg-surface text-foreground border-border hover:bg-surface-hover',
  ghost:
    'bg-transparent text-foreground border-transparent hover:bg-surface-hover',
} as const

const sizes = {
  md: 'h-11 px-5 text-sm',
  sm: 'h-9 px-3.5 text-sm',
} as const

interface ButtonLinkProps {
  href: string
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
  children: ReactNode
  'aria-label'?: string
}

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg border font-medium whitespace-nowrap transition-colors duration-200',
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
        className={classes}
        {...rest}
      >
        {children}
      </a>
    )
  }

  if (href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  )
}
