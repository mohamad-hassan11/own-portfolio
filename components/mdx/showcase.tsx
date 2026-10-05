import type { CSSProperties, ReactNode } from 'react'
import {
  ProjectImage,
  type ProjectImageProps,
} from '@/components/mdx/project-image'
import { Reveal } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

interface ShowcaseProps extends Omit<ProjectImageProps, 'wide' | 'className'> {
  /** Rendered width of the image column in px, on screens from md up. */
  mediaWidth?: number
  side?: 'left' | 'right'
  /** Explanatory prose shown next to the image. */
  children: ReactNode
}

// Pairs a narrow or tall image with the prose that explains it.
export function Showcase({
  mediaWidth = 320,
  side = 'left',
  children,
  ...image
}: ShowcaseProps) {
  return (
    <div
      className={cn(
        'my-10 flex flex-col gap-8 md:items-start',
        side === 'right' ? 'md:flex-row-reverse' : 'md:flex-row',
      )}
    >
      <div
        style={{ '--media-w': `${mediaWidth}px` } as CSSProperties}
        className="w-full max-w-(--media-w) md:w-(--media-w) md:shrink-0"
      >
        <ProjectImage {...image} className="my-0" />
      </div>
      <Reveal
        delay={0.12}
        className="min-w-0 flex-1 [&>*:first-child]:mt-0"
      >
        {children}
      </Reveal>
    </div>
  )
}
