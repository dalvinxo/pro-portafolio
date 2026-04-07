import { Metadata } from 'next'

import PageWrapper from '@common/PageWrapper'
import { ResumeCertificateItem } from '../../content/resume'
import { getCertificatesDatabase, getSocialMediaDatabas } from 'services'
import ResumePage from './ResumePage'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Professional summary and printable curriculum.',
}

export default async function ResumeRoute() {
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

  return (
    <PageWrapper>
      <div className="mx-auto max-w-7xl">
        <ResumePage
          socialLinks={socialLinks}
          certificates={resumeCertificates}
        />
      </div>
    </PageWrapper>
  )
}
