'use client'

import Navbar from '@components/Navbar/Navbar'
import { ThemeProvider } from 'next-themes'
import PreferencesProvider from 'src/context/PreferencesProvider'
import TranslateProvider from 'src/context/TranslateProviders'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <TranslateProvider>
      <PreferencesProvider>
        <ThemeProvider
          defaultTheme="dark"
          enableSystem={false}
          attribute={'class'}>
          <div className="relative min-h-screen overflow-x-clip bg-slate-50 text-slate-700 antialiased dark:bg-slate-950 dark:text-slate-200">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,rgb(var(--accent)/0.14),transparent)] transition-colors duration-500"
            />
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white dark:focus:bg-slate-100 dark:focus:text-slate-900">
              Skip to main content / Saltar al contenido principal
            </a>
            <Navbar />
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <main
                id="main-content"
                className="py-8 focus:outline-none sm:py-12"
                tabIndex={-1}>
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </PreferencesProvider>
    </TranslateProvider>
  )
}

export default MainLayout
