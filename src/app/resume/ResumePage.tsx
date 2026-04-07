'use client'

import Link from 'next/link'
import { FiArrowUpRight, FiDownload } from 'react-icons/fi'

import HeadSection from '@common/HeadSection'
import { getDictionary } from '@utils/dictionaries'
import {
  getResumeContent,
  ResumeCertificateItem,
  ResumeSocialLink,
} from '../../content/resume'
import { useTranslateContext } from '../../context/TranslateProviders'

const ResumePage = ({
  socialLinks,
  certificates,
}: {
  socialLinks: ResumeSocialLink[]
  certificates: ResumeCertificateItem[]
}) => {
  const { lang } = useTranslateContext()
  const translate = getDictionary(lang)
  const content = getResumeContent(lang, socialLinks)
  const printableHref = `/api/resume?lang=${lang}&v=${encodeURIComponent(
    content.pageTitle
  )}`

  return (
    <section className="space-y-8">
      <HeadSection title={translate.title.resume} />

      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.55)] dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 dark:border-slate-800 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.28em] text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
              {content.eyebrow}
            </span>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
                {content.name}
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                {content.summary}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href={printableHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-900 bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700 dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300">
              <FiDownload className="h-4 w-4" />
              <span>{content.printAction}</span>
            </Link>
            <p className="max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
              {content.printHint}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[1.5rem] border border-slate-200 p-5 dark:border-slate-800">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
              {content.professionalSummaryLabel}
            </p>
            <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-200">
              {content.summary}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                  {content.currentPositionLabel}
                </p>
                <p className="mt-3 text-sm font-medium text-slate-900 dark:text-slate-50">
                  {content.currentPosition}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                  {content.contactLabel}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {content.contactNote}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-slate-200 p-5 dark:border-slate-800">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              {content.contactLabel}
            </h2>
            <div className="mt-4 grid gap-3">
              {content.socialLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-950">
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {link.name}
                  </span>
                  <FiArrowUpRight className="h-4 w-4 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-2">
          <section className="rounded-[1.5rem] border border-slate-200 p-5 dark:border-slate-800">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              {content.educationTitle}
            </h2>
            <div className="mt-4 grid gap-4">
              {content.education.map((item) => (
                <article
                  key={`${item.institution}-${item.period}`}
                  className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                    {item.period}
                  </p>
                  <h3 className="mt-3 text-base font-semibold text-slate-900 dark:text-slate-50">
                    {item.institution}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {item.details}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-slate-200 p-5 dark:border-slate-800">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              {content.softSkillsTitle}
            </h2>
            <ul className="mt-4 grid gap-3">
              {content.softSkills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-600 dark:bg-slate-950 dark:text-slate-300">
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-5 rounded-[1.5rem] border border-slate-200 p-5 dark:border-slate-800">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            {content.technicalSkillsTitle}
          </h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {content.technicalSkills.map((group) => (
              <article
                key={group.group}
                className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {group.group}
                </h3>
                <div className="mt-4 grid gap-4">
                  {group.items.map((item) => (
                    <div key={item.name} className="space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {item.name}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {item.level}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                        <div
                          className="h-full rounded-full bg-slate-900 dark:bg-slate-100"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-5 grid gap-5">
          <section className="rounded-[1.5rem] border border-slate-200 p-5 dark:border-slate-800">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              {content.certificatesTitle}
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {certificates.map((certificate) => (
                <span
                  key={certificate.id}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                  {certificate.title}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-slate-200 p-5 dark:border-slate-800">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              {content.experienceTitle}
            </h2>
            <div className="mt-4 grid gap-4">
              {content.experience.map((item) => (
                <article
                  key={`${item.institution}-${item.period}`}
                  className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                    {item.period}
                  </p>
                  <h3 className="mt-3 text-base font-semibold text-slate-900 dark:text-slate-50">
                    {item.position}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {item.institution}
                  </p>
                  <ul className="mt-4 grid gap-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {item.responsibilities.map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-slate-200 p-5 dark:border-slate-800">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              {content.additionalTitle}
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {content.additional.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export default ResumePage
