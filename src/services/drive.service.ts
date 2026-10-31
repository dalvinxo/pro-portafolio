// src/services/drive.service.ts
import { google } from 'googleapis'

let driveClient: ReturnType<typeof google.drive> | null = null

// Created on first use so importing the module never fails during the build
const getDrive = () => {
  if (driveClient) return driveClient

  if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    throw new Error(
      'GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set'
    )
  }

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
    scopes: ['https://www.googleapis.com/auth/drive'],
  })

  driveClient = google.drive({ version: 'v3', auth })
  return driveClient
}

export const getCertificateFile = async (fileId: string) => {
  const drive = getDrive()

  try {
    const response = await drive.files.get(
      {
        fileId,
        alt: 'media',
      },
      {
        responseType: 'arraybuffer',
      }
    )

    const fileBuffer = Buffer.from(response.data as ArrayBuffer)

    return {
      data: fileBuffer,
      mimeType: response.headers['content-type'] || 'application/pdf',
    }
  } catch {
    throw new Error('Certificate not found or access denied')
  }
}

export const getCertificateMetadata = async (fileId: string) => {
  try {
    const response = await getDrive().files.get({
      fileId,
      fields: 'name,mimeType,thumbnailLink',
    })

    return response.data
  } catch {
    return null
  }
}
