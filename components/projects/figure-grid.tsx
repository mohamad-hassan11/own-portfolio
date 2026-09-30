import { CmsImageFlow } from '@/components/ui/cms-image'
import type { CmsImage } from '@/types/cms'

interface FigureGridProps {
  images?: CmsImage[]
  label: string
  columns?: 1 | 2
}

export function FigureGrid({ images, label, columns = 2 }: FigureGridProps) {
  const valid = images?.filter((image) => image?.url)
  if (!valid?.length) return null

  return (
    <ul
      aria-label={label}
      className={
        columns === 2 && valid.length > 1
          ? 'grid gap-6 sm:grid-cols-2'
          : 'grid gap-6'
      }
    >
      {valid.map((image) => (
        <li key={image.url}>
          <figure>
            <CmsImageFlow
              image={image}
              fallbackAlt={label}
              sizes="(min-width: 1024px) 480px, 100vw"
              className="border-border rounded-xl border"
            />
            {image.caption && (
              <figcaption className="text-small text-muted mt-2">
                {image.caption}
              </figcaption>
            )}
          </figure>
        </li>
      ))}
    </ul>
  )
}
