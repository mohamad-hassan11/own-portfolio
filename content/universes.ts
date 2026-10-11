export const universes = [
  {
    id: 'neo',
    name: 'Neo',
    description:
      'Bold typography, sharp edges, and uncompromising engineering clarity.',
  },
  {
    id: 'glass',
    name: 'Glass',
    description:
      'Frosted surfaces and soft depth give the portfolio room to breathe.',
  },
  {
    id: 'vaporwave',
    name: 'Vaporwave',
    description:
      'Neon accents and a sunset grid bring a retro-futurist perspective.',
  },
  {
    id: 'pixel',
    name: 'Pixel',
    description:
      'LCD greens, pixel typography, and blocky details recall early computing.',
  },
  {
    id: 'fusion',
    name: 'Fusion',
    description:
      'Glass, neon, and pixel type meet in a layered experimental design.',
  },
] as const

export type UniverseId = (typeof universes)[number]['id']
export function isUniverse(value: string | null): value is UniverseId {
  return universes.some(({ id }) => id === value)
}
