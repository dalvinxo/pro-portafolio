'use client'

import Navbar from '@components/Navbar/Navbar'
import { ThemeProvider } from 'next-themes'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="overflow-auto min-h-screen dark:bg-slate-800 bg-white dark:text-slate-100 text-slate-700">
        <div className="xs:mx-0 xs:w-full watch:w-full xs:px-2 w-4/6 h-screen mx-auto py-4 font-sans animate-hidden-fade">
          <ThemeProvider
            defaultTheme="dark"
            enableSystem={false}
            attribute={'class'}>
            <div>
              <Navbar />
              <main>{children}</main>
            </div>
          </ThemeProvider>
        </div>
      </div>
    </div>
  )
}

export default MainLayout
