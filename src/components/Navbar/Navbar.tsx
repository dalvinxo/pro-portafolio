import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Nav from 'src/common/Nav'
import { routers } from 'var-contants'

const Navbar: NextPage = () => {
  const router = useRouter()
  const {
    navbar: { brand, navlink },
  } = routers

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-7">
        <div className="flex items-center space-x-3">
          <Image
            className="h-8 w-8 rounded-full"
            alt="icon profile"
            src={brand.avatar}
            width={40}
            height={40}
          />
          <h1 className="text-center text-lg first-letter:text-lg first-letter:uppercase font-medium">
            {brand.title}
          </h1>
        </div>

        <nav>
          <menu className="space-x-7 text-base">
            {navlink &&
              navlink.map(({ alias, path }) => (
                <Nav
                  key={alias}
                  isActive={path === router.pathname}
                  as={alias}
                  path={path}
                />
              ))}
          </menu>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
