import { Client } from '@notionhq/client'
import { environment } from 'var-contants'

const notion = new Client({
  auth: environment.NOTION_TOKEN,
})

export default notion
