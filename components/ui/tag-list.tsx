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

  return (
    <ul aria-label={label} className={cn('flex flex-wrap gap-1.5', className)}>
      {visible.map((item) => (
        <li
          key={item}
          className="border-border text-muted rounded-md border px-2 py-0.5 font-mono text-xs"
        >
          {item}
        </li>
      ))}
      {hidden > 0 && (
        <li className="text-muted px-1 py-0.5 font-mono text-xs">+{hidden}</li>
      )}
    </ul>
  )
}
