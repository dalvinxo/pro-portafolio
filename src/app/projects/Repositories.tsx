'use client'

import HeadSection from '@common/HeadSection'
import { getDictionary } from '@utils/dictionaries'
import Link from 'next/link'
import { useTranslateContext } from 'providers'
import { FaExternalLinkAlt } from 'react-icons/fa'

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

  const { lang } = useTranslateContext()
  const translate = getDictionary(lang)

  return (
    <section className="w-full">
      <HeadSection title={translate.title.github} />
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-3">
        {data.map((item, indice) => (
          <li
            key={item.name + '_' + item.link + 'as-' + indice}
            className="relative border rounded-lg p-5 hover:-translate-y-1 transition-all duration-300
              dark:border-slate-700 border-slate-200
              dark:hover:bg-slate-800/50 hover:bg-slate-50
              shadow-md hover:shadow-lg">
            <Link
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="block h-full">
              <div className="flex flex-col h-full space-y-4">
                <h3 className="font-semibold text-lg truncate flex items-center space-x-2">
                  <span>{item.name}</span>
                  <FaExternalLinkAlt className="text-slate-500 dark:text-slate-400 text-sm" />
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 flex-grow">
                  {item.description ?? translate.title.descriptionGithub}
                </p>
                <div className="flex flex-wrap gap-2 text-sm">
                  {item.language.map((lg) => (
                    <div
                      key={lg + '-' + item.name}
                      className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                      <span
                        className={`h-3 w-3 rounded-full ${
                          color[lg] ?? 'bg-slate-400'
                        }`}
                      />
                      <span className="font-medium">{lg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Repositories
