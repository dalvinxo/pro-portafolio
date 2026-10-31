import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  renderAsync: vi.fn(),
  getCertificatesDatabase: vi.fn(),
  getSocialMediaDatabas: vi.fn(),
}))

vi.mock('@htmldocs/render', () => ({ renderAsync: mocks.renderAsync }))
vi.mock('../../../services', () => ({
  getCertificatesDatabase: mocks.getCertificatesDatabase,
  getSocialMediaDatabas: mocks.getSocialMediaDatabas,
}))
vi.mock('../../../documents/ResumeDocument', () => ({
  default: () => null,
  resumeDocumentCss: '',
}))

import { GET } from './route'

const renderedProps = () => mocks.renderAsync.mock.calls[0][0].props

beforeEach(() => {
  vi.clearAllMocks()
  mocks.renderAsync.mockResolvedValue('<html>resume</html>')
  mocks.getSocialMediaDatabas.mockResolvedValue([
    { id: 1, name: 'github', link: 'https://github.com/x' },
  ])
  mocks.getCertificatesDatabase.mockResolvedValue([
    {
      id: 'CERT-1',
      title: 'Next.js',
      completionDate: '2026-01-10',
      description: 'Course',
    },
  ])
})

describe('GET /api/resume', () => {
  it('renders the requested language as uncached HTML', async () => {
    const response = await GET(
      new Request('http://localhost/api/resume?lang=en')
    )

    expect(await response.text()).toBe('<html>resume</html>')
    expect(response.headers.get('Content-Type')).toBe(
      'text/html; charset=utf-8'
    )
    expect(response.headers.get('Content-Disposition')).toContain(
      'resume-en.html'
    )
    expect(response.headers.get('Cache-Control')).toContain('no-store')
    expect(renderedProps().lang).toBe('en')
  })

  it('defaults to Spanish for missing or unknown languages', async () => {
    await GET(new Request('http://localhost/api/resume?lang=fr'))

    expect(renderedProps().lang).toBe('es')
  })

  it('passes only the certificate fields the resume needs', async () => {
    await GET(new Request('http://localhost/api/resume'))

    expect(renderedProps().certificates).toEqual([
      { id: 'CERT-1', title: 'Next.js', completionDate: '2026-01-10' },
    ])
    expect(renderedProps().socialLinks).toHaveLength(1)
  })
})
