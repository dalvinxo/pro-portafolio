'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

import Nav from 'src/common/Nav'
import { routers } from 'var-contants'
import Header from '@components/Header'
import { IoSunny, IoMoon } from 'react-icons/io5'
import { FaBug } from 'react-icons/fa'
import { useTheme } from 'next-themes'
import { useTranslateContext } from 'src/context/TranslateProviders'
import { getDictionary } from '@utils/dictionaries'
import Link from 'next/link'
import MobileMenu from './MobileMenu'
import { HiMenu } from 'react-icons/hi'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const { lang, setLanguage } = useTranslateContext()
  const translate = getDictionary(lang)

  const {
    navbar: { brand, navlink },
  } = routers

  return (
    <header className="sticky top-0 w-full z-50">
      <div className="backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Header
              brand={brand}
              link={navlink[0].path}
              linkBrandTitle={translate.brand.linkTitle}
            />

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <menu className="flex items-center space-x-6">
                {navlink.map(({ alias, path }) => (
                  <Nav
                    key={alias(lang)}
                    isActive={path === pathname}
                    as={alias(lang)}
                    path={path}
                  />
                ))}

                <div className="flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-slate-700">
                  <button
                    role="button"
                    title={translate.navbar['button-mode-dark'].title}
                    aria-label={
                      theme === 'dark' || !theme
                        ? translate.navbar['button-mode-dark']['aria-label']
                            .light
                        : translate.navbar['button-mode-dark']['aria-label']
                            .dark
                    }
                    onClick={() =>
                      setTheme(theme == 'dark' || !theme ? 'light' : 'dark')
                    }
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200 hover:scale-105">
                    {theme == 'dark' || !theme ? (
                      <IoSunny className="w-5 h-5 text-amber-500" />
                    ) : (
                      <IoMoon className="w-5 h-5 text-slate-700" />
                    )}
                  </button>

                  <button
                    role="button"
                    type="button"
                    title={translate.navbar['button-language-mode'].title}
                    aria-label={
                      lang === 'en' || !lang
                        ? translate.navbar['button-language-mode']['aria-label']
                            .es
                        : translate.navbar['button-language-mode']['aria-label']
                            .en
                    }
                    onClick={() =>
                      setLanguage(lang == 'en' || !lang ? 'es' : 'en')
                    }
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105
                      ${
                        lang == 'en'
                          ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300'
                      }`}>
                    {lang == 'en' ? 'ES' : 'EN'}
                  </button>

                  <Link
                    href="https://github.com/dalvinxo/pro-portafolio/issues/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={translate.navbar['button-bug']['aria-label']}
                    title={translate.navbar['button-bug'].title}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200 hover:scale-105">
                    <FaBug className="w-4 h-4" />
                  </Link>
                </div>
              </menu>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu">
              <HiMenu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
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
