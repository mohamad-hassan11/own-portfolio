'use client'

import { Maximize2, X } from 'lucide-react'
import Image from 'next/image'
import { useId, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface ImageZoomProps {
  src: string
  alt: string
  /** Intrinsic pixel size. The zoomed image never renders larger than this. */
  width: number
  height: number
  mat?: boolean
  unoptimized?: boolean
  allowActualSize?: boolean
}

const controlClass =
  'text-metadata text-muted hover:text-foreground inline-flex items-center gap-1.5 font-semibold transition-colors duration-200'

// Native <dialog> gives focus trapping, Esc to close and an inert background.
export function ImageZoom({
  src,
  alt,
  width,
  height,
  mat,
  unoptimized,
  allowActualSize = false,
}: ImageZoomProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const viewportId = useId()
  const [actualSize, setActualSize] = useState(false)

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
        onClose={() => {
          setActualSize(false)
          viewportRef.current?.scrollTo(0, 0)
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close()
        }}
        className="brutal bg-surface text-foreground m-auto max-h-[92vh] w-[min(94vw,90rem)] p-0 backdrop:bg-black/70"
      >
        <form
          method="dialog"
          className="border-ink flex justify-end border-b-2 px-3 py-2"
        >
          {allowActualSize && (
            <button
              type="button"
              className={controlClass}
              aria-pressed={actualSize}
              aria-controls={viewportId}
              onClick={() => setActualSize(!actualSize)}
            >
              {actualSize ? 'Fit image' : 'Actual size'}
            </button>
          )}
          <button type="submit" className={controlClass}>
            <X aria-hidden className="size-3.5" />
            Close
          </button>
        </form>
        <div
          id={viewportId}
          ref={viewportRef}
          tabIndex={allowActualSize ? 0 : undefined}
          role={allowActualSize ? 'region' : undefined}
          aria-label={
            allowActualSize
              ? 'Screenshot. In actual size, scroll or use arrow keys to pan.'
              : undefined
          }
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
            unoptimized={unoptimized}
            sizes={`${width}px`}
            style={
              allowActualSize
                ? {
                    width: actualSize ? width : '100%',
                    maxWidth: actualSize ? 'none' : width,
                  }
                : { maxWidth: width, minWidth: Math.min(width, 900) }
            }
            className="mx-auto h-auto w-full"
          />
        </div>
      </dialog>
    </>
  )
}
