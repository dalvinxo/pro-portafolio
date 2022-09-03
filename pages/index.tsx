import { Client } from '@notionhq/client'
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'
import type { GetStaticProps, NextPage } from 'next'
// import { useEffect, useState } from 'react'


export const getStaticProps: GetStaticProps = async (context) => {

  const notion = new Client({
    auth: process.env.NOTION_SECRECT
  });

  const data = await notion.blocks.children.list({
    block_id: process.env.PAGE_ID || ''
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

