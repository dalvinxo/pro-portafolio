import { beforeEach, describe, expect, it, vi } from 'vitest'

const getCertificateFile = vi.hoisted(() => vi.fn())

vi.mock('services', () => ({ getCertificateFile }))

import { GET, HEAD } from './route'

const context = (id: string) => ({ params: Promise.resolve({ id }) })
const request = new Request('http://localhost/api/certificate/file-id')

const PDF = Buffer.from('%PDF-1.7 content')
const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a])

beforeEach(() => {
  getCertificateFile.mockReset()
  vi.spyOn(console, 'error').mockImplementation(() => undefined)
})

describe('GET /api/certificate/[id]', () => {
  it('serves the file with the type detected from its signature', async () => {
    getCertificateFile.mockResolvedValue({
      data: PNG,
      mimeType: 'application/octet-stream',
    })

    const response = await GET(request, context('file-id'))

    expect(getCertificateFile).toHaveBeenCalledWith('file-id')
    expect(response.status).toBe(200)
    expect(response.headers.get('Content-Type')).toBe('image/png')
    expect(Buffer.from(await response.arrayBuffer())).toEqual(PNG)
  })

  it('detects PDF files', async () => {
    getCertificateFile.mockResolvedValue({ data: PDF, mimeType: 'text/plain' })

    const response = await GET(request, context('file-id'))

    expect(response.headers.get('Content-Type')).toBe('application/pdf')
  })

  it('falls back to the Drive mime type for unknown signatures', async () => {
    getCertificateFile.mockResolvedValue({
      data: Buffer.from('plain'),
      mimeType: 'image/webp',
    })

    const response = await GET(request, context('file-id'))

    expect(response.headers.get('Content-Type')).toBe('image/webp')
  })

  it('returns 404 when Drive fails', async () => {
    getCertificateFile.mockRejectedValue(new Error('access denied'))

    const response = await GET(request, context('missing'))

    expect(response.status).toBe(404)
    await expect(response.json()).resolves.toEqual({
      error: 'Certificate not found',
    })
  })
})

describe('HEAD /api/certificate/[id]', () => {
  it('returns type and length without a body', async () => {
    getCertificateFile.mockResolvedValue({ data: PDF, mimeType: 'text/plain' })

    const response = await HEAD(request, context('file-id'))

    expect(response.headers.get('Content-Type')).toBe('application/pdf')
    expect(response.headers.get('Content-Length')).toBe(String(PDF.length))
    expect(response.body).toBeNull()
  })

  it('returns 404 when Drive fails', async () => {
    getCertificateFile.mockRejectedValue(new Error('access denied'))

    const response = await HEAD(request, context('missing'))

    expect(response.status).toBe(404)
  })
})
