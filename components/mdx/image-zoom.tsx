'use client'

import { Maximize2, X } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface ImageZoomProps {
  src: string
  alt: string
  /** Intrinsic pixel size. The zoomed image never renders larger than this. */
  width: number
  height: number
  mat?: boolean
}

const controlClass =
  'text-metadata text-muted hover:text-foreground inline-flex items-center gap-1.5 font-semibold transition-colors duration-200'

// Native <dialog> gives focus trapping, Esc to close and an inert background.
export function ImageZoom({ src, alt, width, height, mat }: ImageZoomProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className={controlClass}
      >
        <Maximize2 aria-hidden className="size-3.5" />
        Expand
      </button>

      <dialog
        ref={dialogRef}
        aria-label={alt}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close()
        }}
        className="brutal bg-surface text-foreground m-auto max-h-[92vh] w-[min(94vw,90rem)] p-0 backdrop:bg-black/70"
      >
        <form
          method="dialog"
          className="border-ink flex justify-end border-b-2 px-3 py-2"
        >
          <button type="submit" className={controlClass}>
            <X aria-hidden className="size-3.5" />
            Close
          </button>
        </form>
        <div
          className={cn(
            'max-h-[calc(92vh-3rem)] overflow-auto',
            mat && 'bg-white',
          )}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={`${width}px`}
            style={{ maxWidth: width, minWidth: Math.min(width, 900) }}
            className="mx-auto h-auto w-full"
          />
        </div>
      </dialog>
    </>
  )
}
