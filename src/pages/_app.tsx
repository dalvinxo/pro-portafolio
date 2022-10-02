import '@styles/tailwind.css'
import type { AppProps } from 'next/app'
import MainLayout from '@layouts/MainLayout'

export const reportWebVitals = () => {
  // analytic ...
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}

export default MyApp
