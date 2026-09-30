import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Registers the custom type scale so it is not mistaken for text colours.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: ['display', 'h1', 'h2', 'h3', 'body', 'small', 'metadata'],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const monthYear = new Intl.DateTimeFormat('en-GB', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

export function formatMonthYear(date?: string): string | undefined {
  if (!date) return undefined
  const parsed = new Date(date)
  return Number.isNaN(parsed.getTime()) ? undefined : monthYear.format(parsed)
}

export function formatDateRange(
  start?: string,
  end?: string,
  ongoing = false,
): string | undefined {
  const from = formatMonthYear(start)
  const to = ongoing ? 'Present' : formatMonthYear(end)
  if (from && to) return `${from} – ${to}`
  return from ?? to
}

export function isExternalUrl(href: string) {
  return /^https?:\/\//.test(href)
}
