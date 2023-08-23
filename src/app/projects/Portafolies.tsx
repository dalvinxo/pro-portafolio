'use client'

import HeadSection from '@common/HeadSection'
import { getDictionary } from '@utils/dictionaries'
import { useTranslateContext } from 'providers'
import { useState } from 'react'
import Project from './Project'

const Portafoly = ({ proyects }: { proyects: Array<TypeProyects> }) => {
  const [filter, setFilter] = useState<string>('all')

  const { lang } = useTranslateContext()
  const translate = getDictionary(lang)

  const handlerFilter: (filter: string) => void = (filter) => {
    setFilter(filter)
  }

  const filterProject: (state: string) => Array<TypeProyects> = (state) =>
    proyects.filter((proyect) => {
      return state == 'done'
        ? proyect.state == true
        : state == 'doing'
        ? proyect.state == false
        : true
    })

  return (
    <section>
      <HeadSection title={translate.title.app} />
      <div>
        <div className="flex flex-row justify-center space-x-4 mt-4">
          <button
            className={`text-lg ${filter == 'all' && 'font-bold'} `}
            onClick={() => handlerFilter('all')}>
            All
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
        {filterProject(filter).map((proyect) => (
          <Project key={proyect.name} proyect={proyect} />
        ))}
      </menu>
    </section>
  )
}

export default Portafoly
