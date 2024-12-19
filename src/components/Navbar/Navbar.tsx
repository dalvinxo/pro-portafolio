'use client'

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
                role="button"
                title={translate.navbar['button-mode-dark'].title}
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
                role="button"
                type="button"
                title={translate.navbar['button-language-mode'].title}
                aria-label={
                  lang === 'en' || !lang
                    ? translate.navbar['button-language-mode']['aria-label'].es
                    : translate.navbar['button-language-mode']['aria-label'].en
                }
                onClick={() => setLanguage(lang == 'en' || !lang ? 'es' : 'en')}
                className={`font-medium uppercase ${
                  lang == 'en' ? 'bg-red-600/100' : 'bg-blue-600'
                } text-cyan-50 rounded-md p-1 text-sm`}>
                {lang == 'en' ? 'ES' : 'US'}
              </button>
            </div>
            <div className="inline-block">
              <Link
                href="https://github.com/dalvinxo/pro-portafolio/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={translate.navbar['button-bug']['aria-label']}
                title={translate.navbar['button-bug'].title}
                className="text-sm font-medium uppercase dark:hover:text-cyan-500 hover:text-slate-600">
                <FaBug />
              </Link>
            </div>
          </menu>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
