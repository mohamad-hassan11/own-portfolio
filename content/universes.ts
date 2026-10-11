export const universeCategories = [
  {
    id: 'defaults',
    name: 'Defaults',
    description: 'The original foundations: bold structure or soft glass.',
  },
  {
    id: 'retro',
    name: 'Retro & Experimental',
    description: 'Pixel nostalgia, neon energy, and unexpected combinations.',
  },
  {
    id: 'perspectives',
    name: 'Fresh Perspectives',
    description:
      'Design inspired by technical drawings, nature, print, and space.',
  },
] as const

type UniverseCategoryId = (typeof universeCategories)[number]['id']

export const universes = [
  {
    id: 'neo',
    category: 'defaults' satisfies UniverseCategoryId,
    name: 'Neo',
    description:
      'Bold typography, sharp edges, and uncompromising engineering clarity.',
  },
  {
    id: 'glass',
    category: 'defaults' satisfies UniverseCategoryId,
    name: 'Glass',
    description:
      'Frosted surfaces and soft depth give the portfolio room to breathe.',
  },
  {
    id: 'fusion',
    category: 'retro' satisfies UniverseCategoryId,
    name: 'Fusion',
    description:
      'Glass, neon, and pixel type meet in a layered experimental design.',
  },
  {
    id: 'pixel',
    category: 'retro' satisfies UniverseCategoryId,
    name: 'Pixel',
    description:
      'LCD greens, pixel typography, and blocky details recall early computing.',
  },
  {
    id: 'vaporwave',
    category: 'retro' satisfies UniverseCategoryId,
    name: 'Vaporwave',
    description:
      'Neon accents and a sunset grid bring a retro-futurist perspective.',
  },
  {
    id: 'blueprint',
    category: 'perspectives' satisfies UniverseCategoryId,
    name: 'Blueprint',
    description:
      'Precision grids, monospaced headings, and crisp technical drawing details.',
  },
  {
    id: 'botanical',
    category: 'perspectives' satisfies UniverseCategoryId,
    name: 'Botanical',
    description:
      'Forest tones, organic curves, and calm surfaces keep the work in focus.',
  },
  {
    id: 'editorial',
    category: 'perspectives' satisfies UniverseCategoryId,
    name: 'Editorial',
    description:
      'Warm paper, expressive serif headlines, and the quiet confidence of a design journal.',
  },
  {
    id: 'orbit',
    category: 'perspectives' satisfies UniverseCategoryId,
    name: 'Orbit',
    description:
      'Deep space tones, circular details, and clean typography offer a new vantage point.',
  },
] as const

export type UniverseId = (typeof universes)[number]['id']
export function isUniverse(value: string | null): value is UniverseId {
  return universes.some(({ id }) => id === value)
}
