'use client'

import '@styles/tailwinds.css'
import MainLayout from '@layouts/MainLayout'

export const reportWebVitals = () => {
  // analytic ...
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <meta
          name="description"
          content="Dalvinxo is a portafoly for review skill and project to the developer dalvin"
        />
        <meta name="keywords" content="HTML, Link" />
      </head>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
