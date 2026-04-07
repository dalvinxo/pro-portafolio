'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import React from 'react'
import { useTranslateContext } from 'providers'
import { getDictionary } from '@utils/dictionaries'
import HeadSection from '@common/HeadSection'
import CertificateCard from './CertificateCard'

type Certificate = TypeCertificates
type PreviewKind = 'pdf' | 'image' | 'unknown'
type PreviewStatus = 'idle' | 'resolving' | 'ready' | 'error'

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
  const [previewNonce, setPreviewNonce] = useState(0)
  const [previewStatus, setPreviewStatus] = useState<PreviewStatus>('idle')

  const documentUrl = useMemo(() => {
    if (!selectedFileId) {
      return null
    }

    const searchParams = new URLSearchParams()

    if (previewNonce > 0) {
      searchParams.set('v', String(previewNonce))
    }

    const queryString = searchParams.toString()

    return queryString
      ? `/api/certificate/${selectedFileId}?${queryString}`
      : `/api/certificate/${selectedFileId}`
  }, [previewNonce, selectedFileId])

  useEffect(() => {
    if (!isModalOpen || !selectedFileId) {
      setIsLoading(false)
      setHasPreviewError(false)
      setPreviewKind('unknown')
      setPreviewStatus('idle')
      return
    }

    setIsLoading(true)
    setHasPreviewError(false)
    setPreviewKind('unknown')
    setPreviewStatus('resolving')
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
        const contentType =
          response.headers.get('content-type')?.toLowerCase() ?? ''

        if (!isActive) {
          return
        }

        if (contentType.includes('pdf')) {
          setPreviewKind('pdf')
          setPreviewStatus('ready')
          return
        }

        if (contentType.startsWith('image/')) {
          setPreviewKind('image')
          setPreviewStatus('ready')
          return
        }

        setPreviewKind('unknown')
        setPreviewStatus('ready')
      } catch (error) {
        if (isActive) {
          setPreviewKind('unknown')
          setPreviewStatus('error')
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
    setPreviewStatus('resolving')
    setPreviewNonce((current) => current + 1)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedFileId(null)
    setHasPreviewError(false)
    setIsLoading(false)
    setPreviewKind('unknown')
    setPreviewStatus('idle')
  }

  const allOptionLabel = useMemo(
    () => (lang === 'en' ? 'All' : 'Todos'),
    [lang]
  )

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

        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.55)] dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-md flex-1">
              <input
                type="search"
                placeholder={translate.certificates.searchPlaceholder}
                className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition-colors focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-sky-800 dark:focus:bg-slate-900"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {certificateTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  aria-pressed={selectedType === type}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    selectedType === type
                      ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800'
                  }`}>
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
            <p className="py-10 text-center text-slate-500 dark:text-slate-400">
              {translate.certificates.noCertificatesFound}
            </p>
          )}
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <button
              type="button"
              onClick={closeModal}
              aria-label={
                lang === 'en'
                  ? 'Close certificate preview'
                  : 'Cerrar vista previa del certificado'
              }
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-800">
              x
            </button>

            <div className="h-[80vh] w-full">
              {documentUrl ? (
                <div className="relative h-full w-full">
                  {isLoading && previewStatus !== 'error' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-slate-800/90">
                      <div className="text-slate-500 dark:text-slate-400">
                        {lang === 'en'
                          ? 'Loading certificate...'
                          : 'Cargando certificado...'}
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
                  ) : previewStatus === 'resolving' ? (
                    <div className="flex h-full items-center justify-center px-6 text-center">
                      <div className="text-slate-500 dark:text-slate-400">
                        {lang === 'en'
                          ? 'Preparing certificate preview...'
                          : 'Preparando vista previa del certificado...'}
                      </div>
                    </div>
                  ) : previewKind === 'image' ? (
                    <div className="flex h-full items-center justify-center bg-slate-100 p-4 dark:bg-slate-950">
                      <div className="relative h-full w-full">
                        <Image
                          src={documentUrl}
                          alt={
                            lang === 'en'
                              ? 'Certificate preview'
                              : 'Vista previa del certificado'
                          }
                          fill
                          unoptimized
                          sizes="100vw"
                          className="object-contain"
                          onLoad={() => setIsLoading(false)}
                          onError={() => {
                            setHasPreviewError(true)
                            setIsLoading(false)
                          }}
                        />
                      </div>
                    </div>
                  ) : previewKind === 'pdf' ? (
                    <object
                      data={documentUrl}
                      className="h-full w-full"
                      title="Certificate preview"
                      type={
                        previewKind === 'pdf' ? 'application/pdf' : undefined
                      }>
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
                  ) : (
                    <div className="flex h-full items-center justify-center px-6 text-center">
                      <div className="text-slate-500 dark:text-slate-400">
                        {lang === 'en'
                          ? 'This file type cannot be previewed here.'
                          : 'Este tipo de archivo no se puede previsualizar aqui.'}
                      </div>
                    </div>
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
