import MainLayout from '@layouts/MainLayout'
import '@styles/tailwinds.css'
import { Metadata } from 'next'
import Head from 'next/head'

export const metadata: Metadata = {
  description:
    "Dalvinxo is a portafoly for review skill and project to the 'junior developer'",
  keywords: 'HTML, Link, next, react',
  title: 'Home',
  viewport: 'width=device-width, initial-scale=1.0',
  authors: {
    name: 'dalvinxo',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Head>
        <meta charSet="utf-8" />
      </Head>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
