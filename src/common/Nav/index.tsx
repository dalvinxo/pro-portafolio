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
        className={`block px-3 py-1 rounded-md transition-colors ease-in ${
          isActive
            ? 'dark:text-cyan-500 dark:bg-slate-900 text-white bg-slate-500 shadow-md'
            : 'dark:hover:text-cyan-500 hover:text-slate-600'
        } `}
        href={path}>
        {as}
      </Link>
    </div>
  )
}

export default Nav
