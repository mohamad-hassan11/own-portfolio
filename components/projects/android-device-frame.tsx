'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImageZoom } from '@/components/mdx/image-zoom'
import type {
  CollectionMedia,
  ScenarioCapture,
} from '@/content/collections/android-mad'

interface AndroidDeviceFrameProps {
  appName: string
  media: CollectionMedia[]
  scenarioCaptures?: ScenarioCapture[]
  tone?: string
}

export function AndroidDeviceFrame({
  appName,
  media,
  scenarioCaptures,
  tone = 'var(--accent)',
}: AndroidDeviceFrameProps) {
  const [selectedCaptureIndex, setSelectedCaptureIndex] = useState(0)

  // Use scenarioCaptures if available, otherwise fallback to media
  const displayCaptures =
    scenarioCaptures && scenarioCaptures.length > 0
      ? scenarioCaptures.map((sc, i) => ({
          src: sc.src,
          width: sc.width ?? 720,
          height: sc.height ?? 1600,
          alt: sc.alt ?? `${appName} step ${i + 1}`,
          caption: sc.stepName ?? `Step ${i + 1}`,
          label: sc.label ?? `Step ${i + 1}`,
        }))
      : media.map((m, i) => ({
          src: m.src,
          width: m.width,
          height: m.height,
          alt: m.alt ?? `${appName} capture`,
          caption: m.caption ?? `${appName} verified capture`,
          label: `Capture ${i + 1}`,
        }))

  const activeCapture =
    displayCaptures[selectedCaptureIndex] || displayCaptures[0]

  if (!activeCapture) {
    return (
      <div className="pattern-dots border-ink/40 text-metadata text-muted flex aspect-[9/19] w-full max-w-[280px] items-center justify-center border-2 p-6 text-center">
        No preview capture available
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      {/* Device Mockup Shell */}
      <div className="relative flex w-full max-w-[280px] flex-col overflow-hidden rounded-[36px] border-[5px] border-[#222228] bg-black shadow-[0_0_0_2px_var(--ink),6px_6px_0_0_var(--shadow),0_20px_35px_rgba(0,0,0,0.5)] transition-transform duration-300 sm:max-w-[300px]">
        {/* Status Bar / Notch */}
        <div className="z-20 flex h-7 w-full items-center justify-between bg-black px-4 text-white">
          <span className="font-sans text-[11px] font-semibold tracking-tight text-white/90">
            9:41
          </span>
          <div className="h-2.5 w-2.5 rounded-full border border-neutral-700 bg-neutral-900" />
          <div className="flex items-center gap-1 font-mono text-[9px] text-white/80">
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* Screen Area */}
        <div className="relative aspect-[9/19.5] w-full overflow-hidden bg-neutral-950">
          <Image
            src={activeCapture.src}
            alt={activeCapture.alt}
            width={activeCapture.width}
            height={activeCapture.height}
            unoptimized
            priority={false}
            className="h-full w-full object-contain transition-opacity duration-200"
          />

          {/* Floating Zoom Action in screen corner */}
          <div className="absolute right-2 bottom-2 z-30 rounded bg-black/80 px-2 py-1 backdrop-blur-md">
            <ImageZoom
              src={activeCapture.src}
              alt={activeCapture.alt}
              width={activeCapture.width}
              height={activeCapture.height}
              unoptimized
            />
          </div>
        </div>

        {/* Bottom Gesture Bar */}
        <div className="z-20 flex h-5 w-full items-center justify-center bg-black">
          <div className="h-1 w-20 rounded-full bg-white/40" />
        </div>
      </div>

      {/* Multi-step capture switcher pills */}
      {displayCaptures.length > 1 && (
        <div className="mt-4 flex max-w-[300px] flex-wrap justify-center gap-1.5">
          {displayCaptures.map((cap, idx) => {
            const isSelected = idx === selectedCaptureIndex
            return (
              <button
                key={cap.src + idx}
                type="button"
                onClick={() => setSelectedCaptureIndex(idx)}
                style={
                  isSelected
                    ? { backgroundColor: tone, borderColor: 'var(--ink)' }
                    : undefined
                }
                className={`text-metadata border px-2.5 py-1 text-xs font-semibold transition-all duration-150 ${
                  isSelected
                    ? 'border-ink text-white shadow-sm'
                    : 'border-border bg-surface text-muted hover:border-ink hover:text-foreground'
                }`}
              >
                {cap.label}
              </button>
            )
          })}
        </div>
      )}

      {/* Device Caption & Provenance */}
      <p className="text-metadata text-muted mt-3 max-w-[280px] text-center font-mono text-xs">
        {activeCapture.caption}
      </p>
    </div>
  )
}
