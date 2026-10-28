'use client'

import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'

import HeadSection from '@common/HeadSection'
import { Stagger, StaggerItem } from '@common/Motion'
import { getDictionary } from '@utils/dictionaries'
import { useTranslateContext } from 'providers'
import Project from './Project'

type ProjectFilter = 'all' | 'done' | 'doing'

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

  const filterOptions: Array<{ key: ProjectFilter; label: string }> = [
    { key: 'all', label: translate.project.status.all },
    { key: 'done', label: translate.project.status.done },
    { key: 'doing', label: translate.project.status.do },
  ]

  return (
    <section>
      <HeadSection
        eyebrow={lang === 'en' ? 'Selected work' : 'Trabajo seleccionado'}
        title={translate.title.app}
        count={proyects.length}
        description={
          lang === 'en'
            ? 'Projects in progress and completed launches, with live previews and source code.'
            : 'Proyectos en proceso y lanzamientos completados, con vista previa y código fuente.'
        }>
        <div
          role="group"
          aria-label={lang === 'en' ? 'Filter projects' : 'Filtrar proyectos'}
          className="inline-flex w-fit gap-1 rounded-full border border-slate-200 bg-white/70 p-1 backdrop-blur dark:border-white/10 dark:bg-white/[0.03]">
          {filterOptions.map((option) => {
            const isActive = filter === option.key

            return (
              <button
                key={option.key}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFilter(option.key)}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isActive
                    ? 'text-white dark:text-slate-900'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}>
                {isActive && (
                  <motion.span
                    layoutId="project-filter"
                    aria-hidden="true"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-full bg-slate-900 dark:bg-white"
                  />
                )}
                <span className="relative">{option.label}</span>
              </button>
            )
          })}
        </div>
      </HeadSection>

      {filterProject.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 px-6 py-16 text-center dark:border-white/10">
          <p className="text-base text-slate-500 dark:text-slate-400">
            {translate.project.emptyApp}
          </p>
        </div>
      ) : (
        <Stagger key={filter} as="ol" className="grid gap-4 md:grid-cols-2">
          {filterProject.map((proyect, index) => (
            <StaggerItem
              as="li"
              key={`${proyect.name ?? 'project'}-${index}`}
              className="h-full">
              <Project proyect={proyect} index={index} />
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </section>
  )
}

export default Portafolies
