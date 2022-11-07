import notion from '@utils/notion'

export const getChildrenPageMain = async () => {
  const data = await notion.blocks.children.list({
    block_id: process.env.PAGE_NOTION_MAIN ?? '',
  })

  return data
}
