import React from 'react'
import { NextResponse } from 'next/server'
import { renderAsync } from '@htmldocs/render'

import ResumeDocument, {
  resumeDocumentCss,
} from '../../../documents/ResumeDocument'
import { ResumeCertificateItem } from '../../../content/resume'
import { Locales } from '../../../constants/translate.config'
import {
  getCertificatesDatabase,
  getSocialMediaDatabas,
} from '../../../services'

const isLocale = (value: string | null): value is Locales => {
  return value === 'en' || value === 'es'
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const langParam = searchParams.get('lang')
  const lang: Locales = isLocale(langParam) ? langParam : 'es'
  const [socialLinks, certificates] = await Promise.all([
    getSocialMediaDatabas(),
    getCertificatesDatabase(),
  ])
  const resumeCertificates: ResumeCertificateItem[] = certificates.map(
    (certificate) => ({
      id: certificate.id,
      title: certificate.title,
      completionDate: certificate.completionDate,
    })
  )

  const html = await renderAsync(
    React.createElement(ResumeDocument, {
      lang,
      socialLinks,
      certificates: resumeCertificates,
    }),
    resumeDocumentCss
  )

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Disposition': `inline; filename="resume-${lang}.html"`,
      'Cache-Control': 'no-store, max-age=0, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  })
}
