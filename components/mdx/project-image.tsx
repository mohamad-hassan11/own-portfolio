import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ProjectImageProps {
  /** Path under /public, e.g. "/projects/my-project/screenshot-1.webp". */
  src: string
  alt: string
  caption?: string
  /** Intrinsic size. Only the aspect ratio matters; defaults to 16:9. */
  width?: number
  height?: number
  className?: string
}

export function ProjectImage({
  src,
  alt,
  caption,
  width = 1600,
  height = 900,
  className,
}: ProjectImageProps) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 1024px) 768px, 100vw"
        className={cn(
          'border-border h-auto w-full rounded-xl border',
          className,
        )}
      />
      {caption && (
        <figcaption className="text-small text-muted mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
