'use client'

// import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { /* IoArrowForward, */ IoClose } from 'react-icons/io5'

import Nav from '@common/Nav'
import { useTranslateContext } from 'providers'
import NavbarActions from './NavbarActions'
import { PreferencesPanel } from './Preferences'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navItems: Array<{
    alias: (lang: string) => string
    path: string
  }>
  pathname: string
  translate: any
  isActivePath: (path: string, pathname: string) => boolean
}

const MobileMenu = ({
  isOpen,
  onClose,
  navItems,
  pathname,
  translate,
  isActivePath,
}: MobileMenuProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const { lang } = useTranslateContext()

  useEffect(() => {
    if (!isOpen) {
      return
    }

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        aria-hidden={!isOpen}
        className={`fixed inset-x-3 top-3 z-50 max-h-[calc(100dvh-1.5rem)] origin-top overflow-y-auto overscroll-contain rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl transition-all duration-300 ease-out dark:border-white/10 dark:bg-slate-950 md:hidden ${
          isOpen
            ? 'visible scale-100 opacity-100'
            : 'invisible scale-95 opacity-0'
        }`}>
        <div className="flex items-center justify-between px-2 pb-2">
          <p
            id="mobile-menu-title"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            {lang === 'en' ? 'Menu' : 'Menú'}
          </p>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:text-slate-300 dark:hover:bg-white/10"
            aria-label={lang === 'en' ? 'Close menu' : 'Cerrar menú'}>
            <IoClose className="h-5 w-5" />
          </button>
        </div>

        <nav
          aria-label={lang === 'en' ? 'Mobile navigation' : 'Navegación móvil'}>
          <ul className="space-y-1">
            {navItems.map(({ alias, path }) => (
              <li key={path}>
                <Nav
                  variant="block"
                  isActive={isActivePath(path, pathname)}
                  as={alias(lang)}
                  path={path}
                  onNavigate={onClose}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-3 grid grid-cols-3 gap-2 border-t border-slate-200 pt-3 dark:border-white/10">
          <NavbarActions translate={translate} size="lg" />
        </div>

        <div className="mt-3 rounded-2xl border border-slate-200 p-4 dark:border-white/10">
          <PreferencesPanel />
        </div>

        {/* Resume hidden from the view temporarily
        <Link
          href="/resume"
          onClick={onClose}
          className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-accent-solid px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-solid/90">
          {lang === 'en' ? 'View resume' : 'Ver currículum'}
          <IoArrowForward className="h-4 w-4" aria-hidden="true" />
        </Link>
        */}
      </div>
    </>
  )
}

export default MobileMenu
