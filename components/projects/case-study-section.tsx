import type { ReactNode } from 'react'

interface CaseStudySectionProps {
  id: string
  title: string
  children: ReactNode
}

export function CaseStudySection({
  id,
  title,
  children,
}: CaseStudySectionProps) {
  return (
    <section
      aria-labelledby={`${id}-heading`}
      className="border-border grid gap-4 border-t py-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12"
    >
      <h2 id={`${id}-heading`} className="text-h3 lg:pt-1">
        {title}
      </h2>
      <div className="min-w-0 space-y-6">{children}</div>
    </section>
  )
}

export function BulletList({ items }: { items?: string[] }) {
  if (!items?.length) return null
  return (
    <ul className="text-body list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
