import { Client } from '@notionhq/client'
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'
import type { GetStaticProps, NextPage } from 'next'
// import { useEffect, useState } from 'react'


export const getServerSideProps: GetStaticProps = async () => {

  
  const notion = new Client({
    auth: process.env.NOTION_SECRECT
  });

  const data = await notion.blocks.children.list({
    block_id: process.env.PAGE_ID || 'af18787b0125493ab83aa2e240a01e29'
  })

  return {
    props: {
      info: data
    }
  }

}

interface Props {
  info?: ListBlockChildrenResponse;
}


const Home: NextPage<Props> = ({ info }) => {

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <pre>
        {JSON.stringify(info || {}, null, 2)}
      </pre>

    </div>
  )
}

export default Home

