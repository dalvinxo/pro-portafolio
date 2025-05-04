import { useTranslateContext } from 'src/context/TranslateProviders'
import { useTheme } from 'next-themes'
import { IoSunny, IoMoon } from 'react-icons/io5'
import { FaBug } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import Nav from 'src/common/Nav'
import Link from 'next/link'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navItems: any[]
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
  const { theme, setTheme } = useTheme()
  const { lang, setLanguage } = useTranslateContext()

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-slate-900 z-50 transform transition-transform duration-300 ease-in-out md:hidden shadow-xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="p-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
            <IoClose className="w-6 h-6" />
          </button>

          <div className="mt-8 space-y-4">
            {navItems.map(({ alias, path }) => (
              <Nav
                key={alias(lang)}
                isActive={path === pathname}
                as={alias(lang)}
                path={path}
              />
            ))}

            <hr className="border-slate-200 dark:border-slate-700 my-4" />

            <div className="flex items-center justify-center gap-3 text-center">
              <button
                title={translate.navbar['button-mode-dark'].title}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-full flex items-center justify-between p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                aria-label={
                  theme === 'dark' || !theme
                    ? translate.navbar['button-mode-dark']['aria-label'].light
                    : translate.navbar['button-mode-dark']['aria-label'].dark
                }>
                {theme === 'dark' ? (
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
                    ? translate.navbar['button-language-mode']['aria-label'].es
                    : translate.navbar['button-language-mode']['aria-label'].en
                }
                onClick={() => setLanguage(lang === 'en' ? 'es' : 'en')}
                className="w-full flex items-center justify-between p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                <span className="text-sm font-medium">
                  {lang === 'en' ? 'ES' : 'EN'}
                </span>
              </button>

              <Link
                href="https://github.com/dalvinxo/pro-portafolio/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={translate.navbar['button-bug']['aria-label']}
                title={translate.navbar['button-bug'].title}
                className="w-full flex items-center justify-between p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
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
