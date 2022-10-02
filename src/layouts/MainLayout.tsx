import { NextPage } from 'next'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'

const MainLayout: NextPage<ElementWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-800 text-slate-100">
      <div className="w-4/5 mx-auto py-4 font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout
