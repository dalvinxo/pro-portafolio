'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import React from 'react'
import { createPortal } from 'react-dom'
import { IoClose, IoSearch } from 'react-icons/io5'
import { useTranslateContext } from 'providers'
import { getDictionary } from '@utils/dictionaries'
import HeadSection from '@common/HeadSection'
import { EASE_OUT, Stagger, StaggerItem } from '@common/Motion'
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

  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

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

  const selectedCertificate = useMemo(
    () =>
      certificates.find((cert) => cert.driveFileId === selectedFileId) ?? null,
    [certificates, selectedFileId]
  )

  useEffect(() => {
    if (!isModalOpen) {
      return
    }

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isModalOpen])

  const previewMessage = (message: string, tone: 'muted' | 'error') => (
    <div className="flex h-full items-center justify-center px-6 text-center">
      <p
        role={tone === 'error' ? 'alert' : 'status'}
        className={
          tone === 'error'
            ? 'text-red-600 dark:text-red-400'
            : 'text-slate-500 dark:text-slate-400'
        }>
        {message}
      </p>
    </div>
  )

  return (
    <React.Fragment>
      <section>
        <HeadSection
          eyebrow={
            lang === 'en' ? 'Continuous learning' : 'Aprendizaje continuo'
          }
          title={translate.title.certificates}
          count={certificates.length}
          description={
            lang === 'en'
              ? 'Courses, programs and credentials that back my day-to-day work.'
              : 'Cursos, programas y credenciales que respaldan mi trabajo diario.'
          }
        />

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <IoSearch
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <label htmlFor="certificate-search" className="sr-only">
              {translate.certificates.searchPlaceholder}
            </label>
            <input
              id="certificate-search"
              type="search"
              placeholder={translate.certificates.searchPlaceholder}
              className="w-full rounded-full border border-slate-200 bg-white/80 py-2.5 pl-11 pr-4 text-sm text-slate-700 outline-none backdrop-blur transition-colors placeholder:text-slate-400 focus:border-accent/50 focus:ring-4 focus:ring-accent/15 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div
            role="group"
            aria-label={lang === 'en' ? 'Filter by type' : 'Filtrar por tipo'}
            className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 lg:pb-0">
            {certificateTypes.map((type) => {
              const isActive = selectedType === type

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  aria-pressed={isActive}
                  className={`relative whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive
                      ? 'text-white dark:text-slate-900'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}>
                  {isActive && (
                    <motion.span
                      layoutId="certificate-filter"
                      aria-hidden="true"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 34,
                      }}
                      className="absolute inset-0 rounded-full bg-slate-900 dark:bg-white"
                    />
                  )}
                  <span className="relative">{type}</span>
                </button>
              )
            })}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {lang === 'en'
            ? `${filteredCertificates.length} certificates shown`
            : `${filteredCertificates.length} certificados mostrados`}
        </p>

        {filteredCertificates.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 px-6 py-16 text-center dark:border-white/10">
            <p className="text-slate-500 dark:text-slate-400">
              {translate.certificates.noCertificatesFound}
            </p>
          </div>
        ) : (
          <Stagger
            key={selectedType}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCertificates.map((certificate) => (
              <StaggerItem key={certificate.id} className="h-full">
                <CertificateCard
                  certificate={certificate}
                  onViewAction={openModal}
                />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </section>

      {isMounted &&
        createPortal(
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}>
                <div
                  className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
                  onClick={closeModal}
                  aria-hidden="true"
                />

                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="certificate-preview-title"
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900">
                  <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4 dark:border-white/10">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-ink">
                        {lang === 'en' ? 'Certificate' : 'Certificado'}
                      </p>
                      <h2
                        id="certificate-preview-title"
                        className="truncate text-base font-semibold text-slate-900 dark:text-white">
                        {selectedCertificate?.title ??
                          (lang === 'en'
                            ? 'Certificate preview'
                            : 'Vista previa del certificado')}
                      </h2>
                    </div>
                    <button
                      ref={closeButtonRef}
                      type="button"
                      onClick={closeModal}
                      aria-label={
                        lang === 'en'
                          ? 'Close certificate preview'
                          : 'Cerrar vista previa del certificado'
                      }
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:text-slate-300 dark:hover:bg-white/10">
                      <IoClose className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="h-[75vh] w-full bg-slate-100 dark:bg-slate-950">
                    {documentUrl ? (
                      <div className="relative h-full w-full">
                        {isLoading && previewStatus !== 'error' && (
                          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-white/90 dark:bg-slate-900/90">
                            <div
                              aria-hidden="true"
                              className="h-10 w-10 animate-spin rounded-full border-2 border-accent/20 border-t-accent"
                            />
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {lang === 'en'
                                ? 'Loading certificate...'
                                : 'Cargando certificado...'}
                            </p>
                          </div>
                        )}

                        {hasPreviewError ? (
                          previewMessage(
                            lang === 'en'
                              ? 'The certificate preview could not be loaded.'
                              : 'No se pudo cargar la vista previa del certificado.',
                            'error'
                          )
                        ) : previewStatus === 'resolving' ? (
                          previewMessage(
                            lang === 'en'
                              ? 'Preparing certificate preview...'
                              : 'Preparando vista previa del certificado...',
                            'muted'
                          )
                        ) : previewKind === 'image' ? (
                          <div className="flex h-full items-center justify-center p-4">
                            <div className="relative h-full w-full">
                              <Image
                                src={documentUrl}
                                alt={
                                  selectedCertificate?.title ??
                                  (lang === 'en'
                                    ? 'Certificate preview'
                                    : 'Vista previa del certificado')
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
                            type="application/pdf">
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
                          previewMessage(
                            lang === 'en'
                              ? 'This file type cannot be previewed here.'
                              : 'Este tipo de archivo no se puede previsualizar aquí.',
                            'muted'
                          )
                        )}
                      </div>
                    ) : (
                      previewMessage(
                        lang === 'en'
                          ? 'No certificate file is available for preview.'
                          : 'No hay un archivo de certificado disponible para vista previa.',
                        'error'
                      )
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </React.Fragment>
  )
}
