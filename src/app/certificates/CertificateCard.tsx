'use client'

import { useTranslateContext } from 'providers'
import { getDictionary } from '@utils/dictionaries'
import Link from 'next/link'
import { FaExternalLinkAlt, FaCertificate } from 'react-icons/fa'

type CertificateCardProps = {
  certificate: TypeCertificates
}

export default function CertificateCard({ certificate }: CertificateCardProps) {
  const { lang } = useTranslateContext()
  const translate = getDictionary(lang)

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
                hover:-translate-y-1 overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-sky-100 dark:bg-sky-900/30 rounded-lg">
            <FaCertificate
              className="text-2xl text-sky-500 dark:text-sky-400 
              group-hover:rotate-12 transition-transform duration-300"
            />
          </div>
          <h3
            className="font-semibold text-lg group-hover:text-sky-500 
            dark:group-hover:text-sky-400 transition-colors duration-300">
            {certificate.title}
          </h3>
        </div>

        <div className="relative">
          <p
            className="text-sm text-slate-600 dark:text-slate-400 
            leading-relaxed text-justify">
            {description}
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <div
            className="flex items-center justify-between py-2 border-b 
            border-slate-200 dark:border-slate-700/50">
            <span className="font-medium">{translate.certificates.type}</span>
            <span
              className="px-3 py-1 rounded-full text-xs font-medium
              bg-slate-100 dark:bg-slate-700 text-sky-600 dark:text-sky-400">
              {type}
            </span>
          </div>

          <div
            className="flex items-center justify-between py-2 border-b 
            border-slate-200 dark:border-slate-700/50">
            <span className="font-medium">
              {translate.certificates.completed}
            </span>
            <span className="text-slate-600 dark:text-slate-400">
              {formatDate(certificate.completionDate)}
            </span>
          </div>

          {certificate.expiryDate && (
            <div
              className="flex items-center justify-between py-2 border-b 
              border-slate-200 dark:border-slate-700/50">
              <span className="font-medium">
                {translate.certificates.expires}
              </span>
              <span className="text-slate-600 dark:text-slate-400">
                {formatDate(certificate.expiryDate)}
              </span>
            </div>
          )}
        </div>

        {certificate.certificateUrl && (
          <div className="pt-4 mt-auto">
            <Link
              href={certificate.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 px-4
                bg-sky-500/10 hover:bg-sky-500/20 dark:bg-sky-400/10 
                dark:hover:bg-sky-400/20 rounded-lg text-sky-600 
                dark:text-sky-400 font-medium transition-all duration-300 
                group-hover:scale-105">
              <span>{translate.certificates.viewCertificate}</span>
              <FaExternalLinkAlt className="text-sm" />
            </Link>
          </div>
        )}
      </div>
    </article>
  )
}
