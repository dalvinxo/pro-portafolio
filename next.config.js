/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CI: "Deploy",
    NEXT_PUBLIC_NOTION_SECRECT: process.env.NEXT_PUBLIC_NOTION_SECRECT,
    Pro: process.env.NOTION_SECRECT,
    p: process.env.NOTION_SECRECT
  }
}

module.exports = nextConfig
