'use client'

import { useState, type CSSProperties } from 'react'
import { Reveal } from '@/components/ui/reveal'
import type { SkillCategory } from '@/content/types'
import { cn } from '@/lib/utils'

const tones = [
  'var(--tone-blue)',
  'var(--tone-green)',
  'var(--tone-amber)',
  'var(--tone-red)',
  'var(--tone-violet)',
]

interface Tile {
  name: string
  tone: string
}

export function SkillsExplorer({
  categories,
}: {
  categories: SkillCategory[]
}) {
  const [active, setActive] = useState<string | null>(null)

  const tilesFor = (category: SkillCategory, index: number): Tile[] =>
    category.skills.map((name) => ({ name, tone: tones[index % tones.length] }))

  const tiles: Tile[] = active
    ? categories
        .filter((category) => category.name === active)
        .flatMap((category) => tilesFor(category, categories.indexOf(category)))
    : categories
        .flatMap(tilesFor)
        .filter(
          (tile, index, all) =>
            all.findIndex((other) => other.name === tile.name) === index,
        )

  const tab = (selected: boolean) =>
    cn(
      'text-metadata border-2 px-3.5 py-2 font-bold transition-colors duration-200',
      selected
        ? 'border-ink bg-foreground text-background'
        : 'border-ink/60 text-muted hover:text-foreground hover:border-ink',
    )

  return (
    <Reveal>
      <div
        role="group"
        aria-label="Filter skills"
        className="flex flex-wrap gap-2"
      >
        <button
          type="button"
          aria-pressed={active === null}
          onClick={() => setActive(null)}
          className={tab(active === null)}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.name}
            type="button"
            aria-pressed={active === category.name}
            onClick={() => setActive(category.name)}
            className={tab(active === category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <ul className="mt-8 flex flex-wrap gap-4">
        {tiles.map((tile) => (
          <li
            key={tile.name}
            style={{ '--shadow': tile.tone } as CSSProperties}
            className="brutal-sm bg-surface text-metadata px-4 py-3 text-[0.8rem] font-bold"
          >
            {tile.name}
          </li>
        ))}
      </ul>
    </Reveal>
  )
}
