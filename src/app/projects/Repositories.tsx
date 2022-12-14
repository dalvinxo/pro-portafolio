'use client'

import HeadSection from '@common/HeadSection'
import Link from 'next/link'

type fetchData = {
  data: Array<{
    name: string
    link: string
    language: string[]
    description?: string
  }>
}

const Repositories = ({ data }: fetchData) => {
  const color = {
    TypeScript: 'bg-sky-600',
    JavaScript: 'bg-yellow-500',
    Shell: 'bg-gray-800',
    Dockerfile: 'bg-emerald-600',
    HTML: 'bg-violet-600',
    CSS: 'bg-orange-800',
    'C#': 'bg-green-300',
    PHP: 'bg-cyan-300',
    SCSS: 'bg-indigo-600',
  }

  return (
    <div>
      <HeadSection title="Github's Repositories" />
      <ol className="py-7 px-2 grid grid-row-3 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-3">
        {data.map((item, indice) => (
          <Link
            key={item.name + '_' + item.link + 'as-' + indice}
            href={item.link}
            target={'_blank'}
            className="border p-4 rounded-md shadow-md dark:hover:bg-slate-900/25 hover:bg-gray-300/80 border-slate-600 transition-all duration-5 00 hover:-translate-y-1.5 hover:shadow-lg">
            <li>
              <div className="flex flex-col space-y-4">
                <div>{item.name}</div>
                <div>
                  {item.description ??
                    'Este repositorio no tiene descripción en su contenido'}
                </div>
                <div className="text-md">
                  {item.language.map((lg) => (
                    <div
                      key={lg + '-' + item.link + '-as' + item.name}
                      className="inline-block">
                      <span
                        className={`inline-block h-3 w-3 rounded-full border border-neutral-500 ${
                          color[lg] ?? 'bg-slate-400'
                        } ml-1 mr-2`}></span>
                      <p className="inline-block mr-1">{lg}</p>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ol>
    </div>
  )
}

export default Repositories
