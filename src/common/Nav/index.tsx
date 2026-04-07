import Link from 'next/link'

type TypeNav = {
  isActive: boolean
  path: string
  as: string
}

const Nav = (props: TypeNav) => {
  const { isActive, path, as } = props

  return (
    <div className="inline-block">
      <Link
        className={`block rounded-full px-2.5 py-1 text-[13px] font-medium transition-colors ${
          isActive
            ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-slate-100'
        } `}
        href={path}>
        {as}
      </Link>
    </div>
  )
}

export default Nav
