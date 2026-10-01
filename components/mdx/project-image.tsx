import Image from 'next/image'
import { ImageZoom } from '@/components/mdx/image-zoom'
import { toneStyle, type Tone } from '@/components/mdx/tone'
import { Reveal } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

export interface ProjectImageProps {
  /** Path under /public, e.g. "/projects/my-project/screenshot-1.webp". */
  src: string
  alt: string
  caption?: string
  /** Mono label in the figure header, e.g. "Fig. 01 · Sequence". */
  label?: string
  /** Colours the header tint, swatch and offset shadow. */
  tone?: Tone
  /** Intrinsic size in pixels. Defaults to 16:9. */
  width?: number
  height?: number
  /** Extends past the prose column on large screens, for wide diagrams. */
  wide?: boolean
  /** Adds an "Expand" control that opens the image at full size. */
  zoom?: boolean
  /** Mounts the image on a white sheet so diagram exports stay legible in both themes. */
  mat?: boolean
  /** Applied to the <figure>. */
  className?: string
}

export function ProjectImage({
  src,
  alt,
  caption,
  label,
  tone = 'blue',
  width = 1600,
  height = 900,
  wide,
  zoom,
  mat,
  className,
}: ProjectImageProps) {
  return (
    <figure
      className={cn(
        'my-10',
        wide && 'lg:w-[calc(100%+10rem)] xl:w-[calc(100%+16rem)]',
        className,
      )}
    >
      <Reveal>
        <div
          style={toneStyle(tone)}
          className="brutal brutal-lift bg-surface"
        >
          {(label || zoom) && (
            <div className="border-ink flex items-center justify-between gap-3 border-b-2 bg-[color-mix(in_srgb,var(--tone)_16%,transparent)] px-3 py-2">
              <span className="text-metadata flex items-center gap-2 font-semibold">
                <span aria-hidden className="size-2.5 shrink-0 bg-(--tone)" />
                {label}
              </span>
              {zoom && (
                <ImageZoom
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  mat={mat}
                />
              )}
            </div>
          )}
          <div className={cn(mat && 'bg-white p-2 sm:p-3')}>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes={
                wide
                  ? '(min-width: 1280px) 1024px, (min-width: 1024px) 928px, 100vw'
                  : '(min-width: 1024px) 768px, 100vw'
              }
              className="h-auto w-full"
            />
          </div>
        </div>
      </Reveal>
      {caption && (
        <figcaption className="text-small text-muted mt-4 flex max-w-2xl gap-3">
          <span
            aria-hidden
            style={toneStyle(tone)}
            className="mt-1 h-4 w-1 shrink-0 bg-(--tone)"
          />
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
