'use client'

import { usePathname } from 'next/navigation'

import Nav from 'src/common/Nav'
import { routers } from 'var-contants'
import Header from '@components/Header'
import { IoSunny, IoMoon } from 'react-icons/io5'
import { useTheme } from 'next-themes'
import { useTranslateContext } from 'src/context/TranslateProviders'
import { getDictionary } from '@utils/dictionaries'

const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const { lang, setLanguage } = useTranslateContext()
  const translate = getDictionary(lang)

  const {
    navbar: { brand, navlink },
  } = routers

  return (
    <div className="w-full">
      <div className="flex watch:flex-col items-center justify-between watch:justify-center watch:flex-wrap custom-xs:justify-center custom-xs:flex-col xs:justify-evenly py-7">
        <Header
          brand={brand}
          link={navlink[0].path}
          linkBrandTitle={translate.brand.linkTitle}
        />
        <nav className="watch:py-4">
          <menu className="space-x-7 custom-xs:space-y-5 watch:space-x-2 xs:space-x-4 text-base">
            {navlink.map(({ alias, path }) => (
              <Nav
                key={alias(lang)}
                isActive={path === pathname}
                as={alias(lang)}
                path={path}
              />
            ))}
            <div className="inline-block">
              <button
                title=""
                aria-label={
                  theme === 'dark' || !theme
                    ? translate.navbar['button-mode-dark']['aria-label'].light
                    : translate.navbar['button-mode-dark']['aria-label'].dark
                }
                onClick={() =>
                  setTheme(theme == 'dark' || !theme ? 'light' : 'dark')
                }>
                {theme == 'dark' || !theme ? <IoSunny /> : <IoMoon />}
              </button>
            </div>
            <div className="inline-block">
              <button
                title=""
                aria-label={
                  lang === 'en' || !lang
                    ? translate.navbar['button-mode-dark']['aria-label'].light
                    : translate.navbar['button-mode-dark']['aria-label'].dark
                }
                onClick={() =>
                  setLanguage(lang == 'en' || !lang ? 'es' : 'en')
                }>
                {lang == 'en' ? (
                  <span className="font-medium uppercase bg-red-600/100 text-cyan-50 rounded-md p-1 text-sm">
                    ES
                  </span>
                ) : (
                  <span className="font-medium uppercase text-cyan-50 bg-blue-600 rounded-md p-1 text-sm">
                    US
                  </span>
                )}
              </button>
            </div>
          </menu>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
