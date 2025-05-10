'use client'

import { useTranslateContext } from 'providers'
import { getDictionary } from '@utils/dictionaries'
import Image from 'next/image'
import Link from 'next/link'
import { FaExternalLinkAlt } from 'react-icons/fa'

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

  return (
    <article
      className="group relative bg-white dark:bg-slate-800/30 rounded-xl 
                  border border-slate-200 dark:border-slate-700/50 
                  shadow-sm hover:shadow-lg transition-transform duration-300 
                  hover:-translate-y-1 overflow-hidden">
      <div className="aspect-video relative overflow-hidden rounded-t-xl">
        {certificate.previewUrl ? (
          <Image
            src={certificate.previewUrl}
            alt={certificate.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={90}
            priority
          />
        ) : (
          <div
            className="w-full h-full bg-slate-100 dark:bg-slate-700/30 
                flex items-center justify-center">
            <span className="text-slate-400 dark:text-slate-500 text-center">
              {translate.certificates.noPreview}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        <h3 className="font-semibold text-lg line-clamp-2 text-center">
          {certificate.title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 text-justify">
          {description}
        </p>

        <div className="space-y-2 text-sm">
          <p className="flex items-center justify-between">
            <span className="font-medium">{translate.certificates.type}:</span>
            <span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700">
              {certificate.type}
            </span>
          </p>

          <p className="flex items-center justify-between">
            <span className="font-medium">
              {translate.certificates.completed}:
            </span>
            <span>{formatDate(certificate.completionDate)}</span>
          </p>

          {certificate.expiryDate && (
            <p className="flex items-center justify-between">
              <span className="font-medium">
                {translate.certificates.expires}:
              </span>
              <span>{formatDate(certificate.expiryDate)}</span>
            </p>
          )}
        </div>

        {certificate.certificateUrl && (
          <div className="text-center">
            <Link
              href={certificate.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sky-500 hover:text-sky-600 
                 dark:text-sky-400 dark:hover:text-sky-300 font-medium">
              <span>{translate.certificates.viewCertificate}</span>
              <FaExternalLinkAlt className="text-sm" />
            </Link>
          </div>
        )}
      </div>
    </article>
  )
}
