'use client'

import { useEffect, useMemo, useState } from 'react'
import React from 'react'
import { useTranslateContext } from 'providers'
import { getDictionary } from '@utils/dictionaries'
import HeadSection from '@common/HeadSection'
import CertificateCard from './CertificateCard'

type Certificate = TypeCertificates
type PreviewKind = 'pdf' | 'image' | 'unknown'

export default function Certificate({
  certificates,
}: {
  certificates: Certificate[]
}) {
  const { lang } = useTranslateContext()
  const translate = getDictionary(lang)

  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasPreviewError, setHasPreviewError] = useState(false)
  const [previewKind, setPreviewKind] = useState<PreviewKind>('unknown')
  const [previewRequestId, setPreviewRequestId] = useState<number | null>(null)

  const documentUrl = useMemo(() => {
    if (!selectedFileId) {
      return null
    }

    const searchParams = new URLSearchParams()

    if (previewRequestId) {
      searchParams.set('v', String(previewRequestId))
    }

    const queryString = searchParams.toString()

    return queryString
      ? `/api/certificate/${selectedFileId}?${queryString}`
      : `/api/certificate/${selectedFileId}`
  }, [previewRequestId, selectedFileId])

  useEffect(() => {
    if (!isModalOpen || !selectedFileId) {
      setIsLoading(false)
      setHasPreviewError(false)
      setPreviewKind('unknown')
      return
    }

    setIsLoading(true)
    setHasPreviewError(false)
    setPreviewKind('unknown')
  }, [isModalOpen, selectedFileId])

  useEffect(() => {
    if (!documentUrl || !isModalOpen) {
      return
    }

    let isActive = true

    const resolvePreviewKind = async () => {
      try {
        const response = await fetch(documentUrl, {
          method: 'HEAD',
          cache: 'no-store',
        })
        const contentType = response.headers.get('content-type')?.toLowerCase() ?? ''

        if (!isActive) {
          return
        }

        if (contentType.includes('pdf')) {
          setPreviewKind('pdf')
          return
        }

        if (contentType.startsWith('image/')) {
          setPreviewKind('image')
          return
        }

        setPreviewKind('unknown')
      } catch (error) {
        if (isActive) {
          setPreviewKind('unknown')
        }
      }
    }

    resolvePreviewKind()

    return () => {
      isActive = false
    }
  }, [documentUrl, isModalOpen])

  const openModal = (fileId: string) => {
    setSelectedFileId(fileId)
    setHasPreviewError(false)
    setIsLoading(true)
    setPreviewKind('unknown')
    setPreviewRequestId(Date.now())
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedFileId(null)
    setHasPreviewError(false)
    setIsLoading(false)
    setPreviewKind('unknown')
    setPreviewRequestId(null)
  }

  const allOptionLabel = useMemo(() => (lang === 'en' ? 'All' : 'Todos'), [lang])

  const certificateTypes = useMemo(() => {
    const types = new Set(
      certificates.map((cert) => (lang === 'en' ? cert.type : cert.typeSpanish))
    )

    return [allOptionLabel, ...Array.from(types)]
  }, [certificates, lang, allOptionLabel])

  const [selectedType, setSelectedType] = useState<string>(allOptionLabel)

  useEffect(() => {
    setSelectedType(allOptionLabel)
  }, [allOptionLabel])

  const filteredCertificates = useMemo(() => {
    return certificates.filter((cert) => {
      const normalizedSearch = search.toLowerCase()
      const matchesSearch =
        cert.title.toLowerCase().includes(normalizedSearch) ||
        cert.description.toLowerCase().includes(normalizedSearch)
      const matchesType =
        selectedType === allOptionLabel ||
        cert.type === selectedType ||
        cert.typeSpanish === selectedType

      return matchesSearch && matchesType
    })
  }, [certificates, search, selectedType, allOptionLabel])

  return (
    <React.Fragment>
      <section className="space-y-8">
        <HeadSection title={translate.title.certificates} />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md flex-1">
            <input
              type="search"
              placeholder={translate.certificates.searchPlaceholder}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-800"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {certificateTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${selectedType === type
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCertificates.map((certificate) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              onViewAction={openModal}
            />
          ))}
        </div>

        {filteredCertificates.length === 0 && (
          <p className="py-8 text-center text-slate-500 dark:text-slate-400">
            {translate.certificates.noCertificatesFound}
          </p>
        )}
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-xl bg-white dark:bg-slate-800">
            <button
              type="button"
              onClick={closeModal}
              aria-label={
                lang === 'en'
                  ? 'Close certificate preview'
                  : 'Cerrar vista previa del certificado'
              }
              className="absolute text-xl right-2 top-2 px-3 py-1 z-10 rounded-md bg-slate-200 transition-colors hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600"
            >
              x
            </button>

            <div className="h-[80vh] w-full">
              {documentUrl ? (
                <div className="relative h-full w-full">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-slate-800/90">
                      <div className="text-slate-500 dark:text-slate-400">
                        {lang === 'en' ? 'Loading certificate...' : 'Cargando certificado...'}
                      </div>
                    </div>
                  )}

                  {hasPreviewError ? (
                    <div className="flex h-full items-center justify-center px-6 text-center">
                      <div className="text-red-500">
                        {lang === 'en'
                          ? 'The certificate preview could not be loaded.'
                          : 'No se pudo cargar la vista previa del certificado.'}
                      </div>
                    </div>
                  ) : previewKind === 'unknown' ? (
                    <div className="flex h-full items-center justify-center px-6 text-center">
                      <div className="text-slate-500 dark:text-slate-400">
                        {lang === 'en'
                          ? 'Preparing certificate preview...'
                          : 'Preparando vista previa del certificado...'}
                      </div>
                    </div>
                  ) : previewKind === 'image' ? (
                    <div className="flex h-full items-center justify-center bg-slate-100 p-4 dark:bg-slate-900">
                      <img
                        src={documentUrl}
                        alt={lang === 'en' ? 'Certificate preview' : 'Vista previa del certificado'}
                        className="max-h-full max-w-full rounded-lg object-contain shadow-lg"
                        onLoad={() => setIsLoading(false)}
                        onError={() => {
                          setHasPreviewError(true)
                          setIsLoading(false)
                        }}
                      />
                    </div>
                  ) : (
                    <object
                      data={documentUrl}
                      className="h-full w-full"
                      title="Certificate preview"
                      type={previewKind === 'pdf' ? 'application/pdf' : undefined}
                    >
                      <iframe
                        src={documentUrl}
                        className="h-full w-full"
                        title="Certificate preview"
                        onLoad={() => setIsLoading(false)}
                        onError={() => {
                          setHasPreviewError(true)
                          setIsLoading(false)
                        }}
                      />
                    </object>
                  )}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center">
                  <div className="text-red-500">
                    {lang === 'en'
                      ? 'No certificate file is available for preview.'
                      : 'No hay un archivo de certificado disponible para vista previa.'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}
