import MainLayout from '@layouts/MainLayout'
import '@styles/tailwinds.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  description:
    "Dalvinxo is a portafoly for review skill and project to the 'junior developer'",
  keywords: 'HTML, Link, next, react',
  title: 'Home',
  viewport: 'width=device-width, initial-scale=1.0',
  authors: {
    name: 'dalvinxo',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png'],
  },
  themeColor: 'white',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
