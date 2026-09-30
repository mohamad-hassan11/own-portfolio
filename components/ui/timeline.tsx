import type { CSSProperties, ReactNode } from 'react'

const tones = ['var(--tone-green)', 'var(--tone-violet)', 'var(--tone-amber)']

interface TimelineItemProps {
  index?: number
  period?: string
  title: string
  subtitle?: string
  children?: ReactNode
}

export function Timeline({ children }: { children: ReactNode }) {
  return (
    <ol className="border-border relative ml-2 space-y-12 border-l-2">
      {children}
    </ol>
  )
}

export function TimelineItem({
  index = 0,
  period,
  title,
  subtitle,
  children,
}: TimelineItemProps) {
  const tone = tones[index % tones.length]

  return (
    <li className="relative pl-8 sm:pl-10">
      <span
        aria-hidden
        style={{ borderColor: tone }}
        className="bg-background absolute top-2 -left-[9px] size-4 border-2"
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <h3 className="text-h3 text-2xl sm:text-3xl">{title}</h3>
        {period && (
          <p
            style={{ borderColor: tone } as CSSProperties}
            className="text-metadata self-start border-2 px-2.5 py-1 font-bold whitespace-nowrap"
          >
            {period}
          </p>
        )}
      </div>
      {subtitle && (
        <p className="text-metadata text-muted mt-2 font-semibold">
          {subtitle}
        </p>
      )}
      {children && <div className="mt-4 max-w-2xl space-y-4">{children}</div>}
    </li>
  )
}
