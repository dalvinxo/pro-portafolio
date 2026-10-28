'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FaBug } from 'react-icons/fa'
import { IoMoon, IoSunny } from 'react-icons/io5'

import { useTranslateContext } from 'providers'

export const BUG_REPORT_URL =
  'https://github.com/dalvinxo/pro-portafolio/issues/new?template=bug_report.md'

type Size = 'sm' | 'lg'

const baseClassName =
  'inline-flex items-center justify-center text-slate-600 transition-colors hover:bg-slate-900/5 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'

const sizeClassName: Record<Size, string> = {
  sm: 'h-9 w-9 rounded-full',
  lg: 'h-12 w-full rounded-2xl border border-slate-200 dark:border-slate-800',
}

const iconClassName: Record<Size, string> = {
  sm: 'h-4 w-4',
  lg: 'h-5 w-5',
}

interface NavbarActionsProps {
  translate: any
  size?: Size
}

const NavbarActions = ({ translate, size = 'sm' }: NavbarActionsProps) => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const { lang, setLanguage } = useTranslateContext()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDarkTheme = resolvedTheme === 'dark'
  const className = `${baseClassName} ${sizeClassName[size]}`
  const icon = iconClassName[size]
  const { navbar } = translate

  return (
    <>
      <button
        type="button"
        title={navbar['button-mode-dark'].title}
        aria-label={
          isDarkTheme
            ? navbar['button-mode-dark']['aria-label'].light
            : navbar['button-mode-dark']['aria-label'].dark
        }
        onClick={() => setTheme(isDarkTheme ? 'light' : 'dark')}
        disabled={!mounted}
        className={className}>
        {mounted && isDarkTheme ? (
          <IoSunny className={`${icon} text-amber-400`} aria-hidden="true" />
        ) : (
          <IoMoon className={icon} aria-hidden="true" />
        )}
      </button>

      <button
        type="button"
        title={navbar['button-language-mode'].title}
        aria-label={
          lang === 'en'
            ? navbar['button-language-mode']['aria-label'].es
            : navbar['button-language-mode']['aria-label'].en
        }
        onClick={() => setLanguage(lang === 'en' ? 'es' : 'en')}
        className={`${className} text-xs font-semibold tracking-wide`}>
        {lang === 'en' ? 'ES' : 'EN'}
      </button>

      <a
        href={BUG_REPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={navbar['button-bug']['aria-label']}
        title={navbar['button-bug'].title}
        className={className}>
        <FaBug className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
      </a>
    </>
  )
}

export default NavbarActions
