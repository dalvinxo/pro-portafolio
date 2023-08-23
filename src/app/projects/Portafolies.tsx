'use client'

import HeadSection from '@common/HeadSection'
import { getDictionary } from '@utils/dictionaries'
import { useTranslateContext } from 'providers'
import Project from './Project'

const Portafoly = ({ proyects }: { proyects: Array<TypeProyects> }) => {
  const { lang } = useTranslateContext()
  const translate = getDictionary(lang)

  return (
    <div>
      <HeadSection title={translate.title.app} />
      <menu className="my-7 space-y-3 watch:my-2">
        {proyects.map((proyect) => (
          <Project key={proyect.name} proyect={proyect} />
        ))}
      </menu>
    </div>
  )
}

export default Portafoly
