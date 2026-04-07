'use client'

import HeadSection from '@common/HeadSection'
import { getDictionary } from '@utils/dictionaries'
import Link from 'next/link'
import { useTranslateContext } from 'providers'
import { FaExternalLinkAlt } from 'react-icons/fa'

type RepositoryItem = {
  name: string
  link: string
  language: string[]
  description?: string | null
}

const languageTone: Record<string, string> = {
  TypeScript: 'bg-sky-500',
  JavaScript: 'bg-yellow-500',
  Shell: 'bg-slate-700',
  Dockerfile: 'bg-emerald-500',
  HTML: 'bg-orange-500',
  CSS: 'bg-blue-500',
  'C#': 'bg-green-500',
  PHP: 'bg-indigo-500',
  SCSS: 'bg-pink-500',
}

const Repositories = ({ data }: { data: RepositoryItem[] }) => {
  const { lang } = useTranslateContext()
  const translate = getDictionary(lang)

  return (
    <section className="space-y-8">
      <HeadSection title={translate.title.github} />

      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.55)] dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="mb-6 flex flex-col gap-2 border-b border-slate-200 pb-5 dark:border-slate-800">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
            {lang === 'en' ? 'Open source' : 'Codigo abierto'}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {lang === 'en'
              ? 'A curated set of repositories with the languages and tooling used in each one.'
              : 'Una seleccion de repositorios con los lenguajes y herramientas usados en cada uno.'}
          </p>
        </div>

        <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.map((item) => (
            <li key={`${item.name}-${item.link}`}>
              <Link
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-[1.5rem] border border-slate-200 bg-slate-50/60 p-5 transition-colors hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700 dark:hover:bg-slate-900"
                aria-label={`${item.name} repository`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                      Repository
                    </p>
                    <h3 className="mt-2 truncate text-lg font-semibold text-slate-900 dark:text-slate-50">
                      {item.name}
                    </h3>
                  </div>

                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors group-hover:border-slate-300 group-hover:text-slate-900 dark:border-slate-800 dark:text-slate-400 dark:group-hover:border-slate-700 dark:group-hover:text-slate-100">
                    <FaExternalLinkAlt
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>

                <p className="mt-4 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {item.description ?? translate.title.descriptionGithub}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.language.length > 0 ? (
                    item.language.map((language) => (
                      <span
                        key={`${item.name}-${language}`}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            languageTone[language] ?? 'bg-slate-400'
                          }`}
                          aria-hidden="true"
                        />
                        <span>{language}</span>
                      </span>
                    ))
                  ) : (
                    <span className="inline-flex rounded-full border border-dashed border-slate-200 px-3 py-1.5 text-xs text-slate-400 dark:border-slate-800 dark:text-slate-500">
                      {lang === 'en'
                        ? 'No languages detected'
                        : 'Sin lenguajes detectados'}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Repositories
