'use client'

import { motion } from 'framer-motion'

import HeadSection from '@common/HeadSection'
import { getDictionary } from '@utils/dictionaries'
import { useTranslateContext } from 'providers'
import { useState } from 'react'
import Project from './Project'

const variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const variantsItems = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
    },
  },
}

const Portafoly = ({ proyects }: { proyects: Array<TypeProyects> }) => {
  const [filter, setFilter] = useState<string>('all')

  const { lang } = useTranslateContext()
  const translate = getDictionary(lang)

  const handlerFilter: (filter: string) => void = (filter) => {
    setFilter(filter)
  }

  const filterProject: Array<TypeProyects> = proyects.filter((proyect) => {
    return filter == 'done'
      ? proyect.state == true
      : filter == 'doing'
      ? proyect.state == false
      : true
  })

  return (
    <section className="w-full">
      <HeadSection title={translate.title.app} />
      <motion.article
        initial="hidden"
        animate="show"
        variants={variants}
        className="space-y-8">
        {Array.isArray(filterProject) && filterProject.length == 0 ? (
          <h3 className="text-center text-lg py-12 text-slate-500 dark:text-slate-400">
            {translate.project.emptyApp}
          </h3>
        ) : (
          <div className="space-y-8">
            <nav className="flex justify-center" aria-label="Filter projects">
              <div className="inline-flex items-center gap-2 p-1.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/50 backdrop-blur-sm">
                <FilterButton
                  isActive={filter === 'all'}
                  onClick={() => handlerFilter('all')}>
                  {translate.project.status.all}
                </FilterButton>
                <FilterButton
                  isActive={filter === 'done'}
                  onClick={() => handlerFilter('done')}
                  activeClassName="text-emerald-600 dark:text-emerald-400">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    {translate.project.status.done}
                  </span>
                </FilterButton>
                <FilterButton
                  isActive={filter === 'doing'}
                  onClick={() => handlerFilter('doing')}
                  activeClassName="text-amber-600 dark:text-amber-400">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    {translate.project.status.do}
                  </span>
                </FilterButton>
              </div>
            </nav>

            <menu className="space-y-4">
              {filterProject.map((proyect) => (
                <motion.div
                  key={proyect.name}
                  variants={variantsItems}
                  className="transform-gpu">
                  <Project proyect={proyect} />
                </motion.div>
              ))}
            </menu>
          </div>
        )}
      </motion.article>
    </section>
  )
}

interface FilterButtonProps {
  children: React.ReactNode
  isActive: boolean
  onClick: () => void
  activeClassName?: string
}

const FilterButton = ({
  children,
  isActive,
  onClick,
  activeClassName = '',
}: FilterButtonProps) => {
  return (
    <button
      className={`
        px-4 py-2 rounded-lg text-sm font-medium
        transition-all duration-200
        ${
          isActive
            ? `bg-white dark:bg-slate-700 shadow-sm ${activeClassName}`
            : 'hover:bg-white/60 dark:hover:bg-slate-700/60'
        }
      `}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default Portafoly
