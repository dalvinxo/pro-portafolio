// src/services/drive.service.ts
import { google } from 'googleapis'

if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
  throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set')
}

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
  scopes: ['https://www.googleapis.com/auth/drive'],
})

const drive = google.drive({ version: 'v3', auth })

export const getCertificateFile = async (fileId: string) => {
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

    return {
      data: response.data,
      mimeType: response.headers['content-type'] || 'application/pdf',
    }
  } catch {
    throw new Error('Certificate not found or access denied')
  }
}

export const getCertificateMetadata = async (fileId: string) => {
  try {
    const response = await drive.files.get({
      fileId,
      fields: 'name,mimeType,thumbnailLink',
    })

    return response.data
  } catch {
    return null
  }
}
