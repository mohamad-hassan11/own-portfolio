import type { CSSProperties } from 'react'

export type Tone = 'blue' | 'green' | 'amber' | 'red' | 'violet'

// Exposes a theme tone as --tone, and as the offset shadow of `.brutal` boxes.
export function toneStyle(tone: Tone): CSSProperties {
  return {
    '--tone': `var(--tone-${tone})`,
    '--shadow': `var(--tone-${tone})`,
  } as CSSProperties
}
