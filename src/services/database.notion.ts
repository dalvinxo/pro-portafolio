import notion from '@utils/notion'
import { databaseId } from 'var-contants'

export const getHistoryDatabase = async () => {
  const blocks = await notion.databases.query({
    database_id: databaseId.about,
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
    messageSpanish: (block as any).properties.DescriptionSpanish.rich_text[0]
      .text['content'],
  }))

  return data
}

export const getSocialMediaDatabas = async () => {
  const blocks = await notion.databases.query({
    database_id: databaseId.contact,
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
    name: (block as any).properties.ID.title[0].text.content,
    link: (block as any).properties.Link.rich_text[0].text['content'],
  }))

  return data
}

export const getPortafoliesWorking = async () => {
  const blocks = await notion.databases.query({
    database_id: databaseId.projects,
    filter: {
      property: 'Status',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  })

  const data = blocks.results.map((block) => ({
    name: (block as any).properties.Name.title[0].text.content,
    nameSpanish: (block as any).properties.NameSpanish.rich_text[0]?.text[
      'content'
    ],
    state: (block as any).properties.Progress.checkbox ?? false,
    deploy:
      (block as any).properties.Deploy.rich_text[0]?.text['content'] ?? null,
    repository:
      (block as any).properties.Repository.rich_text[0]?.text['content'] ??
      null,
    date: (block as any).properties.Date.date?.start ?? null,
  }))

  return data
}

export const getCertificatesDatabase: () => Promise<
  TypeCertificates[]
> = async () => {
  const blocks = await notion.databases.query({
    database_id: databaseId.certificates,
    filter: {
      property: 'Status',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'CompletionDate',
        direction: 'descending',
      },
    ],
  })

  const data = blocks.results.map((block) => ({
    id: `${(block as any).properties.ID.unique_id.prefix}-${
      (block as any).properties.ID.unique_id.number
    }`,
    title: (block as any).properties.Title.title[0].text.content,
    description: (block as any).properties.Description.rich_text[0]?.text
      .content,
    descriptionSpanish: (block as any).properties.DescriptionSpanish
      .rich_text[0]?.text.content,
    typeSpanish: (block as any).properties.TypeSpanish.select.name,
    type: (block as any).properties.Type.select.name,
    completionDate: (block as any).properties.CompletionDate.date?.start,
    expiryDate: (block as any).properties.ExpiryDate.date?.start ?? null,
    certificateUrl: (block as any).properties.CertificateUrl.url ?? null,
  }))

  return data
}
