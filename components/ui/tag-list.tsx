import { cn } from '@/lib/utils'

interface TagListProps {
  items?: string[]
  max?: number
  className?: string
  label: string
}

export function TagList({ items, max, className, label }: TagListProps) {
  if (!items?.length) return null
  const visible = max ? items.slice(0, max) : items
  const hidden = items.length - visible.length
  const chip =
    'border border-border px-2 py-0.5 font-mono text-xs uppercase text-muted'

  return (
    <ul aria-label={label} className={cn('flex flex-wrap gap-1.5', className)}>
      {visible.map((item) => (
        <li key={item} className={chip}>
          {item}
        </li>
      ))}
      {hidden > 0 && <li className={chip}>+{hidden}</li>}
    </ul>
  )
}
