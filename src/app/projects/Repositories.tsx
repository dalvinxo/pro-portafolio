'use client'

import HeadSection from '@common/HeadSection'

type fetchData = {
  data: Array<{
    name: string
    link: string
    language: string[]
    description?: string
  }>
}

const Repositories = ({ data }: fetchData) => {
  return (
    <div>
      <HeadSection title="Repositories Github" />
      <ol className="py-7 px-2 grid grid-row-3 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-3">
        {data.map((item) => (
          <li
            key={item.name + '_' + item.link}
            className="border p-4 rounded-md shadow-md hover:bg-slate-900/25 border-slate-600 hover:-translate-y-1.5 hover:shadow-lg">
            <div className="flex flex-col space-y-4">
              <a href={item.link}>{item.name}</a>
              <div>
                {item.description ??
                  'Este repositorio no tiene descripción en su contenido'}
              </div>
              <div>{item.language.join(' ')}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Repositories
