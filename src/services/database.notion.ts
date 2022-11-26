import notion from '@utils/notion'

export const getHistoryDatabase = async () => {
  const blocks = await notion.databases.query({
    database_id: '57a80229910b406dabfa79f0f6a43f76',
    filter: {
      property: 'Status',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'Order',
        direction: 'ascending',
      },
    ],
  })

  const data = blocks.results.map((block) => ({
    id: (block as any).properties.Order.number,
    message: (block as any).properties.Description.rich_text[0].text['content'],
  }))

  return data
}

export const getSocialMediaDatabas = async () => {
  const blocks = await notion.databases.query({
    database_id: '8b51bab5f1e545c7ae83982cd7e2695d',
    filter: {
      property: 'Status',
      checkbox: {
        equals: true,
      },
    },
  })

  const data = blocks.results.map((block) => ({
    id: (block as any).properties.Order.number,
    name: (block as any).properties.ID.title[0].text.content,
    link: (block as any).properties.link.rich_text[0].text['content'],
  }))

  return data
}

export const getPortafoliesWorking = async () => {
  const blocks = await notion.databases.query({
    database_id: 'e0777f43038241749df99700ca798491',
    filter: {
      property: 'Status',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'Progress',
        direction: 'descending',
      },
    ],
  })

  const data = blocks.results.map((block) => ({
    name: (block as any).properties.Name.title[0].text.content,
    state:
      (block as any).properties.Progress.rich_text[0]?.text['content'] ?? null,
    deploy:
      (block as any).properties.Deploy.rich_text[0]?.text['content'] ?? null,
    repository:
      (block as any).properties.Repository.rich_text[0]?.text['content'] ??
      null,
    date: (block as any).properties.Date.date?.start ?? null,
  }))

  return data
}
