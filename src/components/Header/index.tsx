import Image from 'next/image'
import Link from 'next/link'

type RoleType =
  | 'Desarrollador Backend'
  | 'Desarrollador Frontend'
  | 'Fullstack'
  | 'Ingeniero de Software'
  | 'Ingeniero de Datos'

interface typeHeader extends EntityBrand {
  link?: string
  linkBrandTitle?: string
  role: RoleType
  name: string // Nuevo prop para el nombre
}

const Header = ({ brand, link, linkBrandTitle, role, name }: typeHeader) => {
  return (
    <div className="flex items-center justify-between gap-2 sm:gap-4 p-2">
      <Link
        href={brand.src || link}
        className="flex items-center space-x-2 sm:space-x-4 hover:opacity-90 transition-all duration-200"
        target="_blank"
        rel="nofollow"
        title={linkBrandTitle}>
        <Image
          className="rounded-full w-10 h-10 sm:w-14 sm:h-14 ring-2 ring-gray-100 dark:ring-gray-800 flex-shrink-0"
          alt="icon profile"
          src={brand.avatar}
          width={56}
          height={56}
        />
        <div className="flex flex-col min-w-0">
          <h1 className="text-base sm:text-xl font-semibold tracking-tight truncate">
            {brand.title}
          </h1>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium truncate">
              {name}
            </p>
            <div className="flex items-center gap-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {role}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Header
