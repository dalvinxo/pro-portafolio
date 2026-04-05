// src/app/api/certificate/[id]/route.ts
import { NextResponse } from 'next/server'
import { getCertificateFile } from 'services'

type RouteContext = {
    params: Promise<{ id: string }>
}

const getMimeTypeFromSignature = (data: ArrayBuffer | Buffer) => {
  const bytes = data instanceof Buffer ? data : Buffer.from(data)

  if (bytes.length >= 4) {
    const header = bytes.subarray(0, 4)

    if (
      header[0] === 0x25 &&
      header[1] === 0x50 &&
      header[2] === 0x44 &&
      header[3] === 0x46
    ) {
      return 'application/pdf'
    }

    if (header[0] === 0xff && header[1] === 0xd8 && header[2] === 0xff) {
      return 'image/jpeg'
    }

    if (
      header[0] === 0x89 &&
      header[1] === 0x50 &&
      header[2] === 0x4e &&
      header[3] === 0x47
    ) {
      return 'image/png'
    }

    if (header[0] === 0x47 && header[1] === 0x49 && header[2] === 0x46) {
      return 'image/gif'
    }
  }

  return null
}

const resolveCertificateResponse = async (id: string) => {
  const { data, mimeType } = await getCertificateFile(id)
  const buffer = data instanceof Buffer ? data : Buffer.from(data)
  const resolvedMimeType = getMimeTypeFromSignature(buffer) || mimeType

  return {
    buffer,
    resolvedMimeType,
  }
}

export async function GET(
    _request: Request,
    { params }: RouteContext
) {
  try {
    const { id } = await params
    const { buffer, resolvedMimeType } = await resolveCertificateResponse(id)

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': resolvedMimeType,
        'Content-Disposition': 'inline; filename="certificate"',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Certificate not found' },
      { status: 404 }
    )
  }
}

export async function HEAD(
    _request: Request,
    { params }: RouteContext
) {
  try {
    const { id } = await params
    const { buffer, resolvedMimeType } = await resolveCertificateResponse(id)

    return new NextResponse(null, {
      headers: {
        'Content-Type': resolvedMimeType,
        'Content-Length': String(buffer.byteLength),
        'Content-Disposition': 'inline; filename="certificate"',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    return new NextResponse(null, { status: 404 })
  }
}
