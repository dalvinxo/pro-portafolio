'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FaBug } from 'react-icons/fa'
import { IoClose, IoMoon, IoSunny } from 'react-icons/io5'

import Nav from '@common/Nav'
import { useTranslateContext } from 'providers'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navItems: Array<{
    alias: (lang: string) => string
    path: string
  }>
  pathname: string
  translate: any
}

const MobileMenu = ({
  isOpen,
  onClose,
  navItems,
  pathname,
  translate,
}: MobileMenuProps) => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { lang, setLanguage } = useTranslateContext()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const isDarkTheme = theme === 'dark'

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={lang === 'en' ? 'Mobile menu' : 'Menu movil'}
        className={`fixed right-0 top-0 z-50 flex h-full w-[300px] transform flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-out dark:border-slate-800 dark:bg-slate-950 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
              {lang === 'en' ? 'Navigation' : 'Navegacion'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900"
            aria-label={lang === 'en' ? 'Close menu' : 'Cerrar menu'}>
            <IoClose className="h-5 w-5" />
          </button>
        </div>

        <nav
          className="flex-1 px-4 py-5"
          aria-label={lang === 'en' ? 'Mobile navigation' : 'Navegacion movil'}>
          <ul className="space-y-2">
            {navItems.map(({ alias, path }) => (
              <li key={path}>
                <Nav
                  isActive={path === pathname}
                  as={alias(lang)}
                  path={path}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-slate-200 px-4 py-4 dark:border-slate-800">
          <div className="grid grid-cols-3 gap-2">
            {mounted ? (
              <button
                type="button"
                title={translate.navbar['button-mode-dark'].title}
                onClick={() => setTheme(isDarkTheme ? 'light' : 'dark')}
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-900"
                aria-label={
                  isDarkTheme
                    ? translate.navbar['button-mode-dark']['aria-label'].light
                    : translate.navbar['button-mode-dark']['aria-label'].dark
                }>
                {isDarkTheme ? (
                  <IoSunny className="h-5 w-5 text-amber-500" />
                ) : (
                  <IoMoon className="h-5 w-5" />
                )}
              </button>
            ) : (
              <span
                aria-hidden="true"
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 text-slate-400 dark:border-slate-800 dark:text-slate-600">
                <IoMoon className="h-5 w-5" />
              </span>
            )}

            <button
              type="button"
              title={translate.navbar['button-language-mode'].title}
              onClick={() => setLanguage(lang === 'en' ? 'es' : 'en')}
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-900"
              aria-label={
                lang === 'en'
                  ? translate.navbar['button-language-mode']['aria-label'].es
                  : translate.navbar['button-language-mode']['aria-label'].en
              }>
              {lang === 'en' ? 'ES' : 'EN'}
            </button>

            <Link
              href="https://github.com/dalvinxo/pro-portafolio/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={translate.navbar['button-bug']['aria-label']}
              title={translate.navbar['button-bug'].title}
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-900">
              <FaBug className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileMenu
