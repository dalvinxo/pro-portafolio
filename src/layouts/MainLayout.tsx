'use client'

import Navbar from '@components/Navbar/Navbar'
import { ThemeProvider } from 'next-themes'
import TranslateProvider from 'src/context/TranslateProviders'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <TranslateProvider>
        <ThemeProvider
          defaultTheme="dark"
          enableSystem={false}
          attribute={'class'}>
          <div>
            <div className="overflow-auto min-h-screen dark:bg-slate-800 bg-white dark:text-slate-100 text-slate-700">
              <div className="xs:mx-0 xs:w-full watch:w-full max-w-7xl xs:px-2 w-4/6 h-screen mx-auto py-4 font-sans animate-hidden-fade">
                <Navbar />
                <main>{children}</main>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </TranslateProvider>
    </div>
  )
}

export default MainLayout
