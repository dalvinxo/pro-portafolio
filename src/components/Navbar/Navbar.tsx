'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FaBug } from 'react-icons/fa'
import { HiMenu } from 'react-icons/hi'
import { IoMoon, IoSunny } from 'react-icons/io5'

import Header from '@components/Header'
import { getDictionary } from '@utils/dictionaries'
import Nav from 'src/common/Nav'
import { useTranslateContext } from 'src/context/TranslateProviders'
import { routers } from 'var-contants'
import MobileMenu from './MobileMenu'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const { lang, setLanguage } = useTranslateContext()
  const translate = getDictionary(lang)

  const {
    navbar: { brand, navlink },
  } = routers

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDarkTheme = theme === 'dark'

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="border-b border-slate-200/80 bg-white/88 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/84">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 py-2.5">
            <Header
              brand={brand}
              link={navlink[0].path}
              linkBrandTitle={translate.brand.linkTitle}
              role="Ingeniero de Software"
              name="Dalvin Molina"
            />

            <nav
              className="hidden items-center gap-4 md:flex"
              aria-label={
                lang === 'en' ? 'Main navigation' : 'Navegacion principal'
              }>
              <ul className="flex items-center gap-2">
                {navlink.map(({ alias, path }) => (
                  <li key={path}>
                    <Nav
                      isActive={path === pathname}
                      as={alias(lang)}
                      path={path}
                    />
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-1.5 border-l border-slate-200 pl-4 dark:border-slate-800">
                {mounted ? (
                  <button
                    type="button"
                    title={translate.navbar['button-mode-dark'].title}
                    aria-label={
                      isDarkTheme
                        ? translate.navbar['button-mode-dark']['aria-label']
                          .light
                        : translate.navbar['button-mode-dark']['aria-label']
                          .dark
                    }
                    onClick={() => setTheme(isDarkTheme ? 'light' : 'dark')}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900">
                    {isDarkTheme ? (
                      <IoSunny className="h-4 w-4 text-amber-500" />
                    ) : (
                      <IoMoon className="h-4 w-4" />
                    )}
                  </button>
                ) : (
                  <span
                    aria-hidden="true"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-400 dark:border-slate-800 dark:text-slate-600">
                    <IoMoon className="h-4 w-4" />
                  </span>
                )}

                <button
                  type="button"
                  title={translate.navbar['button-language-mode'].title}
                  aria-label={
                    lang === 'en'
                      ? translate.navbar['button-language-mode']['aria-label']
                        .es
                      : translate.navbar['button-language-mode']['aria-label']
                        .en
                  }
                  onClick={() => setLanguage(lang === 'en' ? 'es' : 'en')}
                  className="inline-flex min-w-[2.8rem] items-center justify-center rounded-full border border-slate-200 px-2.5 py-1.5 text-[13px] font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-900">
                  {lang === 'en' ? 'ES' : 'EN'}
                </button>

                <Link
                  href="https://github.com/dalvinxo/pro-portafolio/issues/new?template=bug_report.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={translate.navbar['button-bug']['aria-label']}
                  title={translate.navbar['button-bug'].title}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900">
                  <FaBug className="h-3.5 w-3.5" />
                </Link>
              </div>
            </nav>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-900 md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label={lang === 'en' ? 'Open menu' : 'Abrir menu'}>
              <HiMenu className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navlink}
        pathname={pathname}
        translate={translate}
      />
    </header>
  )
}

export default Navbar
