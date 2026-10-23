import Image from 'next/image'
import { ImageZoom } from '@/components/mdx/image-zoom'
import type { JourneyMedia } from '@/content/types'

export function ProjectEvidence({
  media,
  priority = false,
  context,
  actualSize = false,
}: {
  media: JourneyMedia
  priority?: boolean
  context?: string
  actualSize?: boolean
}) {
  return (
    <figure className="composition-evidence">
      <div className="composition-evidence-heading">
        <span>{context ?? media.label}</span>
        {!media.videoSrc && (
          <ImageZoom
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            mat
            allowActualSize={actualSize}
          />
        )}
      </div>
      <div className="composition-evidence-media">
        {media.videoSrc ? (
          <video
            controls
            playsInline
            preload="none"
            poster={media.src}
            width={media.width}
            height={media.height}
            aria-label={media.alt}
          >
            <source src={media.videoSrc} type="video/webm" />
            <a href={media.videoSrc}>Open the recorded interface</a>
          </video>
        ) : (
          <Image
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            priority={priority}
            sizes="(min-width: 1280px) 1000px, (min-width: 768px) 80vw, 100vw"
            className="composition-evidence-image"
          />
        )}
      </div>
      <figcaption>{media.caption}</figcaption>
    </figure>
  )
}
