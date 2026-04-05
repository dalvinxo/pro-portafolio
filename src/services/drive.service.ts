// src/services/drive.service.ts
import { google } from 'googleapis'

if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
  throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set')
}

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
  scopes: ['https://www.googleapis.com/auth/drive'],
})

// Agregar después de const auth = ...
console.log('Google Auth initialized successfully')
auth
  .getCredentials()
  .then((credentials) => {
    console.log('Service Account Email:', credentials.client_email)
  })
  .catch((error) => {
    console.error('Error getting service account credentials:', error)
  })

const drive = google.drive({ version: 'v3', auth })

export const getCertificateFile = async (fileId: string) => {
  console.log('Fetching file from Drive with ID:', fileId)
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
  } catch (error) {
    console.error('Error fetching file from Drive:', error)
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
  } catch (error) {
    console.error('Error fetching metadata:', error)
    return null
  }
}
