/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: ""
  },
  env: {
    NOTION_SECRECT: process.env.NOTION_SECRECT,
    CI: "alimentos"
  }
}

module.exports = nextConfig
