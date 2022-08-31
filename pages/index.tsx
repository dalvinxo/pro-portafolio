import { Client } from '@notionhq/client'
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'
import type { GetStaticProps, NextPage } from 'next'
import { useEffect, useState } from 'react'


export const getStaticProps: GetStaticProps = async (context) => {

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

  console.log('Tamo aqui', process.env.NODE_ENV, process.env.NEXT_PUBLIC_NOTION_SECRECT, process.env.CI)

  const [data, setData] = useState({})

  useEffect(() => {
    fetch('/api/notion')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }, [])


  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <pre>
        {JSON.stringify(data || {}, null, 2)}
      </pre>

    </div>
  )
}

export default Home

