import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  /** Use 1 for the page's main heading. */
  headingLevel?: 1 | 2
  id?: string
  /** Small mono label above the heading. */
  tag?: string
  title?: string
  description?: string
  action?: ReactNode
  className?: string
  children: ReactNode
}

export function Section({
  headingLevel = 2,
  id,
  tag,
  title,
  description,
  action,
  className,
  children,
}: SectionProps) {
  const headingId = id ? `${id}-heading` : undefined
  const Heading = headingLevel === 1 ? 'h1' : 'h2'

  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cn('scroll-mt-20 py-14 sm:py-20', className)}
    >
      {title && (
        <header className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {tag && (
              <p className="text-metadata text-accent-text mb-3">[{tag}]</p>
            )}
            <Heading id={headingId} className="text-h1">
              {title}
            </Heading>
            <span aria-hidden className="bg-accent mt-4 block h-1 w-16" />
            {description && (
              <p className="text-body text-muted mt-5 max-w-xl">
                {description}
              </p>
            )}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  )
}
