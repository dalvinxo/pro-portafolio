import { NextPage } from 'next'
import Link from 'next/link'

const Navbar: NextPage = () => {
  return (
    <div>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/profile">
          <a>Profile</a>
        </Link>
      </nav>
    </div>
  )
}

export default Navbar
