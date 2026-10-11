'use client'

import { Check, Moon, Orbit, Shuffle, Sun, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
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
  const mode = resolvedTheme === 'light' ? 'light' : 'dark'

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
        if (selected) select(selected.id)
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
        <span>Multiverse</span>
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
                    Portfolio Multiverse
                  </p>
                  <h2
                    id="multiverse-title"
                    className="mt-2 text-2xl font-semibold"
                  >
                    Same engineer. New perspective.
                  </h2>
                  <p
                    id="multiverse-description"
                    className="text-muted mt-2 text-sm"
                  >
                    One developer. {universes.length} universes.{' '}
                    {universes.length * 2} experiences.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close Multiverse"
                  className="hover:bg-surface-hover grid size-10 shrink-0 place-items-center"
                >
                  <X aria-hidden className="size-5" />
                </button>
              </div>
              <div
                className="multiverse-catalog mt-5 space-y-6"
                role="group"
                aria-label="Choose a universe"
              >
                {universeCategories.map((category) => (
                  <section
                    key={category.id}
                    aria-labelledby={`universe-category-${category.id}`}
                  >
                    <div className="mb-3">
                      <h3
                        id={`universe-category-${category.id}`}
                        className="text-sm font-semibold"
                      >
                        {category.name}
                      </h3>
                      <p className="text-muted mt-1 text-xs leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-3 min-[440px]:grid-cols-2 sm:grid-cols-3">
                      {universes
                        .filter((item) => item.category === category.id)
                        .map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            aria-pressed={universe === item.id}
                            onClick={() => select(item.id)}
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
                            <span className="mt-3 flex items-center justify-between gap-2 font-semibold">
                              <span>
                                <span className="text-muted mr-2 font-mono text-xs">
                                  0
                                  {universes.findIndex(
                                    ({ id }) => id === item.id,
                                  ) + 1}
                                </span>
                                {item.name}
                              </span>
                              {universe === item.id && (
                                <Check
                                  aria-label="Active universe"
                                  className="text-accent-text size-4"
                                />
                              )}
                            </span>
                            <span className="text-muted mt-1 block text-xs leading-relaxed">
                              {item.description}
                            </span>
                          </button>
                        ))}
                    </div>
                  </section>
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
                    className="multiverse-control"
                    onClick={() => {
                      const next = surpriseCombination(universe, mode)
                      select(next.id, next.mode)
                    }}
                  >
                    <Shuffle aria-hidden className="size-4" />
                    Surprise Me
                  </button>
                </div>
                <p className="text-muted mt-4 text-xs leading-relaxed">
                  <kbd>T</kbd> open / close · <kbd>D</kbd> light / dark ·{' '}
                  <kbd>1–{universes.length}</kbd> choose · <kbd>Esc</kbd> close
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
