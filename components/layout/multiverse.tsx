'use client'

import { Check, Dice5, Moon, Orbit, RotateCcw, Sun, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { StyleLabControls } from './style-lab-controls'
import { useStyleSettings } from './use-style-settings'
import {
  applyStyleSettings,
  surpriseCursor,
  surpriseBackground,
} from '@/lib/style-lab'
import {
  cursorStyles,
  cursorColors,
  backgroundStyles,
} from '@/content/style-lab'
import {
  universeCategories,
  universes,
  type UniverseId,
} from '@/content/universes'
import {
  applyUniverse,
  getUniverse,
  subscribeUniverse,
  surpriseCombination,
} from '@/lib/universe'

const serverUniverse = () => 'neo' as const
const labPanels = ['universes', 'cursor', 'background'] as const
type LabPanel = (typeof labPanels)[number]

export function Multiverse({ onOpen }: { onOpen: () => void }) {
  const universe = useSyncExternalStore(
    subscribeUniverse,
    getUniverse,
    serverUniverse,
  )
  const { resolvedTheme, setTheme } = useTheme()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const [panel, setPanel] = useState<LabPanel>('universes')
  const settings = useStyleSettings()
  const mode = resolvedTheme === 'light' ? 'light' : 'dark'

  function choosePanel(next: LabPanel) {
    setPanel(next)
    setNotice('')
    const catalog = dialogRef.current?.querySelector('.multiverse-catalog')
    if (catalog) catalog.scrollTop = 0
  }

  function close() {
    dialogRef.current?.close()
  }

  function toggle() {
    if (dialogRef.current?.open) close()
    else {
      onOpen()
      dialogRef.current?.showModal()
      dialogRef.current
        ?.querySelector('[data-active="true"].universe-card')
        ?.scrollIntoView({ block: 'nearest', behavior: 'instant' })
      setOpen(true)
    }
  }

  function select(id: UniverseId, nextMode = mode) {
    if (id === universe && nextMode === mode) return
    applyUniverse(id)
    setTheme(nextMode)
    const selected = universes.find((item) => item.id === id)!
    setNotice(
      `Universe discovered: ${selected.name}. ${selected.description} ${nextMode === 'dark' ? 'Dark' : 'Light'} mode.`,
    )
  }

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(''), 5500)
    return () => window.clearTimeout(timer)
  }, [notice])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.shiftKey ||
        event.isComposing
      )
        return
      const target = event.target
      if (
        target instanceof HTMLElement &&
        target.closest(
          'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"]',
        )
      )
        return
      // Leave shortcuts to any other active dialog or interactive overlay.
      if (document.querySelector('dialog[open]') && !dialogRef.current?.open)
        return
      const key = event.key.toLowerCase()
      if (key === 't') {
        event.preventDefault()
        toggle()
      } else if (key === 'd') {
        event.preventDefault()
        setTheme(mode === 'dark' ? 'light' : 'dark')
      } else if (dialogRef.current?.open && /^[1-9]$/.test(key)) {
        event.preventDefault()
        const selected = universes[Number(key) - 1]
        if (selected) {
          setPanel('universes')
          select(selected.id)
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  // A portal escapes the fixed navbar's backdrop-filter containing block.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  return (
    <>
      <button
        ref={triggerRef}
        disabled={!mounted}
        type="button"
        onClick={toggle}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="multiverse-selector"
        aria-keyshortcuts="t"
        className="brutal-sm bg-surface inline-flex h-10 items-center gap-2 px-3 text-sm font-semibold"
      >
        <Orbit aria-hidden className="size-[18px]" />
        <span>Style Lab</span>
      </button>
      {mounted &&
        createPortal(
          <>
            <dialog
              ref={dialogRef}
              id="multiverse-selector"
              aria-labelledby="multiverse-title"
              aria-describedby="multiverse-description"
              className="multiverse-dialog"
              data-panel={panel}
              onClose={() => {
                setOpen(false)
                triggerRef.current?.focus()
              }}
              onClick={(event) => {
                if (event.target === event.currentTarget) {
                  const rect = event.currentTarget.getBoundingClientRect()
                  if (
                    event.clientX < rect.left ||
                    event.clientX > rect.right ||
                    event.clientY < rect.top ||
                    event.clientY > rect.bottom
                  )
                    close()
                }
              }}
            >
              <div className="multiverse-heading flex items-start justify-between gap-4">
                <div>
                  <p className="text-muted font-mono text-xs tracking-widest uppercase">
                    Multiverse / Style Lab
                  </p>
                  <h2
                    id="multiverse-title"
                    className="mt-2 text-2xl font-semibold"
                  >
                    Make this space yours.
                  </h2>
                  <p
                    id="multiverse-description"
                    className="text-muted mt-2 text-sm"
                  >
                    Choose a universe. Mix your cursor. Set the atmosphere.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close Style Lab"
                  className="hover:bg-surface-hover grid size-10 shrink-0 place-items-center"
                >
                  <X aria-hidden className="size-5" />
                </button>
              </div>
              <div
                role="tablist"
                aria-label="Style Lab controls"
                className="lab-tabs"
                onKeyDown={(event) => {
                  const index = labPanels.indexOf(panel)
                  let next: number
                  if (event.key === 'ArrowRight')
                    next = (index + 1) % labPanels.length
                  else if (event.key === 'ArrowLeft')
                    next = (index + labPanels.length - 1) % labPanels.length
                  else if (event.key === 'Home') next = 0
                  else if (event.key === 'End') next = labPanels.length - 1
                  else return
                  event.preventDefault()
                  choosePanel(labPanels[next])
                  dialogRef.current
                    ?.querySelector<HTMLButtonElement>(
                      `#lab-tab-${labPanels[next]}`,
                    )
                    ?.focus()
                }}
              >
                {labPanels.map((item) => (
                  <button
                    key={item}
                    type="button"
                    role="tab"
                    id={`lab-tab-${item}`}
                    aria-selected={panel === item}
                    aria-controls={`lab-panel-${item}`}
                    tabIndex={panel === item ? 0 : -1}
                    className="multiverse-control"
                    data-active={panel === item}
                    onClick={() => choosePanel(item)}
                  >
                    {item === 'universes'
                      ? 'Universes'
                      : item === 'cursor'
                        ? 'Cursor'
                        : 'Background'}
                  </button>
                ))}
              </div>
              <div className="multiverse-catalog mt-5" data-panel={panel}>
                <div
                  role="tabpanel"
                  id="lab-panel-universes"
                  aria-labelledby="lab-tab-universes"
                  hidden={panel !== 'universes'}
                  className="universe-overview"
                  tabIndex={0}
                >
                  {universeCategories.map((category) => (
                    <section
                      key={category.id}
                      aria-labelledby={`universe-category-${category.id}`}
                    >
                      <div className="universe-category-heading flex items-center justify-between gap-2">
                        <h3
                          id={`universe-category-${category.id}`}
                          className="text-sm font-semibold"
                        >
                          {category.name}
                        </h3>
                      </div>
                      <div
                        className="universe-options"
                        data-category={category.id}
                      >
                        {universes
                          .filter((item) => item.category === category.id)
                          .map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              aria-pressed={universe === item.id}
                              onClick={() => select(item.id)}
                              aria-label={item.name}
                              title={item.description}
                              className="universe-card"
                              data-active={universe === item.id}
                            >
                              <span
                                aria-hidden
                                className={`universe-preview ${mode}`}
                                data-skin={item.id}
                              >
                                <span className="preview-nav">
                                  <i />
                                  <i />
                                  <i />
                                </span>
                                <span className="preview-title">
                                  BUILD
                                  <br />
                                  WITH INTENT.
                                </span>
                                <span className="preview-line" />
                                <span className="preview-panels">
                                  <i />
                                  <i />
                                  <i />
                                </span>
                              </span>
                              <span className="universe-tile-label">
                                <span
                                  className="universe-tile-number"
                                  aria-hidden
                                >
                                  {universes.findIndex(
                                    ({ id }) => id === item.id,
                                  ) + 1}
                                </span>
                                <span>{item.name}</span>
                                {universe === item.id && (
                                  <Check
                                    aria-hidden
                                    className="size-3 shrink-0"
                                  />
                                )}
                              </span>
                            </button>
                          ))}
                      </div>
                    </section>
                  ))}
                  <div className="universe-reset-row">
                    <button
                      type="button"
                      className="multiverse-control lab-reset"
                      onClick={() => {
                        applyUniverse('neo')
                        setNotice('Theme reset to the default: Neo.')
                      }}
                    >
                      <RotateCcw aria-hidden className="size-3.5" />
                      Reset to default theme
                    </button>
                  </div>
                </div>
                {(['cursor', 'background'] as const).map((item) => (
                  <div
                    key={item}
                    role="tabpanel"
                    id={`lab-panel-${item}`}
                    aria-labelledby={`lab-tab-${item}`}
                    hidden={panel !== item}
                    tabIndex={0}
                  >
                    <StyleLabControls panel={item} onChange={setNotice} />
                  </div>
                ))}
              </div>
              <div className="multiverse-footer">
                <div className="border-border mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                  <div
                    role="group"
                    aria-label="Color mode"
                    className="flex gap-1"
                  >
                    {(['light', 'dark'] as const).map((value) => {
                      const Icon = value === 'light' ? Sun : Moon
                      return (
                        <button
                          key={value}
                          type="button"
                          aria-pressed={mode === value}
                          onClick={() => setTheme(value)}
                          className="multiverse-control"
                          data-active={mode === value}
                        >
                          <Icon aria-hidden className="size-4" />
                          {value === 'light' ? 'Light' : 'Dark'}
                        </button>
                      )
                    })}
                  </div>
                  <button
                    type="button"
                    className="multiverse-control lab-surprise"
                    aria-label={`Surprise me: shuffle ${panel === 'universes' ? 'theme' : panel}`}
                    onClick={() => {
                      if (panel === 'universes') {
                        const next = surpriseCombination(universe, mode)
                        select(next.id, next.mode)
                      } else if (panel === 'cursor') {
                        const next = surpriseCursor(settings, universe)
                        applyStyleSettings(next)
                        setNotice(
                          `New cursor mix: ${cursorStyles.find(({ id }) => id === next.cursor)?.name}, ${cursorColors.find(({ id }) => id === next.cursorColor)?.name}.`,
                        )
                      } else {
                        const next = surpriseBackground(settings)
                        applyStyleSettings(next)
                        setNotice(
                          `New atmosphere: ${backgroundStyles.find(({ id }) => id === next.background)?.name}${next.background === 'stars' || next.background === 'constellation' ? `, ${next.density} density` : ''}.`,
                        )
                      }
                    }}
                  >
                    <Dice5 aria-hidden className="size-5" />
                    <span>
                      Surprise Me
                      <span className="lab-surprise-scope">
                        {panel === 'universes'
                          ? 'Shuffle theme'
                          : panel === 'cursor'
                            ? 'Shuffle cursor'
                            : 'Shuffle background'}
                      </span>
                    </span>
                  </button>
                </div>
                <p className="text-muted mt-4 text-xs leading-relaxed">
                  <kbd>T</kbd> open / close · <kbd>D</kbd> light / dark ·{' '}
                  <kbd>1–{universes.length}</kbd> universe · <kbd>Esc</kbd>{' '}
                  close
                </p>
                <p
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                  className="text-muted mt-3 text-xs leading-relaxed"
                >
                  {open ? notice : ''}
                </p>
              </div>
            </dialog>
            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="multiverse-notice"
              data-visible={Boolean(notice) && !open}
            >
              {!open ? notice : ''}
            </div>
          </>,
          document.body,
        )}
    </>
  )
}
