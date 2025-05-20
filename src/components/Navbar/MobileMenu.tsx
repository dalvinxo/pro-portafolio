'use client'

import { useTranslateContext } from 'providers'
import { useTheme } from 'next-themes'
import { IoSunny, IoMoon, IoClose } from 'react-icons/io5'
import { FaBug } from 'react-icons/fa'
import Nav from '@common/Nav'
import Link from 'next/link'
import { useEffect } from 'react'

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
  // const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { lang, setLanguage } = useTranslateContext()

  // useEffect(() => {
  //   setMounted(true)
  // }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden 
          transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        className={`fixed top-0 right-0 h-full w-[280px] bg-white dark:bg-slate-900 
          z-50 transform transition-transform duration-300 ease-in-out md:hidden 
          shadow-xl overflow-y-auto ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
        <div className="p-4 min-h-full flex flex-col">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 
              rounded-lg transition-colors"
            aria-label="Close menu">
            <IoClose className="w-6 h-6" />
          </button>

          <nav className="mt-12 flex-1">
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

          <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="grid grid-cols-3 gap-2">
              {/* {mounted && ( */}
              {theme === 'dark' ? (
                <button
                  title={translate.navbar['button-mode-dark'].title}
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="flex items-center justify-center p-3 rounded-lg
                    hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label={
                    theme === 'dark'
                      ? translate.navbar['button-mode-dark']['aria-label'].light
                      : translate.navbar['button-mode-dark']['aria-label'].dark
                  }>
                  <IoSunny className="w-5 h-5 text-amber-500" />
                </button>
              ) : (
                <button
                  title={translate.navbar['button-mode-dark'].title}
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="flex items-center justify-center p-3 rounded-lg
                      hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label={
                    theme === 'dark'
                      ? translate.navbar['button-mode-dark']['aria-label'].light
                      : translate.navbar['button-mode-dark']['aria-label'].dark
                  }>
                  <IoMoon className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                </button>
              )}

              {/* )} */}

              <button
                title={translate.navbar['button-language-mode'].title}
                onClick={() => setLanguage(lang === 'en' ? 'es' : 'en')}
                className="flex items-center justify-center p-3 rounded-lg
                  bg-slate-100 dark:bg-slate-800 font-medium text-sm
                  hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
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
                className="flex items-center justify-center p-3 rounded-lg
                  hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <FaBug className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileMenu
