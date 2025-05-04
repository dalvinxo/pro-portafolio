import type { Metadata } from 'next'
import NotFoundClient from './not-found-client'

export const metadata: Metadata = {
  title: 'Not Found - 404',
  description: 'Page not found',
}

export default function NotFound() {
  return <NotFoundClient />
}
