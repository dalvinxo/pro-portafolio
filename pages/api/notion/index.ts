// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Client } from '@notionhq/client'
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string,
    data: ListBlockChildrenResponse
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const notion = new Client({
        auth: process.env.NOTION_SECRECT,
    })

    const data = await notion.blocks.children.list({
        block_id: process.env.PAGE_ID || "dwmaoid2",
    })

    res.status(200).json({ name: 'John Doe', data: data })
}
