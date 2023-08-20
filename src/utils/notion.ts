import { Client } from '@notionhq/client'
import { environment } from 'var-contants'

export default new Client({
  auth: environment.NOTION_TOKEN,
})
