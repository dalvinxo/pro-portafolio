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
  images: {
    // disableStaticImages: true,
    domains: ['ui-avatars.com'],
  },
  experimental: {
    appDir: true,
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
  compiler: {
    reactRemoveProperties: true,
    // removeConsole: {
    //   exclude: ['error'],
    // },
  },
  env: {
    //   PAGE_ID: process.env.PAGE_ID,
    //   NOTION_SECRECT: process.env.NOTION_SECRECT
  },
}

module.exports = nextConfig
