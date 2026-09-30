import type { ReactNode } from 'react'

interface TimelineItemProps {
  period?: string
  title: string
  subtitle?: string
  children?: ReactNode
}

export function Timeline({ children }: { children: ReactNode }) {
  return (
    <ol className="border-border relative ml-1.5 space-y-10 border-l">
      {children}
    </ol>
  )
}

export function TimelineItem({
  period,
  title,
  subtitle,
  children,
}: TimelineItemProps) {
  return (
    <li className="relative pl-6 sm:pl-8">
      <span
        aria-hidden
        className="bg-accent border-background absolute top-2 -left-[5px] box-content size-2.5 rounded-full border-2"
      />
      {period && <p className="text-metadata text-muted">{period}</p>}
      <h3 className="text-h3 mt-1">{title}</h3>
      {subtitle && <p className="text-body text-muted">{subtitle}</p>}
      {children && <div className="mt-3 space-y-3">{children}</div>}
    </li>
  )
}
