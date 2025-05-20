'use client'

import { useState, useMemo, useEffect } from 'react'
import { useTranslateContext } from 'providers'
import { getDictionary } from '@utils/dictionaries'
import HeadSection from '@common/HeadSection'
import CertificateCard from './CertificateCard'

type Certificate = TypeCertificates

export default function Certificate({
  certificates,
}: {
  certificates: Certificate[]
}) {
  const { lang } = useTranslateContext()
  const translate = getDictionary(lang)

  const [search, setSearch] = useState('')

  const AllOptionLabel = useMemo(
    () => (lang === 'en' ? 'All' : 'Todos'),
    [lang]
  )

  const certificateTypes = useMemo(() => {
    const types = new Set(
      certificates.map((cert) => (lang === 'en' ? cert.type : cert.typeSpanish))
    )
    return [AllOptionLabel, ...Array.from(types)]
  }, [certificates, lang, AllOptionLabel])

  const [selectedType, setSelectedType] = useState<string>(AllOptionLabel)

  useEffect(() => {
    setSelectedType(AllOptionLabel)
  }, [AllOptionLabel])

  const filteredCertificates = useMemo(() => {
    return certificates.filter((cert) => {
      const matchesSearch =
        cert.title.toLowerCase().includes(search.toLowerCase()) ||
        cert.description.toLowerCase().includes(search.toLowerCase())
      const matchesType =
        selectedType === AllOptionLabel ||
        cert.type === selectedType ||
        cert.typeSpanish === selectedType
      return matchesSearch && matchesType
    })
  }, [certificates, search, selectedType, AllOptionLabel])

  return (
    <section className="space-y-8">
      <HeadSection title={translate.title.certificates} />

      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="flex-1 max-w-md">
          <input
            type="search"
            placeholder={translate.certificates.searchPlaceholder}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 
                     bg-white dark:bg-slate-800 focus:ring-2 focus:ring-sky-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {certificateTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap
                        transition-all duration-200 ${
                          selectedType === type
                            ? 'bg-sky-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}>
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map((certificate) => (
          <CertificateCard key={certificate.id} certificate={certificate} />
        ))}
      </div>

      {filteredCertificates.length === 0 && (
        <p className="text-center text-slate-500 dark:text-slate-400 py-8">
          {translate.certificates.noCertificatesFound}
        </p>
      )}
    </section>
  )
}
