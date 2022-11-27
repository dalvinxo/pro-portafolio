import MainLayout from '@layouts/MainLayout'
import '@styles/tailwinds.css'

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
