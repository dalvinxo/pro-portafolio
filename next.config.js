/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    images: {
      allowFutureImage: false
    }
  },
  // env: {
  //   PAGE_ID: process.env.PAGE_ID,
  //   NOTION_SECRECT: process.env.NOTION_SECRECT
  // }
}

module.exports = nextConfig
