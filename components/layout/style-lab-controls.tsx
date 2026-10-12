'use client'

import { Check, Hand, MousePointer2 } from 'lucide-react'
import { useState, useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { getCursorColor, getCursorColorStyle } from '@/lib/cursor-color'
import { getUniverse, subscribeUniverse } from '@/lib/universe'

import {
  backgroundStyles,
  backgroundCategories,
  backgroundLabCopy,
  backgroundColors,
  backgroundColorCategories,
  cursorStyles,
  cursorColors,
  isCursorColor,
  isBackgroundColor,
  densityRange,
  sizeRange,
  opacityRange,
  type StyleSettings,
} from '@/content/style-lab'
import { applyStyleSettings } from '@/lib/style-lab'
import { useStyleSettings } from './use-style-settings'

export function StyleLabControls({
  onChange,
  panel,
}: {
  onChange: (message: string) => void
  panel: 'cursor' | 'background'
}) {
  const settings = useStyleSettings()
  const [category, setCategory] = useState<string | null>(null)
  const [colorCategory, setColorCategory] = useState<string | null>(null)
  const activeCategory =
    category ??
    backgroundStyles.find(({ id }) => id === settings.background)?.category ??
    'base'
  const { resolvedTheme } = useTheme()
  const universe = useSyncExternalStore(
    subscribeUniverse,
    getUniverse,
    () => 'neo' as const,
  )
  const hasBackground = settings.background !== 'none'
  const activeColorCategory =
    colorCategory ??
    backgroundColors.find(({ id }) => id === settings.backgroundColor)
      ?.category ??
    'theme'
  function update(patch: Partial<StyleSettings>, message: string) {
    applyStyleSettings({ ...settings, ...patch })
    onChange(message)
  }

  return (
    <div className="space-y-6">
      {panel === 'cursor' && (
        <section aria-labelledby="lab-cursor-title">
          <h3 id="lab-cursor-title" className="text-sm font-semibold">
            Your pointer, your signature.
          </h3>
          <p className="text-muted mt-1 text-xs leading-relaxed">
            Choose a marker independently of your theme. Every shape stays small
            and follows directly.
          </p>
          <div
            role="group"
            aria-label="Cursor style"
            className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3"
          >
            {cursorStyles.map((option) => (
              <button
                key={option.id}
                type="button"
                className="lab-cursor-choice"
                data-active={settings.cursor === option.id}
                aria-pressed={settings.cursor === option.id}
                onClick={() =>
                  update({ cursor: option.id }, `Cursor: ${option.name}.`)
                }
              >
                <span aria-hidden className="lab-cursor-samples">
                  {(['default', 'interactive'] as const).map((mode) => (
                    <span key={mode} className="lab-cursor-sample">
                      {option.id === 'native' ? (
                        mode === 'default' ? (
                          <MousePointer2 className="size-5" />
                        ) : (
                          <Hand className="size-5" />
                        )
                      ) : (
                        <span
                          className="custom-cursor cursor-preview"
                          data-style={
                            option.id === 'theme' ? universe : option.id
                          }
                          style={getCursorColorStyle(
                            settings.cursorColor,
                            resolvedTheme,
                          )}
                          data-mode={mode}
                          data-visible="true"
                        />
                      )}
                    </span>
                  ))}
                </span>
                <span className="flex items-center justify-between gap-2 text-xs font-semibold">
                  <span>{option.name}</span>
                  {settings.cursor === option.id && (
                    <Check aria-hidden className="size-3.5 shrink-0" />
                  )}
                </span>
              </button>
            ))}
          </div>
          <fieldset
            disabled={settings.cursor === 'native'}
            className="border-border mt-5 border-t pt-4 disabled:opacity-50"
          >
            <legend className="sr-only">Cursor color</legend>
            <p className="text-sm font-semibold">Cursor color</p>
            <div
              role="group"
              aria-label="Cursor color presets"
              className="mt-3 flex flex-wrap gap-2"
            >
              {cursorColors.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-label={option.name}
                  data-tooltip={option.name}
                  aria-pressed={settings.cursorColor === option.id}
                  className="lab-color-choice app-tooltip"
                  data-active={settings.cursorColor === option.id}
                  onClick={() =>
                    update(
                      { cursorColor: option.id },
                      `Cursor color: ${option.name}.`,
                    )
                  }
                >
                  <span
                    aria-hidden
                    className="lab-color-swatch"
                    style={{
                      background:
                        getCursorColor(option.id, resolvedTheme) ??
                        'var(--cursor-accent)',
                    }}
                  />
                  {option.id === 'theme' && (
                    <span className="text-xs">{option.name}</span>
                  )}
                </button>
              ))}
              <label className="lab-color-custom" htmlFor="lab-custom-color">
                <input
                  id="lab-custom-color"
                  type="color"
                  value={
                    getCursorColor(settings.cursorColor, resolvedTheme) ??
                    '#67e8f9'
                  }
                  onChange={(event) => {
                    if (isCursorColor(event.target.value))
                      update(
                        { cursorColor: event.target.value },
                        `Custom cursor color: ${event.target.value}.`,
                      )
                  }}
                />
                Custom color
              </label>
            </div>
          </fieldset>
          {settings.cursor === 'native' && (
            <p className="text-muted mt-2 text-xs">
              The system pointer uses your device’s color settings.
            </p>
          )}
        </section>
      )}
      {panel === 'background' && (
        <section aria-labelledby="lab-background-title">
          <h3 id="lab-background-title" className="text-sm font-semibold">
            Set the atmosphere.
          </h3>
          <p className="text-muted mt-1 text-xs leading-relaxed">
            {backgroundLabCopy.introduction}
          </p>
          <p className="text-muted mt-2 text-xs leading-relaxed">
            {backgroundLabCopy.accessibility}
          </p>
          <div
            role="group"
            aria-label="Background category"
            className="mt-3 flex flex-wrap gap-2"
          >
            {backgroundCategories.map((item) => (
              <button
                key={item.id}
                type="button"
                className="lab-category-choice"
                aria-pressed={activeCategory === item.id}
                onClick={() => setCategory(item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div
            role="group"
            aria-label="Background style"
            className="mt-4 grid grid-cols-1 gap-2 min-[440px]:grid-cols-2"
          >
            {backgroundStyles
              .filter((option) => option.category === activeCategory)
              .map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className="lab-background-choice app-tooltip"
                  data-active={settings.background === option.id}
                  aria-pressed={settings.background === option.id}
                  data-tooltip={option.description}
                  onClick={() =>
                    update(
                      { background: option.id },
                      `Background: ${option.name}.`,
                    )
                  }
                >
                  <span
                    aria-hidden
                    className="lab-background-preview"
                    data-effect={option.id}
                  >
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="block text-sm font-semibold">
                    {option.name}
                  </span>
                </button>
              ))}
          </div>
          <details className="border-border mt-5 border-t pt-4">
            <summary className="cursor-pointer text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4">
              Advanced background settings
            </summary>
            <fieldset
              disabled={!hasBackground}
              className="mt-4 space-y-5 disabled:opacity-50"
            >
              <legend className="sr-only">Background controls</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                {(
                  [
                    {
                      key: 'size',
                      label: 'Element size',
                      low: 'Fine',
                      high: 'Large',
                      min: sizeRange.min,
                      max: sizeRange.max,
                    },
                    {
                      key: 'opacity',
                      label: 'Pattern opacity',
                      low: 'Subtle',
                      high: 'Solid',
                      min: opacityRange.min,
                      max: opacityRange.max,
                    },
                    {
                      key: 'density',
                      label: 'Density',
                      low: 'Sparse',
                      high: 'Full',
                      min: densityRange.min,
                      max: densityRange.max,
                    },
                  ] as const
                ).map(({ key, label, low, high, min, max }) => (
                  <label key={key} className="lab-range-control">
                    <span className="flex justify-between gap-3 text-sm">
                      <span>{label}</span>
                      <output>
                        {settings[key]} / {max}
                      </output>
                    </span>
                    <input
                      type="range"
                      min={min}
                      max={max}
                      step="1"
                      value={settings[key]}
                      onChange={(event) =>
                        update(
                          { [key]: Number(event.target.value) },
                          `${label}: ${event.target.value} of ${max}.`,
                        )
                      }
                    />
                    <span className="text-muted flex justify-between text-xs">
                      <span>{low}</span>
                      <span>{high}</span>
                    </span>
                  </label>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold">Pattern color</p>
                <div
                  role="group"
                  aria-label="Pattern color category"
                  className="mt-3 flex flex-wrap gap-2"
                >
                  {backgroundColorCategories.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="lab-category-choice"
                      aria-pressed={activeColorCategory === item.id}
                      onClick={() => setColorCategory(item.id)}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
                <div
                  role="group"
                  aria-label="Background color presets"
                  className="mt-3 flex flex-wrap gap-2"
                >
                  {backgroundColors
                    .filter(
                      ({ category: optionCategory }) =>
                        optionCategory === activeColorCategory,
                    )
                    .map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        aria-label={option.name}
                        aria-pressed={settings.backgroundColor === option.id}
                        data-tooltip={option.name}
                        data-active={settings.backgroundColor === option.id}
                        className="lab-color-choice app-tooltip"
                        onClick={() =>
                          update(
                            { backgroundColor: option.id },
                            `Background color: ${option.name}.`,
                          )
                        }
                      >
                        <span
                          aria-hidden
                          className="lab-color-swatch"
                          style={{
                            background:
                              option.id === 'rainbow'
                                ? 'linear-gradient(120deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6, #ec4899)'
                                : option.id === 'aurora'
                                  ? 'linear-gradient(120deg, #16a34a, #06b6d4, #3b82f6, #a855f7)'
                                  : option.id === 'sunset'
                                    ? 'linear-gradient(120deg, #7c3aed, #db2777, #f97316, #facc15)'
                                    : option.id === 'theme'
                                      ? 'var(--cursor-accent)'
                                      : resolvedTheme === 'light'
                                        ? option.light
                                        : option.dark,
                          }}
                        />
                        {option.id === 'theme' && (
                          <span className="text-xs">{option.name}</span>
                        )}
                      </button>
                    ))}
                  <label
                    className="lab-color-custom"
                    htmlFor="lab-background-color"
                  >
                    <input
                      id="lab-background-color"
                      type="color"
                      value={
                        settings.backgroundColor.startsWith('#')
                          ? settings.backgroundColor
                          : '#8aa8ff'
                      }
                      onChange={(event) => {
                        if (isBackgroundColor(event.target.value))
                          update(
                            { backgroundColor: event.target.value },
                            `Custom background color: ${event.target.value}.`,
                          )
                      }}
                    />
                    Custom color
                  </label>
                </div>
              </div>
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={settings.motion === 'animated'}
                  onChange={(event) =>
                    update(
                      { motion: event.target.checked ? 'animated' : 'still' },
                      event.target.checked
                        ? 'Background motion enabled.'
                        : 'Background motion paused.',
                    )
                  }
                />
                Animate background
              </label>
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={settings.interaction}
                  onChange={(event) =>
                    update(
                      { interaction: event.target.checked },
                      event.target.checked
                        ? 'Pointer interaction enabled.'
                        : 'Pointer interaction disabled.',
                    )
                  }
                />
                {backgroundLabCopy.interaction}
              </label>
            </fieldset>
          </details>
        </section>
      )}
    </div>
  )
}
