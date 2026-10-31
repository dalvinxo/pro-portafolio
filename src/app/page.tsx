import About from './About'
import {
  getHistoryDatabase,
  getSocialMediaDatabas,
  HistoryItem,
  SocialMediaItem,
} from 'services'
import PageWrapper from '@common/PageWrapper'

export const revalidate = 1200

const fetchDataAbout = async (): Promise<{
  histories: HistoryItem[]
  social: SocialMediaItem[]
}> => {
  const [histories, social] = await Promise.all([
    getHistoryDatabase(),
    getSocialMediaDatabas(),
  ])

  return {
    histories,
    social,
  }
}

export default async function Home() {
  const data = await fetchDataAbout()

  const { histories, social } = data

  return (
    <>
      <PageWrapper>
        <About data={histories} social={social} />
      </PageWrapper>
    </>
  )
}
