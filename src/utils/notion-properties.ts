import { isFullPage } from '@notionhq/client'
import type {
  PageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints'

export type NotionProperties = PageObjectResponse['properties']
type NotionProperty = NotionProperties[string]
type PropertyOf<T extends NotionProperty['type']> = Extract<
  NotionProperty,
  { type: T }
>

const getProperty = <T extends NotionProperty['type']>(
  properties: NotionProperties,
  name: string,
  type: T
): PropertyOf<T> | null => {
  const property = properties[name]
  return property?.type === type ? (property as PropertyOf<T>) : null
}

const joinText = (items: Array<{ plain_text: string }>) => {
  const text = items.map((item) => item.plain_text).join('')
  return text.length > 0 ? text : null
}

/** Keeps only full page results, which are the ones that carry properties. */
export const getPages = (response: QueryDatabaseResponse) =>
  response.results.filter(isFullPage)

export const getTitle = (properties: NotionProperties, name: string) => {
  const property = getProperty(properties, name, 'title')
  return property ? joinText(property.title) : null
}

export const getRichText = (properties: NotionProperties, name: string) => {
  const property = getProperty(properties, name, 'rich_text')
  return property ? joinText(property.rich_text) : null
}

export const getNumber = (properties: NotionProperties, name: string) =>
  getProperty(properties, name, 'number')?.number ?? null

export const getCheckbox = (properties: NotionProperties, name: string) =>
  getProperty(properties, name, 'checkbox')?.checkbox ?? false

export const getDate = (properties: NotionProperties, name: string) =>
  getProperty(properties, name, 'date')?.date?.start ?? null

export const getSelect = (properties: NotionProperties, name: string) =>
  getProperty(properties, name, 'select')?.select?.name ?? null

export const getUrl = (properties: NotionProperties, name: string) =>
  getProperty(properties, name, 'url')?.url ?? null

export const getUniqueId = (properties: NotionProperties, name: string) => {
  const uniqueId = getProperty(properties, name, 'unique_id')?.unique_id

  if (!uniqueId || uniqueId.number === null) return null

  return uniqueId.prefix
    ? `${uniqueId.prefix}-${uniqueId.number}`
    : String(uniqueId.number)
}
