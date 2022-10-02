// import { Client } from '@notionhq/client'
import About from '@components/About/About'
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'
import type { GetStaticProps, NextPage } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  // const notion = new Client({
  //   auth: process.env.NOTION_SECRECT
  // });

  // const data = await notion.blocks.children.list({
  //   block_id: process.env.PAGE_ID || 'af18787b0125493ab83aa2e240a01e29'
  // })

  return {
    props: {
      info: 'test',
    },
  }
}

interface Props {
  info?: ListBlockChildrenResponse
}

const Home: NextPage<Props> = () => {
  return (
    <>
      <About />
    </>
  )
}

export default Home
