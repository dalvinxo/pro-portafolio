import { describe, expect, it } from 'vitest'
import {
  getCheckbox,
  getDate,
  getNumber,
  getRichText,
  getSelect,
  getTitle,
  getUniqueId,
  getUrl,
  NotionProperties,
} from './notion-properties'

const text = (...parts: string[]) => parts.map((part) => ({ plain_text: part }))

const properties = {
  Name: { type: 'title', title: text('Pro ', 'Portafolio') },
  Description: { type: 'rich_text', rich_text: text('Hello') },
  Empty: { type: 'rich_text', rich_text: [] },
  Order: { type: 'number', number: 3 },
  Status: { type: 'checkbox', checkbox: true },
  Date: { type: 'date', date: { start: '2026-10-31' } },
  NoDate: { type: 'date', date: null },
  Type: { type: 'select', select: { name: 'Course' } },
  Link: { type: 'url', url: 'https://example.com' },
  ID: { type: 'unique_id', unique_id: { prefix: 'CERT', number: 7 } },
  PlainID: { type: 'unique_id', unique_id: { prefix: null, number: 8 } },
} as unknown as NotionProperties

describe('notion property helpers', () => {
  it('joins every text segment', () => {
    expect(getTitle(properties, 'Name')).toBe('Pro Portafolio')
    expect(getRichText(properties, 'Description')).toBe('Hello')
  })

  it('returns null for empty or missing text', () => {
    expect(getRichText(properties, 'Empty')).toBeNull()
    expect(getRichText(properties, 'Missing')).toBeNull()
  })

  it('returns null when the property has another type', () => {
    expect(getTitle(properties, 'Description')).toBeNull()
    expect(getNumber(properties, 'Name')).toBeNull()
  })

  it('reads scalar properties', () => {
    expect(getNumber(properties, 'Order')).toBe(3)
    expect(getCheckbox(properties, 'Status')).toBe(true)
    expect(getCheckbox(properties, 'Missing')).toBe(false)
    expect(getDate(properties, 'Date')).toBe('2026-10-31')
    expect(getDate(properties, 'NoDate')).toBeNull()
    expect(getSelect(properties, 'Type')).toBe('Course')
    expect(getUrl(properties, 'Link')).toBe('https://example.com')
  })

  it('formats unique ids with and without prefix', () => {
    expect(getUniqueId(properties, 'ID')).toBe('CERT-7')
    expect(getUniqueId(properties, 'PlainID')).toBe('8')
    expect(getUniqueId(properties, 'Missing')).toBeNull()
  })
})
