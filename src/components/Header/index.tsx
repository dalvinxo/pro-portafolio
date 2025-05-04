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
        className="flex items-center space-x-3 hover:opacity-75 transition-all duration-200"
        target="_blank"
        rel="nofollow"
        title={linkBrandTitle}>
        <Image
          className="rounded-full w-10 h-10 sm:w-12 sm:h-12"
          alt="icon profile"
          src={brand.avatar}
          width={50}
          height={50}
        />
        <div>
          <h1 className="text-start text-lg first-letter:text-lg first-letter:uppercase font-medium">
            {brand.title}
          </h1>
          <p className="text-start text-sm text-gray-500 dark:text-gray-400">
            Dalvin Molina
          </p>
        </div>
      </Link>
    </div>
  )
}

export default Header
