'use client'

import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'

import HeadSection from '@common/HeadSection'
import { getDictionary } from '@utils/dictionaries'
import { useTranslateContext } from 'providers'
import Project from './Project'

type ProjectFilter = 'all' | 'done' | 'doing'

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: 'easeOut',
    },
  },
}

const Portafolies = ({ proyects }: { proyects: TypeProyects[] }) => {
  const [filter, setFilter] = useState<ProjectFilter>('all')
  const { lang } = useTranslateContext()
  const translate = getDictionary(lang)

  const filterProject = useMemo(() => {
    return proyects.filter((proyect) => {
      if (filter === 'done') {
        return proyect.state === true
      }

      if (filter === 'doing') {
        return proyect.state === false
      }

      return true
    })
  }, [filter, proyects])

  const filterOptions: Array<{
    key: ProjectFilter
    label: string
    tone?: 'default' | 'success' | 'warning'
  }> = [
    { key: 'all', label: translate.project.status.all },
    { key: 'done', label: translate.project.status.done, tone: 'success' },
    { key: 'doing', label: translate.project.status.do, tone: 'warning' },
  ]

  return (
    <section className="space-y-8">
      <HeadSection title={translate.title.app} />

      <div className="space-y-6 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.55)] dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
              {lang === 'en' ? 'Selected work' : 'Trabajo seleccionado'}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {lang === 'en'
                ? 'A concise view of projects in progress and completed launches.'
                : 'Una vista breve de proyectos en proceso y lanzamientos completados.'}
            </p>
          </div>

          <nav
            className="flex flex-wrap gap-2"
            aria-label={lang === 'en' ? 'Project filters' : 'Filtros de proyectos'}
          >
            {filterOptions.map((option) => (
              <FilterButton
                key={option.key}
                isActive={filter === option.key}
                onClick={() => setFilter(option.key)}
                tone={option.tone ?? 'default'}
              >
                {option.label}
              </FilterButton>
            ))}
          </nav>
        </div>

        {filterProject.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-14 text-center dark:border-slate-800">
            <p className="text-base text-slate-500 dark:text-slate-400">
              {translate.project.emptyApp}
            </p>
          </div>
        ) : (
          <motion.ol
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="grid gap-4"
          >
            {filterProject.map((proyect, index) => (
              <motion.li
                key={`${proyect.name ?? 'project'}-${index}`}
                variants={itemVariants}
              >
                <Project proyect={proyect} />
              </motion.li>
            ))}
          </motion.ol>
        )}
      </div>
    </section>
  )
}

interface FilterButtonProps {
  children: React.ReactNode
  isActive: boolean
  onClick: () => void
  tone: 'default' | 'success' | 'warning'
}

const FilterButton = ({
  children,
  isActive,
  onClick,
  tone,
}: FilterButtonProps) => {
  const toneClassName = {
    default: isActive
      ? 'border-slate-300 bg-slate-900 text-white dark:border-slate-700 dark:bg-slate-100 dark:text-slate-900'
      : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800',
    success: isActive
      ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-500/10 dark:text-emerald-300'
      : 'border-slate-200 text-slate-600 hover:border-emerald-200 hover:text-emerald-700 dark:border-slate-800 dark:text-slate-300 dark:hover:border-emerald-900/60 dark:hover:text-emerald-300',
    warning: isActive
      ? 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-500/10 dark:text-amber-300'
      : 'border-slate-200 text-slate-600 hover:border-amber-200 hover:text-amber-700 dark:border-slate-800 dark:text-slate-300 dark:hover:border-amber-900/60 dark:hover:text-amber-300',
  }

  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${toneClassName[tone]}`}
    >
      {children}
    </button>
  )
}

export default Portafolies
