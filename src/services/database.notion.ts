import notion from '@utils/notion'
import {
  getCheckbox,
  getDate,
  getNumber,
  getPages,
  getRichText,
  getSelect,
  getTitle,
  getUniqueId,
  getUrl,
} from '@utils/notion-properties'
import { databaseId } from 'var-contants'

export type HistoryItem = {
  id: number
  message: string
  messageSpanish: string | null
  category: string | null
}

export type SocialMediaItem = {
  id: number | null
  name: string
  link: string
}

const publishedFilter = {
  property: 'Status',
  checkbox: {
    equals: true,
  },
}

export const getHistoryDatabase = async (): Promise<HistoryItem[]> => {
  const response = await notion.databases.query({
    database_id: databaseId.about,
    filter: publishedFilter,
    sorts: [
      {
        property: 'Order',
        direction: 'ascending',
      },
    ],
  })

  return getPages(response)
    .map(({ properties }, index) => ({
      id: getNumber(properties, 'Order') ?? index,
      message: getRichText(properties, 'Description') ?? '',
      messageSpanish: getRichText(properties, 'DescriptionSpanish'),
      category: getSelect(properties, 'Category'),
    }))
    .filter((item) => item.message || item.messageSpanish)
}

export const getSocialMediaDatabas = async (): Promise<SocialMediaItem[]> => {
  const response = await notion.databases.query({
    database_id: databaseId.contact,
    filter: publishedFilter,
    sorts: [
      {
        property: 'Order',
        direction: 'ascending',
      },
    ],
  })

  return getPages(response)
    .map(({ properties }) => ({
      id: getNumber(properties, 'Order'),
      name: getTitle(properties, 'ID') ?? '',
      link: getRichText(properties, 'Link') ?? '',
    }))
    .filter((item) => item.name && item.link)
}

export const getPortafoliesWorking = async (): Promise<TypeProyects[]> => {
  const response = await notion.databases.query({
    database_id: databaseId.projects,
    filter: publishedFilter,
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  })

  return getPages(response).map(({ properties }) => ({
    name: getTitle(properties, 'Name'),
    nameSpanish: getRichText(properties, 'NameSpanish'),
    state: getCheckbox(properties, 'Progress'),
    deploy: getRichText(properties, 'Deploy'),
    repository: getRichText(properties, 'Repository'),
    date: getDate(properties, 'Date'),
  }))
}

export const getCertificatesDatabase = async (): Promise<
  TypeCertificates[]
> => {
  const response = await notion.databases.query({
    database_id: databaseId.certificates,
    filter: publishedFilter,
    sorts: [
      {
        property: 'CompletionDate',
        direction: 'descending',
      },
    ],
  })

  return getPages(response).map(({ id, properties }) => ({
    id: getUniqueId(properties, 'ID') ?? id,
    title: getTitle(properties, 'Title') ?? '',
    description: getRichText(properties, 'Description') ?? '',
    descriptionSpanish: getRichText(properties, 'DescriptionSpanish') ?? '',
    type: getSelect(properties, 'Type') ?? '',
    typeSpanish: getSelect(properties, 'TypeSpanish') ?? '',
    completionDate: getDate(properties, 'CompletionDate') ?? '',
    expiryDate: getDate(properties, 'ExpiryDate'),
    certificateUrl: getUrl(properties, 'CertificateUrl'),
    driveFileId: getRichText(properties, 'DriveFileId'),
  }))
}
