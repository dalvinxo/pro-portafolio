import { Client } from '@notionhq/client'
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'
import type { GetStaticProps, NextPage } from 'next'
import { useEffect, useState } from 'react'


export const getStaticProps: GetStaticProps = async (context) => {

  const notion = new Client({
    auth: process.env.NOTION_SECRECT,
  })

  console.log(notion);

  // const data = await notion.blocks.children.list({
  //     block_id: process.env.PAGE_ID || "dwmaoid2",
  // })


  return {
    props: {
      info: {}
    }
  }

}

interface Props {
  info?: ListBlockChildrenResponse;
}


const Home: NextPage<Props> = ({ info }) => {

  console.log('NEXT_PUBLIC_NOTION_SECRECT:' + process.env.NEXT_PUBLIC_NOTION_SECRECT, 'NOTION_SECRECT' + process.env.NOTION_SECRECT, 'NOTION_SECRECT_ ' + process.env.NOTION_SECRECT_, 'NEXT_PUBLIC_NOTION_SECRECT_TP' + process.env.NEXT_PUBLIC_NOTION_SECRECT_TP)




  // const [data, setData] = useState({})

  // useEffect(() => {
  //   fetch('/api/notion')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data)
  //     })
  // }, [])


  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <pre>
        {/* {JSON.stringify(data || {}, null, 2)} */}
      </pre>

    </div>
  )
}

export default Home

