/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NOTION_SECRECT: process.env.NOTION_SECRECT,
    CI: "alimentos"
  }
}

module.exports = nextConfig
