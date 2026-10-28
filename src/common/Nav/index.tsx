import Link from 'next/link'

type TypeNav = {
  isActive: boolean
  path: string
  as: string
  onNavigate?: () => void
  variant?: 'pill' | 'block'
}

const variantClassName = {
  pill: {
    base: 'rounded-full px-3.5 py-1.5 text-sm',
    active:
      'bg-white text-slate-900 shadow-sm ring-1 ring-slate-900/5 dark:bg-white/10 dark:text-white dark:ring-white/10',
    idle: 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
  },
  block: {
    base: 'flex w-full items-center justify-between rounded-2xl px-4 py-3 text-base',
    active: 'bg-slate-900 text-white dark:bg-white dark:text-slate-900',
    idle: 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5',
  },
}

const Nav = (props: TypeNav) => {
  const { isActive, path, as, onNavigate, variant = 'pill' } = props
  const styles = variantClassName[variant]

  return (
    <Link
      className={`block font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
        styles.base
      } ${isActive ? styles.active : styles.idle}`}
      aria-current={isActive ? 'page' : undefined}
      onClick={onNavigate}
      href={path}>
      {as}
    </Link>
  )
}

export default Nav
