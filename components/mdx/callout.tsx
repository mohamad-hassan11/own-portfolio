import type { ReactNode } from 'react'

export function Callout({ children }: { children: ReactNode }) {
  return (
    <aside className="border-accent/30 bg-accent-soft my-6 rounded-xl border p-5 [&>*:first-child]:mt-0">
      {children}
    </aside>
  )
}
