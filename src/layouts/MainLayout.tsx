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
          <Navbar />
          <div className="relative z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <main className="py-8">{children}</main>
          </div>
        </div>
      </ThemeProvider>
    </TranslateProvider>
  )
}

export default MainLayout
