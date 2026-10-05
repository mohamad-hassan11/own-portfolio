import type { ReactNode } from 'react'
import { toneStyle, type Tone } from '@/components/mdx/tone'
import { Reveal } from '@/components/ui/reveal'

interface CalloutProps {
  tone?: Tone
  /** Short mono label above the text, e.g. "Confidential". */
  title?: string
  children: ReactNode
}

export function Callout({ tone = 'blue', title, children }: CalloutProps) {
  return (
    <Reveal>
      <aside
        style={toneStyle(tone)}
        className="my-8 border-l-4 border-(color:--tone) bg-[color-mix(in_srgb,var(--tone)_12%,transparent)] p-5 [&>*:first-child]:mt-0"
      >
        {title && (
          <p className="text-metadata mb-2 flex items-center gap-2 font-semibold">
            <span aria-hidden className="size-2.5 bg-(--tone)" />
            {title}
          </p>
        )}
        {children}
      </aside>
    </Reveal>
  )
}
