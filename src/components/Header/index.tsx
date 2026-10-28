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

const Header = ({
  brand,
  link = '/',
  linkBrandTitle,
  role,
  name,
}: HeaderProps) => {
  return (
    <Link
      href={link}
      title={linkBrandTitle}
      className="group flex min-w-0 items-center gap-3 rounded-full pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
      <span className="relative h-9 w-9 shrink-0">
        <span className="absolute inset-0 overflow-hidden rounded-full ring-2 ring-white transition-transform group-hover:scale-105 dark:ring-slate-900">
          <Image
            alt={name}
            src={brand.avatar}
            fill
            sizes="36px"
            className="object-cover"
          />
        </span>
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-950"
        />
      </span>

      <span className="hidden min-w-0 flex-col leading-tight sm:flex">
        <span className="truncate text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
          {name}
        </span>
        <span className="truncate text-xs text-slate-500 dark:text-slate-400">
          {role}
        </span>
      </span>
      <span className="truncate text-sm font-semibold tracking-tight text-slate-900 dark:text-white sm:hidden">
        {brand.title}
      </span>
    </Link>
  )
}

export default Header
