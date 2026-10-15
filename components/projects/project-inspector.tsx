'use client'

import Image from 'next/image'
import { useId, useState } from 'react'
import { ImageZoom } from '@/components/mdx/image-zoom'
import type { InspectorView } from '@/content/types'

export function ProjectInspector({ views }: { views: InspectorView[] }) {
  const [selected, setSelected] = useState(0)
  const panelId = useId()
  const view = views[selected]
  if (!view) return null

  return (
    <section className="project-inspector" aria-label="Project inspector">
      <aside className="inspector-sidebar">
        <div
          className="inspector-navigation"
          aria-label="Explore project views"
        >
          {views.map((item, index) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={selected === index}
              aria-controls={panelId}
              onClick={() => setSelected(index)}
            >
              {item.label}
              <span>{item.category}</span>
            </button>
          ))}
        </div>
        <div aria-live="polite" aria-atomic="true">
          <h2>{view.title}</h2>
          <p>{view.description}</p>
          <div className="inspector-decision">
            <h3>Engineering decision</h3>
            <p>{view.decision}</p>
          </div>
        </div>
      </aside>
      <figure id={panelId} className="inspector-viewer" aria-label={view.label}>
        <div className="inspector-toolbar">
          <strong>{view.label}</strong>
          <ImageZoom
            key={view.src}
            src={view.src}
            alt={view.alt}
            width={view.width}
            height={view.height}
            unoptimized
          />
        </div>
        <div className="inspector-artifact">
          <Image
            src={view.src}
            alt={view.alt}
            width={view.width}
            height={view.height}
            unoptimized
            sizes="(min-width: 1024px) 750px, 100vw"
          />
        </div>
        <figcaption>{view.caption}</figcaption>
      </figure>
    </section>
  )
}
