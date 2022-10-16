import Link from 'next/link'

type TypeNav = {
  isActive: boolean
  path: string
  as: string
}

const Nav = (props: TypeNav) => {
  const { isActive, path, as } = props

  const active = isActive
    ? 'text-cyan-500 bg-slate-900'
    : 'hover:bg-slate-700/30 hover:text-gray-50/75'

  return (
    <>
      <div className="inline-block">
        <Link href={path}>
          <a
            className={`block px-3 py-1 rounded-md transition-colors ease-in ${active}`}>
            {as}
          </a>
        </Link>
      </div>
    </>
  )
}

export default Nav
