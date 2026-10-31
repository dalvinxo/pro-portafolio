import { beforeEach, describe, expect, it, vi } from 'vitest'

const query = vi.hoisted(() => vi.fn())

vi.mock('@utils/notion', () => ({
  default: { databases: { query } },
}))

import {
  getCertificatesDatabase,
  getHistoryDatabase,
  getPortafoliesWorking,
  getSocialMediaDatabas,
} from './database.notion'

const text = (value: string) => [{ plain_text: value }]

const page = (properties: Record<string, unknown>, id = 'page-id') => ({
  object: 'page',
  id,
  url: `https://www.notion.so/${id}`,
  properties,
})

const respondWith = (...results: unknown[]) =>
  query.mockResolvedValueOnce({ object: 'list', results })

beforeEach(() => {
  query.mockReset()
})

describe('getHistoryDatabase', () => {
  it('maps philosophy entries and only queries published ones', async () => {
    respondWith(
      page({
        Order: { type: 'number', number: 1 },
        Description: { type: 'rich_text', rich_text: text('Keep learning') },
        DescriptionSpanish: {
          type: 'rich_text',
          rich_text: text('Seguir aprendiendo'),
        },
        Category: { type: 'select', select: { name: 'Thought' } },
      })
    )

    await expect(getHistoryDatabase()).resolves.toEqual([
      {
        id: 1,
        message: 'Keep learning',
        messageSpanish: 'Seguir aprendiendo',
        category: 'Thought',
      },
    ])
    expect(query.mock.calls[0][0].filter).toEqual({
      property: 'Status',
      checkbox: { equals: true },
    })
  })

  it('skips entries without any text and partial results', async () => {
    respondWith(
      page({
        Order: { type: 'number', number: 1 },
        Description: { type: 'rich_text', rich_text: [] },
        DescriptionSpanish: { type: 'rich_text', rich_text: [] },
      }),
      { object: 'page', id: 'partial' }
    )

    await expect(getHistoryDatabase()).resolves.toEqual([])
  })
})

describe('getSocialMediaDatabas', () => {
  it('drops networks without a link', async () => {
    respondWith(
      page({
        Order: { type: 'number', number: 1 },
        ID: { type: 'title', title: text('github') },
        Link: { type: 'rich_text', rich_text: text('https://github.com/x') },
      }),
      page({
        Order: { type: 'number', number: 2 },
        ID: { type: 'title', title: text('youtube') },
        Link: { type: 'rich_text', rich_text: [] },
      })
    )

    await expect(getSocialMediaDatabas()).resolves.toEqual([
      { id: 1, name: 'github', link: 'https://github.com/x' },
    ])
  })
})

describe('getPortafoliesWorking', () => {
  it('maps projects with optional fields as null', async () => {
    respondWith(
      page({
        Name: { type: 'title', title: text('Portfolio') },
        NameSpanish: { type: 'rich_text', rich_text: [] },
        Progress: { type: 'checkbox', checkbox: true },
        Deploy: { type: 'rich_text', rich_text: [] },
        Repository: { type: 'rich_text', rich_text: text('https://repo') },
        Date: { type: 'date', date: { start: '2026-10-31' } },
      })
    )

    await expect(getPortafoliesWorking()).resolves.toEqual([
      {
        name: 'Portfolio',
        nameSpanish: null,
        state: true,
        deploy: null,
        repository: 'https://repo',
        date: '2026-10-31',
      },
    ])
  })
})

describe('getCertificatesDatabase', () => {
  it('maps certificates', async () => {
    respondWith(
      page({
        ID: { type: 'unique_id', unique_id: { prefix: 'CERT', number: 2 } },
        Title: { type: 'title', title: text('Next.js') },
        Description: { type: 'rich_text', rich_text: text('Course') },
        DescriptionSpanish: { type: 'rich_text', rich_text: text('Curso') },
        Type: { type: 'select', select: { name: 'Course' } },
        TypeSpanish: { type: 'select', select: { name: 'Curso' } },
        CompletionDate: { type: 'date', date: { start: '2026-01-10' } },
        ExpiryDate: { type: 'date', date: null },
        CertificateUrl: { type: 'url', url: null },
        DriveFileId: { type: 'rich_text', rich_text: text('drive-id') },
      })
    )

    await expect(getCertificatesDatabase()).resolves.toEqual([
      {
        id: 'CERT-2',
        title: 'Next.js',
        description: 'Course',
        descriptionSpanish: 'Curso',
        type: 'Course',
        typeSpanish: 'Curso',
        completionDate: '2026-01-10',
        expiryDate: null,
        certificateUrl: null,
        driveFileId: 'drive-id',
      },
    ])
  })
})
