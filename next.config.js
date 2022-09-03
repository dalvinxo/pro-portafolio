/** @type {import('next').NextConfig} */

const { allowedNodeEnvironmentFlags } = require('process')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    images: {
      allowFutureImage: false
    },
    external: true,
    allowedNodeEnvironmentFlags: true
  },
  env: {
    PAGE_ID: process.env.PAGE_ID,
    NOTION_SECRECT: process.env.NOTION_SECRECT
  }
}

module.exports = nextConfig
