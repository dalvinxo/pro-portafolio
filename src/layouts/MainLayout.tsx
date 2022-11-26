import Navbar from '../components/Navbar/Navbar'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-auto min-h-screen bg-slate-800 text-slate-100">
      <div className="xs:mx-0 xs:w-full xs:px-2 w-4/6 h-screen mx-auto py-4 font-sans animate-hidden-fade">
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  )
}

export default MainLayout
