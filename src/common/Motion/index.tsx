'use client'

import { motion, useReducedMotion, Variants } from 'framer-motion'

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT },
  },
}

type StaggerProps = {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'ul' | 'ol'
}

/** Reveals its StaggerItem children one after another. */
export const Stagger = ({ children, className, as = 'div' }: StaggerProps) => {
  const shouldReduceMotion = useReducedMotion()
  const Component = motion[as]

  return (
    <Component
      className={className}
      variants={containerVariants}
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="show">
      {children}
    </Component>
  )
}

type StaggerItemProps = {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'li'
}

export const StaggerItem = ({
  children,
  className,
  as = 'div',
}: StaggerItemProps) => {
  const Component = motion[as]

  return (
    <Component className={className} variants={itemVariants}>
      {children}
    </Component>
  )
}
