/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CI: "Deploy",
    NEXT_PUBLIC_NOTION_SECRECT: process.env.NEXT_PUBLIC_NOTION_SECRECT,
    NOTION_SECRECT: process.env.NOTION_SECRECT,
    NOTION_SECRECT_: "Intentando acceder"
  }
}

module.exports = nextConfig
