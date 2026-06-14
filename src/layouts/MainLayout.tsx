'use client'

import Navbar from '@components/Navbar/Navbar'
import { ThemeProvider } from 'next-themes'
import TranslateProvider from 'src/context/TranslateProviders'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <TranslateProvider>
      <ThemeProvider
        defaultTheme="dark"
        enableSystem={false}
        attribute={'class'}>
        <div className="min-h-screen dark:bg-slate-900 bg-white dark:text-white text-slate-700">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white dark:focus:bg-slate-100 dark:focus:text-slate-900">
            Skip to main content / Saltar al contenido principal
          </a>
          <Navbar />
          <div className="z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <main id="main-content" className="py-8" tabIndex={-1}>
              {children}
            </main>
          </div>
        </div>
      </ThemeProvider>
    </TranslateProvider>
  )
}

export default MainLayout
