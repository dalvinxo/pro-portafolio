'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { HiMenuAlt3 } from 'react-icons/hi'

import Header from '@components/Header'
import Nav from '@common/Nav'
import { getDictionary } from '@utils/dictionaries'
import { useTranslateContext } from 'providers'
import { routers } from 'var-contants'
import MobileMenu from './MobileMenu'
import NavbarActions from './NavbarActions'
import PreferencesMenu from './Preferences'

const isActivePath = (path: string, pathname: string) =>
  path === '/' ? pathname === '/' : pathname.startsWith(path)

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { lang } = useTranslateContext()
  const translate = getDictionary(lang)

  const {
    navbar: { brand, navlink },
  } = routers

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), [])

  return (
    <header className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-6">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border px-2 py-2 pl-2.5 transition-all duration-300 sm:pl-3 ${
          isScrolled
            ? 'border-slate-200/80 bg-white/80 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75 dark:shadow-black/20'
            : 'border-transparent bg-transparent'
        }`}>
        <Header
          brand={brand}
          link={navlink[0].path}
          linkBrandTitle={translate.brand.linkTitle}
          role="Ingeniero de Software"
          name="Dalvin Molina"
        />

        <nav
          className="hidden md:block"
          aria-label={
            lang === 'en' ? 'Main navigation' : 'Navegación principal'
          }>
          <ul className="flex items-center gap-1 rounded-full bg-slate-100/80 p-1 dark:bg-white/5">
            {navlink.map(({ alias, path }) => (
              <li key={path}>
                <Nav
                  isActive={isActivePath(path, pathname)}
                  as={alias(lang)}
                  path={path}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-1 md:flex">
            <PreferencesMenu />
            <NavbarActions translate={translate} />
          </div>

          <button
            type="button"
            id="mobile-menu-button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            aria-label={lang === 'en' ? 'Open menu' : 'Abrir menú'}>
            <HiMenuAlt3 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        navItems={navlink}
        pathname={pathname}
        translate={translate}
        isActivePath={isActivePath}
      />
    </header>
  )
}

export default Navbar
