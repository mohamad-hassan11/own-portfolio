import type { CSSProperties } from 'react'
import type { Tone } from '@/components/mdx/tone'

const tones: Tone[] = ['blue', 'green', 'amber', 'red', 'violet']

// Each half of the track needs enough chips to overflow wide screens.
const MIN_CHIPS_PER_HALF = 12
const SECONDS_PER_CHIP = 3

interface TechMarqueeProps {
  items?: string[]
}

// Seamless loop: two identical halves, translated by -50%. Reduced motion shows one static, wrapped copy.
export function TechMarquee({ items }: TechMarqueeProps) {
  if (!items?.length) return null

  const repeats = Math.ceil(MIN_CHIPS_PER_HALF / items.length)
  const half = Array.from({ length: repeats }, () => items).flat()
  const track = [...half, ...half]

  return (
    <section aria-label="Technologies used" className="mt-20">
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div
        aria-hidden
        className="group overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] motion-reduce:overflow-visible motion-reduce:[mask-image:none]"
      >
        <div
          style={
            {
              '--marquee-duration': `${half.length * SECONDS_PER_CHIP}s`,
            } as CSSProperties
          }
          className="animate-marquee flex w-max group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:gap-y-3"
        >
          {track.map((item, index) => {
            const tone = tones[index % items.length % tones.length]
            // Only the first copy is shown when the animation is off.
            const extraCopy = index >= items.length
            return (
              <span
                key={`${item}-${index}`}
                style={{ '--tone': `var(--tone-${tone})` } as CSSProperties}
                className={`pr-3 ${extraCopy ? 'motion-reduce:hidden' : ''}`}
              >
                <span className="border-ink text-metadata flex items-center gap-2.5 border-2 bg-[color-mix(in_srgb,var(--tone)_14%,var(--surface))] px-4 py-2.5 font-semibold whitespace-nowrap transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none">
                  <span aria-hidden className="size-2.5 bg-(--tone)" />
                  {item}
                </span>
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}
