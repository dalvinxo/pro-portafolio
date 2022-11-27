'use client'

import { usePathname } from 'next/navigation'

import Nav from 'src/common/Nav'
import { routers } from 'var-contants'
import Header from '@components/Header'
import { IoSunny, IoMoon } from 'react-icons/io5'
import { useTheme } from 'next-themes'

const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const {
    navbar: { brand, navlink },
  } = routers

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-7">
        <Header brand={brand} />
        <nav>
          <menu className="space-x-7 text-base">
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
                {theme != 'dark' ? <IoMoon /> : <IoSunny />}
              </button>
            </div>
          </menu>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
