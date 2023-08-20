import notion from '@utils/notion'
import { environment } from 'var-contants'

export const getChildrenPageMain = async () => {
  const data = await notion.blocks.children.list({
    block_id: environment.PAGE_NOTION_MAIN ?? '',
  })

  return data
}
