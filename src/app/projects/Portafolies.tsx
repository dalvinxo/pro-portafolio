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
    <section>
      <HeadSection title={translate.title.app} />
      <motion.article initial="hidden" animate="show" variants={variants}>
        {Array.isArray(filterProject) && filterProject.length == 0 ? (
          <h3 className="text-center text-lg my-5 font-normal text-neutral-300">
            {translate.Project.emptyApp}
          </h3>
        ) : (
          <div>
            <div>
              <div className="flex flex-row justify-center space-x-4 mt-4">
                <button
                  className={`text-lg ${filter == 'all' && 'font-bold'} `}
                  onClick={() => handlerFilter('all')}>
                  {translate.Project.status.all}
                </button>
                <button
                  className={`text-lg ${
                    filter == 'done' && 'font-bold text-emerald-600/75'
                  }`}
                  onClick={() => handlerFilter('done')}>
                  {translate.Project.status.done}
                </button>
                <button
                  className={`text-lg ${
                    filter == 'doing' && 'font-bold text-red-500/80'
                  }`}
                  onClick={() => handlerFilter('doing')}>
                  {translate.Project.status.do}
                </button>
              </div>
            </div>
            <menu className="my-7 space-y-3 watch:my-2">
              {filterProject.map((proyect) => (
                <motion.div key={proyect.name} variants={variantsItems}>
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

export default Portafoly
