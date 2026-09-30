import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  id?: string
  eyebrow?: string
  title?: string
  description?: string
  action?: ReactNode
  className?: string
  children: ReactNode
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  action,
  className,
  children,
}: SectionProps) {
  const headingId = id ? `${id}-heading` : undefined

  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cn('scroll-mt-20 py-16 sm:py-24', className)}
    >
      <div className="container-page">
        {(title || eyebrow) && (
          <header className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              {eyebrow && (
                <p className="text-metadata text-accent-text mb-3">{eyebrow}</p>
              )}
              {title && (
                <h2 id={headingId} className="text-h1">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-body text-muted mt-3">{description}</p>
              )}
            </div>
            {action}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
