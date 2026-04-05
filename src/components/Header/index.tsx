import Image from 'next/image'
import Link from 'next/link'

type RoleType =
  | 'Desarrollador Backend'
  | 'Desarrollador Frontend'
  | 'Fullstack'
  | 'Ingeniero de Software'
  | 'Ingeniero de Datos'

interface HeaderProps extends EntityBrand {
  link?: string
  linkBrandTitle?: string
  role: RoleType
  name: string
}

const Header = ({ brand, link, linkBrandTitle, role, name }: HeaderProps) => {
  const href = brand.src || link || '/'
  const isExternal = /^https?:\/\//.test(href)

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'nofollow noreferrer' : undefined}
      title={linkBrandTitle}
      className="group flex min-w-0 items-center gap-3 rounded-2xl transition-opacity hover:opacity-90 sm:gap-4"
    >
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-slate-200 dark:ring-slate-800 sm:h-14 sm:w-14">
        <Image
          alt="Profile avatar"
          src={brand.avatar}
          fill
          sizes="56px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0">
        <p className="truncate text-base font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-lg">
          {brand.title}
        </p>
        <p className="truncate text-sm font-medium text-slate-600 dark:text-slate-300">
          {name}
        </p>
        <p className="truncate text-xs uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
          {role}
        </p>
      </div>
    </Link>
  )
}

export default Header
