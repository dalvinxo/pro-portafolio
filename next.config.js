/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination: '/course/:path*',
  //     },
  //   ]
  // },
  // swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
    ],
  },
  // experimental: {
  //   appDir: true,
  //   typedRoutes: true
  // },
  env: {
    PAGE_NOTION_MAIN: process.env.PAGE_NOTION_MAIN,
    NOTION_TOKEN: process.env.NOTION_TOKEN,
    TOKEN_GITHUB: process.env.TOKEN_GITHUB,
  },
}

module.exports = nextConfig
