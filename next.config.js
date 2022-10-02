/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/course/:path*',
      },
    ]
  },
  swcMinify: true,
  experimental: {
    images: {
      allowFutureImage: true,
    },
    externalDir:
      true |
      {
        enabled: true,
        silent: true,
      },
  },
  env: {
    NEXT_PUBLIC_RESOURCE: '../../../public/',
    //   PAGE_ID: process.env.PAGE_ID,
    //   NOTION_SECRECT: process.env.NOTION_SECRECT
  },
}

module.exports = nextConfig
