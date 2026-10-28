'use client'

import { useTranslateContext } from 'providers'
import { getDictionary } from '@utils/dictionaries'
import {
  IoArrowUp,
  IoCalendarClearOutline,
  IoEyeOutline,
  IoRibbonOutline,
  IoTimeOutline,
} from 'react-icons/io5'

type CertificateCardProps = {
  certificate: TypeCertificates
  onViewAction: (fileId: string) => void
}

export default function CertificateCard({
  certificate,
  onViewAction,
}: CertificateCardProps) {
  const { lang } = useTranslateContext()
  const translate = getDictionary(lang)

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(
      lang === 'en' ? 'en-US' : 'es-ES',
      {
        year: 'numeric',
        month: 'short',
      }
    )
  }

  const description =
    lang === 'en' ? certificate.description : certificate.descriptionSpanish

  const type = lang === 'en' ? certificate.type : certificate.typeSpanish

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-accent/40">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/15 to-accent-2/15 text-accent-ink">
          <IoRibbonOutline className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="truncate rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-white/10 dark:text-slate-300">
          {type}
        </span>
      </div>

      <h3 className="mt-5 line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-slate-900 dark:text-white">
        {certificate.title}
      </h3>

      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {description}
      </p>

      <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
        <div className="inline-flex items-center gap-1.5">
          <IoCalendarClearOutline className="h-3.5 w-3.5" aria-hidden="true" />
          <dt className="sr-only">{translate.certificates.completed}</dt>
          <dd>
            <time dateTime={certificate.completionDate}>
              {formatDate(certificate.completionDate)}
            </time>
          </dd>
        </div>
        {certificate.expiryDate && (
          <div className="inline-flex items-center gap-1.5">
            <IoTimeOutline className="h-3.5 w-3.5" aria-hidden="true" />
            <dt>{translate.certificates.expires}</dt>
            <dd>
              <time dateTime={certificate.expiryDate}>
                {formatDate(certificate.expiryDate)}
              </time>
            </dd>
          </div>
        )}
      </dl>

      {(certificate.driveFileId || certificate.certificateUrl) && (
        <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-200 pt-5 dark:border-white/10">
          {certificate.driveFileId && (
            <button
              type="button"
              onClick={() => onViewAction(certificate.driveFileId)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent-solid px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-solid/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950">
              <IoEyeOutline className="h-4 w-4" aria-hidden="true" />
              {translate.certificates.viewCertificate}
            </button>
          )}

          {certificate.certificateUrl && (
            <a
              href={certificate.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:border-white/10 dark:text-slate-200 dark:hover:border-white/20 dark:hover:bg-white/5">
              {translate.certificates.openCourse}
              <IoArrowUp
                className="h-3.5 w-3.5 rotate-45 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          )}
        </div>
      )}
    </article>
  )
}
