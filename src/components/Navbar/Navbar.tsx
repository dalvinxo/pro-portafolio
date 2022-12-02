'use client'

import { usePathname } from 'next/navigation'

import Nav from 'src/common/Nav'
import { routers } from 'var-contants'
import Header from '@components/Header'
import { IoSunny, IoMoon } from 'react-icons/io5'
import { useTheme } from 'next-themes'

const Navbar = () => {
  const { theme = 'dark', setTheme } = useTheme()
  const pathname = usePathname()

  const {
    navbar: { brand, navlink },
  } = routers

  return (
    <div className="w-full">
      <div className="flex watch:flex-col items-center justify-between watch:justify-center watch:flex-wrap xs:justify-evenly py-7">
        <Header brand={brand} />
        <nav className="watch:py-4">
          <menu className="space-x-7 watch:space-x-2 xs:space-x-2 text-base">
            {navlink.map(({ alias, path }) => (
              <Nav
                key={alias}
                isActive={path === pathname}
                as={alias}
                path={path}
              />
            ))}
            <div className="inline-block">
              <button
                onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}>
                {theme == 'dark' ? <IoSunny /> : <IoMoon />}
              </button>
            </div>
          </menu>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
