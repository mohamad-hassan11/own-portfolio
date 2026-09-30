import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { CmsImage } from '@/types/cms'

interface CmsImageProps {
  image: CmsImage
  sizes: string
  fallbackAlt?: string
  priority?: boolean
  className?: string
}

// Fills its (relatively positioned, aspect-ratio'd) parent; hotspot drives focal point.
export function CmsImageFill({
  image,
  sizes,
  fallbackAlt = '',
  priority,
  className,
}: CmsImageProps) {
  const position = image.hotspot
    ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
    : undefined

  return (
    <Image
      src={image.url}
      alt={image.alt ?? fallbackAlt}
      fill
      sizes={sizes}
      priority={priority}
      placeholder={image.lqip ? 'blur' : 'empty'}
      blurDataURL={image.lqip}
      style={{ objectPosition: position }}
      className={cn('object-cover', className)}
    />
  )
}

// Intrinsic-size image for content flow (rich text, galleries, diagrams).
export function CmsImageFlow({
  image,
  sizes,
  fallbackAlt = '',
  className,
}: CmsImageProps) {
  if (!image.width || !image.height) {
    return (
      <div className={cn('relative aspect-video w-full', className)}>
        <CmsImageFill image={image} sizes={sizes} fallbackAlt={fallbackAlt} />
      </div>
    )
  }

  return (
    <Image
      src={image.url}
      alt={image.alt ?? fallbackAlt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      placeholder={image.lqip ? 'blur' : 'empty'}
      blurDataURL={image.lqip}
      className={cn('h-auto w-full', className)}
    />
  )
}
