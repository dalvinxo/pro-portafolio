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
    CI: "Deploy",
    NEXT_PUBLIC_NOTION_SECRECT: process.env.NEXT_PUBLIC_NOTION_SECRECT
  }
}

module.exports = nextConfig
