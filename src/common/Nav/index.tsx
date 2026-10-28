'use client'

import { motion } from 'framer-motion'
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
    base: 'relative rounded-full px-3.5 py-1.5 text-sm',
    active: 'text-slate-900 dark:text-white',
    idle: 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
  },
  block: {
    base: 'flex w-full items-center justify-between rounded-2xl px-4 py-3 text-base',
    active: 'bg-accent/10 text-accent-ink',
    idle: 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5',
  },
}

const Nav = (props: TypeNav) => {
  const { isActive, path, as, onNavigate, variant = 'pill' } = props
  const styles = variantClassName[variant]

  return (
    <Link
      className={`block font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        styles.base
      } ${isActive ? styles.active : styles.idle}`}
      aria-current={isActive ? 'page' : undefined}
      onClick={onNavigate}
      href={path}>
      {variant === 'pill' && isActive && (
        <motion.span
          layoutId="nav-active-pill"
          aria-hidden="true"
          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
          className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-slate-900/5 dark:bg-white/10 dark:ring-white/10">
          <span className="absolute -bottom-px left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-accent" />
        </motion.span>
      )}
      <span className="relative">{as}</span>
      {variant === 'block' && isActive && (
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
      )}
    </Link>
  )
}

export default Nav
