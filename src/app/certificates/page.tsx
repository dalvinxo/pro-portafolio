import { Metadata } from 'next'
import { getCertificatesDatabase } from 'services'
import PageWrapper from '@common/PageWrapper'
import Certificate from './Certificate'

export const metadata: Metadata = {
  title: 'Certificates',
  description: 'View my professional certificates and achievements',
}

export default async function CertificatesPage() {
  const certificates = await getCertificatesDatabase()

  return (
    <PageWrapper>
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <Certificate certificates={certificates} />
        </div>
      </div>
    </PageWrapper>
  )
}
