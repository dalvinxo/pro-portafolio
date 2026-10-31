import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const filesGet = vi.hoisted(() => vi.fn())

vi.mock('googleapis', () => ({
  google: {
    auth: { GoogleAuth: vi.fn() },
    drive: vi.fn(() => ({ files: { get: filesGet } })),
  },
}))

const loadService = async () => {
  vi.resetModules()
  return import('./drive.service')
}

beforeEach(() => {
  filesGet.mockReset()
})

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('drive.service without credentials', () => {
  beforeEach(() => {
    vi.stubEnv('GOOGLE_SERVICE_ACCOUNT_KEY', '')
  })

  it('can be imported, so the build does not fail', async () => {
    await expect(loadService()).resolves.toBeDefined()
  })

  it('reports the missing variable when a file is requested', async () => {
    const { getCertificateFile } = await loadService()

    await expect(getCertificateFile('id')).rejects.toThrow(
      'GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set'
    )
  })

  it('returns null metadata', async () => {
    const { getCertificateMetadata } = await loadService()

    await expect(getCertificateMetadata('id')).resolves.toBeNull()
  })
})

describe('drive.service with credentials', () => {
  beforeEach(() => {
    vi.stubEnv(
      'GOOGLE_SERVICE_ACCOUNT_KEY',
      JSON.stringify({ type: 'service_account', client_email: 'a@b.c' })
    )
  })

  it('downloads the file as a buffer', async () => {
    filesGet.mockResolvedValue({
      data: new Uint8Array([1, 2, 3]).buffer,
      headers: { 'content-type': 'image/png' },
    })
    const { getCertificateFile } = await loadService()

    const file = await getCertificateFile('file-id')

    expect(filesGet.mock.calls[0][0]).toEqual({
      fileId: 'file-id',
      alt: 'media',
    })
    expect(file.mimeType).toBe('image/png')
    expect([...file.data]).toEqual([1, 2, 3])
  })

  it('hides Drive errors behind a generic message', async () => {
    filesGet.mockRejectedValue(new Error('403 forbidden'))
    const { getCertificateFile } = await loadService()

    await expect(getCertificateFile('file-id')).rejects.toThrow(
      'Certificate not found or access denied'
    )
  })
})
