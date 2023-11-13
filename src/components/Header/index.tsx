import Image from 'next/image'
import Link from 'next/link'

interface typeHeader extends EntityBrand {
  link?: string
  linkBrandTitle?: string
}

const Header = ({ brand, link, linkBrandTitle }: typeHeader) => {
  return (
    <div>
      <Link
        href={brand.src || link}
        className="flex items-center space-x-3"
        target="_blank"
        rel="nofollow"
        title={linkBrandTitle}>
        <Image
          className="rounded-full"
          alt="icon profile"
          src={brand.avatar}
          width={50}
          height={50}
        />
        <h1 className="text-center text-lg first-letter:text-lg first-letter:uppercase font-medium">
          {brand.title}
        </h1>
      </Link>
    </div>
  )
}

export default Header
