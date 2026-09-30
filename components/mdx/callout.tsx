import type { ReactNode } from 'react'

export function Callout({ children }: { children: ReactNode }) {
  return (
    <aside className="border-accent bg-accent-soft my-8 border-l-4 p-5 [&>*:first-child]:mt-0">
      {children}
    </aside>
  )
}
