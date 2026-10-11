'use client'

import { Check, Hand, MousePointer2 } from 'lucide-react'
import { useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { getCursorColor, getCursorColorStyle } from '@/lib/cursor-color'
import { getUniverse, subscribeUniverse } from '@/lib/universe'

import {
  backgroundStyles,
  cursorStyles,
  cursorColors,
  isCursorColor,
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
  const { resolvedTheme } = useTheme()
  const universe = useSyncExternalStore(
    subscribeUniverse,
    getUniverse,
    () => 'neo' as const,
  )
  const animatedBackground = ['theme', 'constellation', 'stars'].includes(
    settings.background,
  )
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
            Choose a marker independently of your universe. Every shape stays
            small and follows directly.
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
                    <span className="text-xs">Match universe</span>
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
            Keep it quiet, add a pattern, or explore a little motion.
          </p>
          <div
            role="group"
            aria-label="Background style"
            className="mt-4 grid grid-cols-1 gap-2 min-[440px]:grid-cols-2"
          >
            {backgroundStyles.map((option) => (
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
          <fieldset
            disabled={!animatedBackground}
            className="border-border mt-5 space-y-4 border-t pt-4 disabled:opacity-50"
          >
            <legend className="sr-only">Particle settings</legend>
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <label htmlFor="lab-density">Particle density</label>
              <select
                id="lab-density"
                className="lab-select"
                value={settings.density}
                onChange={(event) => {
                  const value = event.target.value
                  if (
                    value === 'subtle' ||
                    value === 'balanced' ||
                    value === 'lively'
                  )
                    update({ density: value }, `Particle density: ${value}.`)
                }}
              >
                <option value="subtle">Subtle</option>
                <option value="balanced">Balanced</option>
                <option value="lively">Lively</option>
              </select>
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
              Animate particles
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
              Pointer connections and click ripples
            </label>
          </fieldset>
        </section>
      )}
    </div>
  )
}
