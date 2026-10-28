'use client'

import HeadSection from '@common/HeadSection'
import { Stagger, StaggerItem } from '@common/Motion'
import { getDictionary } from '@utils/dictionaries'
import { useTranslateContext } from 'providers'
import { IoArrowUp, IoLogoGithub } from 'react-icons/io5'

type RepositoryItem = {
  name: string
  link: string
  language: string[]
  description?: string | null
}

const languageTone: Record<string, string> = {
  TypeScript: 'bg-sky-500',
  JavaScript: 'bg-yellow-400',
  Shell: 'bg-slate-500',
  Dockerfile: 'bg-emerald-500',
  HTML: 'bg-orange-500',
  CSS: 'bg-blue-500',
  'C#': 'bg-green-500',
  PHP: 'bg-indigo-500',
  SCSS: 'bg-pink-500',
}

const MAX_LANGUAGES = 4

const Repositories = ({ data }: { data: RepositoryItem[] }) => {
  const { lang } = useTranslateContext()
  const translate = getDictionary(lang)

  return (
    <section>
      <HeadSection
        eyebrow={lang === 'en' ? 'Open source' : 'Código abierto'}
        title={translate.title.github}
        count={data.length}
        description={
          lang === 'en'
            ? 'A curated set of repositories with the languages and tooling used in each one.'
            : 'Una selección de repositorios con los lenguajes y herramientas usados en cada uno.'
        }
      />

      <Stagger
        as="ol"
        className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data.map((item) => {
          const languages = item.language.slice(0, MAX_LANGUAGES)
          const extraLanguages = item.language.length - languages.length

          return (
            <StaggerItem
              as="li"
              key={`${item.name}-${item.link}`}
              className="h-full">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white/80 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-accent/40">
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent-ink">
                    <IoLogoGithub className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <IoArrowUp
                    className="h-4 w-4 rotate-45 text-slate-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-5 truncate text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                  {item.name}
                  <span className="sr-only">
                    {lang === 'en'
                      ? ' (opens GitHub repository)'
                      : ' (abre el repositorio en GitHub)'}
                  </span>
                </h3>

                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {item.description ?? translate.title.descriptionGithub}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-200 pt-4 text-xs font-medium text-slate-600 dark:border-white/10 dark:text-slate-400">
                  {languages.length > 0 ? (
                    <>
                      {languages.map((language) => (
                        <span
                          key={`${item.name}-${language}`}
                          className="inline-flex items-center gap-1.5">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              languageTone[language] ?? 'bg-slate-400'
                            }`}
                            aria-hidden="true"
                          />
                          {language}
                        </span>
                      ))}
                      {extraLanguages > 0 && (
                        <span className="text-slate-400">
                          +{extraLanguages}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-slate-400 dark:text-slate-500">
                      {lang === 'en'
                        ? 'No languages detected'
                        : 'Sin lenguajes detectados'}
                    </span>
                  )}
                </div>
              </a>
            </StaggerItem>
          )
        })}
      </Stagger>
    </section>
  )
}

export default Repositories
