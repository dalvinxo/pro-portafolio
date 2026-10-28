import MainLayout from '@layouts/MainLayout'
import '@styles/tailwinds.css'
import { Metadata, Viewport } from 'next'
import { preferencesScript } from 'src/constants/preferences'

export const metadata: Metadata = {
  description:
    "Dalvinxo is a portafoly for review skill and project to the 'junior developer'",

  keywords: 'HTML, Link, next, react',
  title: 'Home',

  authors: {
    name: 'dalvinxo',
  },

  manifest: '/manifest.json',

  icons: {
    icon: '/favicon.ico',
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png'],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
  width: 'device-width',
  initialScale: 1.0,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preferencesScript }} />
      </head>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
