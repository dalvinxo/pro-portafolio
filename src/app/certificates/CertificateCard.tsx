'use client'

import { useTranslateContext } from 'providers'
import { getDictionary } from '@utils/dictionaries'
import { FaCertificate, FaExternalLinkAlt, FaGlobe } from 'react-icons/fa'

type CertificateCardProps = {
  certificate: TypeCertificates
  onViewAction: (fileId: string) => void
}

export default function CertificateCard({ certificate, onViewAction }: CertificateCardProps) {
  const { lang } = useTranslateContext()
  const translate = getDictionary(lang)
  const actionLabels = {
    viewDrive: translate.certificates.viewCertificate,
    openOnline: translate.certificates.openCourse,
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(
      lang === 'en' ? 'en-US' : 'es-ES',
      {
        year: 'numeric',
        month: 'long',
      }
    )
  }

  const description =
    lang === 'en' ? certificate.description : certificate.descriptionSpanish

  const type = lang === 'en' ? certificate.type : certificate.typeSpanish

  return (
    <article
      className="group relative bg-gradient-to-br from-white to-slate-50 
                dark:from-slate-800 dark:to-slate-900/90 rounded-xl 
                border border-slate-200 dark:border-slate-700/50 
                shadow-sm hover:shadow-xl transition-all duration-300 
                hover:-translate-y-1 h-full flex flex-col">
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 flex flex-col flex-1">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
          <div className="p-2 sm:p-3 bg-sky-100 dark:bg-sky-900/30 rounded-lg shrink-0">
            <FaCertificate
              className="text-xl sm:text-2xl text-sky-500 dark:text-sky-400 
              group-hover:rotate-12 transition-transform duration-300"
            />
          </div>
          <h3
            className="font-semibold text-base sm:text-lg group-hover:text-sky-500 
            dark:group-hover:text-sky-400 transition-colors duration-300 line-clamp-2">
            {certificate.title}
          </h3>
        </div>

        <div className="flex-1">
          <p
            className="text-sm text-slate-600 dark:text-slate-400 
            leading-relaxed line-clamp-3 sm:line-clamp-4">
            {description}
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <div
            className="flex items-center justify-between py-2 border-b 
            border-slate-200 dark:border-slate-700/50 gap-4">
            <span className="font-medium whitespace-nowrap">
              {translate.certificates.type}
            </span>
            <span
              className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium
              bg-slate-100 dark:bg-slate-700 text-sky-600 dark:text-sky-400 truncate">
              {type}
            </span>
          </div>

          <div
            className="flex items-center justify-between py-2 border-b 
            border-slate-200 dark:border-slate-700/50 gap-4">
            <span className="font-medium whitespace-nowrap">
              {translate.certificates.completed}
            </span>
            <span className="text-slate-600 dark:text-slate-400 text-right">
              {formatDate(certificate.completionDate)}
            </span>
          </div>

          {certificate.expiryDate && (
            <div
              className="flex items-center justify-between py-2 border-b 
              border-slate-200 dark:border-slate-700/50 gap-4">
              <span className="font-medium whitespace-nowrap">
                {translate.certificates.expires}
              </span>
              <span className="text-slate-600 dark:text-slate-400 text-right">
                {formatDate(certificate.expiryDate)}
              </span>
            </div>
          )}
        </div>

        {(certificate.driveFileId || certificate.certificateUrl) && (
          <div className="mt-auto grid gap-3 pt-2 sm:pt-4">
            {certificate.driveFileId && (
              <button
                type="button"
                onClick={() => {
                  onViewAction(certificate.driveFileId)
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-sky-500 px-4 py-2.5 font-medium text-white transition-all duration-300 hover:bg-sky-600 group-hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="text-sm">{actionLabels.viewDrive}</span>
                <FaExternalLinkAlt className="text-xs sm:text-sm" />
              </button>
            )}

            {certificate.certificateUrl && (
              <a
                href={certificate.certificateUrl}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 font-medium text-slate-700 transition-all duration-300 hover:border-sky-300 hover:text-sky-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-sky-500 dark:hover:text-sky-400"
              >
                <span className="text-sm">{actionLabels.openOnline}</span>
                <FaGlobe className="text-sm" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}