'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'
import { IoCheckmark, IoColorPaletteOutline } from 'react-icons/io5'

import { usePreferences, useTranslateContext } from 'providers'
import {
  ACCENTS,
  Accent,
  FONT_SIZES,
  FontSize,
} from 'src/constants/preferences'

const accentSwatch: Record<Accent, string> = {
  sky: 'from-sky-500 to-indigo-500',
  violet: 'from-violet-500 to-fuchsia-500',
  emerald: 'from-emerald-500 to-cyan-500',
  rose: 'from-rose-500 to-orange-500',
  amber: 'from-amber-500 to-red-500',
}

const copy = {
  en: {
    title: 'Preferences',
    accent: 'Accent color',
    fontSize: 'Text size',
    open: 'Open display preferences',
    accents: {
      sky: 'Blue',
      violet: 'Violet',
      emerald: 'Emerald',
      rose: 'Rose',
      amber: 'Amber',
    },
    sizes: { md: 'Medium', lg: 'Large', xl: 'Extra large' },
  },
  es: {
    title: 'Preferencias',
    accent: 'Color de acento',
    fontSize: 'Tamaño del texto',
    open: 'Abrir preferencias de visualización',
    accents: {
      sky: 'Azul',
      violet: 'Violeta',
      emerald: 'Esmeralda',
      rose: 'Rosa',
      amber: 'Ámbar',
    },
    sizes: { md: 'Mediano', lg: 'Grande', xl: 'Extra grande' },
  },
}

const sizePreview: Record<FontSize, string> = {
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
}

export const PreferencesPanel = () => {
  const { lang } = useTranslateContext()
  const { accent, fontSize, setAccent, setFontSize } = usePreferences()
  const t = copy[lang] ?? copy.en
  const name = useId()

  return (
    <div className="space-y-5">
      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
          {t.accent}
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {ACCENTS.map((value) => (
            <label
              key={value}
              title={t.accents[value]}
              className="relative cursor-pointer">
              <input
                type="radio"
                name={`${name}-accent`}
                value={value}
                checked={accent === value}
                onChange={() => setAccent(value)}
                className="peer sr-only"
              />
              <span className="sr-only">{t.accents[value]}</span>
              <span
                aria-hidden="true"
                className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${accentSwatch[value]} text-white ring-offset-2 ring-offset-white transition-transform hover:scale-110 peer-checked:ring-2 peer-checked:ring-slate-900 peer-focus-visible:ring-2 peer-focus-visible:ring-accent dark:ring-offset-slate-900 dark:peer-checked:ring-white`}>
                {accent === value && <IoCheckmark className="h-4 w-4" />}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
          {t.fontSize}
        </legend>
        <div className="grid grid-cols-3 gap-1 rounded-2xl bg-slate-100 p-1 dark:bg-white/5">
          {FONT_SIZES.map((value) => (
            <label key={value} className="relative cursor-pointer">
              <input
                type="radio"
                name={`${name}-font-size`}
                value={value}
                checked={fontSize === value}
                onChange={() => setFontSize(value)}
                className="peer sr-only"
              />
              <span className="flex flex-col items-center gap-0.5 rounded-xl px-2 py-2 text-slate-600 transition-colors hover:text-slate-900 peer-checked:bg-white peer-checked:text-slate-900 peer-checked:shadow-sm peer-focus-visible:ring-2 peer-focus-visible:ring-accent dark:text-slate-400 dark:hover:text-white dark:peer-checked:bg-white/10 dark:peer-checked:text-white">
                <span
                  aria-hidden="true"
                  className={`font-semibold leading-none ${sizePreview[value]}`}>
                  Aa
                </span>
                <span className="text-[0.7rem] font-medium">
                  {t.sizes[value]}
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  )
}

const PreferencesMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { lang } = useTranslateContext()
  const t = copy[lang] ?? copy.en
  const panelId = useId()

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        title={t.title}
        aria-label={t.open}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
        className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
          isOpen
            ? 'bg-accent/15 text-accent-ink'
            : 'text-slate-600 hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
        }`}>
        <IoColorPaletteOutline className="h-4 w-4" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label={t.title}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full mt-3 w-72 origin-top-right rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/95 dark:shadow-black/40">
            <p className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
              {t.title}
            </p>
            <PreferencesPanel />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PreferencesMenu
